<template>
  <div class="sign-in">
    <div class="row justify-center">
      <div class="col-4 col-md-4 col-xs-12 bg-white sign-in_left" :class="$q.screen.gt.sm ? 'fixed-center' : ''">
        <div class="row justify-center sign-in_left_content items-center">
          <div class="col-8 col-md-8 col-xs-12">
            <div class="q-mb-md">
              <img src=""/>
              <div class="text-subtitle1 text-bold text-capitalize">{{ $t('welcomeBack')}}</div>
              <div class="text-subtitle2 text-grey-6">{{ $t('auth.pleaseInputPhoneEmail') }}</div>
            </div>
            <div class="sign-in_left_content_form">
              <div class="text-subtitle2">{{ $t('auth.phoneNumber') }}</div>
              <div class="row align-center q-col-gutter-x-sm q-pb-md">
                <dropdown-countries v-model="country" />
                <q-input
                  placeholder="Masukkan nomor telepon"
                  outlined
                  v-model="phoneNumber"
                  @keypress="handleKeypressPhoneNumber"
                  :rules="[value => validPhoneNumber]"
                  lazy-rules
                  class="sign-in_left_content_form_phone-number col q-pb-none"
                />
              </div>
              <div class="text-subtitle2">{{ $t('auth.kataSandi') }}</div>
              <q-input
                :placeholder="$t('auth.placeholderPassword')"
                class="q-mb-md q-pb-none"
                bottom-slots
                outlined
                v-model="password"
                :type="isPassword ? 'password' : 'text'"
                :rules="[
                val => val.length >= 8 || $t('auth.kataSandiMinLength')
                ]"
                @keyup.enter="handleClickSignIn"
              >
                <template v-slot:append>
                    <q-icon
                      :name="isPassword ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPassword = !isPassword"
                    />
                </template>
              </q-input>
              <div class="text-right">
                <a style="text-decoration: none" class="text-grey-6 text-caption text-capitalize" href='/forgot-password'>
                  {{ $t('auth.forgotPassword' )}}
                </a>
              </div>
              <q-btn
                unelevated
                :disable="!validLogin"
                :loading="loading"
                :label="$t('auth.signInButton')"
                class="q-mt-md full-width q-py-sm text-black"
                color="primary"
                @click="handleClickSignIn"
                type="button"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </div>
            <!-- <div class="text-center text-grey-6 text-caption q-my-lg" v-if="showButtonLoginOther">{{ $t('auth.orSignInWith') }}</div> -->
            <!-- <div class="sign-in-with" v-if="showButtonLoginOther">
              <div class="fb-login-button" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-width="">
              </div>
              <sign-in-with-facebook v-if="haveAccessSignInWithFb"/>
              <sign-in-with-google v-if="haveAccessSignInWithGmail"/>
            </div> -->
            <div class="text-center text-caption text-grey-6 q-my-xl">
              {{ $t('auth.dontHaveAccount')}}
              <a class="text-primary" href="/sign-up">{{ $t('auth.signUpNow') }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
    <!-- <q-img src="img-register.svg" class="sign-in_bg"/> -->
        <!-- <sign-in-dialog-message :showModal="showModal" /> -->
      </div>
    </div>
  </div>
</template>

<script>
// import { Logger } from '@/utils/logger'
// import { menuKey } from '@/utils/const/menu_key'
// import { events } from '@/utils/constants'
// import { mapGetters } from 'vuex'
// import { hasPermission } from '@/utils/permission'
// import redirect from '@mixins/account/redirect.js'
import DropdownCountries from '../Dropdown/DropdownCountries.vue'
export default {
  name: 'SignIn',
  // mixins: [ redirect ],
  components: {
    DropdownCountries,
    // SignInDialogMessage: () => import('./SignInDialogMessage')
  },
  data () {
    return {
      country: {
        label: '+62',
        value: 'ID',
        name: 'indonesia'
      },
      phoneNumber: '',
      password: '',
      loading: false,
      showModal: false,
      isPassword: true
    }
  },
  computed: {
    // ...mapGetters({
    //   getIsLoaded: 'account/getIsLoaded',
    //   appAccess: 'apps/getAppAccess'
    // }),
    // haveAccessSignInWithFb () {
    //   return hasPermission(this.appAccess, menuKey.SIGN_IN_WITH_FB)
    // },
    // haveAccessSignInWithGmail () {
    //   return hasPermission(this.appAccess, menuKey.SIGN_IN_WITH_GMAIL)
    // },
    // showButtonLoginOther () {
    //   if (!this.haveAccessSignInWithFb && !this.haveAccessSignInWithGmail) {
    //     return false
    //   }
    //   return process.env.X_ORIGIN !== 'https://icommunity.id'
    // },
    // showButtonSignUp () {
    //   return process.env.X_ORIGIN !== 'https://icommunity.id'
    // }@click() {
    //   if (process.env.X_ORIGIN === 'https://icommunity.id') {
    //     return this.queryTargetUrl ? `https://reg.icommunity.id?${this.queryTargetUrl}` : 'https://reg.icommunity.id/'
    //   }
    //   return this.queryTargetUrl ? `/sign-up?${this.queryTargetUrl}` : '/sign-up'
    // },
    validLogin () {
      let valid = true
      if (this.password.length === 0 || this.password.length < 8 || this.phoneNumber.length === 0 || this.phoneNumber.length > 13 || this.phoneNumber.charAt(0) === '0' || this.phoneNumber.length < 8) {
        valid = false
      }
      return valid
    },
    validPhoneNumber () {
      let valid = true
      if (this.phoneNumber.length === 0) {
        valid = false
        return this.$t('auth.phoneNumberRequired')
      } else if (this.phoneNumber.length < 8) {
        valid = false
        return this.$t('auth.minEightDigits')
      } else if (this.phoneNumber.length > 13) {
        valid = false
        return this.$t('auth.maxThirteenDigits')
      } else if (this.phoneNumber.charAt(0) === '0') {
        return this.$t('auth.beginWithZero')
      }
      return valid
    }
  },
  methods: {
    handleKeypressPhoneNumber (evt) {
      var letters = /^[0-9]+$/
      var excludeZero = /^(?!0*(\.0+)?$)(\d+|\d*\.\d+)$/
      if (evt.key.match(letters) || evt.key.match(excludeZero)) {
        return true
      } else {
        evt.preventDefault()
      }
    },
    async handleClickSignIn () {
      // if (this.validLogin) {
      //   this.loading = true
      //   const params = {
      //     username: this.phoneNumber,
      //     password: this.password,
      //     countryCode: this.country.value
      //   }
      //   // Logger.info('SignIn params: ', params)()
      //   await this.$store.dispatch('auth/signIn', {
      //     params,
      //     onSuccess: () => {
      //       let redirectUrl = '/redirect/home?f=1'

      //       if (this.getDecryptedTargetUrl) {
      //         redirectUrl = this.getDecryptedTargetUrl
      //       }

      //       this.loading = false
      //       window.location.replace(redirectUrl)
      //     },
      //     onFail: (error) => {
      //       this.loading = false
      //       Logger.error('SignIn error: ', error)()
      //       if (error.message === 'accountRegistrationNotApproved') {
      //         this.showModal = true
      //       } else {
      //         this.$publish(events.AUTH_DIALOG_ERROR, error)
      //       }
      //     }
      //   })
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-in {
  &_left {
    border-radius: 30px;
    height: auto;
    @media (max-width: $breakpoint-sm) {
      position: absolute;
      bottom: 0;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      padding: 5% 10%;
    }

    &_content {
       @media (max-width: $breakpoint-sm) {
         height: 80vh;
       }
      &_form {
        &_phone-number {
          flex-grow: 1;
        }
        &_ind {
          background-color: #FFFFFF;
          border: 1px solid #F6F7FC;
          border-radius: 4px;
          width: 30px;
          height: 21px;
          &_red {
            background-color: #CA0728;
            border-radius: 4px 4px 0 0;
            width: 30px;
            height: 11px;
          }
        }
      }
    }
  }
}
</style>
