<script setup>
import Input from '../Input.vue';
import Dropdown from '../Dropdown.vue';
import Alert from '../Alert.vue';

defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    editingId: {
        type: [Number, String],
        default: null,
    },
    form: {
        type: Object,
        required: true,
    },
    saving: {
        type: Boolean,
        default: false,
    },
    formError: {
        type: String,
        default: '',
    },
    errors: {
        type: Object,
        default: () => ({}),
    },
    yearOptions: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['close', 'save']);
</script>

<template>
    <template v-if="show">
        <div class="modal fade show d-block" tabindex="-1" @click.self="emit('close')">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <form @submit.prevent="emit('save')">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                {{ editingId ? 'Edit Student' : 'Add Student' }}
                            </h5>

                            <button
                                type="button"
                                class="btn-close"
                                aria-label="Close"
                                :disabled="saving"
                                @click="emit('close')"
                            ></button>
                        </div>

                        <div class="modal-body">
                            <Alert :message="formError" />

                            <Input
                                v-model="form.student_number"
                                label="Student Number"
                                placeholder="e.g. 2024-0001"
                                :error="errors.student_number?.[0]"
                            />

                            <Input
                                v-model="form.name"
                                label="Full Name"
                                placeholder="Enter full name"
                                :error="errors.name?.[0]"
                            />

                            <Input
                                v-model="form.course"
                                label="Course"
                                placeholder="e.g. BSIT"
                                :error="errors.course?.[0]"
                            />

                            <Input
                                v-model="form.section"
                                label="Section"
                                placeholder="e.g. A"
                                :error="errors.section?.[0]"
                            />

                            <Dropdown
                                v-model="form.year_level"
                                label="Year Level"
                                :options="yearOptions"
                                :error="errors.year_level?.[0]"
                            />
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" :disabled="saving" @click="emit('close')">
                                Cancel
                            </button>

                            <button type="submit" class="btn btn-primary" :disabled="saving">
                                {{ saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Student' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal-backdrop fade show"></div>
    </template>
</template>
