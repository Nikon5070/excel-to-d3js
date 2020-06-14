<template>
  <table class="table table-striped">
    <thead>
    <tr>
      <th
        v-for="(item, i) in cols"
        :key="i"
      >
        {{ rows[Rows.Cols][i] }}
      </th>
    </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, iRow) in rows.slice(Rows.Holidays)"
        :key="iRow"
      >
        <td
          v-for="(col, iCol) in cols"
          :key="iCol"
        >
          {{ row[iCol] }}
        </td>
      </tr>
    </tbody>
  </table>

</template>

<script lang="tsx">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';

import { Rows } from '@/types/xlsx';

@Component({
  name: 'ExcelTable',
})
export default class ExportExcel extends Vue {
  @Prop({
    default: () => [],
  }) private rows!: string[];

  @Prop({
    default: () => [],
  }) private cols!: string[];

  Rows = Rows;
}
</script>

<style lang="scss" scoped>
  .export-excel {
    background: blue;

    .upload-demo .el-upload {
      color: red;
      background: red;
    }
  }
</style>
