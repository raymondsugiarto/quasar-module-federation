<template>
  <q-page class="flex flex-center">
    <HalloComponent></HalloComponent>
    <q-btn class="btn bg-yellow">hello</q-btn>
  </q-page>
</template>

<script lang="ts">
import {defineAsyncComponent, defineComponent} from 'vue';
export default defineComponent({
  name: 'IndexPage',
  components: {
    HalloComponent: defineAsyncComponent(() => import('remote/HalloComponent'))
  }
});
</script>
