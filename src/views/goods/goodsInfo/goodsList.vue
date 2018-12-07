<template>
  <div class="pos-app-info">
    <div class="pos-app-query">
      <Treeselect v-model="queryParams.category" :options="optionsCategory" placeholder="请选择分类"/>
      <QuerySelect v-model="queryParams.type" :options="optionsType" placeholder="请选择种类"/>
      <QuerySelect v-model="queryParams.state" :options="stateOptions" placeholder="请选择状态"/>
      <QuerySelect v-model="queryParams.approve" :options="optionsApprove" placeholder="请选择复核状态"/>
      <SearchInput
        @on-search="search"
        v-model="queryParams.keyword"
        placeholder="商品编码 商品名称 条码 拼音码"
      />
    </div>
    <div class="pos-top-split"></div>
    <div class="pos-app-qurery-btn-group">
      <Button class="pos-app-qurery-btn" type="primary" @click="showForm=true">新增</Button>
      <Button class="pos-app-qurery-btn" type="primary">导入</Button>
      <Button class="pos-app-qurery-btn" type="primary">导出</Button>
      <Button class="pos-app-qurery-btn" type="primary">批量复核</Button>
    </div>
    <DataTable
      @on-sort-change="sort"
      @page-change="pageChange"
      :width="1600"
      :columns="cols"
      :total="page.total"
      :current.sync="page.index"
      :page-size.sync="page.size"
      :data="dataList"

    />
    <PosModal v-model="showForm" ok-text="保存" size="large" title="新增商品">
        <GoodsForm />
    </PosModal>
  </div>
</template>
<script>

//引入组件

import {
    QuerySelect,
    SearchInput,
    DataTable,
    Treeselect
} from '@/components/QueryControl/index.js';
import PosModal from '@/components/Modal';
import GoodsForm from './goodsForm'
//引入枚举等配置
import { GoodsStates } from '../goodsConfigs.js';

//引入混合
import listMixin from '@/mixins/listViewMixin.js';

//引入需要调用的接口
import {getGoodsType,getGoodsCategory,getApproveStatus} from '@/services/admin/enmu.js'
import {getGoodsList} from '@/services/admin/goods.js'
export default {
    mixins: [listMixin],
    components: {

        PosModal,
        QuerySelect,
        SearchInput,
        DataTable,
        Treeselect,
        GoodsForm,

    },
    data() {
        return {
            dataList: [],
            stateOptions: GoodsStates,
            // 配置项
            optionsType: [],
            optionsCategory: [],
            optionsApprove: [],
            storeQuery: {
                keyword: '',
            },
            // 查询参数
            queryParams: {
                state: '',
                keyword: '',
                type: '',
                category: undefined,
                approve: ''
            },
            //序号 商品编码 商品名称 商品简称 商品条码 单位 分类 商品售价 商品种类 复核状态 创建日期 制单人 状态
            cols: [
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
                    title: '商品简称',
                    key: 'shortName'
                },
                {
                    title: '商品条码',
                    key: 'barcode',
                    width: 168
                },
                {
                    title: '单位',
                    key: 'unitValue'
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
                    title: '商品种类',
                    key: 'f'
                },
                {
                    title: '复核状态',
                    key: 'g'
                },
                {
                    title: '创建日期',
                    key: 'creationTime'
                },
                {
                    title: '制单人',
                    key: 'i'
                },
                {
                    title: '状态',
                    key: 'status'
                },
                {
                    title: '操作',
                    width: 272,
                    render: h => {
                        return h(
                            'div',
                            {
                                class: {
                                    'table-action-div': true
                                }
                            },
                            [
                                h(
                                    'a',
                                    {
                                        class: {
                                            'table-action': true
                                        },
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        }
                                    },
                                    '查看'
                                ),
                                h(
                                    'a',
                                    {
                                        class: {
                                            'table-action': true
                                        },
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                console.log(this.showForm);
                                                this.showForm = true;
                                            }
                                        }
                                    },
                                    '编辑'
                                ),
                                h(
                                    'a',
                                    {
                                        class: {
                                            'table-action': true
                                        },
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        }
                                    },
                                    '复核'
                                )
                            ]
                        );
                    }
                }
            ],
            showForm: false
        };
    },
    methods: {
        pageChange(data) {
            this.getData()
            console.log(this.page.index,this.page.size,data);
        },
        sort(data) {
            console.log(data);
        },
        search() {
            this.storeQuery = {
                ...this.queryParams
            }
            this.getData()
        },
        getOption(){
            getGoodsType().then(res=>{
                const list = res || []
                let resultList = list.map(ele=>{
                    return {
                        name: ele.text,
                        value: ele.value
                    }

                })
                resultList.unshift({
                    name: '全部种类',
                    value: ''
                })
                this.optionsType = resultList
            }).catch(()=>{

            })
            getGoodsCategory().then(res=>{
                const list = res || []
                function _dealResult(list){
                    list = list || []
                    let resultList = list.map(ele=>{
                        return {
                            id: ele.value,
                            label: ele.label,
                            isDefaultExpanded: true,
                            children: _dealResult(ele.children)
                        }
                    })
                    return resultList.length > 0 ? resultList : undefined
                }
                let resultList = _dealResult(list)
                resultList.unshift({
                    id: '' ,
                    label: '全部分类',
                })
                this.optionsCategory = resultList
            }).catch(()=>{

            })
            getApproveStatus().then(res=>{
                const list = res || []
                let resultList = list.map(ele=>{
                    return {
                        name: ele.text,
                        value: ele.value
                    }
                })
                resultList.unshift({
                    name: '全部复核状态',
                    value: ''
                })
                this.optionsApprove = resultList
            }).catch(()=>{

            })
        },
        getData(){
            getGoodsList({
                'key': this.storeQuery.keyword.trim(),
                'isActive': '',
                'goodsType': this.storeQuery.type,
                'categoryNo': this.storeQuery.category,
                'pageInfo.PageNumber': this.page.index,
                'pageInfo.PageSize': this.page.size
            }).then(res=>{
                const list =  res.data || []
                this.dataList = list.map((ele,i)=>{
                    return {
                        ...ele,
                        seq: (this.page.index - 1) * (this.page.size) + i + 1,
                        categoryDesc: ele.category.name,
                        //goodsType:
                    }
                })
                this.page.total =  res.total
            })
        }
    },
    mounted() {
        this.getOption()
        this.getData()
    },
};
</script>

<style lang="scss" scoped>
$color-border: #e5e5e5;
$color-tips: #0d9ece;
$color-main: #000;
.pos-form-split {
  width: 100%;
  height: 1px;
  background: $color-border;
  margin: 20px 0 13px;
}
.pos-app-form {
  margin: 0 16px;
  .pos-form-control {
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
.pos-form-tips {
  font-size: 12px;
  color: $color-tips;
  margin-bottom: 25px;
}
.pos-form-remark {
  margin-top: 270px;
}
.pos-form-ex {
  margin-bottom: 270px;
}
.pos-form-remark {
  color: $color-main;
  .info {
    margin-right: 50px;
  }
}
</style>
