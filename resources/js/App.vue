<script setup>
import { ref, onMounted } from 'vue';
import api from './api';

import StudentList from './components/StudentList.vue';
import StudentForm from './components/StudentForm.vue';

const students = ref([]);
const selectedStudent = ref(null);

const showForm = ref(false);
const loading = ref(false);

const alert = ref({
    message: '',
    type: 'success',
    errors: [],
});

const showMessage = (message, type = 'success') => {
    alert.value = {
        message,
        type,
        errors: [],
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const showValidationErrors = (errors) => {
    alert.value = {
        message: '',
        type: 'danger',
        errors: Object.values(errors).flat(),
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const clearAlert = () => {
    alert.value = {
        message: '',
        type: 'success',
        errors: [],
    };
};

const fetchStudents = async () => {
    loading.value = true;

    try {
        const response = await api.get('/students');
        students.value = response.data.data ?? response.data;
    } catch (error) {
        showMessage(error.response?.data?.message || 'Failed to load students.', 'danger');
    } finally {
        loading.value = false;
    }
};

const openAddForm = () => {
    clearAlert();
    selectedStudent.value = null;
    showForm.value = true;
};

const openEditForm = (student) => {
    clearAlert();
    selectedStudent.value = { ...student };
    showForm.value = true;
};

const saveStudent = async (studentData) => {
    try {
        clearAlert();

        if (selectedStudent.value) {
            await api.put(`/students/${selectedStudent.value.id}`, studentData);

            showMessage('Student updated successfully!');
        } else {
            await api.post('/students', studentData);

            showMessage('Student added successfully!');
        }

        showForm.value = false;
        selectedStudent.value = null;

        await fetchStudents();
    } catch (error) {
        if (error.response?.status === 422) {
            showValidationErrors(error.response.data.errors);
        } else {
            showMessage(error.response?.data?.message || 'Failed to save student.', 'danger');
        }
    }
};

const deleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
        return;
    }

    try {
        clearAlert();

        await api.delete(`/students/${id}`);

        showMessage('Student deleted successfully!');

        await fetchStudents();
    } catch (error) {
        if (error.response?.status === 422) {
            showValidationErrors(error.response.data.errors);
        } else {
            showMessage(error.response?.data?.message || 'Failed to delete student.', 'danger');
        }
    }
};

onMounted(fetchStudents);
</script>

<template>
    <div class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 class="fw-bold mb-1">Student Management</h2>
                <p class="text-muted mb-0">Manage your student records.</p>
            </div>

            <button v-if="!showForm" class="btn btn-primary" @click="openAddForm">+ Add Student</button>
        </div>

        <!-- General success/error message -->
        <div v-if="alert.message" class="alert" :class="`alert-${alert.type}`" role="alert">
            {{ alert.message }}

            <button type="button" class="btn-close float-end" @click="clearAlert"></button>
        </div>

        <!-- Validation errors -->
        <div v-if="alert.errors.length" class="alert alert-danger" role="alert">
            <h6 class="alert-heading fw-bold">Please check the following errors:</h6>

            <ul class="mb-0">
                <li v-for="(error, index) in alert.errors" :key="index">
                    {{ error }}
                </li>
            </ul>
        </div>

        <StudentForm v-if="showForm" :student="selectedStudent" @save="saveStudent" @cancel="showForm = false" />

        <div v-else class="card shadow-sm">
            <div class="card-body">
                <StudentList :students="students" @edit="openEditForm" @delete="deleteStudent" />
            </div>
        </div>
    </div>
</template>
