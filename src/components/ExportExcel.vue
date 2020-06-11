<script lang="tsx">
import {
  Component, Prop, Ref, Vue,
} from 'vue-property-decorator';

import { ElUpload, ElUploadInternalFileDetail } from 'element-ui/types/upload';
import { read as readExcel, utils as utilsExcel } from 'xlsx';
import { makeCols } from '@/utils/xlsx';
import { DataExcel } from '@/types/xlsx';
import { VNode } from 'vue';

const ExcelTable = () => import(/* webpackChunkName: "excel-table" */ '@/components/ExcelTable.vue');

@Component({
  name: 'ExportExcel',
  components: {
    ExcelTable,
  },
  mounted() {
    console.log('mounted', this.$refs);
  },
  created() {
    console.log('created');
  },
})
export default class ExportExcel extends Vue {
  @Prop() private msg!: string;

  @Ref('upload') readonly elUpload!: ElUpload;

  dataExcel: string[] = [];

  cols: string[] = [];

  async onChange(file: ElUploadInternalFileDetail) {
    const fileRaw = file.raw;
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = readExcel(data, {
          type: 'buffer',
        });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        this.dataExcel = utilsExcel.sheet_to_json(worksheet, {
          header: 1,
        });
        const ref = worksheet['!ref'] as string;
        this.cols = makeCols(ref, utilsExcel);
      }
    };

    reader.readAsArrayBuffer(fileRaw);
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
    const elUpload = {
      ref: 'upload',
      class: 'upload-demo',
      props: {
        action: '',
        drag: true,
        autoUpload: false,
        onChange: this.onChange,
      },
    };

    const tableData: DataExcel = {
      rows: this.dataExcel,
      cols: this.cols,
    };

    return (
      <div class="export-excel">
        <el-upload
          {...elUpload}
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <div slot="tip" class="el-upload__tip">
            xlsx files with a size less than 500kb
          </div>
        </el-upload>

        {this.getTable(tableData)}
      </div>
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
