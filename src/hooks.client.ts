import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import eruda from 'eruda';

injectAnalytics({ mode: dev ? 'development' : 'production' });
injectSpeedInsights();
if (dev) eruda.init();
