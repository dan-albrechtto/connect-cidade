import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'Connect Cidade',
  description: 'Plataforma de mapeamento de problemas urbanos',
};

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8fafc;
    color: #1e293b;
    line-height: 1.5;
  }

  a {
    color: #0891b2;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: 14px;
  }

  input:focus, textarea:focus, select:focus {
    outline: 2px solid #0891b2;
    outline-offset: 2px;
  }

  button {
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s ease;
  }

  button:hover {
    transform: translateY(-2px);
  }

  /* Tailwind classes */
  .min-h-screen { min-height: 100vh; }
  .bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
  .from-blue-50 { --tw-gradient-from: #eff6ff; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(239, 246, 255, 0)); }
  .to-indigo-100 { --tw-gradient-to: #e0e7ff; }
  .from-green-50 { --tw-gradient-from: #f0fdf4; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(240, 253, 244, 0)); }
  .to-emerald-100 { --tw-gradient-to: #d1fae5; }
  .p-4 { padding: 1rem; }
  .p-6 { padding: 1.5rem; }
  .p-8 { padding: 2rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .mb-8 { margin-bottom: 2rem; }
  .mt-6 { margin-top: 1.5rem; }
  .text-center { text-align: center; }
  .text-3xl { font-size: 1.875rem; font-weight: bold; }
  .text-2xl { font-size: 1.5rem; font-weight: bold; }
  .text-lg { font-size: 1.125rem; }
  .font-bold { font-weight: bold; }
  .text-gray-600 { color: #4b5563; }
  .text-gray-700 { color: #374151; }
  .text-gray-800 { color: #1f2937; }
  .text-red-700 { color: #b91c1c; }
  .text-green-700 { color: #15803d; }
  .text-blue-600 { color: #2563eb; }
  .bg-white { background-color: #ffffff; }
  .bg-red-100 { background-color: #fee2e2; }
  .bg-green-100 { background-color: #dcfce7; }
  .bg-yellow-100 { background-color: #fef3c7; }
  .bg-blue-600 { background-color: #2563eb; }
  .bg-red-600 { background-color: #dc2626; }
  .bg-green-600 { background-color: #16a34a; }
  .border { border: 1px solid #e5e7eb; }
  .border-gray-300 { border-color: #d1d5db; }
  .border-red-400 { border-color: #f87171; }
  .border-green-400 { border-color: #4ade80; }
  .border-yellow-400 { border-color: #facc15; }
  .border-l-4 { border-left-width: 4px; }
  .border-blue-500 { border-color: #3b82f6; }
  .rounded { border-radius: 0.25rem; }
  .rounded-lg { border-radius: 0.5rem; }
  .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
  .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
  .w-full { width: 100%; }
  .max-w-md { max-width: 28rem; }
  .max-w-2xl { max-width: 42rem; }
  .max-w-7xl { max-width: 80rem; }
  .mx-auto { margin-left: auto; margin-right: auto; }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .gap-6 { gap: 1.5rem; }
  .space-y-3 > * + * { margin-top: 0.75rem; }
  .space-y-6 > * + * { margin-top: 1.5rem; }
  .pl-4 { padding-left: 1rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .text-sm { font-size: 0.875rem; }
  .hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
  .hover\\:bg-red-700:hover { background-color: #b91c1c; }
  .hover\\:bg-green-700:hover { background-color: #15803d; }
  .disabled\\:opacity-50:disabled { opacity: 0.5; }
  .grid { display: grid; }
  .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .md\\:grid-cols-3 { @media (min-width: 768px) { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
