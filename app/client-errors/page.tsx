'use client';

import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';

export default function ClientErrorsPage() {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const triggerUnhandledError = () => {
    // This will trigger an unhandled error
    throw new Error('This is an unhandled client-side error');
  };

  const triggerHandledError = () => {
    try {
      throw new Error('This is a handled client-side error');
    } catch (error) {
      Sentry.captureException(error);
      setErrorMessage('Error captured and sent to Sentry');
    }
  };

  const triggerReactError = () => {
    // This will trigger a React error boundary
    const invalidObject = { value: undefined };
    // @ts-expect-error - This will cause a runtime error
    invalidObject.value.toUpperCase();
  };

  const addBreadcrumb = () => {
    Sentry.addBreadcrumb({
      category: 'user',
      message: 'User clicked the Add Breadcrumb button',
      level: 'info',
      data: {
        timestamp: new Date().toISOString(),
        action: 'button_click',
      },
    });
    setErrorMessage('Breadcrumb added to Sentry');
  };

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Client-Side Errors Demo</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <button
          onClick={triggerUnhandledError}
          className='p-4 bg-red-500 text-white rounded hover:bg-red-600'
        >
          Trigger Unhandled Error
        </button>

        <button
          onClick={triggerHandledError}
          className='p-4 bg-yellow-500 text-white rounded hover:bg-yellow-600'
        >
          Trigger Handled Error
        </button>

        <button
          onClick={triggerReactError}
          className='p-4 bg-purple-500 text-white rounded hover:bg-purple-600'
        >
          Trigger React Error
        </button>

        <button
          onClick={addBreadcrumb}
          className='p-4 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Add Breadcrumb
        </button>
      </div>

      {errorMessage && (
        <div className='p-4 bg-gray-100 rounded'>
          <p>{errorMessage}</p>
        </div>
      )}

      <div className='mt-8 p-4 bg-gray-50 rounded'>
        <h2 className='text-xl font-semibold mb-2'>What to expect:</h2>
        <ul className='list-disc pl-5 space-y-2'>
          <li>Unhandled errors will appear in Sentry automatically</li>
          <li>Handled errors will be captured with additional context</li>
          <li>React errors will trigger error boundaries</li>
          <li>Breadcrumbs will appear in the error timeline</li>
        </ul>
      </div>
    </div>
  );
}
