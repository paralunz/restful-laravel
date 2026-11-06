<script setup>
defineProps({
    type: {
        type: String,
        default: 'button',
    },
    variant: {
        type: String,
        default: 'primary',
    },
    loading: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <button :type="type" class="btn w-100" :class="`btn-${variant}`" :disabled="disabled || loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>

        <slot />
    </button>
</template>
