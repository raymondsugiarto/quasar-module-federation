<template>
  <q-layout view="lHr lpR lFr" v-if="!appLoading">
    <q-page-container>
      <transition name="fade-transform" mode="out-in">
        <router-view :key="routeKey" />
      </transition>
    </q-page-container>
    <!-- <a-complete-profile-dialog v-if="getIsLoaded" /> -->
  </q-layout>
</template>

<script>
// import { events } from '@/utils/constants'
// import upperFirst from 'lodash/upperFirst';
// import colorTemplate from '@mixins/template/color'
// import { mapState, mapGetters } from 'vuex'

export default {
  name: 'DefaultEmptyLayout',
  // mixins: [colorTemplate],
  components: {
    // ACompleteProfileDialog: () => import('@/components/Template/A/Auth/ACompleteProfileDialog')
  },
  // created() {
  //   this.changeColor();
  // },
  computed: {
    // ...mapState({
    //   'isVerified': state => state['isVerified'],
    //   'isLoaded': state => state['isLoaded']
    // }),
    // ...mapGetters({
    //   'isVerified': 'account/getIsVerified',
    //   getDisplayPictureUrl: 'account/getDisplayPictureUrl',
    //   getIsLoaded: 'account/getIsLoaded',
    //   appLoading: 'apps/getLoading'
    // }),
    key() {
      return this.$route.fullPath;
    },
    // template () {
    //   return process.env.TEMPLATE
    // },
    templateLayout() {
      return 'DefaultMainLayout';
    },
    routeKey() {
      return this.$route.fullPath;
    },
  },
};
</script>

<style scoped lang="scss"></style>
