import * as Sentry from '@sentry/nextjs';

async function getData() {
  try {
    // Simulate a database error
    throw new Error('Database connection failed');
  } catch (error) {
    // Capture the error in Sentry
    Sentry.captureException(error);
    // Return a fallback value instead of throwing
    return { error: 'Database connection failed', fallback: true };
  }
}

export default async function ServerErrorsPage() {
  const data = await getData();

  if (data.fallback) {
    return (
      <div className='p-4 bg-yellow-100 rounded'>
        <h1 className='text-2xl font-bold text-yellow-800'>Database Error</h1>
        <p className='mt-2 text-yellow-700'>
          An error occurred while fetching data. The error has been logged to
          Sentry.
        </p>
        <p className='mt-4 text-sm text-yellow-600'>
          Error details: {data.error}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Data loaded successfully</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
