<template>
  <div>
    <Modal
      :mask-closable="false"
      :width="width"
      class="pos-app-modal"
      :ok-text="okText"
      v-model="modelVal"
      :title="title"
      :loading="loading"
      @on-ok="done"
    >
      <slot></slot>
      <div slot="footer" >
          <Button v-if="showFooter" type="primary" size="large" @click="done">{{okText}}</Button>
        <Button  v-if="showFooter"  type="text" size="large" @click="modelVal=false">取消</Button>

    </div>
    </Modal>
  </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {
        done(){
            this.$emit('on-ok')
        }
    },
    props: {
        loading: {
            default: false
        },
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
        },
        showFooter: {
            default: true
        }
    },
    computed: {
        width() {
            let width = 1000;
            switch (this.size) {
            case 'large':
                width = 1380;
                break;
            case 'normal':
                width = 1040;
                break;
            case 'small':
                width = 800;
                break;
            default:
                width = 1040;
                break;
            }
            return width;
        },
        modelVal: {
            get() {
                return this.value || false;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    }
};
</script>
