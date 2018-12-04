<template>
  <div class="pos-app-input">
    <Input v-model="modelVal"  :class="showAppend?'no-border-right':''"  :disabled="disabled">
      <span slot="prepend"><span :class="{required:required}">{{title}}</span></span>
      <span slot="append" v-if="showAppend">
          <span v-if="appendText">{{appendText}}</span>
          <slot name="append"></slot>
      </span>
    </Input>
  </div>
</template>
<script>
export default {
    props: {
        title: {
            default: ''
        },
        disabled: {
            default: false
        },
        required: {
            default: false
        },
        showAppend: {
            default: false
        },
        value: {},
        appendText: {

        }
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
