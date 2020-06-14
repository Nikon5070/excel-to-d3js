<script lang="ts">
import {
  Component,
  Mixins,
} from 'vue-property-decorator';

import { Bar, mixins } from 'vue-chartjs';

@Component({
  name: 'CommitChart',
})
export default class CommitChart extends Mixins(Bar, mixins.reactiveProp) {
  mounted() {
    this.renderChart(this.chartData);
  }
}
</script>

<style lang="scss" scoped>
</style>
