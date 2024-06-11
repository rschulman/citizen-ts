<script setup lang="ts">
import { ref } from 'vue';
import type { CommentModel } from '../types/types.js';
import Comment from "./Comment.vue";
import CommentModal from "./CommentModal.vue";

const modalOpen = ref(false);

const comment_list = ref<Array<CommentModel>>([{
    id: 0,
    title: "Strawberry rhubarb 4 lyfe",
    author: "Smart Guy",
    content: "I recognize that there are differences of opinion here, and I completely respect my friends that prefer other types of pie. With that said, strawberry rhubarb is obviously the superior type of pie.",
    agreeq: 8.5,
    thoughtfulness: [7.0],
}, {
    id: 1,
    title: "Apple pie is clearly superior",
    author: "Apple Man",
    content: "I love apple pie.",
    agreeq: 2.2,
    thoughtfulness: [5.0],
}]);

function average(things: [number]): number {
    return things.reduce((accumulator, current) => accumulator + current, 0.0)/things.length;
}

function addComment() {
    modalOpen.value = true;
}

function closeModal() {
    modalOpen.value = false;
}

function newCommentCallback(newComment: CommentModel) {
    closeModal();
    comment_list.value.push(newComment);
}

</script>

<template>
    <div class="article">
    <h1>Scientists Show Strawberry Rhubarb Pie Eaters Happier in Life</h1>
    <h3>By Ross Schulman</h3>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae elementum curabitur vitae nunc sed velit dignissim. Ultrices tincidunt arcu non sodales neque sodales ut. Convallis convallis tellus id interdum velit laoreet. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor. Diam quam nulla porttitor massa id. Lectus quam id leo in vitae turpis. Facilisis leo vel fringilla est ullamcorper eget. Varius vel pharetra vel turpis nunc eget lorem. Etiam erat velit scelerisque in dictum non consectetur. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Scelerisque felis imperdiet proin fermentum leo. Ornare arcu odio ut sem nulla pharetra. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Fermentum odio eu feugiat pretium nibh ipsum consequat. Mollis aliquam ut porttitor leo a diam sollicitudin tempor. Massa eget egestas purus viverra accumsan in nisl. Viverra mauris in aliquam sem fringilla ut.</p>

<p>Nibh mauris cursus mattis molestie. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui. Risus feugiat in ante metus dictum at tempor. A erat nam at lectus urna duis convallis. Purus ut faucibus pulvinar elementum integer enim neque volutpat. Auctor augue mauris augue neque gravida in fermentum. Rhoncus dolor purus non enim praesent elementum facilisis leo. Risus nullam eget felis eget nunc. Sit amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus. Ac ut consequat semper viverra. Nulla pharetra diam sit amet nisl. Condimentum id venenatis a condimentum vitae sapien. Ultricies tristique nulla aliquet enim tortor at. Rhoncus dolor purus non enim praesent elementum facilisis leo. Risus viverra adipiscing at in tellus integer.</p>

<p>Suspendisse interdum consectetur libero id faucibus. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. Arcu ac tortor dignissim convallis aenean et tortor at risus. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Tellus pellentesque eu tincidunt tortor aliquam. Consectetur adipiscing elit ut aliquam purus. Euismod lacinia at quis risus sed vulputate odio ut. Feugiat in ante metus dictum at tempor. Morbi quis commodo odio aenean sed adipiscing diam. Sociis natoque penatibus et magnis dis pturient montes nascetur.</p>

<p>Felis donec et odio pellentesque diam volutpat commodo. In pellentesque massa placerat duis. Magna etiam tempor orci eu lobortis elementum. Viverra nam libero justo laoreet sit amet. Egestas pretium aenean pharetra magna. Odio ut enim blandit volutpat maecenas volutpat blandit. Cras ornare arcu dui vivamus. Proin nibh nisl condimentum id venenatis a condimentum vitae. Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque.</p>
</div>
<div class="comment-container">
    Some thoughtful comments from your (virtual) neighbors:
<template v-for="comment in comment_list">
    <div class="comment" v-if="average(comment.thoughtfulness) >= 5.0">
        <Comment :comment="comment" />
    </div>
</template>
<button @click="addComment()">Add Comment...</button>
</div>
<CommentModal :isOpen="modalOpen" :comment_list="comment_list" @cancel="closeModal" @submit="newCommentCallback" name="comment-modal"></CommentModal>
</template>