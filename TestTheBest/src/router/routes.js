const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/HomePage.vue') },
			{ path: '/test', component: () => import('pages/Test.vue') }
		]
	},
	{
		path: '/login',
		component: () => import('layouts/AuthLayout.vue'),
		children: [ { path: '', component: () => import('pages/LoginPage.vue') } ]
	},
	{
		path: '/admin',
		component: () => import('layouts/AdminLayout.vue'),
		children: [ { path: '', component: () => import('pages/AdminHomePage.vue') } ]
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
