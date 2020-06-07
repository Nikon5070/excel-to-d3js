<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ExportExcel msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ExportExcel from '@/components/ExportExcel.vue';

  @Component({
    components: {
      ExportExcel,
    },
  })
export default class Home extends Vue {
}

</script>
