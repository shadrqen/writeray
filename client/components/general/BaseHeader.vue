<template>
  <div>
    <v-app-bar
      app
      class="app_bar elevation-1"
      dense
      dark
      fixed
      height="60%"
    >
      <template v-if="!!localLoginStatus">
        <v-container>
          <v-row no-gutters>
            <v-col xl="6" lg="6" md="6" sm="6" xs="4">
              <v-toolbar-title
                class="mt-1 toolbar_title"
                @click="redirect_to_url('/')"
              >
                Writeray
              </v-toolbar-title>
            </v-col>
            <v-spacer />
            <v-col
              xl="6"
              lg="6"
              md="6"
              sm="6"
              xs="8"
              style="justify-content: center;"
            >
              <client-only>
                <v-row class="toolbar_row mt-1">
                  <v-spacer />
                  <v-toolbar-items>
                    <div class="text-center">
                      <v-menu
                        offset-y
                      >
                        <template #activator="{ on }">
                          <span
                            style="cursor: pointer;"
                            v-on="on"
                          >
                            <v-chip
                              id="userEmailChip"
                              outlined
                            >
                              <v-icon>person</v-icon>
                              {{ email }}
                              <v-icon>expand_more</v-icon>
                            </v-chip>
                          </span>
                        </template>

                        <v-card>
                          <v-list>
                            <v-list-item-group
                              v-model="selectedItem"
                              active-class="red--text"
                            >
                              <v-list-item
                                v-for="(item, i) in writerItems"
                                :key="i"
                                @click="clientAction(item.action)"
                              >
                                <v-list-item-icon>
                                  <v-icon v-text="item.icon" />
                                </v-list-item-icon>
                                <v-list-item-content style="padding-right: 30px;">
                                  <v-list-item-title v-text="item.text" />
                                </v-list-item-content>
                              </v-list-item>
                            </v-list-item-group>
                          </v-list>
                        </v-card>
                      </v-menu>
                    </div>
                  </v-toolbar-items>
                </v-row>
              </client-only>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-else>
        <v-container>
          <v-row no-gutters>
            <v-col xl="6" lg="6" md="6" sm="6" xs="4">
              <v-toolbar-title class="toolbar_title" @click="redirect_to_url('/')">
                Writeray
              </v-toolbar-title>
            </v-col>
            <v-spacer />
            <v-col
              xl="6"
              lg="6"
              md="6"
              sm="6"
              xs="8"
              style="justify-content: center;"
            >
              <v-row class="toolbar_row mt-1">
                <v-toolbar-items
                  v-if="['md', 'lg', 'xl'].includes(viewport_code)"
                  class="toolbar_items"
                  @click="redirect_to_url('/general/how-it-works')"
                >
                  How It Works
                </v-toolbar-items>
                <v-spacer />
                <v-toolbar-items
                  v-if="['md', 'lg', 'xl'].includes(viewport_code)"
                  class="toolbar_items"
                  @click="redirect_to_url('/general/faq')"
                >
                  FAQ
                </v-toolbar-items>
                <v-spacer />
                <v-toolbar-items
                  v-if="['md', 'lg', 'xl'].includes(viewport_code)"
                  class="toolbar_items"
                  @click="redirect_to_url('/general/about')"
                >
                  About
                </v-toolbar-items>
                <v-spacer />
                <v-toolbar-items v-if="inner_width>=300 && localLoginStatus === false" class="toolbar_items">
                  <span id="login_span" @click="redirect_to_url('login')">
                    Log In
                  </span>
                </v-toolbar-items>
                <v-spacer />
                <v-toolbar-items v-if="['xs', 'sm'].includes(viewport_code) && localLoginStatus === false">
                  <v-app-bar-nav-icon @click="navbarIcon = !navbarIcon" />
                </v-toolbar-items>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-row v-if="show_navbar_dialog()" no-gutters app style="position: absolute; top: 0; left: 0; width: 100%;">
          <v-col
            v-for="(url, id) in navbarUrls"
            :key="id"
            cols="12"
            xl="2"
            lg="2"
            md="2"
            sm="2"
          >
            <v-card class="rounded-0 navbar_link_card" light @click="redirect_to_url(url.url)">
              <v-card-text v-if="url.icon" class="white--text text-center">
                <v-icon color="white">
                  {{ url.icon }}
                </v-icon>
              </v-card-text>
              <v-card-text v-else class="white--text text-center">
                {{ url.text }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-app-bar>
    <v-overlay
      :value="overlay"
      opacity="0.9"
    >
      <div
        class="lds-ellipsis"
      >
        <div />
        <div />
        <div />
        <div />
      </div>
    </v-overlay>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

import { bus } from '@/plugins/bus'

export default {
  name: 'BaseHeader',
  data () {
    return {
      inner_width: 0,
      navbarIcon: false,
      navbarUrls: [
        { text: 'How it Works', icon: '', url: '/general/how-it-works' },
        { text: 'FAQ', icon: '', url: '/general/faq' },
        { text: 'About', icon: '', url: '/general/about' },
        { text: 'Log In', icon: '', url: 'login' },
        { text: '', icon: 'mdi-close', url: 'close_nav_dialog' }
      ],
      selectedItem: null,
      writerItems: [
        { text: 'Report Problem', icon: 'report', action: 'report' },
        { text: 'Logout', icon: 'mdi-logout', action: 'logoutClient' }
      ],
      menu: false,
      viewport_code: null,
      localLoginStatus: this.loginStatus,
      overlay: false
    }
  },
  fetch () {
    this.localLoginStatus = null
    this.inner_width = 300
    this.viewport_code = 'xs'
  },
  computed: {
    ...mapGetters({
      loginStatus: 'loginStatus',
      loginDialog: 'loginDialog',
      loginDialogContents: 'loginDialogContents',
      writerRegistrationForm: 'writerRegistrationForm',
      email: 'email',
      reportProblemDialog: 'reportProblemDialog',
      viewportCode: 'getViewPortCode'
    })
  },
  watch: {
    loginStatus () {
      this.localLoginStatus = this.loginStatus
    }
  },
  mounted () {
    if (process.env.VUE_ENV === 'client') {
      this.localLoginStatus = this.loginStatus
      this.viewport_code = this.viewportCode
      this.changeLoginDialog(false)
      this.set_window_inner_width()
      window.addEventListener('resize', this.set_window_inner_width)
    }
    bus.$on('changeNavOverlay', (val) => {
      this.overlay = val
    })
    bus.$on('changeNavOverlay', (val) => {
      this.overlay = val
    })
  },
  methods: {
    ...mapMutations(['changeLoginDialog', 'changeLoginDialogContents', 'changeReportProblemDialog',
      'resetRegistrationState', 'resetUserState'
    ]),
    /* Function to determine whether to show the navbar dialog or not */
    show_navbar_dialog () {
      return this.navbarIcon && ['xs', 'sm'].includes(this.viewport_code)
    },
    /* Function to open links after clicking one in the navbar */
    /* Function works to redirect requests to the requested clicked link */
    /* TODO: To remove this function in favour of inline links */
    redirect_to_url (link) {
      /* Checking whether the clicked url is redundant */
      if (link === '/') {
        if (this.$route.fullPath !== link) {
          this.$router.push(link)
        }
        this.navbarIcon = false
      } else if (link === 'close_nav_dialog') {
        this.navbarIcon = false
      } else {
        const linkWithHash = '/' + link // so as to use in the if statement below
        if (this.$route.fullPath !== linkWithHash) {
          if (link === 'login') {
            this.changeLoginDialogContents({
              key: 'dialogTitle',
              subKey: null,
              val: 'Log in to your account'
            })
            this.changeLoginDialogContents({
              key: 'dialogContent',
              subKey: 'submitEmail',
              val: true
            })
            this.changeLoginDialogContents({
              key: 'dialogContent',
              subKey: 'login',
              val: false
            })
            this.changeLoginDialogContents({
              key: 'dialogContent',
              subKey: 'notification',
              val: false
            })
            this.changeLoginDialogContents({
              key: 'dialogContent',
              subKey: 'setPassword',
              val: false
            })
            this.changeLoginDialog(true)
          } else {
            this.$router.push(link)
            this.navbarIcon = false
          }
        }
      }
    },
    /* I am using the window innerwidth in the toolbar ( particularly for the login link ) */
    set_window_inner_width () {
      if (process.env.VUE_ENV === 'client') {
        this.viewport_code = this.viewportCode
        this.inner_width = window.innerWidth
      }
    },
    logoutClient () {
      this.resetRegistrationState()
      this.resetUserState()
      location.reload()
    },
    clientAction (action) {
      switch (action) {
        case 'logoutClient':
          this.logoutClient()
          break
        case 'report':
          this.changeReportProblemDialog(true)
          break
        default:
          if (this.$route.fullPath !== action) {
            this.$router.push(action)
          }
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">

@import '../../styles/general/general';

@import "../../styles/mixins/general";

.app_bar{
  background-color: #2e3650 !important;
  .toolbar_row{
    .toolbar_items{
      @include sharedBtnProperties();
      #login_span{
        color: white;
        border-radius: 5px;
        text-transform: none;
        box-shadow: none;
      }
    }
  }
  .toolbar_title{
    @include sharedBtnProperties();
  }
  .navbar_link_card {
    cursor: pointer;
    height: 100%;
    background-color: #007991 !important;
    &:hover{
      background-color: #283e51 !important;
    }
  }
}

.v-toolbar{
  background-color: $footerColor;
}

#userEmailChip {
  cursor: pointer;
}

</style>
