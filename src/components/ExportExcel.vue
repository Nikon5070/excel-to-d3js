<template>
  <div class="export-excel">
    <UploadExcel
      @change="setDataExcel"
    />

    <template
      v-if="!isEmpty"
    >
      <ExcelTable
        :rows="dataExcel"
        :cols="cols"
      />

      <CommitChart
        v-for="(item, index) in groups"
        :key="index"
        :chartData="chartData(item.data)"
      />
    </template>
  </div>

</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import { Colums, DataExcel, Rows } from '@/types/xlsx';

import { GroupCharts, groupCharts } from '@/constants/groupCharts';
import UploadExcel from '@/components/UploadExcel.vue';

const CommitChart = () => import(/* webpackChunkName: "commit-chart" */'@/components/CommitChart.vue');
const ExcelTable = () => import(/* webpackChunkName: "excel-table" */ '@/components/ExcelTable.vue').then((module) => module.default);


type NumberOrArrayNumber = number | Array<number>;

@Component({
  name: 'ExportExcel',
  components: {
    CommitChart,
    ExcelTable,
    UploadExcel,
  },
})
export default class ExportExcel extends Vue {
  dataExcel: string[] = [];

  cols: string[] = [];

  groups: GroupCharts = groupCharts;

  setDataExcel({ rows, cols }: DataExcel) {
    this.dataExcel = rows;
    this.cols = cols;
  }

  get isEmpty() {
    return !this.dataExcel?.length || !this.cols?.length;
  }

  get axisX() {
    return this.getAxisY(Rows.Cols);
  }

  generateDatasets = (item) => ({
    label: this.getLabel(item),
    data: this.getAxisY(item),
  });

  chartData(indexs: NumberOrArrayNumber) {
    const defaultData = {
      labels: this.axisX,
      datasets: [],
    };

    if (Array.isArray(indexs)) {
      return {
        ...defaultData,
        datasets: indexs.map(this.generateDatasets),
      };
    }

    return {
      ...defaultData,
      datasets: [
        this.generateDatasets(indexs),
      ],
    };
  }

  getAxisY(index) {
    const data = this.dataExcel[index];
    if (!data) return [];

    return data.slice(Colums.January);
  }

  getLabel(index) {
    return this.dataExcel[index][Colums.Rows];
  }
}
</script>

<style lang="scss" scoped>

</style>
