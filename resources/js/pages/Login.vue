<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import AuthLayout from '../layouts/AuthLayout.vue';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';
import Alert from '../components/Alert.vue';

import { login } from '../services/authService';

const router = useRouter();

const email = ref('');
const password = ref('');

const loading = ref(false);
const error = ref('');
const errors = ref({});

const handleLogin = async () => {
    loading.value = true;
    error.value = '';
    errors.value = {};

    try {
        const response = await login({
            email: email.value,
            password: password.value,
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        router.push('/students');
    } catch (err) {
        if (err.response?.status === 422) {
            errors.value = err.response.data.errors || {};
        } else {
            error.value = err.response?.data?.message || 'Login failed. Please try again.';
        }
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <AuthLayout title="Welcome back" subtitle="Sign in to access student records.">
        <form @submit.prevent="handleLogin">
            <Alert :message="error" />

            <Input
                v-model="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                autocomplete="email"
                :error="errors.email?.[0]"
            />

            <Input
                v-model="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                autocomplete="current-password"
                :error="errors.password?.[0]"
            />

            <Button type="submit" :loading="loading"> Sign In </Button>
        </form>

        <div class="text-center mt-4">
            <span class="text-muted">Don't have an account?</span>
            <router-link to="/register" class="text-decoration-none ms-1"> Register </router-link>
        </div>
    </AuthLayout>
</template>
