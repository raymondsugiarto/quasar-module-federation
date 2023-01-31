<template lang="">
  <div class="sc bg-sc-white q-mt-md">
    <q-layout view="lHr lpR lFr" class="sc__layout position-relative">
      <q-header
        class="justify-center bg-white text-primary q-mb-md sc__layout__header"
      >
        <q-toolbar class="sc__layout__toolbar q-px-lg gt-sm">
          <q-avatar class="q-mr-xl logo-business" square>
            <q-img src="https://via.placeholder.com/150x50" />
          </q-avatar>

          <q-btn
            stretch
            flat
            :label="$t('nav.home')"
            :stack="true"
            icon="home"
            class="q-py-md text-bold menu"
            @click="handleOpenNav('home')"
            no-caps
            :color="currentPage == 'home' ? 'primary' : 'grey-6'"
            :style="currentPage == 'home' ? activeStyle : ''"
          />

          <q-btn
            stretch
            flat
            :label="$t('nav.feeds')"
            :stack="true"
            icon="article"
            class="q-py-md q-px-md q-mx-sm text-bold menu"
            @click="handleOpenNav('feeds')"
            no-caps
            :color="currentPage == 'feeds' ? 'primary' : 'grey-6'"
            :style="currentPage == 'feeds' ? activeStyle : ''"
          />
          <q-btn
            stretch
            flat
            :label="$t('nav.trending')"
            :stack="true"
            icon="local_fire_department"
            class="q-py-md text-bold menu"
            @click="handleOpenNav('trending')"
            no-caps
            :color="currentPage == 'trending' ? 'primary' : 'grey-6'"
            :style="currentPage == 'trending' ? activeStyle : ''"
          />
          <q-btn
            stretch
            flat
            :label="$t('nav.channel')"
            :stack="true"
            icon="groups"
            class="q-py-md text-bold menu"
            @click="handleOpenNav('channel')"
            no-caps
            :color="currentPage == 'channel' ? 'primary' : 'grey-6'"
            :class="currentPage == 'channel' ? 'active' : ''"
          />

          <q-space />
          <q-input
            v-model="search"
            :placeholder="$t('search.searchAll')"
            rounded
            outlined
            dense
            class="sc__layout__toolbar__search q-mr-lg"
            @keyup.enter="handleSearch"
          >
            <template v-slot:append>
              <q-icon
                v-if="search !== ''"
                name="close"
                @click="search = ''"
                class="cursor-pointer"
              />
              <q-icon name="search" />
            </template>
          </q-input>
          <notification-icon class="q-mr-md" />

          <q-btn-dropdown flat rounded>
            <template v-slot:label>
              <div class="row items-center no-wrap">
                <q-avatar class="cursor-pointer">
                  <q-img :src="getDefaultAvatar" class="full-width" contain />
                </q-avatar>
              </div>
            </template>
            <q-list separator class="text-sc-grey">
              <q-item
                clickable
                v-ripple
                @click="$router.push('/profile')"
                class="q-col-gutter-x-sm"
              >
                <q-item-section avatar class="col-3">
                  <q-icon name="fas fa-user" class="q-pa-none" size="xs" />
                </q-item-section>
                <q-item-section class="col">{{
                  $t('account.myProfile')
                }}</q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                @click="handleReferralDialog(true)"
                class="q-col-gutter-x-sm"
              >
                <q-item-section avatar class="col-3">
                  <q-icon name="fas fa-solid fa-gift" size="xs" />
                </q-item-section>
                <q-item-section class="col">{{
                  $t('account.referral')
                }}</q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                @click="handleSignOut"
                class="q-col-gutter-x-sm"
              >
                <q-item-section avatar class="col-3">
                  <q-icon name="fas fa-sign-out-alt" size="xs" />
                </q-item-section>
                <q-item-section class="col">{{
                  $t('account.signOut')
                }}</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <router-view :key="routeKey" />
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { DEFAULT_AVATAR } from '../utils/constants';

import NotificationIcon from 'components/Notification/NotificationIcon.vue';
export default {
  name: 'ForumContainer',
  components: {
    NotificationIcon,
  },
  data() {
    return {
      left: false,
      right: false,
      search: '',
      intervalID: 0,
      imgPlaceholder: 'https://via.placeholder.com/150x50',
      showSearchDialog: false,
      query: '',
      activeStyle: '',
      showReferralDialog: false,
    };
  },
  computed: {
    currentPage() {
      return this.$route.name;
    },
    getDefaultAvatar() {
      return DEFAULT_AVATAR;
    },
  },
  methods: {
    handleOpenNav(page) {
      this.$router.push(`/${page}`);
    },

    handleSearch() {
      this.$router.push(`/search?q=${this.search}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.sc {
  width: 100%;
  height: 100%;

  &__layout {
    margin: 0 auto;
    z-index: 4000;
    width: 90%;
    max-width: 1250px;
    @media (max-width: $breakpoint-xs) {
      width: 100%;
    }
    &__header {
      box-shadow: 0px 1px 4px rgba(241, 241, 245, 0.25);
      .menu {
        position: relative;
        overflow: hidden;
        &:after {
          position: absolute;
          content: '';
          width: 0%;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          transition: all 0.5s;
          // background: $primary;
          height: 2px;
        }
        &.q-btn--active,
        &:hover {
          &:after {
            width: 100%;
          }
        }
      }
    }
    &__toolbar {
      margin: 0 auto;
      z-index: 4000;
      width: 90%;
      max-width: 1250px;
      // padding: 0px 24px;
      @media (max-width: $breakpoint-xs) {
        width: 100%;
        // padding: 12px 0;
      }
      &__search {
        min-width: 300px;
        @media (max-width: $breakpoint-md) {
          min-width: 200px;
        }
      }
    }
  }
  .logo-business {
    width: 100%;
    height: 100%;
    @media (max-width: $breakpoint-md) {
      width: 150px;
    }
    @media (max-width: $breakpoint-lg) {
      width: 200px;
    }
    @media (min-width: $breakpoint-lg) {
      width: 200px;
    }
  }
}
// .active {
//   border-bottom: 3px solid $primary;
// }
</style>
