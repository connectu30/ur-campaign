<template>
  <v-app>
    {{ campaigns.id }}
  </v-app>
</template>

<script>
// @ is an alias to /src
import { db } from '@/plugins/firebase'

export default {
  name: 'home',
  components: {
    
  },
  data () {
    return {
      campaigns: []
    }
  },
  firestore: {
  }
}
</script>
