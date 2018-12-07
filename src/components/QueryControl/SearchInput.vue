<template>
    <span class="pos-app-search-input">
        <i-input
        v-model="modelVal"
        search
        enter-button
        @on-search="search"
        :placeholder="placeholder"/>
      </span>
</template>
<script>
export default {
    props: {
        placeholder: {},
        value: {}
    },
    methods: {
        search(){
            this.$emit('on-search')
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
