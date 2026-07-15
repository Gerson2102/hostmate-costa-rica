import { LanguageProvider } from '@/lib/LanguageContext';
import { HomePage } from '@/components/HomePage';

export default function Home() {
  return (
    <LanguageProvider initialLanguage="en">
      <HomePage />
    </LanguageProvider>
  );
}
