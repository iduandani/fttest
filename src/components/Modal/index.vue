<template>
    <div>
        <Modal :mask-closable='false' :width="width" class="pos-app-modal" :ok-text='okText' v-model="modelVal" :title="title">
            <slot></slot>
        </Modal>
   </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props: {
        size: {
            default: 'normal'
        },
        value: {
            default: false
        },
        title: {
            default: ''
        },
        okText: {
            default: '确定'
        }
    },
    computed: {
        width(){
            let width = 1000
            switch (this.size) {
            case 'large':
                width = 1380
                break;
            case 'normal':
                width = 1040
                break;
            case 'small':
                width = 800
                break;
            default:
                width = 1040
                break;
            }
            return width
        },
        modelVal: {
            get(){
                return this.value || false
            },
            set(val){
                this.$emit('input',val)
            }
        }
    }
}
</script>
