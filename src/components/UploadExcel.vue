<script lang="tsx">
import {
  Component, Ref, Vue,
} from 'vue-property-decorator';

import { ElUpload, ElUploadInternalFileDetail } from 'element-ui/types/upload';
import { read as readExcel, utils as utilsExcel } from 'xlsx';
import { makeCols } from '@/utils/xlsx';
import { DataExcel } from '@/types/xlsx';

const BEGIN = 0;

@Component({
  name: 'UploadExcel',
})
export default class UploadExcel extends Vue {
  @Ref('upload') readonly elUpload!: ElUpload;

  parseFileToData(array: ArrayBuffer): DataExcel | null {
    if (!array?.byteLength) return null;

    const data = new Uint8Array(array);
    const workbook = readExcel(data, {
      type: 'buffer',
    });

    const worksheet = workbook.Sheets[workbook.SheetNames[BEGIN]];
    const ref = worksheet['!ref'] as string;

    const rows: string[] = utilsExcel.sheet_to_json(worksheet, {
      header: 1,
    });
    const cols = makeCols(ref, utilsExcel);

    return {
      rows,
      cols,
    };
  }

  async onChange(file: ElUploadInternalFileDetail) {
    const fileRaw = file.raw;
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const array = e.target && e.target.result as ArrayBuffer;
      if (!array?.byteLength) return;

      const dataExcel = this.parseFileToData(array);
      if (!dataExcel) return;

      this.$emit('change', dataExcel);
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
    );
  }
}
</script>

<style lang="scss" scoped>
</style>
