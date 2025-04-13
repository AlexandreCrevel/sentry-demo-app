'use client';

import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';

export default function UserTrackingPage() {
  const [isUserContextSet, setIsUserContextSet] = useState(false);
  const [customEvent, setCustomEvent] = useState(false);

  const handleSetUserContext = () => {
    Sentry.setUser({
      id: '12345',
      username: 'demo_user',
      email: 'demo@example.com',
    });
    setIsUserContextSet(true);
  };

  const handleClearUserContext = () => {
    Sentry.setUser(null);
    setIsUserContextSet(false);
  };

  const handleSendCustomEvent = () => {
    Sentry.captureMessage('User performed a custom action', {
      level: 'info',
      tags: {
        feature: 'user_tracking',
        action: 'custom_event',
      },
      extra: {
        timestamp: new Date().toISOString(),
        browser: navigator.userAgent,
      },
    });
    setCustomEvent(true);
  };

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>User Tracking Demo</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='p-4 bg-gray-50 rounded'>
          <h2 className='text-xl font-semibold mb-4'>User Context</h2>
          <p className='mb-4'>
            Set or clear user context to track user sessions and associate
            errors with specific users.
          </p>

          <div className='space-x-4'>
            <button
              onClick={handleSetUserContext}
              className='p-4 bg-green-500 text-white rounded hover:bg-green-600'
            >
              Set User Context
            </button>
            <button
              onClick={handleClearUserContext}
              className='p-4 bg-red-500 text-white rounded hover:bg-red-600'
            >
              Clear User Context
            </button>
          </div>

          {isUserContextSet && (
            <div className='mt-4 p-4 bg-gray-100 rounded'>
              <p>User context is set</p>
            </div>
          )}
        </div>

        <div className='p-4 bg-gray-50 rounded'>
          <h2 className='text-xl font-semibold mb-4'>Custom Events</h2>
          <p className='mb-4'>
            Send custom events to track specific user actions or application
            states.
          </p>

          <button
            onClick={handleSendCustomEvent}
            className='p-4 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Send Custom Event
          </button>

          {customEvent && (
            <div className='mt-4 p-4 bg-gray-100 rounded'>
              <p>Custom event sent to Sentry</p>
            </div>
          )}
        </div>
      </div>

      <div className='p-4 bg-gray-50 rounded'>
        <h2 className='text-xl font-semibold mb-2'>
          What to expect in Sentry:
        </h2>
        <ul className='list-disc pl-5 space-y-2'>
          <li>User sessions and context in error reports</li>
          <li>Custom events in the events stream</li>
          <li>User-specific error grouping</li>
          <li>Session analytics and user journey tracking</li>
        </ul>
      </div>
    </div>
  );
}
