<template>
  asd
  <q-btn
    @click="handleClick"
  >Sign In</q-btn>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'ForumTest',
  setup() {
    return {};
  },
  methods: {
    handleClick() {
      console.log('clicked');
    },
  },
});
</script>
