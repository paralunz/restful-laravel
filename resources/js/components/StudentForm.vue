<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    student: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(['save', 'cancel']);

const form = ref({
    student_number: '',
    name: '',
    course: '',
    section: '',
    year_level: '',
});

watch(
    () => props.student,
    (student) => {
        form.value = {
            student_number: student?.student_number ?? '',
            name: student?.name ?? '',
            course: student?.course ?? '',
            section: student?.section ?? '',
            year_level: student?.year_level ?? '',
        };
    },
    { immediate: true },
);

const submitForm = () => {
    emit('save', {
        ...form.value,
        year_level: Number(form.value.year_level),
    });
};
</script>

<template>
    <div class="card shadow-sm mb-4">
        <div class="card-body">
            <h5 class="fw-bold mb-4">
                {{ student ? 'Edit Student' : 'Add New Student' }}
            </h5>

            <form @submit.prevent="submitForm">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Student Number</label>
                        <input
                            v-model="form.student_number"
                            type="text"
                            class="form-control"
                            placeholder="Enter student number"
                            required
                        />
                    </div>

                    <div class="col-md-6 mb-3">
                        <label class="form-label">Full Name</label>
                        <input
                            v-model="form.name"
                            type="text"
                            class="form-control"
                            placeholder="Enter full name"
                            required
                        />
                    </div>

                    <div class="col-md-6 mb-3">
                        <label class="form-label">Course</label>
                        <input
                            v-model="form.course"
                            type="text"
                            class="form-control"
                            placeholder="Enter course"
                            required
                        />
                    </div>

                    <div class="col-md-6 mb-3">
                        <label class="form-label">Section</label>
                        <input
                            v-model="form.section"
                            type="text"
                            class="form-control"
                            placeholder="Enter section"
                            required
                        />
                    </div>

                    <div class="col-md-6 mb-3">
                        <label class="form-label">Year Level</label>
                        <input
                            v-model="form.year_level"
                            type="number"
                            min="1"
                            max="6"
                            class="form-control"
                            placeholder="Enter year level"
                            required
                        />
                    </div>
                </div>

                <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-primary">
                        {{ student ? 'Update Student' : 'Save Student' }}
                    </button>

                    <button type="button" class="btn btn-secondary" @click="emit('cancel')">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>
