<template>
  <div class="pos-app-table">
    <Table
    :width="width"
    :columns="columns"
     disabled-hover
     :data="data"
     stripe
     border
      @on-sort-change='sort'
      @on-selection-change='selectChange'></Table>
    <div class="pos-app-page">
      <Page :total="total" :page-size="pageSize" :current.sync="pageIndex"  show-total show-elevator show-sizer @on-page-size-change='pageSizeChange' @on-change='pageChange'></Page>
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

        },
        current: {

        },
        pageSize: {

        }
    },
    data(){
        return {

        }
    },
    computed: {
        pageIndex: {
            get(){
                return this.current
            },
            set(val){
                this.$emit('update:current',val)
            }
        },
        _pageSize: {
            get(){
                return this.pageSize
            },
            set(val){
                this.$emit('update:pageSize',val)
            }
        }
    },
    methods: {
        pageSizeChange(data){
            this._pageSize = data
            if (this.pageIndex == 1){
                this.$emit('page-change',{
                    page: this.pageIndex,
                    pageSize: data
                })
            }
        },
        pageChange(data){
            this.$nextTick(()=>{
                this.$emit('page-change',{
                    page: data,
                    pageSize: this._pageSize
                })
            })

        },
        selectChange(data){
            this.$emit('select-change',data)
        },
        sort(data){
            this.$emit('on-sort-change',data)
        }
    }

}
</script>
