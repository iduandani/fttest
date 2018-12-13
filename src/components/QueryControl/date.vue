<template>
  <div class="pos-query-date">
    <DatePicker :placeholder="placeholder" v-model="modelVal" class="pos-query-date-picker" type="daterange" :options="options" />
  </div>
</template>
<script>
export default {
    props: {
        options: {
            default(){
                return {
                    shortcuts: [
                        {
                            text: '1 week',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '1 month',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '3 months',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                }
            }
        },
        value: {},
        placeholder: {}
    },
    data(){
        return {
        }
    },
    computed: {
        modelVal: {
            get(){
                return this.value
            },
            set(val){
                this.$emit('input',val)
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.pos-query-date{
    width: 300px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
}
.pos-query-date-picker{
    width: 100%;
    height: 34px;
    box-sizing: border-box;
    line-height: 34px;
    /deep/ .ivu-input-icon-normal+.ivu-input{
        height: 34px;
    }
}
</style>

