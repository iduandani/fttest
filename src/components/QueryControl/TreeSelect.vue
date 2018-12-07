<template>
     <Treeselect
                v-model="modelVal"
              :options="options"
              class="pos-app-query-treeselect"
              :clearable="false"
              :placeholder="placeholder"
            />
</template>
<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
export default {
    components: {
        Treeselect,
    },
    props: {

        options: {
            default(){
                return []
            }
        },
        value: {
            default: undefined
        },

        placeholder: {

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
