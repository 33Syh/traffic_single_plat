<template>
  <div class="pdf">
    <pdf
      ref="pdf"
      v-for="i in numPages"
      :key="i"
      :page="i"
      :src="pdfUrl"
      style="display: inline-block; width: 100%"
    >
    </pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  name: 'pdfComponent',
  props: {
    tactics_num: String
  },
  components: {
    pdf
  },
  data () {
    return {
      pdfList: [
        //   pdfUrl: 'http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf'
        //  pdfUrl: '../../../../static/assets/pdf/红绿灯配置方案说明-策略1说明.pdf',
        {
          pdfUrl: 'static/assets/pdf/T01.pdf',
          title: '流量权重配置策略'
        },
        {
          pdfUrl: 'static/assets/pdf/T02.pdf',
          title: '动态配时策略'
        },
        {
          pdfUrl: 'static/assets/pdf/T03.pdf',
          title: '强化学习配时策略'
        }
      ],
      pdfUrl: '',
      numPages: 1
    }
  },
  mounted: function () {
    // alert(this.tactics_num)
    if (this.tactics_num) {
      let currentPdfUrl = ''
      switch (this.tactics_num) {
        case '01':
          currentPdfUrl = this.pdfList[0].pdfUrl
          break
        case '02':
          currentPdfUrl = this.pdfList[1].pdfUrl
          break
        case '03':
          currentPdfUrl = this.pdfList[2].pdfUrl
          break
        default:
          currentPdfUrl = this.pdfList[0].pdfUrl
          break
      }
      this.pdfTask(currentPdfUrl)
    }
  },
  methods: {
    pdfTask (pdfUrl) {
      var self = this
      var loadingTask = pdf.createLoadingTask(pdfUrl)
      loadingTask.then(pdf => {
        self.pdfUrl = loadingTask
        self.numPages = pdf.numPages
      })
    }
  }
}
</script>

<style scoped>
.pdf {
  height: 100%;
  width: 100%;
}
</style>
