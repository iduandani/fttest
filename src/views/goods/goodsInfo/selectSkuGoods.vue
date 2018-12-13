<template>
    <div class="pos-goods-select-goods" @click.stop="stopPop">
        <div class="pos-app-query">
        <Treeselect v-model="queryParams.category" :options="optionsCategory" placeholder="请选择分类"/>
        <SearchInput
            @on-search="search"
            v-model="queryParams.keyword"
            placeholder="商品编码 商品名称 条码 拼音码"
        />
        </div>
        <div class="pos-top-split"></div>
        <DataTable
        @on-sort-change="sort"
        @page-change="pageChange"
        :width="1160"
        :columns="cols"
        :total="page.total"
        :current.sync="page.index"
        :page-size.sync="page.size"
        :data="dataList"
        @select-change="selectChange"
        />
        <div class="pos-top-split"></div>
         <div class="pos-select-goods-button">
              <Button type="primary" size="large" @click="done">确定</Button>
              <Button type="text" class="cancel-button" @click="cancel" size="large">取消</Button>
         </div>
    </div>
</template>
<script>
import {
    SearchInput,
    DataTable,
    Treeselect,
} from '@/components/QueryControl/index.js';
export default {
    components: {
        SearchInput,
        DataTable,
        Treeselect,
    },
    props: {
        optionsCategory: {
            default(){
                return []
            }
        },
        getGoodsList: {}
    },
    methods: {
        init(){
            this.dataList = []
            this.page = {
                index: 1,
                size: 10,
                total: 0,
            }
            this.queryParams = {
                keyword: '',
                isReview: false,
                category: null,

            },
            this.storeQuery = {
                keyword: '',
                isReview: false,
                category: null,

            }
            this.getData()
        },
        done(){
            this.$emit('SkuGoodSelected',this.selectItems)
        },
        stopPop(){

        },
        pageChange(data) {
            this.getData()
            console.log(this.page.index,this.page.size,data);
        },
        search() {
            this.storeQuery = {
                ...this.queryParams,
            }
            this.getData()
        },
        sort(){

        },
        cancel(){
            this.$emit('SkuGoodCancel')
        },
        selectChange(data){
            this.selectItems = data
        },
        setSelectedList(list){
            this.selectedList = list || []
        },
        getData(){
            this.getGoodsList({
                'key': this.storeQuery.keyword.trim(),
                'categoryId': this.storeQuery.category,
                'pageInfo.PageNumber': this.page.index,
                'pageInfo.PageSize': this.page.size,
                isReview: false,
            }).then(res=>{
                const list =  res.data || []
                this.dataList = list.map((ele,i)=>{
                    let item = this.selectedList.find(cele=>cele.id == ele.id)
                    console.log(this.selectedList,ele.id)
                    return {
                        ...ele,
                        seq: (this.page.index - 1) * (this.page.size) + i + 1,
                        _disabled: item ? true : false

                        //goodsType:
                    }
                })
                this.page.total =  res.total
                this.selectItems = []
            })
        },
    },
    data(){
        return {
            queryParams: {
                keyword: '',
                category: null,
                date: []
            },
            selectedList: [],
            storeQuery: {},
            dataList: [],
            page: {
                index: 1,
                size: 10,
                total: 0,

            },
            cols: [
                {
                    type: 'selection',
                    width: 50
                },

                {
                    title: '序号',
                    key: 'seq',
                    sortable: 'custom'
                },
                {
                    title: '商品编码',
                    key: 'id',
                    sortable: 'custom'
                },
                {
                    title: '商品名称',
                    key: 'name',
                    width: 187,
                    ellipsis: true,
                    tooltip: true
                },

                {
                    title: '商品条码',
                    key: 'barcode',
                    width: 168
                },

                {
                    title: '分类',
                    key: 'goodsCategoryName'
                },
                {
                    title: '主单位',
                    key: 'unitValue'
                },
                {
                    title: '规格',
                    key: 'specificationValues'
                },
                {
                    title: '销售价格',
                    key: 'defaultSalePrice'
                },
            ],
        }
    }
}
</script>
<style lang="scss" scoped>
.pos-goods-select-goods{
    overflow-x: auto;
    overflow-y:auto;
    padding: 30px;
    height: 100%;
    width: 90%;
    background: #fff;
    box-sizing: border-box;
    position: absolute;
    right: 0;
    top: 0;
    overflow: hidden;
    /deep/ .pos-app-table{
        margin-bottom: 20px;
    }
}
.pos-select-goods-button{
    margin-top: 20px;
    text-align: center;
    /deep/ button{
        width: 120px;
        height: 46px;
        box-sizing: border-box;
        margin-right: 0;
        &.cancel-button{
            border:  1px solid #e5e5e5;
            margin-left: 20px;
            border-radius: 0;
        }
    }

}
.pos-top-split{
    clear: both;
    margin: 20px 0 0;
}
</style>
