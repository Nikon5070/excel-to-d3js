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

  public render() {
    if (!this.rows?.length || !this.cols?.length) return null;

    return (
      <table class="table table-striped">
        <thead>
        <tr>
          {
            this.cols.map((c, key) => <th key={key}> {this.rows[0][key]}</th>)
          }
        </tr>
        </thead>
        <tbody>
        {
          this.rows.slice(1).map((r, key) => (
            <tr key={key}>
              {this.cols.map((c, colKey) => <td key={colKey}> {r[colKey]} </td>)}
            </tr>
          ))
        }
        <tr> slice {Rows.Holidays} </tr>
        {
          this.rows.slice(Rows.Holidays).map((r, key) => (
            <tr key={this.rows.length + key}>
              {this.cols.map((c, colKey) => <td key={colKey}> {r[colKey]} </td>)}
            </tr>
          ))
        }
        </tbody>
      </table>
    );
  }
}
</script>

<style lang="scss" scoped module>
  .export-excel {
    background: blue;

    .upload-demo .el-upload {
      color: red;
      background: red;
    }
  }
</style>
