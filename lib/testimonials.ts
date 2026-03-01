export interface Testimonial {
  name: string;
  country: string;
  review: string;
  language: 'en' | 'es';
  timestamp?: string;
}

// Google Apps Script Web App URL — set after deployment
// IMPORTANT: This must be the /exec URL, not the /dev URL
export const TESTIMONIALS_SCRIPT_URL =
  process.env.NEXT_PUBLIC_TESTIMONIALS_URL || '';

export async function fetchApprovedTestimonials(): Promise<Testimonial[]> {
  if (!TESTIMONIALS_SCRIPT_URL) return [];

  try {
    const res = await fetch(TESTIMONIALS_SCRIPT_URL, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.reviews || [];
  } catch {
    return [];
  }
}

export async function submitTestimonial(
  testimonial: Omit<Testimonial, 'timestamp'> & { email?: string }
): Promise<{ success: boolean; error?: string }> {
  if (!TESTIMONIALS_SCRIPT_URL) {
    return { success: false, error: 'Service unavailable' };
  }

  try {
    // Use text/plain to avoid CORS preflight — Google Apps Script
    // doesn't handle OPTIONS requests. The JSON string is still
    // available in e.postData.contents on the server side.
    const res = await fetch(TESTIMONIALS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(testimonial),
    });

    const data = await res.json();
    return data;
  } catch {
    return { success: false, error: 'Network error' };
  }
}
