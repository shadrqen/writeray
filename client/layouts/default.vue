<template>
  <!--    Implementing the Base Layout, which holds the format of the root App page-->
  <BaseLayout>
    <template #header>
      <BaseHeader />
    </template>
    <template #default>
      <v-main>
        <router-view />
      </v-main>
    </template>
    <template #footer>
      <BaseFooter />
    </template>
  </BaseLayout>
</template>

<script lang="js">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import BaseFooter from '../components/general/BaseFooter'
import BaseHeader from '../components/general/BaseHeader'
import BaseLayout from '../components/general/BaseLayout'

export default Vue.extend({
  name: 'App',
  components: {
    BaseHeader,
    BaseFooter,
    BaseLayout
  },
  data () {
    return {
      pageLoaded: false
    }
  },
  mounted () {
    if (process.env.VUE_ENV === 'client') {
      this.set_viewport_code()
      window.addEventListener('resize', this.set_viewport_code)
      window.addEventListener('load', () => {
        this.pageLoaded = true
      })
    }
  },
  methods: {
    ...mapMutations(['changeViewPortCode']),
    set_viewport_code () {
      let width = 0
      if (process.env.VUE_ENV === 'client') {
        width = window.innerWidth
      }
      switch (true) {
        case (width < 600):
          this.changeViewPortCode('xs')
          break
        case (width > 600 && width < 960):
          this.changeViewPortCode('sm')
          break
        case (width > 960 && width < 1264):
          this.changeViewPortCode('md')
          break
        case (width > 1264 && width < 1904):
          this.changeViewPortCode('lg')
          break
        case (width > 1904):
          this.changeViewPortCode('xl')
          break
        default:
          break
      }
    }
  }
})
</script>
