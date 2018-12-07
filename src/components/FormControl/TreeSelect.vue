<template>
    <div class="pos-app-treeselect" :class="{required:required}">
     <Treeselect
                v-model="modelVal"
              :options="options"
              :clearable="false"
              :placeholder="placeholder"
            />
     <label class="title" for>{{title}}</label>
    </div>
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
        required: {
            default: {}
        },
        value: {
            default: undefined
        },
        placeholder: {

        },
        title: {},
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
