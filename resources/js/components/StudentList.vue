<script setup>
import StudentItem from './StudentItem.vue';

defineProps({
    students: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['edit', 'delete']);
</script>

<template>
    <div>
        <h5 class="mb-3">Student Records</h5>

        <div v-if="students.length === 0" class="text-center py-5">
            <p class="text-muted mb-0">No student records found.</p>
        </div>

        <div v-else class="table-responsive">
            <table class="table table-hover align-middle">
                <thead class="table-light">
                    <tr>
                        <th>Student Number</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Section</th>
                        <th>Year Level</th>
                        <th class="text-end">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <StudentItem
                        v-for="student in students"
                        :key="student.id"
                        :student="student"
                        @edit="emit('edit', student)"
                        @delete="emit('delete', student.id)"
                    />
                </tbody>
            </table>
        </div>
    </div>
</template>
