<script setup>
defineProps({
    students: {
        type: Array,
        default: () => [],
    },
    loading: {
        type: Boolean,
        default: false,
    },
    admin: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['edit', 'delete']);
</script>

<template>
    <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
                <tr>
                    <th class="px-3 py-3">Student No.</th>
                    <th class="py-3">Name</th>
                    <th class="py-3">Course</th>
                    <th class="py-3">Section</th>
                    <th class="py-3">Year Level</th>
                    <th v-if="admin" class="text-end px-3 py-3">Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-if="loading && !students.length">
                    <td :colspan="admin ? 6 : 5" class="text-center text-muted py-5">Loading...</td>
                </tr>

                <tr v-else-if="!students.length">
                    <td :colspan="admin ? 6 : 5" class="text-center text-muted py-5">No students yet.</td>
                </tr>

                <tr v-for="student in students" :key="student.id">
                    <td class="px-3">
                        {{ student.student_number }}
                    </td>

                    <td>{{ student.name }}</td>
                    <td>{{ student.course }}</td>
                    <td>{{ student.section }}</td>
                    <td>{{ student.year_level }}</td>

                    <td v-if="admin" class="text-end px-3">
                        <button class="btn btn-sm btn-outline-primary me-1" @click="emit('edit', student)">Edit</button>

                        <button class="btn btn-sm btn-outline-danger" @click="emit('delete', student)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
