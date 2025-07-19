import { error } from '@sveltejs/kit';
import { posts } from '$lib/posts';

export function load({ params }) {
	const post = posts.find((p) => p.slug === params.slug);
	if (!post) throw error(404, 'Post not found');

	const Content = post.module?.default;
	if (!Content) throw error(404, 'Component missing in module');

	return {
		component: Content,
		post
	};
}
