<template>
  <div class="pos-app-menu">
    <div class="pos-sider-mian-menu">
      <ul class="pos-sider-nav">
        <li
          :class="{active:firMenuCode==item.code}"
          @click="navClick(item)"
          v-for="item in navList"
          :key="item.id"
        >
          <span class="sider-icon">
            <!-- <Icon :type="item.icon" /> -->
            <img :src="navLogo[item.icon]" alt>
          </span>
          <a href="JavaScript:;">{{item.title}}</a>
        </li>
      </ul>
    </div>
    <div v-show="!hideSecMuneFlag" class="pos-sider-sec-menu" :style="{width:secMenuWidth}">
      <ul>
        <li
          class="menu-fir-nav"
          :class="{expand:!item.collapse}"
          v-for="item in secMenuList"
          :key="item.id"
          @click="secLiClick(item)"
        >
          <Icon class="fir-nav-arrow pos-app-arrow-dropdown" type="md-arrow-dropdown"></Icon>
          <a href="javascript:;">{{item.title}}</a>
          <ul v-show="!item.collapse">
            <li
              class="menu-sec-nav"
              @click.stop="secLiClick(citem)"
              :class="{active:citem.code==thrMenuCode}"
              v-for="citem in item.children"
              :key="citem.id"
            >
              <a href="javascript:;">{{citem.title}}</a>
            </li>
          </ul>
        </li>
      </ul>
      <div class="hide-menu" @click="hideMenu"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {},
    navList: {
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      firMenuCode: '',
      secMenuCode: '',
      thrMenuCode: '',
      hideSecMune: false,
      secMenuWidth: '135px',
      navLogo: {
        home: require('@/assets/navLogo/home.png'),
        goods: require('@/assets/navLogo/goods.png'),
        store: require('@/assets/navLogo/store.png')
      }
    };
  },
  methods: {
    hideMenu() {
      this.hideSecMuneFlag = true;
    },
    navClick(item) {
      this.firMenuCode = item.code;
      this.hideSecMuneFlag = false;
      if (item.url) {
        this.$router.push({
          path: item.url
        });
        return;
      }
    },
    secLiClick(item) {
      let collapse = item.collapse;
      if (item.children && item.children.length > 0) {
        this.$set(item, 'collapse', !collapse);
      } else {
        this.thrMenuCode = item.code;
        if (item.url) {
          this.$router.push({
            path: item.url
          });
        }
      }
    }
  },
  computed: {
    curSelFirMenu() {
      const code = this.firMenuCode;
      const item = this.navList.find(ele => ele.code == code);
      return item || {};
    },
    secMenuList() {
      return this.curSelFirMenu.children || [];
    },
    hideSecMuneFlag: {
      get() {
        return (
          this.hideSecMune || !this.secMenuList || this.secMenuList.length <= 0
        );
      },
      set(val) {
        this.hideSecMune = val;
        this.$emit('visible-change',val || !this.secMenuList || this.secMenuList.length <= 0)
      }
    }
  },
    watch: {
    $route(val){
      const menu =  val.meta.menu || {}
      const {firCode,secCode,menuCode} = menu
      this.firMenuCode = firCode
      this.secMenuCode = secCode
      this.thrMenuCode = menuCode
      this.hideSecMuneFlag = false
    }
  },
};
</script>
<style lang="scss" scoped>
.pos-app-menu{
    height: 100%;
}
</style>

