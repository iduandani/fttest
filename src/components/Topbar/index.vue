<template>
  <div class="pos-app-header">
    <div class="pos-app-logo">
      <img :src="logoImg" alt>
    </div>
    <div class="pos-app-path">
      <span class="pos-path-nav" v-if="curFirMenu.title">{{curFirMenu.title}}</span>
      <span class="pos-path-nav" v-if="curSecMenu.title">{{curSecMenu.title}}</span>
      <span class="pos-path-nav" v-if="curThrMenu.title">{{curThrMenu.title}}</span>
    </div>
    <div class="pos-app-func">
      <span class="pos-app-park">
        <Dropdown class="pos-app-dropdown">
          <a href="javascript:void(0)">厦门方特
            <Icon class="pos-app-arrow-dropdown" type="md-arrow-dropdown"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>厦门方特</DropdownItem>
            <DropdownItem>株洲方特</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </span>
      <span class="pos-app-user">
        <Dropdown class="pos-app-dropdown">
          <a href="javascript:void(0)">
            <img src="https://pic.qqtn.com/up/2018-11/2018112808065197924.jpg" alt>
            熊大
            <Icon class="pos-app-arrow-dropdown" type="md-arrow-dropdown"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>退出登录</DropdownItem>
            <DropdownItem>退出登录</DropdownItem>
            <DropdownItem @click.native="logout">退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </span>
      <span>
        <span class="split">|</span>
        <span>财务部</span>
      </span>
    </div>
  </div>
</template>
<script>
import { Dropdown, DropdownMenu, DropdownItem } from 'iview';
export default {
    components: {
        Dropdown,
        DropdownMenu,
        DropdownItem
    },
    props: {
        navList: {
            default(){
                return []
            }
        }
    },
    data(){
        return {
            logoImg: require('@/assets/ftlogo.png'),
        }
    },
    methods: {
        logout(){
            location.href = '/login.html?returnUrl=' + encodeURIComponent(location.href)
        }
    },
    computed: {
        curFirMenu() {
            const menu = this.$route.meta.menu || {};
            const code = menu.firCode;
            const item = this.navList.find(ele => ele.code == code);
            return item || {};
        },
        secMenuList() {
            return this.curSelFirMenu.children || [];
        },
        curSecMenu() {
            const menu = this.$route.meta.menu || {};
            const code = menu.secCode;
            const list = this.curFirMenu.children || [];
            const item = list.find(ele => ele.code == code);
            return item || {};
        },
        curThrMenu() {
            const menu = this.$route.meta.menu || {};
            const code = menu.menuCode;
            const list = this.curSecMenu.children || [];
            const item = list.find(ele => ele.code == code);
            return item || {};
        }
    }
};
</script>
<style lang="scss" scoped>
</style>


