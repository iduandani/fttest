<template>
  <div class="pos-app-Select" :class="{required:required}">
    <Select v-model="modelVal">
      <Option value="1"></Option>
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
}
</script>

