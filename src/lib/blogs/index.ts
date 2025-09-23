const files = import.meta.glob('./category/**/*.svx', { eager: true });

export const posts = Object.entries(files)
	.map(([path, module]: any) => {
		const { metadata } = module;

		const slug = path.split('/').pop()?.replace('.svx', '');
		const category = path.split('/').slice(-2, -1)[0];

		return {
			...metadata,
			slug,
			category,
			path,
			module
		};
	})
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
