<script setup lang="ts">
import { ref } from 'vue';
import { EmitType } from '../types/types';
import { CommentModel, ModalReturn } from '../types/types';

const props = defineProps<{
    comment: CommentModel
}>();

const emit = defineEmits<{
    valueemit: [ModalReturn]
}>();

const thoughtfulness = ref<number>(0.0);

console.log(props);

</script>

<template>
    <div>Before you leave your comment, some of your neighbors have found this comment thoughtful. Would you agree?
    <div class="disagree"><span class="title">{{ props.comment.title }}</span><br/>
    {{ props.comment.content }}</div>
    <div>Not Thoughtful <input type="range" min="0" max="10" step="0.1" v-model.number="thoughtfulness"> Very Thoughtful</div>
    <button @click="$emit('valueemit', {emit_type: EmitType.Disagree, payload: {response: thoughtfulness, id: props.comment.id}})">Continue...</button>
    <br/>
    <span class="reminder">Remember, we want to know whether this comment is thoughtful, not necessarily whether you agree with it...</span>
</div>
</template>