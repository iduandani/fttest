<template>
    <span class="pos-app-search-input">
        <Input search enter-button :placeholder="placeholder"/>
      </span>
</template>
<script>
export default {
    props: {
        placeholder: {}
    }
}
</script>
