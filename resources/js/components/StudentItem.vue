<script setup>
defineProps({
    student: {
        type: Object,
        required: true,
    },
});

defineEmits(['edit', 'delete']);
</script>

<template>
    <tr>
        <td>{{ student.student_number }}</td>
        <td>{{ student.name }}</td>
        <td>{{ student.course }}</td>
        <td>{{ student.section }}</td>
        <td>{{ student.year_level }}</td>

        <td class="text-end">
            <button class="btn btn-sm btn-warning me-2" @click="$emit('edit')">Edit</button>

            <button class="btn btn-sm btn-danger" @click="$emit('delete')">Delete</button>
        </td>
    </tr>
</template>
