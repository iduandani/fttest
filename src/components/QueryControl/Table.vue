<template>
  <div class="pos-app-table">
    <Table :width="width" :columns="columns" disabled-hover :data="data" stripe border></Table>
    <div class="pos-app-page">
      <Page :total="total" show-total show-elevator show-sizer></Page>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        width: {

        },
        columns: {

        },
        data: {

        },
        total: {

        }
    }
}
</script>
