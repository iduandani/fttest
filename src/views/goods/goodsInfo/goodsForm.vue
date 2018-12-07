<template>
  <div>
    <Tabs value="name2">
      <TabPane label="基本信息" name="name1">
        <div class="pos-app-form">
          <FormSwitch class="pos-form-control" v-model="switch1" title="不记库存"/>
          <FormSwitch class="pos-form-control" v-model="switch1" title="是否启用"/>
          <FormSwitch class="pos-form-control" v-model="switch1" title="是否可售"/>
          <FormInput
            class="pos-form-control"
            v-model="value11"
            title="商品编码"
            disabled
            :required="true"
          />
          <FormInput class="pos-form-control" v-model="value11" title="商品名称" :required="true"/>
          <FormInput
            class="pos-form-control"
            v-model="value11"
            title="商品简称"
            :showAppend="true"
            :required="true"
          />

          <FormInput
            class="pos-form-control"
            v-model="value11"
            title="商品条码"
            :showAppend="true"
            :required="true"
          >
            <span slot="append">
              <Button type="primary">生成</Button>
            </span>
          </FormInput>
          <FormTreeselect
            class="pos-form-control"
            v-model="model1"
            :options="optionsCategory"
            title="商品分类"
            placeholder="请选择分类"
            :required="true"
          />
          <FormSelect
            class="pos-form-control"
            v-model="model1"
            title="商品种类"
            placeholder="请选择商品种类"
            :required="true"
          />

          <FormInput
            class="pos-form-control"
            v-model="value11"
            title="销项税率"
            append-text="%"
            :showAppend="true"
            :required="true"
          />
          <FormInput
            class="pos-form-control"
            v-model="value11"
            title="保质天数"
            append-text="天"
            :showAppend="true"
          />
          <FormSelect
            class="pos-form-control"
            v-model="model1"
            title="主单位"
            placeholder="请选择单位"
            :required="true"
          />
          <div class="pos-form-split"></div>
          <div class="pos-form-tips">以下信息为选填，有助于日常经营管理</div>
        </div>
        <div class="pos-app-form pos-app-form-bottom">
          <FormSelect class="pos-form-control" placeholder="请选择品牌" v-model="model1" title="品牌"/>
          <FormInput class="pos-form-control" v-model="value11" title="拼音码"/>
          <FormInput class="pos-form-control" v-model="value11" title="备注"/>
        </div>
      </TabPane>
      <TabPane label="商品规格" name="name2">
        <div class="pos-app-form">
        <div class="pos-form-title">设置规格</div>
        <div class="pos-form-checkgroup">
           <CheckboxGroup v-model="fruit">
              <Checkbox label="颜色"></Checkbox>
              <Checkbox label="尺寸"></Checkbox>
              <Checkbox label="分量"></Checkbox>
          </CheckboxGroup>
        </div>
          <FormTable :width="960" :columns="cols" :data="dataList" />
        </div>
      </TabPane>
      <TabPane label="组合商品" name="name4">组合商品</TabPane>
      <TabPane label="商品属性" name="name5">商品属性</TabPane>
    </Tabs>
    <div class="pos-form-remark">
      <span class="info">制单人：熊大</span>
      <span class="info">复核日期：2018-10-09</span>
    </div>
  </div>
</template>
<script>
import { Tabs, TabPane } from 'iview';
import {
    FormInput,
    FormSwitch,
    FormSelect,
    FormTreeselect,
    FormTable,
} from '@/components/FormControl/index.js';
export default {
    props: {
        optionsCategory: {
            default() {
                return [];
            }
        }
    },
    components: {
        Tabs,
        TabPane,
        FormInput,
        FormSwitch,
        FormSelect,
        FormTreeselect,
        FormTable
    },
    data() {
        return {
            model1: '1',
            switch1: false,
            fruit: [],
            value11: '123',
            cols: [{
                title: '商品条码',
                render: (h)=>{
                    return h('i-input',{
                        props: {
                            width: 100
                        }
                    })
                }
            },{
                title: '商品售价',
                render: (h)=>{
                    return h('i-input',{
                        props: {
                            width: 100
                        }
                    })
                }
            },{
                title: '是否启用',
                render: (h)=>{
                    return h('i-switch',{

                    })
                }
            },{
                title: '是否可售',
                render: (h)=>{
                    return h('i-switch',{

                    })
                }
            },{
                title: '默认规格',
                render: (h)=>{
                    return [h('Checkbox',{

                    },),h('img',{
                        attrs: {
                            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544697113&di=f74b0c4fbacefc90a876aee96ba2ea40&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Ffd039245d688d43fd0bcc9c9761ed21b0ef43bf7.jpg'
                        }
                    })]
                }
            }],
            dataList: [{
                barcode: '10023514'
            }]
        };
    }
};
</script>
<style lang="scss">
.pos-app-form{
  .pos-form-title{
    color:#000;
    font-size: 14px;
    margin-bottom: 17px;
  }
  .pos-form-checkgroup{
    padding:10px 20px;
    border:1px solid #E5E5E5;
    margin-bottom: 30px;
  }
  .ivu-checkbox-inner{
    margin-right: 12px;
    border-radius: 0;
  }
  .ivu-checkbox-checked .ivu-checkbox-inner{
        border-color: #0D9ECE;
        background-color: #0D9ECE;
  }
  .ivu-checkbox-group-item{
    margin-right: 60px;
    margin-bottom: 10px;
  }
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

.pos-form-ex {
  margin-bottom: 270px;
}
.pos-app-form-bottom{
  margin-bottom: 240px;
}
.pos-form-remark {
  color: $color-main;
  margin-bottom: 30px;
  margin-left: 70px;
  .info {
    margin-right: 50px;
  }
}
</style>

