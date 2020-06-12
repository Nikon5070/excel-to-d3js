<script lang="tsx">

import { Component, Vue } from 'vue-property-decorator';

import ExportExcel from '@/components/ExportExcel.vue';
import Image from '@/assets/logo.png';

@Component({
  name: 'Home',
  components: {
    ExportExcel,
  },
})
export default class Home extends Vue {
  public render() {
    return (
      <div class="home">
        <img alt="Vue logo" src={Image} />
        <ExportExcel />
      </div>
    );
  }
}
</script>
