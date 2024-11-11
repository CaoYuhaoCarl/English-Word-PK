import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Clerk Publishable Key');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={publishableKey}
      appearance={{
        elements: {
          formButtonPrimary: 'bg-primary-600 hover:bg-primary-700',
          headerTitle: 'text-primary-900',
          headerSubtitle: 'text-primary-600',
          socialButtonsBlockButton: 'bg-white hover:bg-gray-50 border border-gray-200',
          socialButtonsBlockButtonText: 'text-gray-600',
          formFieldInput: 'rounded-lg border-gray-200 focus:border-primary-500 focus:ring-primary-500',
          footerActionLink: 'text-primary-600 hover:text-primary-800',
          card: 'rounded-xl shadow-xl border-0',
          rootBox: 'w-full',
          formFieldLabel: 'text-primary-700',
          dividerLine: 'bg-primary-100',
          dividerText: 'text-primary-500',
          identityPreviewText: 'text-primary-700',
          identityPreviewEditButton: 'text-primary-600 hover:text-primary-700',
          formResendCodeLink: 'text-primary-600 hover:text-primary-700',
          formFieldSuccessText: 'text-emerald-600',
          formFieldErrorText: 'text-rose-600',
          formFieldWarningText: 'text-amber-600',
          otpCodeFieldInput: 'border-gray-200 focus:border-primary-500 focus:ring-primary-500',
        },
        layout: {
          socialButtonsPlacement: 'top',
          showOptionalFields: true,
          logoPlacement: 'inside',
        },
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
);