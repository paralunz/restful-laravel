<script setup>
defineProps({
    label: {
        type: String,
        required: true,
    },
    modelValue: {
        type: [String, Number],
        default: '',
    },
    options: {
        type: Array,
        default: () => [],
    },
    placeholder: {
        type: String,
        default: 'Select an option',
    },
    error: {
        type: String,
        default: '',
    },
});

defineEmits(['update:modelValue']);
</script>

<template>
    <div class="mb-3">
        <label class="form-label">{{ label }}</label>

        <select
            class="form-select"
            :class="{ 'is-invalid': error }"
            :value="modelValue"
            :aria-invalid="!!error"
            @change="$emit('update:modelValue', $event.target.value)"
        >
            <option value="" disabled>{{ placeholder }}</option>

            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>

        <div v-if="error" class="invalid-feedback">
            {{ error }}
        </div>
    </div>
</template>
