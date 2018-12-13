<template>
  <div class="pos-app-select" :class="{required:required}">
    <Select v-model="modelVal" :placeholder="placeholder" @on-change="change" :disabled="disabled">
      <Option v-for="(opt,index) in options" :key="index" :value="opt.value">{{opt.name}}</Option>
    </Select>
    <label for>{{title}}</label>
  </div>
</template>
<script>
export default {
    props: {
        value: {},
        title: {},
        required: {
            default: false
        },
        options: {
            default(){
                return []
            }
        },
        disabled: {
            default: false
        },
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
    },
    methods: {
        change(data){
            this.$emit('change',data)
        }
    }
}
</script>

