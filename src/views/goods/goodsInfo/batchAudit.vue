<template>
    <div class="pos-goods-batch-dudit">
        <div class="pos-app-query">
        <Treeselect v-model="queryParams.category" :options="optionsCategory" placeholder="请选择分类"/>
        <DateTime v-model="queryParams.date" placeholder="请选择开始/结束时间"/>
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
    </div>
</template>
<script>
import {
    SearchInput,
    DataTable,
    Treeselect,
    DateTime
} from '@/components/QueryControl/index.js';
export default {
    components: {
        SearchInput,
        DataTable,
        Treeselect,
        DateTime
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
                date: []
            },
            this.storeQuery = {
                keyword: '',
                isReview: false,
                category: null,
                date: []
            }
            this.getData()
        },
        pageChange(data) {
            this.getData()
            console.log(this.page.index,this.page.size,data);
        },
        search() {
            this.storeQuery = {
                ...this.queryParams,
                'beginTime': this.queryParams.date[0],
                'endTime': this.queryParams.date[1],
            }
            this.getData()
        },
        sort(){

        },
        selectChange(data){
            this.selectItems = data
        },
        getData(){
            this.getGoodsList({
                'key': this.storeQuery.keyword.trim(),
                'categoryId': this.storeQuery.category,
                'pageInfo.PageNumber': this.page.index,
                'pageInfo.PageSize': this.page.size,
                'beginTime': this.storeQuery.date[0],
                'endTime': this.storeQuery.date[1],
                isReview: false,
            }).then(res=>{
                const list =  res.data || []
                this.dataList = list.map((ele,i)=>{
                    return {
                        ...ele,
                        seq: (this.page.index - 1) * (this.page.size) + i + 1,
                        categoryDesc: ele.category.name,
                        isReviewDesc: ele.isReview ? '已复核' : '未复核',
                        createTime: this.$dateFormat(new Date(ele.startTime / 10000),'yyyy-MM-dd')
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
                    key: 'categoryDesc'
                },
                {
                    title: '商品售价',
                    key: 'defaultSalePrice'
                },

                {
                    title: '复核状态',
                    key: 'isReviewDesc'
                },
                {
                    title: '创建日期',
                    key: 'createTime'
                },
                {
                    title: '制单人',
                    key: 'creatorUserId'
                }
            ],
        }
    }
}
</script>
<style lang="scss" scoped>
.pos-goods-batch-dudit{
    overflow-x: auto;
    overflow-y:auto;
    padding-top: 30px;
    height: 600px;

}
</style>
