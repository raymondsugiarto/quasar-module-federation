<template>
  <div class="sign-up-default">
    <div class="row justify-center">
      <div class="col-4 col-md-4 col-xs-12 bg-white sign-up-default_left">
        <div class="row justify-center sign-up-default_left_content items-center" :class="getPosition" :style="this.$q.screen.gt.sm ? 'border-radius: 30px' : ''">
          <div class="col-9 col-md-9 col-xs-12">
            <div class="q-mb-md">
              <img src=""/>
              <div class="text-subtitle1 text-bold">{{ $t('auth.createAccountNow')}}</div>
              <div class="text-subtitle2 text-grey-6">{{ $t('auth.pleaseContinueWith') }}</div>
            </div>
            <div class="sign-up-default_left_content_form">
              <div class="text-caption text-bold">{{ $t('auth.phoneNumber') }}</div>
              <div class="row q-mb-lg">
                <dropdown-countries v-model="country" />
                <q-input
                  @keypress="handleKeypressPhoneNumber"
                  :rules="[ val => validPhoneNumber ]"
                  outlined
                  v-model="phoneNumber"
                  type="number"
                  class="sign-up_left_content_form_phone-number col q-pb-none"
                  lazy-rules
                />
              </div>
              <!-- <div class="bg-white">
                <div class="text-caption text-bold">{{$t('areferral.fullName')}}</div>
                <q-input
                  v-model="firstName" outlined
                  :rules="[val => validFillName]" :placeholder="$t('account.firstName')"
                />
                <q-input
                  v-model="lastName" outlined
                  :rules="[val => validFillName]" :placeholder="$t('account.lastName')"
                />
              </div> -->
              <div class="text-caption text-bold">{{ $t('auth.email') }}</div>
              <q-input
                bottom-slots
                outlined
                v-model="email"
                type="email"
                @keypress="handleNoSpace"
                :rules="[ val => validUserEmail ]"
                lazy-rules />
              <div class="text-caption text-bold">{{ $t('auth.password') }}</div>
              <q-input
                bottom-slots
                outlined
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                :rules="[ val => validPassword ]"
                lazy-rules
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <div class="text-caption text-bold">{{ $t('auth.passwordConfirmation') }}</div>
              <q-input
                bottom-slots
                outlined
                v-model="passwordConfirm"
                :type="isPwd2 ? 'password' : 'text'"
                :rules="[
                  val => val.length >= 6 || $t('auth.passwordMinLength'),
                  val => val == password || $t('auth.passwordNotMatch'),
                ]"
                lazy-rules
                @keyup.enter="handleClickSignUp"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd2 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd2 = !isPwd2"
                  />
                </template>
              </q-input>
              <q-btn
                no-caps
                unelevated
                :disable="!validSignup"
                :loading="loading"
                :label="$t('auth.signUpButton')"
                class="q-mt-md full-width q-py-sm text-black text-bold"
                color="primary"
                @click="handleClickSignUp"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </div>
            <div class="text-center text-grey-7 q-my-lg">
              {{ $t('auth.alreadyHaveAccount')}}
              <a style="text-decoration: none" class="text-primary" href="/sign-in">{{ $t('auth.signInNow') }}</a>
            </div>
            <div class="text-center text-caption text-grey-5 q-mb-sm">
              {{$t('auth.bottomNotes')}}
            </div>
          </div>
        </div>
      </div>
      <div>
        <sign-up-dialog-message :showModal="showModal" @handle-modal="handleModal"/>
      </div>
    </div>
  </div>
</template>

<script>
// import { events } from '@/utils/constants'
// import { Logger } from '@/utils/logger'
import { validateEmail } from '../../utils/validation'
import DropdownCountries from 'components/Dropdown/DropdownCountries.vue'

// import redirect from '@mixins/account/redirect.js'
// import { mapGetters } from 'vuex'

export default {
  name: 'SignUp',
  // mixins: [ redirect ],
  components: {
    DropdownCountries
  },
  data () {
    return {
      country: {
        label: '+62',
        value: 'ID',
        name: 'indonesia'
      },
      phoneNumber: '',
      email: '',
      password: '',
      passwordConfirm: '',
      isPwd: true,
      isPwd2: true,
      loading: false,
      firstName: '',
      lastName: '',
      showModal: false
    }
  },
  computed: {
    // ...mapGetters({
    //   getRegistrationWithApproval: 'apps/getRegistrationWithApproval'
    // }),
    validSignup () {
      let valid = true
      if (this.password.length === 0 || this.password.length < 8 || this.phoneNumber.length === 0 || this.password !== this.passwordConfirm ||
      this.phoneNumber.length > 13 || this.phoneNumber.charAt(0) === '0' || this.phoneNumber.length < 8) {
        valid = false
      }
      return valid
    },
    validFillName () {
      let valid = true
      if (this.firstName.length === 0 || this.firstName === '') {
        valid = false
        return this.$t('auth.nameIsEmpty')
      }
      return valid
    },
    validUserEmail () {
      return validateEmail(this.email)
      // let valid = true
      // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      // if (this.email.length === 0) {
      //   valid = false
      //   return this.$t('validation.emailIsEmpty')
      // } else if (!regex.test(this.email)) {
      //   valid = false
      //   return this.$t('validation.emailInvalid')
      // }
      // return valid
    },
    validPassword () {
      let valid = true
      if (this.password.length === 0) {
        valid = false
        return this.$t('auth.passwordEmpty')
      } else if (this.password.length < 8) {
        valid = false
        return this.$t('auth.passwordMinLength')
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
    },
    getPosition () {
      if (this.$q.screen.gt.sm) {
        return 'fixed-center bg-white'
      }
      return ''
    }
  },
  methods: {
    handleModal (payload) {
      this.showModal = payload
    },
    handleNoSpace (evt) {
      var regexp = /^\S*$/
      if (evt.key.match(regexp)) {
        return true
      } else {
        evt.preventDefault()
      }
    },
    handleKeypressPhoneNumber (evt) {
      var letters = /^[0-9]+$/
      var excludeZero = /^(?!0*(\.0+)?$)(\d+|\d*\.\d+)$/
      if (evt.key.match(letters) || evt.key.match(excludeZero)) {
        return true
      } else {
        evt.preventDefault()
      }
    },
    async handleClickSignUp () {
      // if (this.validSignup) {
      //   try {
      //     const user = {
      //       phoneNumber: this.phoneNumber,
      //       password: this.password,
      //       countryCode: this.country.value,
      //       email: this.email
      //       // firstName: this.firstName,
      //       // lastName: this.lastName
      //     }
      //     this.loading = true
      //     Logger.info('SignUp params', user)()
      //     const res = await this.$service.signUp.signUp(user)
      //     Logger.info('SignUp res', res)()
      //     if (res) {
      //       if (this.getRegistrationWithApproval) {
      //         this.showModal = true
      //         this.loading = false
      //       } else {
      //         const params = {
      //           username: this.phoneNumber,
      //           password: this.password,
      //           ountryCode: this.country.value
      //         }
      //         await this.$store.dispatch('auth/signIn', {
      //           params,
      //           onSuccess: () => {
      //             let redirectUrl = '/redirect/home'

      //             if (this.getDecryptedTargetUrl) {
      //               redirectUrl = this.getDecryptedTargetUrl
      //             }

      //             this.loading = false
      //             window.location.replace(redirectUrl)
      //           },
      //           onFail: (error) => {
      //             this.$publish(events.AUTH_DIALOG_ERROR, error)
      //             this.loading = false
      //           }
      //         })
      //       }
      //     }
      //   } catch (error) {
      //     this.$publish(events.AUTH_DIALOG_ERROR, error)
      //     this.loading = false
      //   }
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-up-default {
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
        height: 70vh;
        border-radius: 30px;
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
