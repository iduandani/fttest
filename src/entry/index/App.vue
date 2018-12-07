<template>
  <div id="app" class="pos-app">
    <Layout>
      <Header>
        <TopBar :navList="navList" />
      </Header>
      <Layout :style="{height:contentHeight}">
        <Sider
        hide-trigger class="pos-app-sider"
          :width="siberWidth"
          collapsible
          :collapsed-width="115"
          v-model="hideSecMuneFlag"
          >
          <Menu @visible-change="visibleChange" :hide-sec-mune="hideSecMuneFlag" :nav-list="navList" />
        </Sider>
        <Content class="pos-app-content">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </Content>
      </Layout>
      <Footer class="pos-app-footer" v-show="false">Footer</Footer>
    </Layout>
  </div>
</template>
<script>
import TopBar from '@/components/Topbar'
import Menu from '@/components/Menu'
import {
    Layout,
    Header,
    Sider,
    Content,
    Footer
} from 'iview';
import MenuList from '@/config/menu.js'

export default {
    name: 'App',
    components: {
        Layout,
        Header,
        Sider,
        Content,
        Footer,
        TopBar,
        Menu
    },
    data() {
        return {
            contentHeight: 0,
            siberWidth: 250,
            navList: MenuList,
            hideSecMuneFlag: true
        }
    },
    methods: {
        setContentHeight(){
            let screenH = document.documentElement.clientHeight
            this.contentHeight = (screenH - 55) + 'px'
        },
        visibleChange(val){
            this.hideSecMuneFlag = val
        }
    },

    computed: {
        curFirMenu(){
            const menu = this.$route.meta.menu || {}
            const code = menu.firCode
            const item = this.navList.find(ele=>ele.code == code)
            return item || {}
        },
        curSelFirMenu(){
            const code = this.firMenuCode
            const item = this.navList.find(ele=>ele.code == code)
            return item || {}
        },
        secMenuList(){
            return this.curSelFirMenu.children || []
        },
        curSecMenu(){
            const menu = this.$route.meta.menu || {}
            const code = menu.secCode
            const list = this.curFirMenu.children || []
            const item = list.find(ele=>ele.code == code)
            return item || {}
        },
        curThrMenu(){
            const menu = this.$route.meta.menu || {}
            const code = menu.menuCode
            const list = this.curSecMenu.children || []
            const item = list.find(ele=>ele.code == code)
            return item || {}
        }

    },
    mounted() {
        this.setContentHeight()
        window.addEventListener('resize',()=>{
            this.setContentHeight()
        },false)
    },
};
</script>
<style lang="scss">

</style>
