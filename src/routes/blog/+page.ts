import { posts } from '$lib/posts';

export const load = () => {
	return {
		posts,
		meta: {
			title: 'XiövCom | Blog',
			desc: "Explore the ocean of thoughts and tips — Kiö's Workspace"
		}
	};
};
