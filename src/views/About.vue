<template>
  <div class="about">
    <h1>This is an about page</h1>
    <HqhlTable />
  </div>
</template>
<script>
import {apiTest} from '@/services/api'
import HqhlTable from '@/components/Table'
export default {
  name: 'about',
  components: {
    HqhlTable
  },
  mounted() {
    apiTest().then(res=>{
      console.log(res)
      console.log(this.$dateFormat(new Date(),'yyyy-MM-dd'))
    })
  },
}
</script>

<style lang="scss" scoped>
.about{
  .test{
    font-size: 1.2em;
    color: aquamarine;
  }
}
</style>

