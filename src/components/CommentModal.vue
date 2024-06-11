<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';
import { onClickOutside } from '@vueuse/core';
import type { Component } from 'vue';
import type { CommentModel } from '../types/types.js';
import { EmitType } from '../types/types.js';
import type { ModalReturn } from '../types/types.js';
import SentimentQuestion from './SentimentQuestion.vue';
import DisagreeComment from './DisagreeComment.vue';
import WriteComment from './WriteComment.vue';

const props = defineProps<{
    isOpen: boolean, 
    comment_list: Array<CommentModel>,
}>();

const emit = defineEmits<{
    cancel: [],
    submit: [CommentModel]
}>();

const target = ref(null);

var process_index = 0;

const current_stage = shallowRef<Component>(SentimentQuestion);
const current_props = computed(() => {
    // Logic for swapping out the properties handed to the child component of the modal window
    switch (current_stage.value) {
        case SentimentQuestion:
            return {};
            break;
        case DisagreeComment:
            const disagree_comments = props.comment_list.filter((comment) => {
                    if (building_comment.agreeq > 5.0) {
                        if (comment.agreeq <= 5.0) {
                            return true;
                        }
                    } else {
                        if (comment.agreeq >= 5.0) {
                            return true;
                        }
                    }
                    return false;
            });
            if (disagree_comments.length > 0) {
                const comment_index = Math.floor(Math.random() * disagree_comments.length);
                const react_comment = disagree_comments[comment_index];
                return react_comment;
            }
            break;
        case WriteComment:
            return {};
            break;
    }
});

const building_comment: CommentModel = {
    id: props.comment_list.length + 1, // Obviously if we had a real database backend here, the new id would be up to the DB to determine
    title: "",
    author: "",
    content: "",
    agreeq: 0.0,
    thoughtfulness: [5.0],
};

onClickOutside(target, ()=>{
    // Reset the modal progress if the user clicks outside to cancel
    current_stage.value = SentimentQuestion;
    emit('cancel');
});

function gotEmit(n: ModalReturn) {
    // Logic for switching out the content of the modal window depending on the 'state machine' of submitting a comment
    switch (n.emit_type) {
        case EmitType.Sentiment:
            // Record the user's stated sentiment to their in-progress comment
            building_comment.agreeq = n.payload;
            current_stage.value = DisagreeComment;
            break;
        case EmitType.Disagree:
            // Add the user's opinion of the offered opposing comment to the list for averaging
            props.comment_list[n.payload.id].thoughtfulness.push(n.payload.response);
            current_stage.value = WriteComment;
            break;
        case EmitType.CommentContent:
            // Cheating a bit on the typechecking here in the interest of time.
            building_comment.title = n.payload.title;
            building_comment.author = n.payload.author;
            building_comment.content = n.payload.content;
            emit("submit", building_comment);
        default:
            break;
    }
    
}

</script>

<template>
    <div v-if="isOpen" class="mask">
        <div class="modal-wrap">
            <div class="modal-content" ref="target">
                <component :is="current_stage" :comment="current_props" @valueemit="gotEmit"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
    width: 500px;
    margin: 150px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
</style>