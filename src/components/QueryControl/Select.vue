<template>
    <Select v-model="modelVal" class="pos-app-info-query" not-found-text='暂无数据' :placeholder="placeholder">
        <Option v-for="(opt,index) in options" :key="index" :value="opt.value">{{opt.name}}</Option>
    </Select>
</template>
<script>
export default {
    props: {
        options: {
            default(){
                return []
            }
        },
        value: {},
        placeholder: {}
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
}
</script>
