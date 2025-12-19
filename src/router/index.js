import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import HomeView from '@/views/HomeView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import TestView from '@/views/TestView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'

const routes = [
    {
        path: '/',
        component: AuthLayout,
        children: [
            { path: '', name: 'Login', component: LoginView },
            { path: 'signup', name: 'Signup', component: SignupView },
            { path: 'forgot-password', name: 'ForgotPassword', component: ForgotPasswordView },
            { path: 'reset-password', name: 'ResetPassword', component: ResetPasswordView },
            { path: 'test', name: 'Test', component: TestView },
        ]
    },
    {
        path: '/home',
        component: DefaultLayout,
        children: [
            { path: '', name: 'Home', component: HomeView },
        ]
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
