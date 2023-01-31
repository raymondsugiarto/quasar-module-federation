<template>
  <div class="column no-wrap q-gutter-y-sm q-mx-md q-my-xl items-center">
    <div class="col">
      <div class="text-bold text-h6">{{ $t('restrictedArea.title') }}</div>
    </div>
    <div class="col text-center">
      <div class="text-body text-grey-8">
        {{ $t('restrictedArea.subtitle') }}
      </div>
    </div>
    <div class="col">
      <q-btn
        no-caps
        class="bg-primary text-white text-bold q-mt-sm"
        size="sm"
        :label="$t('restrictedArea.button')"
        @click="(e) => $router.replace('/')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RestrictedArea',
};
</script>
