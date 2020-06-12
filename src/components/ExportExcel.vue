<script lang="tsx">
import {
  Component, Vue,
} from 'vue-property-decorator';

import { DataExcel } from '@/types/xlsx';
import { VNode } from 'vue';

// eslint-disable-next-line max-len
// const ExcelTable: any = () => import(/* webpackChunkName: "excel-table" */ '@/components/ExcelTable.vue').then((module) => module.default);
import ExcelTable from '@/components/ExcelTable.vue';
import UploadExcel from '@/components/UploadExcel.vue';

@Component({
  name: 'ExportExcel',
  components: {
    ExcelTable,
    UploadExcel,
  },
})
export default class ExportExcel extends Vue {
  dataExcel: string[] = [];

  cols: string[] = [];

  setDataExcel({ rows, cols }: DataExcel) {
    this.dataExcel = rows;
    this.cols = cols;
  }

  getTable(props: DataExcel): VNode | null {
    const { rows, cols } = props;
    if (!rows?.length || !cols?.length) return null;

    return (
      <ExcelTable
        props={props}
      />
    );
  }

  public render() {
    const tableData: DataExcel = {
      rows: this.dataExcel,
      cols: this.cols,
    };

    const upload = {
      on: {
        change: this.setDataExcel,
      },
    };

    return (
      <div class="export-excel">
        <UploadExcel
          {...upload}
        />

        {this.getTable(tableData)}
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>

</style>
