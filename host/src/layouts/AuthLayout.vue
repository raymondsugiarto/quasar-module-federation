<template>
  <q-layout view="lHh lpr lff">
    <q-page-container >
      <transition
        name="fade-transform"
        mode="out-in"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
// import RootLayout from './RootLayout'
// import { Logger } from '@/utils/logger'
// import { TOKEN_KEY } from '@/utils/constants'
// import { colors } from 'quasar'
export default {
  name: 'AuthLayout',
  // mixins: [RootLayout],
  data () {
    return {
      tag: 'AuthLayout'
    }
  },
  // computed: {
  //   key () {
  //     return this.$route.fullPath
  //   }
  // },
  // created () {
  //   if (process.env.CLIENT && process.env.TEMPLATE === 'A') {
  //     // destructuring to keep only what is needed
  //     const { setBrand } = colors
  //     setBrand('primary', '#286BD6')
  //     setBrand('white', '#FFFFFF')
  //     setBrand('gray', '#E5E5E5')
  //     setBrand('text-primary', '#555555')
  //     setBrand('text-hint', '#888888')
  //   }
  // },
  // mounted () {
  //   Logger.debug('authlayout created')()
  //   const isAuthenticate = this.$q.cookies.get(TOKEN_KEY)
  //   if (isAuthenticate) {
  //     this.$router.replace('/home')
  //   }
  // }
}
</script>

<style scoped lang="scss">
</style>
