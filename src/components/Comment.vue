<script setup lang="ts">
import type { CommentModel } from '../types/types.ts';


const props = defineProps<{
    comment: CommentModel
}>();
console.log(props.comment);
</script>

<template>
    <div>        
        <p>{{ props.comment.title }} by {{ props.comment.author }}</p>
        <p>{{ props.comment.content }}</p>
    </div>
</template>