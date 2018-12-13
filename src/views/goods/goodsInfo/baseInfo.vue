<template>
  <div class="pos-goods-baseinfo">
    <div class="pos-app-form">
      <FormSwitch  :disabled="mode=='view'" class="pos-form-control" v-model="formData.isNotStore" title="不记库存"/>
      <FormSwitch   :disabled="mode=='view'" class="pos-form-control" v-model="formData.isActive" title="是否启用"/>
      <FormSwitch  :disabled="mode=='view'" class="pos-form-control" v-model="formData.isSale" title="是否可售"/>
      <FormInput
        class="pos-form-control"
        v-model="formData.id"
        title="商品编码"
        disabled
        :required="true"
      />
      <FormInput class="pos-form-control"
       :disabled="mode=='view'"
      v-model="formData.name" title="商品名称" :required="true"/>
      <FormInput
        class="pos-form-control"
        v-model="formData.shortName"
        title="商品简称"
        :disabled="mode=='view'"
        :required="true"
      />

      <FormInput
        class="pos-form-control"
        v-model="formData.barcode"
        title="商品条码"
        disabled
        :required="true"
      >
        <!-- <span slot="append">
          <Button type="primary">生成</Button>
        </span>-->
      </FormInput>
      <FormTreeselect
        class="pos-form-control"
        v-model="formData.categoryId"
        :options="formOptionsCategory"
        title="商品分类"
        :disabled="mode=='view'"
        placeholder="请选择分类"
        :required="true"
      />
      <FormSelect
        class="pos-form-control"
        v-model="formData.goodsType"
        :options="formOptionsType"
        title="商品种类"
        :disabled="mode=='edit'||mode=='view'"
        placeholder="请选择商品种类"
        :required="true"
        @change="goodsTypeChange"
      />

      <FormInput
        class="pos-form-control"
        v-model="formData.rate"
        title="销项税率"
        append-text="%"
        :disabled="mode=='view'"
        :showAppend="true"
        :required="true"
      />
      <FormInput
        class="pos-form-control"
        v-model="formData.day"
        :disabled="mode=='view'"
        title="保质天数"
        append-text="天"
        :showAppend="true"
      />
      <FormSelect
        class="pos-form-control"
        v-model="formData.unitValue"
        :disabled="mode=='view'"
        title="主单位"
        :options="optionsUnit"
        placeholder="请选择单位"
        :required="true"
        @change="unitChange"
      />
      <div class="pos-form-split"></div>
      <div class="pos-form-tips">以下信息为选填，有助于日常经营管理</div>
    </div>
    <div class="pos-app-form pos-app-form-bottom">
      <FormSelect
        class="pos-form-control"
        placeholder="请选择品牌"
        :options="optionsBrand"
        :disabled="mode=='view'"
        v-model="formData.brandId"
        title="品牌"
      />
      <FormInput class="pos-form-control"
      :disabled="mode=='view'"
      v-model="formData.pinyin" title="拼音码"/>
      <FormInput
      :disabled="mode=='view'" class="pos-form-control" v-model="formData.remark" title="备注"/>
    </div>
  </div>
</template>

<script>
import {
    FormInput,
    FormSwitch,
    FormSelect,
    FormTreeselect
} from '@/components/FormControl/index.js';
export default {
    components: {
        FormInput,
        FormSwitch,
        FormSelect,
        FormTreeselect
    },
    props: {
        optionsCategory: {
            default() {
                return [];
            }
        },
        optionsType: {
            default() {
                return [];
            }
        },
        optionsBrand: {
            default() {
                return [];
            }
        },
        optionsUnit: {
            default() {
                return [];
            }
        },
        mode: {}
    },
    computed: {
        formOptionsCategory() {
            return this.optionsCategory.slice(1, this.optionsCategory.length - 1);
        },
        formOptionsType() {
            return this.optionsType.slice(1, this.optionsType.length - 1);
        }
    },
    data() {
        return {
            model1: '1',
            switch1: false,
            fruit: [],
            value11: '123',
            formData: {
                isFlushInventory: false,
                isActive: true,
                isSaisSaleablele: true,
                id: '',
                name: '',
                shortName: '',
                barcode: '',
                categoryId: null,
                goodsType: '',
                rate: '',
                day: '',
                unitValue: '',
                brandId: '',
                pinyin: '',
                remark: ''
            },

            dataList: [
                {
                    barcode: '10023514',
                    issale: false
                }
            ]
        };
    },
    methods: {
        initVal(info) {
            if (info) {
                this.formData = {
                    ...info,
                    unitValue: parseInt(info.unitValue),
                    goodsType: info.goodsTypeStr
                };
                this.$emit('goodsTypeChange', info.goodsTypeStr);
            } else {
                this.formData = {
                    isFlushInventory: false,
                    isActive: true,
                    isSaisSaleablele: true,
                    id: '',
                    name: '',
                    shortName: '',
                    barcode: '',
                    categoryId: null,
                    goodsType: '',
                    rate: '',
                    day: '',
                    unitValue: '',
                    brandId: '',
                    pinyin: '',
                    remark: ''
                };
            }
        },
        goodsTypeChange(data) {
            this.$emit('goodsTypeChange', data);
        },
        unitChange(data) {
            this.$emit('unitChange', data);
        }
    }
};
</script>
<style lang="scss" scoped>
$color-border: #e5e5e5;
$color-tips: #0d9ece;
$color-main: #000;
.pos-goods-baseinfo {
  padding: 0 50px;
}

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
</style>
