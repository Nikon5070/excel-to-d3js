<script lang="tsx">
import {
  Component, Prop, Ref, Vue,
} from 'vue-property-decorator';

import { ElUpload, ElUploadInternalFileDetail } from 'element-ui/types/upload';
import { read as readExcel, utils as utilsExcel } from 'xlsx';
import { makeCols } from '@/utils/xlsx';
import { Rows } from '@/types/xlsx';

@Component({
  name: 'ExportExcel',
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
    console.log('ON CHANGE');

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = readExcel(data, {
          type: 'buffer',
        });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        console.log({ w: worksheet });
        this.dataExcel = utilsExcel.sheet_to_json(worksheet, {
          header: 1,
        });

        const ref = worksheet['!ref'] as string;
        this.cols = makeCols(ref, utilsExcel);

        console.log({
          de: this.dataExcel,
          c: this.cols,
        });

        /* Convert array of arrays */
        // const sheetToJson = utilsExcel.sheet_to_json(worksheet, { header: 1 });
        /* Update state */
        // this.cols = make_cols(ws['!ref']);
      }
    };

    reader.readAsArrayBuffer(fileRaw);
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
    return (
      <div class="export-excel">
        <el-upload
          {...elUpload}
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <div slot="tip" class="el-upload__tip">
            xlsx files with a size less than 500kb
          </div>
        </el-upload>
        {
          (!!(this.dataExcel && this.dataExcel.length)
          && <table class="table table-striped">

            <thead>
                <tr>
                  {
                    this.cols.map((c, key) => <th key={key}> { this.dataExcel[0][key] }</th>)
                  }
                </tr>
            </thead>
            <tbody>
              {
                this.dataExcel.slice(1).map((r, key) => (
                    <tr key={key}>
                      { this.cols.map((c, colKey) => <td key={colKey}> { r[colKey] } </td>) }
                    </tr>
                ))
              }
              <tr> slice { Rows.Holidays } </tr>
              {
                this.dataExcel.slice(Rows.Holidays).map((r, key) => (
                  <tr key={key}>
                    { this.cols.map((c, colKey) => <td key={colKey}> { r[colKey] } </td>) }
                  </tr>
                ))
              }
            </tbody>
          </table>)
        }
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
