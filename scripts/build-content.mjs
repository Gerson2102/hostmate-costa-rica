#!/usr/bin/env node
// Reads content/**/*.json, validates it, and emits lib/content.generated.ts.
// Plain Node ESM — no new runtime dependencies.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const OUTPUT_FILE = path.join(ROOT, 'lib', 'content.generated.ts');

const ACCOMMODATION_TYPES = ['entire_home', 'apartment', 'private_room', 'shared_room', 'condo'];
const EXTERNAL_PLATFORMS = ['airbnb', 'booking', 'vrbo', 'other'];

/** Collected validation errors, reported all at once before exiting. */
const errors = [];

function fail(file, field, message) {
  errors.push(`  ${path.relative(ROOT, file)} → "${field}": ${message}`);
}

function readJson(file) {
  const raw = readFileSync(file, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (err) {
    fail(file, '(file)', `invalid JSON — ${err.message}`);
    return null;
  }
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isBilingualPair(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    isNonEmptyString(value.en) &&
    isNonEmptyString(value.es)
  );
}

function isBlank(value) {
  return typeof value !== 'string' || value.trim().length === 0;
}

function checkBilingualField(file, fieldPath, value, required = true) {
  if (value === undefined) {
    if (required) fail(file, fieldPath, 'missing required bilingual { en, es } field');
    return;
  }
  // An optional field left untouched in the Decap CMS "object" widget saves
  // as { en: "", es: "" } rather than omitting the key entirely. Treat that
  // as "not provided" instead of a validation error.
  if (!required && value && typeof value === 'object' && !Array.isArray(value) && isBlank(value.en) && isBlank(value.es)) {
    return;
  }
  if (!isBilingualPair(value)) {
    fail(file, fieldPath, 'must be a { en, es } object with non-empty strings for both');
  }
}

function checkNumber(file, fieldPath, value, required = false) {
  if (value === undefined) {
    if (required) fail(file, fieldPath, 'missing required numeric field');
    return;
  }
  if (typeof value !== 'number' || Number.isNaN(value)) {
    fail(file, fieldPath, `must be a number, got ${JSON.stringify(value)}`);
  }
}

// ---------------------------------------------------------------------------
// Properties
// ---------------------------------------------------------------------------

function validateProperty(file, data) {
  if (data === null) return null;

  if (!isNonEmptyString(data.id)) {
    fail(file, 'id', 'missing or empty required string field');
  }

  checkBilingualField(file, 'name', data.name);
  checkBilingualField(file, 'description', data.description);
  checkBilingualField(file, 'location', data.location);
  checkBilingualField(file, 'priceNotes', data.priceNotes, false);

  if (!isNonEmptyString(data.accommodationType)) {
    fail(file, 'accommodationType', 'missing required field');
  } else if (!ACCOMMODATION_TYPES.includes(data.accommodationType)) {
    fail(
      file,
      'accommodationType',
      `must be one of ${ACCOMMODATION_TYPES.join(', ')} — got "${data.accommodationType}"`
    );
  }

  if (!isNonEmptyString(data.externalPlatform)) {
    fail(file, 'externalPlatform', 'missing required field');
  } else if (!EXTERNAL_PLATFORMS.includes(data.externalPlatform)) {
    fail(
      file,
      'externalPlatform',
      `must be one of ${EXTERNAL_PLATFORMS.join(', ')} — got "${data.externalPlatform}"`
    );
  }

  if (!isNonEmptyString(data.monthlyPrice)) {
    fail(file, 'monthlyPrice', 'missing or empty required string field');
  }

  if (!isNonEmptyString(data.externalUrl)) {
    fail(file, 'externalUrl', 'missing or empty required string field');
  }

  if (!Array.isArray(data.images) || data.images.length === 0) {
    fail(file, 'images', 'must be a non-empty array of paths');
  } else {
    data.images.forEach((img, i) => {
      if (typeof img !== 'string' || !img.startsWith('/')) {
        fail(file, `images[${i}]`, `must start with "/" — got ${JSON.stringify(img)}`);
      }
    });
  }

  if (data.features !== undefined) {
    if (typeof data.features !== 'object' || data.features === null || Array.isArray(data.features)) {
      fail(file, 'features', 'must be an object');
    } else {
      for (const key of ['bedrooms', 'beds', 'bathrooms', 'guests']) {
        checkNumber(file, `features.${key}`, data.features[key], false);
      }
    }
  }

  checkNumber(file, 'rating', data.rating, false);
  checkNumber(file, 'reviewCount', data.reviewCount, false);
  checkNumber(file, 'order', data.order, true);

  return data;
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

function validateSettings(file, data) {
  if (data === null) return null;

  for (const field of ['phone', 'phoneLabel', 'phoneHref', 'email', 'instagramHandle', 'instagramUrl', 'calendlyUrl']) {
    if (!isNonEmptyString(data[field])) {
      fail(file, field, 'missing or empty required string field');
    }
  }
  checkBilingualField(file, 'location', data.location);

  return data;
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

// The file wraps its array under a "services" key (not a bare top-level
// array) because Decap CMS file collections can only serialize a top-level
// object keyed by field name — never a bare array.
function validateServices(file, data) {
  if (data === null) return [];

  const items = data && typeof data === 'object' && !Array.isArray(data) ? data.services : undefined;

  if (!Array.isArray(items) || items.length === 0) {
    fail(file, 'services', 'must be a non-empty array under a top-level "services" key');
    return [];
  }

  items.forEach((item, i) => {
    checkBilingualField(file, `services[${i}].title`, item.title);
    checkBilingualField(file, `services[${i}].description`, item.description);
  });

  return items;
}

// ---------------------------------------------------------------------------
// Plans
// ---------------------------------------------------------------------------

// The file wraps its array under a "plans" key (not a bare top-level array)
// because Decap CMS file collections can only serialize a top-level object
// keyed by field name — never a bare array.
function validatePlans(file, data) {
  if (data === null) return [];

  const items = data && typeof data === 'object' && !Array.isArray(data) ? data.plans : undefined;

  if (!Array.isArray(items) || items.length === 0) {
    fail(file, 'plans', 'must be a non-empty array under a top-level "plans" key');
    return [];
  }

  items.forEach((item, i) => {
    checkBilingualField(file, `plans[${i}].name`, item.name);
    checkBilingualField(file, `plans[${i}].description`, item.description);
    checkBilingualField(file, `plans[${i}].cta`, item.cta);

    if (!Array.isArray(item.services) || item.services.length === 0) {
      fail(file, `plans[${i}].services`, 'must be a non-empty array of { en, es } items');
    } else {
      item.services.forEach((svc, j) => {
        checkBilingualField(file, `plans[${i}].services[${j}]`, svc);
      });
    }
  });

  return items;
}

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------

// The file wraps its array under a "team" key (not a bare top-level array)
// because Decap CMS file collections can only serialize a top-level object
// keyed by field name — never a bare array.
function validateTeam(file, data) {
  if (data === null) return [];

  const items = data && typeof data === 'object' && !Array.isArray(data) ? data.team : undefined;

  if (!Array.isArray(items) || items.length === 0) {
    fail(file, 'team', 'must be a non-empty array under a top-level "team" key');
    return [];
  }

  items.forEach((item, i) => {
    if (!isNonEmptyString(item.id)) {
      fail(file, `team[${i}].id`, 'missing or empty required string field');
    }
    checkBilingualField(file, `team[${i}].name`, item.name);
    checkBilingualField(file, `team[${i}].role`, item.role);
    checkBilingualField(file, `team[${i}].greeting`, item.greeting);
    checkBilingualField(file, `team[${i}].bio`, item.bio);

    if (!isNonEmptyString(item.photo) || !item.photo.startsWith('/')) {
      fail(file, `team[${i}].photo`, `must be a non-empty path starting with "/" — got ${JSON.stringify(item.photo)}`);
    }
    checkBilingualField(file, `team[${i}].alt`, item.alt);
  });

  return items;
}

// ---------------------------------------------------------------------------
// Load & validate everything
// ---------------------------------------------------------------------------

const propertiesDir = path.join(CONTENT_DIR, 'properties');
const propertyFiles = existsSync(propertiesDir)
  ? readdirSync(propertiesDir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => path.join(propertiesDir, f))
  : [];

if (propertyFiles.length === 0) {
  fail(propertiesDir, '(directory)', 'no property JSON files found');
}

const properties = propertyFiles
  .map((file) => validateProperty(file, readJson(file)))
  .filter(Boolean);

const settingsFile = path.join(CONTENT_DIR, 'settings.json');
const settings = validateSettings(settingsFile, readJson(settingsFile));

const servicesFile = path.join(CONTENT_DIR, 'services.json');
const services = validateServices(servicesFile, readJson(servicesFile));

const plansFile = path.join(CONTENT_DIR, 'plans.json');
const plans = validatePlans(plansFile, readJson(plansFile));

const teamFile = path.join(CONTENT_DIR, 'team.json');
const team = validateTeam(teamFile, readJson(teamFile));

if (errors.length > 0) {
  console.error('\nContent validation failed:\n');
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} error(s) found in content/. Fix the above and re-run.\n`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Sort properties by order, then id
// ---------------------------------------------------------------------------

properties.sort((a, b) => {
  if (a.order !== b.order) return a.order - b.order;
  return a.id.localeCompare(b.id);
});

// ---------------------------------------------------------------------------
// Emit lib/content.generated.ts
// ---------------------------------------------------------------------------

function ts(value) {
  return JSON.stringify(value, null, 2);
}

const banner = `/**
 * AUTO-GENERATED FILE — DO NOT EDIT BY HAND.
 *
 * Generated by scripts/build-content.mjs from the JSON files under content/
 * (including content/properties/).
 * Run \`pnpm build:content\` to regenerate after editing content/.
 * Any manual edits here will be overwritten.
 */
`;

const output = `${banner}
export interface GeneratedBilingualText {
  en: string;
  es: string;
}

export type GeneratedAccommodationType =
  | 'entire_home'
  | 'apartment'
  | 'private_room'
  | 'shared_room'
  | 'condo';

export type GeneratedExternalPlatform = 'airbnb' | 'booking' | 'vrbo' | 'other';

export interface GeneratedProperty {
  id: string;
  name: GeneratedBilingualText;
  description: GeneratedBilingualText;
  accommodationType: GeneratedAccommodationType;
  location: GeneratedBilingualText;
  monthlyPrice: string;
  priceNotes?: GeneratedBilingualText;
  images: string[];
  externalUrl: string;
  externalPlatform: GeneratedExternalPlatform;
  features?: {
    bedrooms?: number;
    beds?: number;
    bathrooms?: number;
    guests?: number;
  };
  rating?: number;
  reviewCount?: number;
}

export interface GeneratedSettings {
  phone: string;
  phoneLabel: string;
  phoneHref: string;
  email: string;
  instagramHandle: string;
  instagramUrl: string;
  calendlyUrl: string;
  location: GeneratedBilingualText;
}

export interface GeneratedServiceItem {
  title: GeneratedBilingualText;
  description: GeneratedBilingualText;
}

export interface GeneratedPlanItem {
  name: GeneratedBilingualText;
  description: GeneratedBilingualText;
  services: GeneratedBilingualText[];
  cta: GeneratedBilingualText;
}

export interface GeneratedTeamMember {
  id: string;
  name: GeneratedBilingualText;
  role: GeneratedBilingualText;
  greeting: GeneratedBilingualText;
  bio: GeneratedBilingualText;
  photo: string;
  alt: GeneratedBilingualText;
}

export const properties: GeneratedProperty[] = ${ts(
    properties.map((property) => {
      const withoutOrder = { ...property };
      delete withoutOrder.order;
      return withoutOrder;
    })
  )};

export const settings: GeneratedSettings = ${ts(settings)};

export const services: GeneratedServiceItem[] = ${ts(services)};

export const plans: GeneratedPlanItem[] = ${ts(plans)};

export const team: GeneratedTeamMember[] = ${ts(team)};
`;

writeFileSync(OUTPUT_FILE, output, 'utf8');
console.log(`Content built: ${path.relative(ROOT, OUTPUT_FILE)}`);
console.log(
  `  properties: ${properties.length}, services: ${services.length}, plans: ${plans.length}, team: ${team.length}`
);
