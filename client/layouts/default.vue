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
import BaseFooter from '../components/general/BaseFooter'
import BaseHeader from '../components/general/BaseHeader'
import BaseLayout from '../components/general/BaseLayout'

export default Vue.extend({
  name: 'App',
  components: {
    BaseHeader,
    BaseFooter,
    BaseLayout
  }
})
</script>
