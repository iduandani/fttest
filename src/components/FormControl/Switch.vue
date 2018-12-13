<template>
  <div class="pos-app-switch">
    <label :class="{required:required}">{{title}}</label>
    <i-switch :disabled="disabled" v-model="modelVal"></i-switch>
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
        disabled: {
            default: false
        }
    },
    data(){
        return {
            id: ''
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

}
</script>
