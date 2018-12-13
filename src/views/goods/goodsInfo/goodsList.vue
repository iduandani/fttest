<template>
  <div class="pos-app-info">
    <div class="pos-app-query">
      <Treeselect v-model="queryParams.category" :options="optionsCategory" placeholder="请选择分类"/>
      <QuerySelect v-model="queryParams.type" :options="optionsType" placeholder="请选择种类"/>
      <QuerySelect v-model="queryParams.state" :options="optionsState" placeholder="请选择状态"/>
      <QuerySelect v-model="queryParams.approve" :options="optionsApprove" placeholder="请选择复核状态"/>
      <SearchInput
        @on-search="search"
        v-model="queryParams.keyword"
        placeholder="商品编码 商品名称 条码 拼音码"
      />
    </div>
    <div class="pos-top-split"></div>
    <div class="pos-app-qurery-btn-group">
      <Button class="pos-app-qurery-btn" type="primary" @click="doAdd">新增</Button>
      <Button class="pos-app-qurery-btn" type="primary">导入</Button>
      <Button class="pos-app-qurery-btn" type="primary"><a :href="`${$baseUrl}/File/ExportGoods`" target="_blanck">导出</a></Button>
      <Button class="pos-app-qurery-btn" type="primary" @click="showBatchAudit()">批量复核</Button>
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
    <PosModal id="goods-list-modal" :show-footer="mode!='view'" v-model="showForm" ok-text="保存" size="large" title="新增商品" @on-ok="save" :loadding="loadding">
        <div>
    <Tabs v-model ="selTab">
      <TabPane :label="item.name"
      :name="item.key"
      v-for="item in tablist"
      :key="item.key"
     :disabled="curGoodsType!=='Combo'&&item.key=='group'||curGoodsType==='Combo'&&item.key=='props'"
      >
          <BaseInfo ref="baseInfo" v-if="item.key=='baseinfo'"
            :options-category="optionsCategory"
            :options-type="optionsType"
            :options-brand="optionsBrand"
            :options-unit="optionsUnit"
            :mode="mode"
            @goodsTypeChange="goodsTypeChange"
            @unitChange="unitChange"
          />
           <Spec
          ref="spec"  v-if="item.key=='spec'"
            :goods-type="curGoodsType"
            :spec-list="specList"
            :options-unit="optionsUnit"
            :cur-unit="curUnit"
             :mode="mode"
            @barcode-change="barcodeChange"
          />
           <Group v-if="item.key=='group'"
          ref="group"
            :setMaskSelect="setMaskSelect"
            :mode="mode"
          />
           <Property v-if="item.key=='props'"
          ref="props"
            :tag-list="tagList"
            :mode="mode"
           />
      </TabPane>
      <!-- <TabPane label="商品规格" name="spec">

      </TabPane>
      <TabPane label="组合商品" name="group"  :disabled="curGoodsType!=='Combo'">
          <Group
          ref="group"
            :setMaskSelect="setMaskSelect"
            :mode="mode"
          />
      </TabPane>
            <TabPane label="商品供应商"   name="supplierList"  v-if="mode=='view'">

      </TabPane>
       <TabPane label="商品有效门店"   name="storeList"  v-if="mode=='view'">

      </TabPane>
      <TabPane label="商品属性" name="props"  :disabled="curGoodsType==='Combo'">
          <Property
          ref="props"
            :tag-list="tagList"
            :mode="mode"
           />
      </TabPane> -->

    </Tabs>
    <div class="pos-form-remark">
      <span class="info">制单人：熊大</span>
      <span class="info">复核日期：2018-10-09</span>
    </div>
  </div>
    </PosModal>
    <PosModal v-model="showBatchAuditFlag" ok-text="复核" size="large" title="新增商品" @on-ok="batchAudit">
        <BatchAudit
        ref="batchAudit"
            :getGoodsList="api.getGoodsList"
            :optionsCategory="optionsCategory"
        ></BatchAudit>
    </PosModal>
    <div class="select-goods-mark" @click="maskCLose" :style="maskStyle">
        <SlectSkuGoods
        ref="slectSkuGoods"
            :getGoodsList="api.getSkuGoods"
            :optionsCategory="optionsCategory"
            @SkuGoodSelected="SkuGoodSelected"
            @SkuGoodCancel = "SkuGoodCancel"
        ></SlectSkuGoods>
    </div>
  </div>
</template>
<script>

//引入组件
import { Tabs, TabPane } from 'iview';
import {
    QuerySelect,
    SearchInput,
    DataTable,
    Treeselect
} from '@/components/QueryControl/index.js';
import PosModal from '@/components/Modal';
import BaseInfo from './baseInfo.vue'
import Spec from './spec.vue'
import Group from './group.vue'
import Property from './property'
import BatchAudit from './batchAudit'
import SlectSkuGoods from './selectSkuGoods'
//引入枚举等配置
import { GoodsStates,ApproveStates } from '../goodsConfigs.js';

//引入混合
import listMixin from '@/mixins/listViewMixin.js';

//引入需要调用的接口
import {getGoodsType} from '@/services/admin/enmu.js'
import {getGoodsCategory} from '@/services/admin/category.js'
import {getGoodsList,
    getGoodsDetails,
    getGoodsTag,
    getGoodsSpecificationTypes,
    batchAudit,
    auditGoods,
    addGoods,
    editGoods,
    addMultiGoods,
    editMultiGoods,
    getMultiGoods
} from '@/services/admin/goods.js'
import {getAllBrand} from '@/services/admin/brand.js'
import {getAllUnit} from '@/services/admin/unit.js'
import {getAllSpecification} from '@/services/admin/specification.js'
import {getAllTag} from '@/services/admin/tag.js'
import {getGoodsSkuDetails,getSkuGoods} from '@/services/admin/goodsSku.js'
export default {
    mixins: [listMixin],
    components: {
        Tabs, TabPane,
        PosModal,
        QuerySelect,
        SearchInput,
        DataTable,
        Treeselect,
        BaseInfo,
        Spec,
        Group,
        Property,
        BatchAudit,
        SlectSkuGoods
    },
    data() {
        return {
            mode: '',
            selTab: 'baseinfo',
            loadding: false,
            curUnit: '',
            api: {
                getGoodsType,
                getGoodsCategory,
                getGoodsList,
                getGoodsTag,
                getGoodsSpecificationTypes,
                getAllBrand,
                getAllUnit,
                getGoodsDetails,
                getAllSpecification,
                getAllTag,
                batchAudit,
                auditGoods,
                addGoods,
                editGoods,
                getGoodsSkuDetails,
                getSkuGoods,
                addMultiGoods,
                editMultiGoods,
                getMultiGoods
            },
            maskStyle: {
                right: 0,
                top: 0,
                width: 0,
                height: 0,
            },
            curGoodsType: '',
            dataList: [],
            optionsState: GoodsStates,
            // 配置项
            optionsType: [],
            optionsCategory: [],
            optionsApprove: ApproveStates,
            optionsBrand: [],
            optionsUnit: [],
            specList: [],
            tagList: [],
            showBatchAuditFlag: false,
            storeQuery: {
                keyword: '',
            },
            // 查询参数
            queryParams: {
                state: null,
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
                    key: 'unitValueDesc'
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
                    key: 'goodsTypeStr'
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
                },
                {
                    title: '状态',
                    key: 'isActiveDesc'
                },
                {
                    title: '操作',
                    width: 272,
                    render: (h,p) => {
                        let list =     [ h(
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
                                        this.doView(p.row,'view')
                                        // this.showForm = true;
                                    }
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
                                        this.doView(p.row,'edit')
                                        // this.showForm = true;
                                    }
                                }
                            },
                            '编辑'
                        ),

                        ]
                        if (!p.row.isReview){
                            list.push(h(
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
                                            this.audit(p.row)
                                        }
                                    }
                                },
                                '复核'
                            ))
                        }
                        return h(
                            'div',
                            {
                                class: {
                                    'table-action-div': true
                                }
                            },
                            list

                        );
                    }
                }
            ],
            showForm: false
        };
    },
    computed: {
        tablist(){
            let list = []
            if (this.mode == 'view'){
                list = [{
                    key: 'supplierList',
                    name: '商品供应商'
                },{
                    key: 'storeList',
                    name: '商品有效门店'
                }]
            }
            return [{
                key: 'baseinfo',
                name: '基础信息'
            },{
                key: 'spec',
                name: '商品规格'
            },{
                key: 'group',
                name: '组合商品'
            },

            {
                key: 'props',
                name: '商品属性'
            },
            ...list]}
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
        audit(item){
            this.$Alert.confirm({
                content: '是否复核通过' + item.name + '?',
            }).then(()=>{
                return this.api.auditGoods({
                    id: item.id
                })
                //this.$Alert.success('操作成功','成功')
            }).then(()=>{
                this.$Alert.success('操作成功','成功')
            }).catch(e=>{
                if (e.code == 'confirmCancel'){
                    return
                }
                else {
                    this.$Alert.error(e.message)
                }
            });
        },
        getCategroyNo(id){
            const  _findItem = function (list){
                list = list || []
                let result = null
                for (let i = 0;i < list.length;i++){
                    let ele = list[i]
                    if (ele.id == id){
                        result = ele
                        break
                    } else {
                        result = _findItem(ele.children)
                        if (result){
                            break
                        }
                    }
                }
                return result
            }
            const list = this.optionsCategory
            let item = _findItem(list) || {}
            return item.code
        },
        doAdd(){
            this.mode = 'add'
            this.$refs.baseInfo[0].initVal()
            this.$refs.spec[0].initVal()
            this.$refs.props[0].initVal()
            this.$refs.group[0].initVal()
            this.selTab = 'baseinfo'
            this.$nextTick(()=>{
                this.showForm = true
            })

        },
        doView(item,mode){
            this.mode = mode
            Promise.all([
                this.api.getGoodsDetails({id: item.id}),
                this.api.getGoodsSpecificationTypes({id: item.id}),
                this.api.getGoodsTag({id: item.id}),
                this.api.getGoodsSkuDetails({id: item.id}),
                this.api.getMultiGoods({id: item.id})
            ]).then(res=>{
                let baseInfo = res[0]
                this.$refs.baseInfo[0].initVal(baseInfo)
                let props = res[2]
                this.$refs.props[0].initVal(props)
                let specList = res[1]
                this.$refs.spec[0].initVal(specList)

                let goodsSkuDetailsList = res[3]
                let skuGoodsList = [],skuUnitList = []
                for (let i = 0;i < goodsSkuDetailsList.length;i++){
                    let item = goodsSkuDetailsList[i]
                    if (item.alianBarcode){
                        skuUnitList.push(item)
                    } else {
                        skuGoodsList.push(item)
                    }
                }
                this.$refs.spec[0].initVal(specList,skuGoodsList,skuUnitList)

                let groupList = res[4]
                this.$refs.group[0].initVal(groupList)

                this.selTab = 'baseinfo'
                this.$nextTick(()=>{
                    this.showForm = true
                })

                console.log(res)
            })
        },
        save(){
            let baseInfo = {
                ...this.$refs.baseInfo[0].formData,
            }
            if (baseInfo.name.trim() === ''){
                this.$Alert.warn('商品名称不能为空')
                return
            }
            if (baseInfo.shortName.trim() === ''){
                this.$Alert.warn('商品简称不能为空')
                return
            }
            if (!baseInfo.categoryId){
                this.$Alert.warn('商品分类不能为空')
                return
            }
            if (!baseInfo.goodsType){
                this.$Alert.warn('商品种类不能为空')
                return
            }
            if (baseInfo.rate.toString().trim() === ''){
                this.$Alert.warn('销项税率不能为空')
                return
            }
            if (!baseInfo.unitValue){
                this.$Alert.warn('主单位不能为空')
                return
            }
            let goodsSpecificationTypes = [
                ...this.$refs.spec[0].curSelSpecList
            ]
            let goodsSpecList = [
                ...this.$refs.spec[0].dataList
            ]
            // if (goodsSpecificationTypes.length <= 0){
            //     this.$Alert.warn('请至少选择一种规格')
            //     return
            // }
            let goodsSkus = []

            for (let i = 0;i < goodsSpecList.length;i++){
                let ele = goodsSpecList[i]
                if (ele.barcode.trim() === ''){
                    this.$Alert.warn('不能存在条码为空的规格')
                    return
                }
                if (ele.defaultSalePrice.toString().trim() === ''){
                    this.$Alert.warn(`条码为${ele.barcode}的规格，售价不能为空`)
                    return
                }
                let obj = {
                    id: ele.id,
                    barcode: ele.barcode,
                    isDefault: ele.isDefault,
                    goodsUnitId: baseInfo.unitValue,
                    name: baseInfo.name,
                    multiple: 1,
                    goodsSpecificationValues: [],
                    isActive: ele.isActive,
                    defaultSalePrice: ele.defaultSalePrice,
                    goodsSkuType: 'Normal',
                    isSaleable: ele.isSaleable,
                    unitValue: baseInfo.unitValue
                }
                for (let j = 0;j < goodsSpecificationTypes.length;j++){
                    let spec = goodsSpecificationTypes[j]
                    if (!ele[spec.specificationTypeId]){
                        this.$Alert.warn(`条码为${ele.barcode}的规格，请选择${spec.type}项`)
                        return
                    }
                    obj.goodsSpecificationValues.push({
                        'specificationValueId': ele[spec.specificationTypeId],
                        // id: ele[spec.specificationTypeId],
                        'value': ele[spec.specificationTypeId],
                    })
                }
                goodsSkus.push(obj)
            }
            let goodsSpecUnitConvertList = this.$refs.spec[0].showEx ? [
                ...this.$refs.spec[0].unitConvertDataList
            ] : []
            for (let i = 0;i < goodsSpecUnitConvertList.length;i++){
                let ele = goodsSpecUnitConvertList[i]
                if (ele.barcode.trim() === ''){
                    this.$Alert.warn('不能存在条码为空的规格单位换算')

                    return
                }
                if (!ele.unitValue){
                    this.$Alert.warn(`条码为${ele.barcode}的规格单位换算，请选择单位`)
                    return
                }
                if (!ele.alianBarcode){
                    this.$Alert.warn(`条码为${ele.barcode}的规格单位换算，请选择关联商品条码`)
                    return
                }
                if (ele.multiple.toString().trim() === ''){
                    this.$Alert.warn(`条码为${ele.barcode}的规格单位换算，请输入换算数量`)
                    return
                }
                console.log(ele.defaultSalePrice.toString())
                if (ele.defaultSalePrice.toString().trim() === ''){
                    this.$Alert.warn(`条码为${ele.barcode}的规格单位换算，请输入售价`)
                    return
                }
                let obj = {
                    barcode: ele.barcode,
                    isDefault: ele.isDefault,
                    name: baseInfo.name,
                    multiple: ele.multiple,
                    goodsSpecificationValues: [],
                    isActive: ele.isActive,
                    defaultSalePrice: ele.defaultSalePrice,
                    goodsSkuType: 'Conversion',
                    isSaleable: ele.isSaleable,
                    goodsUnitId: baseInfo.unitValue,
                    alianBarcode: ele.alianBarcode,
                    unitValue: ele.unitValue
                }
                goodsSkus.push(obj)
            }
            let goodsTags = []
            if (baseInfo.goodsType == 'Combo'){
                let sku = goodsSkus[0]
                let list = []
                let groupList = this.$refs.group[0].groupList || []
                for (let i = 0;i < groupList.length;i++){
                    let group = groupList[i]
                    if (group.name.trim() === ''){
                        this.$Alert.warn('分组名称不能为空')
                        return
                    }
                    if (group.type != 'static' && group.selectCount.toString().trim() === ''){
                        this.$Alert.warn('可选分组选择数量不能为空')
                        return
                    }
                    if (group.dataList.length < 2){
                        this.$Alert.warn('请至少选择两种商品')
                        return
                    }
                    let obj = {
                        'selectCount': group.type === 'static' ? groupList.length : group.selectCount,
                        'total': groupList.length,
                        'isOptional': group.type === 'static',
                        'Name': group.name,
                        multiGoodsItems: []
                    }
                    let goodsList = group.dataList || []
                    for (let j = 0;j < groupList.length;j++){
                        let goods = goodsList[j]
                        if (goods.count.toString() === ''){
                            this.$Alert.warn(`商品编码为${goods.id}的商品，默认数量不能为空`)
                            return
                        }
                        if (goods.adscititiousPrice.toString() === ''){
                            this.$Alert.warn(`商品编码为${goods.id}的商品，商品加价不能为空`)
                            return
                        }

                        obj.multiGoodsItems.push({
                            'itemId': goods.id,
                            'count': goods.count,
                            'adscititiousPrice': goods.adscititiousPrice,
                            'IsDefault': goods.isDefault,
                        })
                    }
                    list.push(obj)


                }
                sku.multiGoodsItemGroups = list

            } else {
                goodsTags = (this.$refs.props[0].selPropsShowList || []).map(ele=>{
                    return {
                        'tagId': ele.id,
                        'name': ele.name,
                        'sortNo': ele.sortNo,
                    }
                })

            }

            let data = {
                ...baseInfo,
                categoryNo: this.getCategroyNo(baseInfo.categoryId),
                goodsTags,
                goodsSkus,
                goodsSpecificationTypes
            }
            if (baseInfo.goodsType == 'Combo'){
                console.log(JSON.stringify(data))
                if (!baseInfo.id){
                    delete baseInfo.id
                    this.api.addMultiGoods(data).then(()=>{

                    }).then(()=>{
                        this.$Alert.success('操作成功')
                        this.showForm = false
                        this.getData()
                    }).catch(e=>{
                        this.$Alert.error(e.message)
                    });
                } else {
                    this.api.editMultiGoods(data).then(()=>{

                    }).then(()=>{
                        this.$Alert.success('操作成功')
                        this.showForm = false
                        this.getData()
                    }).catch(e=>{
                        this.$Alert.error(e.message)
                    });
                }
                return
            }

            if (!baseInfo.id){
                delete baseInfo.id
                this.api.addGoods(data).then(()=>{

                }).then(()=>{
                    this.$Alert.success('操作成功')
                    this.showForm = false
                    this.getData()
                }).catch(e=>{
                    this.$Alert.error(e.message)
                });
            } else {
                this.api.editGoods(data).then(()=>{

                }).then(()=>{
                    this.$Alert.success('操作成功')
                    this.showForm = false
                    this.getData()
                }).catch(e=>{
                    this.$Alert.error(e.message)
                });
            }




        },
        getOption(){
            this.api.getGoodsType().then(res=>{
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
            this.api.getGoodsCategory().then(res=>{
                const list = res || []
                function _dealResult(list){
                    list = list || []
                    let resultList = list.map(ele=>{
                        return {
                            id: ele.value,
                            label: ele.label,
                            code: ele.code,
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
            this.api.getAllBrand().then(res=>{
                const list = res || []
                let resultList = list.map(ele=>{
                    return {
                        name: ele.name,
                        value: ele.id
                    }
                })
                this.optionsBrand = resultList
            }).catch(()=>{

            })
            this.api.getAllUnit().then(res=>{
                const list = res || []
                let resultList = list.map(ele=>{
                    return {
                        name: ele.value,
                        value: ele.id
                    }
                })
                this.optionsUnit = resultList
            }).catch(()=>{

            })
            this.api.getAllSpecification().then(res=>{
                this.specList = res
            }).catch(()=>{

            })
            this.api.getAllTag().then(res=>{
                this.tagList = res
            }).catch(()=>{

            })
        },
        getData(){
            this.api.getGoodsList({
                'key': this.storeQuery.keyword.trim(),
                'isActive': this.storeQuery.state ? (this.storeQuery.state === 1 ? false : true) : '',
                'isReview': this.storeQuery.approve ? (this.storeQuery.approve === 1 ? false : true) : '',
                'goodsType': this.storeQuery.type,
                'categoryId': this.storeQuery.category,
                'pageInfo.PageNumber': this.page.index,
                'pageInfo.PageSize': this.page.size
            }).then(res=>{
                const list =  res.data || []
                this.dataList = list.map((ele,i)=>{
                    return {
                        ...ele,
                        seq: (this.page.index - 1) * (this.page.size) + i + 1,
                        categoryDesc: ele.category.name,
                        isReviewDesc: ele.isReview ?  '已复核' : '未复核' ,
                        isActiveDesc: ele.isActive ? '启用' : '禁用',
                        unitValueDesc: (this.optionsUnit.find(cele=>cele.value == ele.unitValue) || {}).name,
                        createTime: this.$dateFormat(new Date(ele.startTime / 10000),'yyyy-MM-dd')
                        //goodsType:
                    }
                })
                this.page.total =  res.total
            })
        },
        goodsTypeChange(data){
            this.curGoodsType = data
        },
        unitChange(data){
            this.curUnit = this.optionsUnit.find(ele=>ele.value == data)
        },
        batchAudit(){
            let list =  this.$refs.batchAudit.selectItems || []
            if (list.length <= 0){
                this.$Alert.warn('请至少选择一条数据','提示')
                return
            }
            let data = list.map(ele=>ele.id)
            console.log(data)
            this.api.batchAudit(data).then(res=>{
                this.$Alert.success('操作完成','提示')
                this.showBatchAuditFlag = false
                console.log(res)
            }).catch(e=>{
                let msg = e.message || '操作失败'
                this.$Alert.error(msg,'错误')
                console.log(msg)
            })
        },
        showBatchAudit(){
            this.$refs.batchAudit.init()
            this.showBatchAuditFlag = true

        },
        barcodeChange(data){
            console.log(data)
            this.$refs.baseInfo[0].formData.barcode = data
        },
        setMaskSelect(group){
            let modalInfo = this.getModalInfo()
            this.maskStyle = {
                right: modalInfo.right + 'px',
                top: modalInfo.top + 'px',
                width: modalInfo.width + 'px',
                height: modalInfo.height + 'px'
            }
            this.$refs.slectSkuGoods.setSelectedList(group.dataList)
            this.$refs.slectSkuGoods.init()
        },
        SkuGoodSelected(data){
            this.$refs.group[0].setData(data)
            this.maskCLose()
        },
        SkuGoodCancel(){
            this.maskCLose()
        },
        getModalInfo(){
            let domModal = document.getElementsByClassName('ivu-modal-content')[0]
            let obj = {
                right: domModal.getBoundingClientRect().left,
                top: domModal.getBoundingClientRect().top,
                width: domModal.clientWidth,
                height: domModal.clientHeight,
            }
            return obj
        },
        maskCLose(){
            this.maskStyle.width = 0;
        }
    },
    mounted() {
        this.getOption()
        this.getData()
    },
};
</script>

<style lang="scss">
.pos-app-form {
  .pos-form-title {
    color: #000;
    font-size: 14px;
    margin-bottom: 17px;
  }
  .pos-form-checkgroup {
    padding: 10px 20px;
    border: 1px solid #e5e5e5;
    margin-bottom: 30px;
  }
  .ivu-checkbox-inner {
    margin-right: 12px;
    border-radius: 0;
  }
  .ivu-checkbox-checked .ivu-checkbox-inner {
    border-color: #0d9ece;
    background-color: #0d9ece;
  }
  .ivu-checkbox-group-item {
    margin-right: 60px;
    margin-bottom: 10px;
  }

}
 .select-goods-mark{
    position: fixed;
    z-index: 9999;
    background: rgba(0,0,0,.3);
    transition: width .5s;
    overflow: hidden;
  }
</style>
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
  color: $color-main;
  margin-bottom: 30px;
  margin-left: 70px;
  .info {
    margin-right: 50px;
  }
}
.pos-com-goods{
  margin-bottom: 30px;
}
.goods-group{
    color:#000;
    font-size: 14px;
    margin-bottom: 20px;
    .top-button{
        margin-left: 20px;
        font-size: 14px;
        height: 38px;
           line-height: 26px;
    vertical-align: middle
    }
}


</style>
