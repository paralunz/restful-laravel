<script setup>
defineProps({
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        default: '',
    },
    modelValue: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        default: '',
    },
    autocomplete: {
        type: String,
        default: 'off',
    },
});

defineEmits(['update:modelValue']);
</script>

<template>
    <div class="mb-3">
        <label class="form-label">{{ label }}</label>

        <input
            :type="type"
            class="form-control"
            :class="{ 'is-invalid': error }"
            :placeholder="placeholder"
            :value="modelValue"
            :autocomplete="autocomplete"
            :aria-invalid="!!error"
            @input="$emit('update:modelValue', $event.target.value)"
        />

        <div v-if="error" class="invalid-feedback">
            {{ error }}
        </div>
    </div>
</template>
