<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import AuthLayout from '../layouts/AuthLayout.vue';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';
import Alert from '../components/Alert.vue';
import Dropdown from '../components/Dropdown.vue';

import { register, login } from '../services/authService';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const role = ref('user');
const roleOptions = [
    { label: 'Regular User', value: 'user' },
    { label: 'Administrator', value: 'admin' },
];

const loading = ref(false);
const error = ref('');
const errors = ref({});

const handleRegister = async () => {
    loading.value = true;
    error.value = '';
    errors.value = {};

    try {
        await register({
            name: name.value,
            email: email.value,
            password: password.value,
            role: role.value,
        });

        await login({
            email: email.value,
            password: password.value,
        });

        router.push('/students');
    } catch (err) {
        if (err.response?.status === 422) {
            errors.value = err.response.data.errors || {};
        } else {
            error.value = err.response?.data?.message || 'Registration failed. Please try again.';
        }
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <AuthLayout title="Create an account" subtitle="Register to access the student management system.">
        <form @submit.prevent="handleRegister">
            <Alert :message="error" />

            <Input
                v-model="name"
                label="Full Name"
                placeholder="Enter your full name"
                autocomplete="name"
                :error="errors.name?.[0]"
            />

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
                placeholder="Create a password"
                autocomplete="new-password"
                :error="errors.password?.[0]"
            />

            <Dropdown v-model="role" label="Account Type" :options="roleOptions" :error="errors.role?.[0]" />

            <Button type="submit" :loading="loading"> Create Account </Button>
        </form>

        <div class="text-center mt-4">
            <span class="text-muted">Already have an account?</span>
            <router-link to="/login" class="text-decoration-none ms-1"> Sign In </router-link>
        </div>
    </AuthLayout>
</template>
