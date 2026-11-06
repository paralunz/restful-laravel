<script setup>
import { useRouter } from 'vue-router';
import { logout, user } from '../services/authService';

const router = useRouter();

const handleLogout = async () => {
    await logout();
    router.push('/login');
};
</script>

<template>
    <div class="container py-4">
        <div class="d-flex justify-content-between align-items-center">
            <h1>Students</h1>

            <div class="d-flex align-items-center gap-3">
                <template v-if="user">
                    <span>{{ user.name }}</span>
                    <span class="badge bg-secondary text-capitalize">{{ user.role }}</span>
                </template>

                <button class="btn btn-danger" @click="handleLogout">Logout</button>
            </div>
        </div>
    </div>
</template>
