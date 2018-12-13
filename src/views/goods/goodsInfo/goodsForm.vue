<template>

</template>
<script>
import { Tabs, TabPane } from 'iview';
import {
    FormInput,
    FormSwitch,
    FormSelect,
    FormTreeselect,
    FormTable
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

        FormInput,
        FormSwitch,
        FormSelect,
        FormTreeselect,
        FormTable
    },
    methods: {
        addLine() {
            this.dataList.push({
                barcode: '10023514'
            });
        },
        delItem(index) {
            this.dataList.splice(index, 1);
        },
        setVal(index, props, data) {
            let item = this.dataList[index];
            this.$set(item, props, data);
        }
    },
    data() {
        return {
            model1: '1',
            switch1: false,
            fruit: [],
            value11: '123',
            selectSkuList: [],
            showEx: false,
            dataList: [
                {
                    barcode: '10023514',
                    issale: false
                }
            ],
            addImg: require('@/assets/form-table-add.png'),
            subImg: require('@/assets/form-table-sub.png'),

        };
    },
    computed: {
        cols() {
            const list = this.fruit || [];
            let SelColsList = list.map(ele => {
                return {
                    title: ele,
                    render: h => {
                        return h('Select', {
                            props: {
                                width: 100
                            }
                        });
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
                                value: p.row.barcode
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
                    render: h => {
                        return h('i-input', {
                            style: {
                                width: '100px'
                            }
                        });
                    }
                },
                {
                    title: '是否启用',
                    render: h => {
                        return h('i-switch', {});
                    }
                },
                {
                    title: '是否可售',
                    render: (h, p) => {
                        return h('i-switch', {
                            props: {
                                value: p.row.issale
                            },
                            on: {
                                'on-change': event => {
                                    console.log(event);
                                    this.setVal(p.index, 'issale', event);
                                }
                            }
                        });
                    }
                },
                {
                    title: '默认规格',
                    width: 100,
                    render: (h, p) => {
                        console.log(p);
                        return [
                            h('Checkbox', {}),
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
                                        this.delItem(p.index);
                                    }
                                }
                            })
                        ];
                    }
                }
            ];
        }
    }
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

