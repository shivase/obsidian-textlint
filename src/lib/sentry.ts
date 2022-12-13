import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

const DSN =
  'https://2896cd79c49a4fa2b4b33381312e7e15@o4504295771865088.ingest.sentry.io/4504295806402560';

declare const VERSION: string;
declare const PACKAGE_NAME: string;
declare const PRODUCTION: boolean;

Sentry.init({
  dsn: DSN,
  release: `${PACKAGE_NAME}@${VERSION}`,
  environment: PRODUCTION ? 'production' : 'dev',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});
