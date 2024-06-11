<script setup lang="ts">
import { ref } from 'vue';
import { ModalReturn } from '../types/types';
import { EmitType } from '../types/types';

const emit = defineEmits<{
    valueemit: [ModalReturn]
}>();

const author = ref("");
const title = ref("");
const content = ref("");

</script>

<template>
    <div>
        <span class="label">Name:</span> <input placeholder="Your Name..." v-model="author"><br>
        <span class="label">Title:</span> <input placeholder="Title for your comment..." v-model="title"><br>
        <span class="label">&nbsp;</span><textarea placeholder="Your Comment..." v-model="content"></textarea><br/>
        <button @click="$emit('valueemit', {emit_type: EmitType.CommentContent, payload: { author: author, title: title, content: content}})">Submit</button><br/>
        <span class="reminder">Note: Your comment may not appear until your neighbors have rated it as thoughtful.</span>
    </div>
</template>