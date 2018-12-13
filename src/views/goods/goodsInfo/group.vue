<template>
  <div class="pos-goods-group">
    <div class="pos-app-form goods-group">组合商品设置
      <Button class="top-button" type="primary" @click="addGroup('static')">添加必选组</Button>
      <Button class="top-button" type="primary" @click="addGroup()">添加可选组</Button>
    </div>
    <div class="pos-app-form">
      <template  v-for="(group,index) in groupList">
         <div class="pos-form-table-container pos-com-goods"  :key="index">
        <div class="pos-form-table-header">
          <span class="seq">{{index+1}}</span>
          <span class="title">{{group.type=='static'?'必选':'可选'}}分组</span>
          <span class="input">
            <i-input :disabled="mode=='view'" placeholder="请输入组名" v-model="group.name"></i-input>
          </span>
          <span class="count-input"  v-if="group.type!='static'">
            <span class="count">{{group.dataList.length}}</span>选
            <i-input :disabled="mode=='view'"  class="count-input" v-model="group.selectCount" placeholder="请输入数量"></i-input>
          </span>
          <span class="del" @click="delGroup(index)">
            <img :src="delImg" alt="">
          </span>
        </div>
        <FormTable :width="group.type=='static'?960:1060" :columns="group.cols" :data="group.dataList"/>
        <div class="pos-form-table-add" @click="addLine(group)">
          <span>
            <img :src="addImg">继续新增
          </span>
        </div>

      </div>
      </template>

    </div>

  </div>
</template>
<script>
import {
    FormTable
} from '@/components/FormControl/index.js';
export default {
    props: {
        setMaskSelect: {},
        mode: {}
    },
    components: {
        FormTable
    },

    data(){
        return {
            maskStyle: {
                width: 0,
                height: 0,
            },
            groupList: [],
            selectSkuList: [],
            fruit: [],
            dataList: [
                {
                    barcode: '10023514',
                    issale: false
                }
            ],
            showEx: false,
            addImg: require('@/assets/form-table-add.png'),
            subImg: require('@/assets/form-table-sub.png'),
            delImg: require('@/assets/icon-del.png'),

        }
    },
    methods: {
        initVal(list){
            list = list || []

            this.groupList = list.map(ele=>{

                let obj =  {
                    name: ele.groupName,
                    isOptional: ele.isOptional,
                    selectCount: ele.selectCount,
                    type: ele.isOptional ? 'static' : '',
                    dataList: ele.items.map(cele=>{
                        return {
                            ...cele,
                            id: cele.itemId,
                            name: cele.itemName,
                            specificationValues: cele.goodsSpecValue
                        }
                    })
                }
                obj.cols = this.getCols(obj)
                return obj

            })
        },
        addGroup(type){
            if (this.mode == 'view'){
                return
            }
            let group = {
                type,
                name: '',
                dataList: []
            }
            group.cols = this.getCols(group)
            this.groupList.push(group)
        },
        delGroup(index){
            if (this.mode == 'view'){
                return
            }
            this.groupList.splice(index, 1);
        },
        setData(data){
            data = data || []
            data.forEach(ele=>{
                this.selGroup.dataList.push({
                    ...ele,
                    isDefault: this.selGroup.type == 'static',
                    adscititiousPrice: 0,
                    count: this.selGroup.type == 'static' ? 1 : 0,
                })
            })
        },
        setVal(group,index, props, data) {
            let item = group.dataList[index];
            this.$set(item, props, data);
        },
        addLine(group) {
            if (this.mode == 'view'){
                return
            }
            this.selGroup = group
            this.setMaskSelect(group)
            //let modalInfo = this.getModalInfo()

        },
        getModalInfo(){
            let domModal = document.getElementsByClassName('ivu-modal-content')[0]
            let obj = {
                left: domModal.getBoundingClientRect().left,
                top: domModal.getBoundingClientRect().top,
                width: domModal.clientWidth,
                height: domModal.clientHeight,
            }
            return obj
        },
        delItem(group,index) {
            if (this.mode == 'view'){
                return
            }

            group.dataList.splice(index, 1);
        },
        checkedDefault(group,index,event){
            if (!event){
                return event
            }
            if (!group.selectCount || group.selectCount < 2){
                this.$Alert.warn('请先输入正确的可选数量')
                return false
            }
            let sum = 0
            group.dataList.forEach(ele=>{
                if (ele.isDefault){
                    let count = parseInt(ele.count)||0
                    sum += count
                }
            })
            let count = group.dataList[index].count
            count=parseInt(count)||0
            sum += count
            if (sum > group.selectCount){
                this.$Alert.warn('所选默认项的默认数量之和不能超过可选数量')
                return false
            }
            return group.selectCount >= sum
        },
        getCols(group){
            let cols =  [
                {
                    title: '商品编码',
                    key: 'id'
                },{
                    title: '商品名称',
                    key: 'name'
                },{
                    title: '商品条码',
                    key: 'barcode'
                },{
                    title: '商品分类',
                    key: 'goodsCategoryName'
                },{
                    title: '规格',
                    key: 'specificationValues'
                },{
                    title: '商品售价',
                    key: 'salePrice'
                },{
                    title: '默认',
                    render: (h, p) => {
                        console.log(p);
                        return [
                            h('Checkbox', {
                                props: {
                                    value: p.row.isDefault,
                                    disabled: this.mode == 'view' || group.type == 'static'
                                },
                                on: {
                                    'on-change': (event)=>{
                                        let flag = this.checkedDefault(group,p.index,event)
                                        console.log(flag)
                                        this.setVal(group,p.index, 'isDefault', flag);
                                        group.dataList = [...group.dataList]
                                    }
                                }
                            }),
                            h('img', {
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
                                        this.delItem(group,p.index);
                                    }
                                }
                            })
                        ];
                    }
                },{
                    title: '默认数量',
                    render: (h,p) => {
                        return h('i-input', {
                            style: {
                                width: '100px'
                            },props: {
                                value: p.row.count,
                                disabled: this.mode == 'view'
                            },
                            on: {
                                'on-blur': event => {
                                    this.setVal(group,p.index, 'count', event.target.value);
                                    if (group.type != 'static'){
                                        this.setVal(group,p.index, 'isDefault', false);
                                        group.dataList = [...group.dataList]
                                    }
                                }
                            }
                        });
                    }
                }]
            if (group.type != 'static'){
                cols.push({
                    title: '加价',
                    render: (h,p) => {
                        return h('i-input', {
                            style: {
                                width: '100px'
                            },props: {
                                value: p.row.adscititiousPrice,
                                disabled: this.mode == 'view'
                            },
                            on: {
                                'on-blur': event => {
                                    this.setVal(group,p.index, 'adscititiousPrice', event.target.value);
                                }
                            }
                        });
                    }
                })
            }
            return cols
        }
    },
    computed: {

    }
}
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
 .pos-form-table-header{
      .del{
        float: right;
        cursor: pointer;
      }
    }
 .select-goods-mark{

      position: absolute;
      background: #0d9ece;

  }
</style>
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
</style>

