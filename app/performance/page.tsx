'use client';

// import * as Sentry from '@sentry/nextjs';
import { captureException, startSpan } from '@sentry/nextjs';
import { useState } from 'react';

export default function PerformancePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const simulateSlowOperation = async () => {
    setLoading(true);
    const startTime = Date.now();

    try {
      // Créer une transaction principale
      startSpan(
        {
          name: 'slow-operation',
          op: 'task',
        },
        async () => {
          // Simuler une opération lente
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // Sous-opération: traitement des données
          await startSpan(
            {
              name: 'processing-data',
              op: 'subtask',
            },
            async () => {
              await new Promise((resolve) => setTimeout(resolve, 500));
            }
          );

          // Sous-opération: sauvegarde en base de données
          await startSpan(
            {
              name: 'database-save',
              op: 'db',
            },
            async () => {
              await new Promise((resolve) => setTimeout(resolve, 800));
            }
          );

          const totalDuration = Date.now() - startTime;
          setResult(`Opération terminée avec succès en ${totalDuration}ms`);
        }
      );
    } catch (error) {
      captureException(error);
      setResult('L&apos;opération a échoué');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Monitoring des Performances</h1>

      <div className='p-4 bg-gray-50 rounded'>
        <h2 className='text-xl font-semibold mb-4'>Suivi d&apos;Opération</h2>
        <p className='mb-4'>
          Cliquez sur le bouton ci-dessous pour simuler une opération lente avec
          plusieurs étapes. Ceci créera une transaction Sentry avec des spans
          enfants pour le monitoring des performances.
        </p>

        <button
          onClick={simulateSlowOperation}
          disabled={loading}
          className={`p-4 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading
            ? 'Traitement en cours...'
            : 'Démarrer l&apos;opération lente'}
        </button>

        {result && (
          <div className='mt-4 p-4 bg-gray-100 rounded'>
            <p>{result}</p>
          </div>
        )}
      </div>

      <div className='p-4 bg-gray-50 rounded'>
        <h2 className='text-xl font-semibold mb-2'>
          Ce que vous verrez dans Sentry :
        </h2>
        <ul className='list-disc pl-5 space-y-2'>
          <li>Transaction avec durée et statut</li>
          <li>Spans enfants montrant les différentes étapes</li>
          <li>Métriques de temps de réponse</li>
          <li>Traces d&apos;exécution des opérations</li>
        </ul>
      </div>
    </div>
  );
}
