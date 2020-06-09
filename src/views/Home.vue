<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ExportExcel msg="Export Excel to D3.js"/>
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
