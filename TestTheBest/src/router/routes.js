const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/Index.vue') },
			{ path: '/test', component: () => import('pages/Test.vue') }
		]
	},
	{
		path: '/login',
		component: () => import('layouts/AuthLayout.vue'),
		children: [ { path: '', component: () => import('pages/LoginPage.vue') } ]
	}
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
	routes.push({
		path: '*',
		component: () => import('pages/Error404.vue')
	});
}

export default routes;
