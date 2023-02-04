import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'


const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: LandingPage,
			name: 'LandingPage',
		},
		{
			path: '/Authentification',
			component: () => import('../views/Authentification.vue'),
			name: 'Authentification',
		},
		{
			path: '/Accueil',
			component: () => import('../views/Accueil.vue'),
			name: 'Accueil',
		},
		{
			path: '/Creation',
			component: () => import('../views/Creation.vue'),
			name: 'Creation',
		},
		{
			path: '/CreationTerminee',
			component: () => import('../views/CreationTerminee.vue'),
			name: 'CreationTerminee',
		},
		{
			path: '/Vote',
			component: () => import('../views/Vote.vue'),
			name: 'Vote',
		},
		{
			path: '/Historique',
			component: () => import('../views/Historique.vue'),
			name: 'Historique',
		},
		{
			path: '/Parametres',
			component: () => import('../views/Parametres.vue'),
			name: 'Parametres',
		},
	],
})

export default router