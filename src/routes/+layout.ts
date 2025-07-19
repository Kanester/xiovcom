import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

injectAnalytics({ mode: dev ? 'development' : 'production' });
injectSpeedInsights();
if (dev && typeof window !== 'undefined') import('eruda').then((res) => res.init());

export const load = () => {
	return {
		meta: {
			title: "XiövCom | Kiö's Workspace",
			desc: "Explore my digital workspace — Kiö's Workspace"
		}
	};
};
