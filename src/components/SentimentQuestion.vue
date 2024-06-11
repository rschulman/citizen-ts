<script setup lang="ts">
import { ref } from 'vue';
import { EmitType } from '../types/types';
import { ModalReturn } from '../types/types';

const selected_attitude = ref<number>(0.0);

const emit = defineEmits<{
    valueemit: [ModalReturn]
}>();

</script>

<template>
    <div>
    <div>How much do you agree with the statement "Strawberry rhubarb is the best type of pie"?</div>
    <div>Not at all <input type="range" min="0" max="10" step="0.1" v-model.number="selected_attitude"> Very much</div>
    <button @click="$emit('valueemit', {emit_type: EmitType.Sentiment, payload: selected_attitude})">Continue...</button>
    </div>
</template>