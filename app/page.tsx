'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='space-y-8'>
      <h1 className='text-4xl font-bold'>Sentry Demo Application</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='p-6 border rounded-lg shadow-sm'>
          <h2 className='text-2xl font-semibold mb-4'>Client-Side Errors</h2>
          <p className='mb-4'>
            Démonstration des erreurs côté client avec Sentry, incluant :
          </p>
          <ul className='list-disc pl-5 space-y-2'>
            <li>Erreurs JavaScript non capturées</li>
            <li>Erreurs de rendu React</li>
            <li>Tracking des breadcrumbs</li>
          </ul>
          <Link
            href='/client-errors'
            className='mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Voir la démo
          </Link>
        </div>

        <div className='p-6 border rounded-lg shadow-sm'>
          <h2 className='text-2xl font-semibold mb-4'>Server-Side Errors</h2>
          <p className='mb-4'>
            Démonstration des erreurs côté serveur avec Sentry, incluant :
          </p>
          <ul className='list-disc pl-5 space-y-2'>
            <li>Erreurs API</li>
            <li>Erreurs de rendu serveur</li>
            <li>Contextes d&apos;erreur enrichis</li>
          </ul>
          <Link
            href='/server-errors'
            className='mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Voir la démo
          </Link>
        </div>

        <div className='p-6 border rounded-lg shadow-sm'>
          <h2 className='text-2xl font-semibold mb-4'>
            Performance Monitoring
          </h2>
          <p className='mb-4'>
            Démonstration du monitoring des performances avec Sentry, incluant :
          </p>
          <ul className='list-disc pl-5 space-y-2'>
            <li>Mesures de performance des pages</li>
            <li>Traces des transactions</li>
            <li>Analyse des temps de réponse</li>
          </ul>
          <Link
            href='/performance'
            className='mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Voir la démo
          </Link>
        </div>

        <div className='p-6 border rounded-lg shadow-sm'>
          <h2 className='text-2xl font-semibold mb-4'>User Tracking</h2>
          <p className='mb-4'>
            Démonstration du suivi utilisateur avec Sentry, incluant :
          </p>
          <ul className='list-disc pl-5 space-y-2'>
            <li>Session tracking</li>
            <li>User context</li>
            <li>Custom events</li>
          </ul>
          <Link
            href='/user-tracking'
            className='mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Voir la démo
          </Link>
        </div>
      </div>
    </div>
  );
}
