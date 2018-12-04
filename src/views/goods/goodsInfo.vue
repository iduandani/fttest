<template>
  <div class="pos-app-info">
    <div class="pos-app-query">
      <QuerySelect/>
      <QuerySelect/>
      <QuerySelect/>
      <SearchInput placeholder="商品编码 商品名称 条码 拼音码"/>
    </div>
    <div class="pos-top-split"></div>
    <div class="pos-app-qurery-btn-group">
      <Button class="pos-app-qurery-btn" type="primary" @click="showForm=true">新增</Button>
      <Button class="pos-app-qurery-btn" type="primary">导入</Button>
      <Button class="pos-app-qurery-btn" type="primary">导出</Button>
      <Button class="pos-app-qurery-btn" type="primary">批量复核</Button>
    </div>
    <DataTable :width="1200" :columns="columns1" :total="100" :data="data1"/>
    <PosModal v-model="showForm" ok-text="保存" size="normal" title="新增商品">
      <Tabs value="name1">
        <TabPane label="基本信息" name="name1">
          <div class="pos-app-form">
            <FormSwitch v-model="switch1" title="不记库存" :required="true"/>
            <FormSwitch v-model="switch1" title="是否启用"/>
            <FormSwitch v-model="switch1" title="是否可售"/>
            <FormInput v-model="value11" title="商品编码" disabled :required="true"/>
            <FormInput v-model="value11" title="商品编码" :required="true"/>
            <FormInput v-model="value11" title="商品条码" :showAppend="true">
              <span slot="append">
                <Button type="primary">生成</Button>
              </span>
            </FormInput>
            <FormInput v-model="value11" title="商品条码" append-text="%" :showAppend="true"/>
            <FormInput v-model="value11" title="商品条码" append-text="天" :showAppend="true"/>
            <FormInput v-model="value11" title="商品条码" append-text="天" :showAppend="true"/>
            <FormSelect v-model="model1" title="商品分类" :required="true"/>
            <FormSelect v-model="model1" title="商品分类"/>
            <FormSelect v-model="model1" title="商品分类"/>
          </div>
        </TabPane>
        <TabPane label="基本信息" name="name2">标签二的内容</TabPane>
        <TabPane label="基本信息" name="name3">标签三的内容</TabPane>
      </Tabs>
    </PosModal>
  </div>
</template>
<script>
import { Tabs, TabPane } from 'iview';
import {
    FormInput,
    FormSwitch,
    FormSelect
} from '../../components/FormControl/index.js';
import {
    QuerySelect,
    SearchInput,
    DataTable
} from '../../components/QueryControl/index.js';
import PosModal from '../../components/Modal';
export default {
    components: {
        Tabs,
        TabPane,
        FormInput,
        FormSwitch,
        FormSelect,
        PosModal,
        QuerySelect,
        SearchInput,
        DataTable
    },
    data() {
        return {
            model1: '1',
            switch1: false,
            value11: '123',
            columns1: [
                {
                    title: '序号',
                    key: 'name'
                },
                {
                    title: '商品编码',
                    key: 'age'
                },
                {
                    title: '商品名称',
                    key: 'name'
                },
                {
                    title: '商品名称',
                    key: 'name'
                },
                {
                    title: '商品名称',
                    key: 'name'
                },
                {
                    title: '商品名称',
                    key: 'name'
                },
                {
                    title: '商品名称',
                    key: 'name'
                },
                {
                    title: '商品名称',
                    key: 'name'
                },
                {
                    title: '操作',
                    width: 320,
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
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. ',
                    date: '2016-10-04'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No.',
                    date: '2016-10-04'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ],
            showForm: true
        };
    }
};
</script>

<style lang="scss">
.table-action-div {
  .table-action {
    padding: 0 32px;
    font-size: 12px;
    color: #0d9ece;
    text-decoration: underline;
    position: relative;
    &:nth-last-child(1) {
      &::after {
        display: none;
      }
    }
    &::after {
      content: "";
      right: 1px;
      top: 2px;
      color: #fff;
      height: 10px;
      width: 1px;
      position: absolute;
      background: #000;
    }
  }
}

.ivu-select-visible .ivu-select-selection {
  outline: 0;
  box-shadow: none;
}
.pos-app-info-query {
  width: 150px;
  color: #000;
  margin-right: 20px;
  .ivu-select-selection {
    border-radius: 0px;
    height: 34px;
  }
  .ivu-select-dropdown {
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  }
  .ivu-select-selection .ivu-select-placeholder,
  .ivu-select-selection .ivu-select-selected-value {
    height: 32px;
    line-height: 32px;
  }
  .ivu-icon-ios-arrow-down {
    font-size: 20px;
    color: #000;
  }
  .ivu-select-arrow {
    top: 36%;
  }
  .ivu-icon-ios-arrow-down:before {
    content: "\F33D";
  }
}
.pos-top-split {
  height: 1px;
  background: #eeeeee;
  margin: 9px 0;
}

.pos-app-search-input {
  display: inline-block;
  vertical-align: middle;
  width: 318px;
  .ivu-input {
    border-radius: 0px;
    height: 34px;
  }
  .ivu-input-group-append {
    border-radius: 2px;
    width: 50px;
    background: #0d9ece !important;
  }
}
.pos-app-qurery-btn {
  border-radius: 0px;
  margin-right: 10px;
  padding: 0px 22px;
  height: 26px;
  line-height: 26px;
  font-size: 12px;
  background-color: #0d9ece;
  border: none;
}
.pos-app-table {
  float: left;
  .ivu-table {
    &::after,
    &::before {
      height: 0;
      width: 0;
    }
  }

  margin-top: 19px;
  .ivu-table-wrapper {
    border: none;
  }
  .ivu-table th {
    background: #7fc8ea;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 36px;
  }
  .ivu-table td {
    font-size: 12px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 36px;
    height: 38px;
  }
  .ivu-table-border td,
  .ivu-table-border th {
    border-right: 1px solid #fff;
    border-bottom: none;
    text-align: center;
  }
  .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td {
    background: #e8f5fb;
  }
}
.pos-app-qurery-btn:hover {
  background: rgba(13, 158, 206, 0.8);
}

.pos-app-page {
  margin-top: 13px;
  text-align: right;
  .ivu-page-next,
  .ivu-page-prev,
  .ivu-page-item {
    border-radius: 0;
    border: none;
    min-width: 30px;
    height: 26px;
    line-height: 26px;
  }
  .ivu-select-single .ivu-select-selection {
    border-radius: 0;
    min-width: 30px;
    height: 26px;
    line-height: 26px;
  }
  .ivu-page-options-elevator input {
    border-radius: 0;
    min-width: 30px;
    height: 26px;
    line-height: 26px;
  }
  .ivu-select-selected-value {
    height: 24px;
  }
  .ivu-page-item-active {
    background: #0d9ece;
    a,
    &:hover a {
      color: #fff;
    }
  }
  .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
  .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    height: 24px;
    line-height: 24px;
  }
  .ivu-select-dropdown {
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  }
}
</style>
