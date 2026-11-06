import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from './services/authService';

import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Students from './pages/Students.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, meta: { guest: true } },
    { path: '/register', component: Register, meta: { guest: true } },
    { path: '/students', component: Students, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    if (to.meta.requiresAuth && !isAuthenticated.value) {
        return '/login';
    }

    if (to.meta.guest && isAuthenticated.value) {
        return '/students';
    }
});

export default router;
