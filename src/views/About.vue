<template>
  <div class="about">
    <h1>This is an about page</h1>
      <Button class="test">Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
  </div>
</template>
<script>
import {apiTest} from '@/services/api'
export default {
  mounted() {
    apiTest().then(res=>{
      console.log(res)
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

