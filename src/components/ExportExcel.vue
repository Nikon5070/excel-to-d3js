<template>
  <div class="export-excel">
    <h1>{{ msg }}</h1>
    <el-upload
      class="upload-demo"
      :auto-upload="false"
      ref="upload"
      :on-change="onChange"
      action=""
      drag
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
    </el-upload>

    <table class="table table-striped" v-if="dataExcel && dataExcel.length">
      <thead>
      <tr>
        <th v-for="(c, key) in cols" :key="key">{{ dataExcel[0][key] }}</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(r, key) in dataExcel.slice(1)" :key="key">
          <td v-for="(c, colKey) in cols" :key="colKey"> {{ r[colKey] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Ref, Vue,
} from 'vue-property-decorator';

import { ElUpload, ElUploadInternalFileDetail } from 'element-ui/types/upload';
import { read as readExcel, utils as utilsExcel } from 'xlsx';
import { makeCols } from '@/utils/xlsx';

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
          console.log(utilsExcel.encode_col(1));
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
}
</script>

<style scoped lang="scss">

</style>
