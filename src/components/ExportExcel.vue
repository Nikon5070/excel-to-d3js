<template>
  <div class="export-excel">
    <h1>{{ msg }}</h1>
    <el-upload
      class="upload-demo"
      :auto-upload="false"
      ref="upload"
      action="''"
    >
      <el-button slot="trigger" size="small" type="primary">select file</el-button>
      <el-button size="small" type="success" @click="submitUpload">upload to server</el-button>
      <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
    </el-upload>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Ref,
} from 'vue-property-decorator';
import { ElUpload } from 'element-ui/types/upload';

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

    submitUpload(e: Event) {
      console.log(e, 'submitUpload');
    }
}
</script>

<style scoped lang="scss">

</style>
