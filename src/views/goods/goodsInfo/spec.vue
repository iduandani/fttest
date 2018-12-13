<template>
    <div class="pos-goods-spec">
        <div class="pos-app-form">
          <div class="pos-form-title">设置规格</div>
          <div class="pos-form-checkgroup" v-show="goodsType!='Combo'">
            <CheckboxGroup v-model="selSpec">
              <Checkbox :disabled="mode=='view'" :label="spec.id" v-for="spec in specList" :key="spec.id">{{spec.type}}</Checkbox>
            </CheckboxGroup>
          </div>
          <div class="pos-form-table-container">
            <FormTable :width="1060" :columns="cols" :data="dataList"/>
            <div class="pos-form-table-add" @click="addLine" v-show="goodsType!='Combo'">
              <span >
                <img :src="addImg">继续新增
              </span>
            </div>
          </div>
           <div class="pos-form-table-container" v-show="goodsType!='Combo'">
             <div class="pos-form-sub-tips">
               不同规格间有单位数量换算<span class="sub-tips-right"><i-switch :disabled="mode == 'view'" v-model="showEx"></i-switch></span>
            </div>
           </div>
          <div class="pos-form-table-container" v-show="showEx">
            <FormTable :width="1060" :columns="cols2" :data="unitConvertDataList"/>
            <div class="pos-form-table-add" @click="unitConvertAddLine">
              <span>
                <img :src="addImg">继续新增
              </span>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import {
    FormTable
} from '@/components/FormControl/index.js';
export default {
    components: {
        FormTable
    },
    props: {
        curUnit: {
            default(){
                return {}
            }
        },
        goodsType: {
            default: ''
        },
        specList: {
            default(){
                return []
            }
        },
        optionsUnit: {
            default(){
                return []
            }
        },
        mode: {

        }
    },
    data(){
        return {
            selectSkuList: [],
            selSpec: [],
            dataList: [
                {
                    barcode: new Date().getTime() + '',
                    defaultSalePrice: '',
                    isActive: true,
                    isSaleable: true,
                    isDefault: true
                }
            ],
            unitConvertDataList: [],
            showEx: false,
            addImg: require('@/assets/form-table-add.png'),
            subImg: require('@/assets/form-table-sub.png'),
            cols2: [
                {
                    title: '商品条码',
                    render: (h, p) => {
                        return h('i-input', {
                            props: {
                                width: 100,
                                value: p.row.barcode,
                                disabled: this.mode == 'view'
                            },
                            on: {
                                'on-blur': event => {
                                    this.setUnitVal(p.index, 'barcode', event.target.value);
                                }
                            }
                        });
                    }
                },
                {
                    title: '单位',
                    render: (h,p) => {
                        return h('Select', {
                            style: {
                                width: '100px',

                            },
                            props: {
                                value: p.row.unitValue,
                                disabled: this.mode == 'view'
                            },
                            on: {
                                'on-change': event => {
                                    console.log(event)
                                    this.setUnitVal(p.index, 'unitValue', event);
                                }
                            }
                        },this.optionsUnit.map(item=>{
                            return h('Option',{
                                props: {
                                    value: item.value
                                }
                            },item.name)}));
                    }
                },
                {
                    title: '等于',
                    render: h => {
                        return h('span', {}, '=');
                    }
                },
                {
                    title: '商品条码',
                    render: (h, p) => {
                        return h('Select', {
                            props: {
                                width: 100,
                                value: p.row.alianBarcode,
                                disabled: this.mode == 'view'
                            },
                            on: {
                                'on-change': event => {
                                    this.setUnitVal(p.index, 'alianBarcode', event);
                                }
                            }
                        },this.curBarCodeList.map(item=>{
                            return h('Option',{
                                props: {
                                    value: item.value
                                }
                            },item.value)
                        }));
                    }
                },
                {
                    title: '数量',
                    render: (h, p) => {
                        return h('i-input', {
                            props: {
                                value: p.row.multiple,
                                disabled: this.mode == 'view'
                            },
                            on: {
                                'on-blur': event => {
                                    this.setUnitVal(p.index, 'multiple', event.target.value);
                                }
                            }
                        });
                    }
                },
                {
                    title: '单位',
                    render: h => {
                        return h('span', {

                        },this.curUnit.name ? this.curUnit.name : '请选择主单位');
                    }
                },
                {
                    title: '售价',
                    render: (h, p) => {
                        return h('i-input', {
                            props: {
                                value: p.row.defaultSalePrice,
                                disabled: this.mode == 'view'
                            },
                            on: {
                                'on-blur': event => {
                                    this.setUnitVal(p.index, 'defaultSalePrice', event.target.value);
                                }
                            }
                        });
                    }
                },
                {
                    title: '启用',
                    render: (h, p) => {
                        return h('i-switch', {
                            props: {
                                value: p.row.isActive,
                                disabled: this.mode == 'view'
                            },
                            on: {
                                'on-change': event => {
                                    console.log(event);
                                    this.setUnitVal(p.index, 'isActive', event);
                                }
                            }
                        });
                    }
                },
                {
                    title: '可售',
                    render: (h, p) => {
                        return [h('i-switch', {
                            props: {
                                value: p.row.isSaleable,
                                disabled: this.mode == 'view'
                            },
                            on: {
                                'on-change': event => {
                                    console.log(event);
                                    this.setUnitVal(p.index, 'isSaleable', event);
                                }
                            }
                        }),h('img', {
                            attrs: {
                                src: this.subImg
                            },
                            class: {
                                'pos-form-table-sub': true
                            },
                            style: {
                                top: p.index * 38 + 44 + 9 + 'px'
                            },
                            on: {
                                click: () => {
                                    this.delUnitItem(p.index);
                                }
                            }
                        })];
                    }
                }
            ]
        }
    },
    methods: {
        unitConvertAddLine(){
            if (this.mode == 'view'){
                return
            }
            this.unitConvertDataList.push({
                barcode: new Date().getTime() + '',
                defaultSalePrice: '',
                multiple: '1',
                isActive: true,
                isSaleable: true,
            });
        },
        addLine() {
            if (this.mode == 'view'){
                return
            }
            let isDefault = this.dataList.length === 0
            this.dataList.push({
                barcode: new Date().getTime() + '',
                defaultSalePrice: '',
                isActive: true,
                isSaleable: true,
                isDefault
            });
        },
        delItem(index) {
            if (this.mode == 'view'){
                return
            }
            if (this.dataList.length <= 1){
                return
            }
            this.dataList.splice(index, 1);
        },
        delUnitItem(index) {
            if (this.mode == 'view'){
                return
            }
            this.unitConvertDataList.splice(index, 1);
        },
        setVal(index, props, data) {
            let item = this.dataList[index];
            this.$set(item, props, data);
            if (item.isDefault){
                this.$emit('barcode-change',item.barcode)
            }
        },
        setUnitVal(index, props, data) {
            let item = this.unitConvertDataList[index];
            this.$set(item, props, data);
        },
        clearAllDefault(){
            for (let i = 0;i < this.dataList.length;i++){
                let item = this.dataList[i]
                this.$set(item,'isDefault',false)
            }
        },
        initVal(specList,skuGoodsList,skuUnitList){
            specList = specList || []
            skuGoodsList = skuGoodsList || [{
                barcode: new Date().getTime() + '',
                defaultSalePrice: '',
                isActive: true,
                isSaleable: true,
                isDefault: true
            }]
            skuUnitList = skuUnitList || []
            if (skuUnitList.length > 0){
                this.showEx = true
            } else {
                this.showEx = false
            }
            this.selSpec = specList.map(ele=>ele.specificationTypeId)
            this.dataList = skuGoodsList.map(ele=>{
                let obj = {
                    ...ele,
                }
                let list = ele.goodsSpecificationValues || []
                list.forEach(item=>{
                    obj[item.specificationValue.specificationTypeId] = item.specificationValue.id
                })
                delete obj.goodsSpecificationValues
                return obj
            })
            this.$nextTick(()=>{
                this.unitConvertDataList = skuUnitList.map(ele=>{
                    return {
                        ...ele,
                        unitValue: parseInt(ele.unitValue)
                    }
                })
            })
        },


    },
    computed: {
        curSelSpecList(){
            return this.selSpec.map(id=>{
                let  item = this.specList.find(ele=>ele.id == id) || {}
                return {
                    specificationTypeId: id,
                    type: item.type
                }
            })
        },
        curBarCodeList(){
            return this.dataList.map(ele=>{
                return {
                    label: ele.barcode,
                    value: ele.barcode
                }
            })
        },
        cols() {
            const list = this.selSpec || [];
            let SelColsList = list.map(ele => {
                let cele = this.specList.find(cele=>ele === cele.id) || {}
                return {
                    title: cele.type,
                    render: (h,p) => {

                        let list = cele.specificationValues || []
                        return h('Select', {
                            props: {
                                width: 100,
                                value: p.row[cele.id],
                                disabled: this.mode == 'view'
                            },
                            on: {
                                'on-change': (data)=>{
                                    console.log(data)
                                    this.setVal(p.index,cele.id,data)
                                }
                            }
                        },list.map(item => {
                            return h('Option', {
                                props: {
                                    value: item.id
                                }
                            },item.value)
                        }));
                    }
                };
            });
            return [
                {
                    title: '商品条码',
                    render: (h, p) => {
                        return h('i-input', {
                            props: {
                                width: 100,
                                value: p.row.barcode,
                                disabled: this.mode == 'view'
                            },
                            on: {
                                'on-blur': event => {
                                    this.setVal(p.index, 'barcode', event.target.value);
                                }
                            }
                        });
                    }
                },
                ...SelColsList,
                {
                    title: '商品售价',
                    render: (h,p) => {
                        return h('i-input', {
                            style: {
                                width: '100px'
                            },
                            props: {
                                value: p.row.defaultSalePrice,
                                disabled: this.mode == 'view'
                            },
                            on: {
                                'on-blur': event => {
                                    this.setVal(p.index, 'defaultSalePrice', event.target.value);
                                }
                            }
                        });
                    }
                },
                {
                    title: '是否启用',
                    render: (h,p) => {
                        return h('i-switch', {
                            props: {
                                value: p.row.isActive,
                                disabled: this.mode == 'view'
                            },
                            on: {
                                'on-change': event => {
                                    console.log(event)
                                    this.setVal(p.index, 'isActive', event);
                                }
                            }
                        });
                    }
                },
                {
                    title: '是否可售',
                    render: (h, p) => {
                        return h('i-switch', {
                            props: {
                                value: p.row.isSaleable,
                                disabled: this.mode == 'view'
                            },
                            on: {
                                'on-change': event => {
                                    this.setVal(p.index, 'isSaleable', event);
                                }
                            }
                        });
                    }
                },
                {
                    title: '默认规格',
                    width: 100,
                    render: (h, p) => {

                        let renderList =  [
                            h('Checkbox', {
                                props: {
                                    value: p.row.isDefault,
                                    disabled: this.mode == 'view'
                                },
                                on: {
                                    'on-change': (event)=>{
                                        if (event){
                                            this.clearAllDefault()
                                        }

                                        this.setVal(p.index, 'isDefault', event);
                                    }
                                }
                            })];
                        if (this.goodsType != 'Combo'){
                            renderList.push(h('img', {
                                attrs: {
                                    src: this.subImg
                                },
                                class: {
                                    'pos-form-table-sub': true
                                },
                                style: {
                                    top: p.index * 38 + 44 + 9 + 'px'
                                },
                                on: {
                                    click: () => {
                                        this.delItem(p.index);
                                    }
                                }
                            }))
                        }
                        return renderList
                    }
                }
            ];
        }
    }
}
</script>
<style lang="scss" scoped>
$color-border: #e5e5e5;
$color-tips: #0d9ece;
$color-main: #000;
.pos-app-form {
  /deep/ .ivu-checkbox-group-item {
    margin-right: 60px;
    margin-bottom: 10px;
  }
}
.pos-form-sub-tips{
  font-size: 14px;
  color: #999999;
}

</style>
