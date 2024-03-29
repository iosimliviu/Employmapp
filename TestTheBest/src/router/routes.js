const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/HomePage.vue'), name: "HomePage" },
			{ path: '/details', component: () => import('pages/DetailsPage.vue') },
			{ path: '/landing', component: () => import('pages/LandingPage.vue') }
		]
	},
	{
		path: '/test',
		component: () => import('layouts/TestLayout.vue'),
		children: [
			{ path: '/test', component: () => import('pages/Test.vue') },
		]
	},
	{
		path: '/login',
		component: () => import('layouts/AuthLayout.vue'),
		children: [{ path: '', component: () => import('pages/LoginPage.vue'), name: "LoginPage" }]
	},
	{
		path: '/admin',
		component: () => import('layouts/AdminLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/AdminHomePage.vue') },
			{ path: '/create', component: () => import('pages/CreateTest.vue') },
			{ path: '/adminTests', component: () => import('pages/adminTests.vue') },
			{ path: '/observers', component: () => import('pages/AdminObserver.vue') }
		]
	},
	{
		path: '/observer',
		component: () => import('layouts/ObserverLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/AdminHomePage.vue') },
			{ path: '/create', component: () => import('pages/CreateTest.vue') },
			{ path: '/adminTests', component: () => import('pages/adminTests.vue') }
		]
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
