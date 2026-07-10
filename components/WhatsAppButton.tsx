import Link from 'next/link';

export function WhatsAppButton() {
  return (
    <Link href="https://wa.me/972595118973" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-500">
      <span className="text-lg">💬</span>
      WhatsApp
    </Link>
  );
}
