<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { logout, isAdmin } from '../services/authService';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../services/studentService';

import Alert from '../components/Alert.vue';
import StudentTable from '../components/students/StudentTable.vue';
import StudentModal from '../components/students/StudentModal.vue';

//
// Router and authentication
const router = useRouter();
const admin = computed(() => isAdmin());

const handleLogout = async () => {
    await logout();
    router.push('/login');
};

// Student list
const students = ref([]);
const loading = ref(false);
const error = ref('');

const loadStudents = async () => {
    loading.value = true;
    error.value = '';

    try {
        const { data } = await getStudents();
        students.value = data.data ?? data;
    } catch (err) {
        error.value = err.response?.data?.message || 'Failed to load students.';
    } finally {
        loading.value = false;
    }
};

// Student form
const yearOptions = [
    { label: '1st Year', value: 1 },
    { label: '2nd Year', value: 2 },
    { label: '3rd Year', value: 3 },
    { label: '4th Year', value: 4 },
];

const emptyForm = () => ({
    student_number: '',
    name: '',
    course: '',
    section: '',
    year_level: 1,
});

const showModal = ref(false);
const editingId = ref(null);
const form = ref(emptyForm());

const saving = ref(false);
const formError = ref('');
const errors = ref({});

const resetFeedback = () => {
    formError.value = '';
    errors.value = {};
};

const openCreate = () => {
    editingId.value = null;
    form.value = emptyForm();

    resetFeedback();
    showModal.value = true;
};

const openEdit = (student) => {
    editingId.value = student.id;

    form.value = {
        student_number: student.student_number,
        name: student.name,
        course: student.course,
        section: student.section,
        year_level: student.year_level,
    };

    resetFeedback();
    showModal.value = true;
};

const closeModal = () => {
    if (saving.value) return;

    showModal.value = false;
};

const save = async () => {
    saving.value = true;
    resetFeedback();

    const payload = {
        ...form.value,
        year_level: Number(form.value.year_level),
    };

    try {
        if (editingId.value) {
            await updateStudent(editingId.value, payload);
        } else {
            await createStudent(payload);
        }

        showModal.value = false;
        await loadStudents();
    } catch (err) {
        if (err.response?.status === 422) {
            errors.value = err.response.data.errors || {};
        } else {
            formError.value = err.response?.data?.message || 'Failed to save student.';
        }
    } finally {
        saving.value = false;
    }
};

// Delete student
const remove = async (student) => {
    if (!confirm(`Delete ${student.name}?`)) return;

    error.value = '';

    try {
        await deleteStudent(student.id);
        await loadStudents();
    } catch (err) {
        error.value = err.response?.data?.message || 'Failed to delete student.';
    }
};

onMounted(loadStudents);
</script>

<template>
    <div class="container py-4">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h1 class="h2 fw-semibold mb-0">Students</h1>

            <div v-if="user" class="d-flex align-items-center gap-3">
                <span class="text-secondary">{{ user.name }}</span>

                <span class="badge" :class="admin ? 'bg-danger' : 'bg-secondary'">
                    {{ user.role }}
                </span>

                <button class="btn btn-danger" @click="handleLogout">Logout</button>
            </div>
        </div>

        <!-- Student Records -->
        <div class="card shadow-sm">
            <!-- Card Header -->
            <div class="card-header bg-white py-3">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div>
                        <h5 class="fw-semibold mb-1">Student Records</h5>

                        <small class="text-muted"> {{ students.length }} student(s) </small>
                    </div>

                    <button v-if="admin" class="btn btn-primary" @click="openCreate">+ Add Student</button>
                </div>
            </div>

            <!-- Card Body -->
            <div class="card-body p-0">
                <div v-if="error" class="p-3 pb-0">
                    <Alert :message="error" />
                </div>

                <StudentTable
                    :students="students"
                    :loading="loading"
                    :admin="admin"
                    @edit="openEdit"
                    @delete="remove"
                />
            </div>
        </div>

        <!-- Modal -->
        <StudentModal
            :show="showModal && admin"
            :editing-id="editingId"
            :form="form"
            :saving="saving"
            :form-error="formError"
            :errors="errors"
            :year-options="yearOptions"
            @close="closeModal"
            @save="save"
        />
    </div>
</template>
