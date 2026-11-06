<script setup>
import { ref, onMounted } from 'vue';
import api from './api';

import StudentList from './components/StudentList.vue';
import StudentForm from './components/StudentForm.vue';

const students = ref([]);
const selectedStudent = ref(null);

const showForm = ref(false);
const loading = ref(false);

const message = ref('');
const messageType = ref('success');

const showMessage = (text, type = 'success') => {
    message.value = text;
    messageType.value = type;

    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    selectedStudent.value = null;
    showForm.value = true;
};

const openEditForm = (student) => {
    selectedStudent.value = { ...student };
    showForm.value = true;
};

const saveStudent = async (studentData) => {
    try {
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
        const errors = error.response?.data?.errors;

        if (errors) {
            showMessage(Object.values(errors).flat().join(' '), 'danger');
        } else {
            showMessage(error.response?.data?.message || 'Something went wrong.', 'danger');
        }
    }
};

const deleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
        return;
    }

    try {
        await api.delete(`/students/${id}`);

        showMessage('Student deleted successfully!');

        await fetchStudents();
    } catch (error) {
        showMessage(error.response?.data?.message || 'Failed to delete student.', 'danger');
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

        <div v-if="message" class="alert" :class="`alert-${messageType}`" role="alert">
            {{ message }}

            <button type="button" class="btn-close float-end" @click="message = ''"></button>
        </div>

        <StudentForm v-if="showForm" :student="selectedStudent" @save="saveStudent" @cancel="showForm = false" />

        <div v-else class="card shadow-sm">
            <div class="card-body">
                <div v-if="loading" class="text-center py-5">
                    <div class="spinner-border text-primary"></div>
                    <p class="mt-2 text-muted">Loading students...</p>
                </div>

                <StudentList v-else :students="students" @edit="openEditForm" @delete="deleteStudent" />
            </div>
        </div>
    </div>
</template>
