<template>
  <v-app>
    <v-footer
      color="#344754"
    >
      <v-container>
        <v-row
          justify="center"
          no-gutters
        >
          <v-col cols="6" xl="5" lg="5" md="5" sm="5">
            <span
              v-for="(link, id) in footer_links.row1"
              :key="id"
              class="row1Footer white--text"
            >
              <span @click="process_footer_link_clicks(link.url)">
                {{ link.text }}
              </span> <br>
            </span>
          </v-col>
          <v-col cols="6" xl="5" lg="5" md="5" sm="5">
            <span
              v-for="(link, id) in footer_links.row2"
              :key="id"
              class="row1Footer white--text"
            >
              <v-icon color="white">{{ link.icon }}</v-icon>
              {{ link.text }} <br>
            </span>
          </v-col>
          <v-col
            cols="6"
            xl="2"
            lg="2"
            md="2"
            sm="2"
            style="justify-content: flex-end"
          >
            <span
              v-for="(link, id) in footer_links.row3"
              :key="id"
              class="row1Footer white--text"
            >
              <span @click="process_footer_link_clicks(link.url)">
                <v-icon color="white">{{ link.icon }}</v-icon>
                {{ link.text }}
              </span> <br>
            </span>
          </v-col>
          <v-spacer />
          <v-col id="media_follow_us_on" cols="12" class="text-center white--text">
            <span id="follow_us_on">Follow us on</span>
            <v-icon color="white">
              mdi-facebook
            </v-icon>
            <v-icon color="white">
              mdi-twitter
            </v-icon>
            <v-icon color="white">
              mdi-instagram
            </v-icon>
          </v-col>
          <v-col
            class="text-center white--text copyright"
            cols="12"
          >
            &copy; {{ new Date().getFullYear() }} Writeray. All rights reserved
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'BaseFooter',
  data () {
    return {
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us'
      ],
      footer_links: {
        row1: [
          { text: 'Privacy Policy', icon: '', url: '/general/privacy-policy' },
          { text: 'Cookie Policy', icon: '', url: '/general/cookie-policy' },
          { text: 'Terms and Conditions', icon: '', url: '/general/terms-and-conditions' }
        ],
        row2: [
          { text: 'support@writeray.com', icon: 'mdi-email' },
          { text: '+254 732 660 968', icon: 'mdi-phone' }
        ],
        row3: [
          { text: 'About Us', icon: '', url: '/general/about' },
          { text: 'FAQ', icon: '', url: '/general/faq' },
          { text: 'Login', icon: '', url: '#' },
          { text: 'How it works', icon: '', url: '/general/how-it-works' }
        ]
      },
      height: null,
      break_point_name: null
    }
  }
}
</script>

<style scoped lang="scss">
footer{
  left: 0;
  height: 100%;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .row1Footer{
    cursor: pointer;
    text-transform: none;
    font-size: 14px;
  }
  .copyright{
    padding: 50px;
    font-size: 16px;
  }
  #follow_us_on{
    color: white;
    padding-right: 10px;
  }
  #media_follow_us_on{
    padding-top: 50px !important;
  }
}
</style>
