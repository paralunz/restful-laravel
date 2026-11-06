<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <div class="auth-layout min-vh-100 d-flex align-items-center justify-content-center py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-10 col-md-7 col-lg-5">
                    <div class="text-center mb-4">
                        <h3 class="fw-bold">Student Management</h3>
                        <p class="text-muted">Student Records System</p>
                    </div>

                    <div class="card shadow-sm">
                        <div class="card-body p-4 p-md-5">
                            <h4 class="fw-bold mb-1">{{ title }}</h4>

                            <p class="text-muted mb-4">
                                {{ subtitle }}
                            </p>

                            <slot />
                        </div>
                    </div>

                    <p class="text-center text-muted small mt-4">Student Management System</p>
                </div>
            </div>
        </div>
    </div>
</template>
