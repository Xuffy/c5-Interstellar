<template>
  <div class="app-wrapper">
    <v-header></v-header>
    <div class="main-container">
      <section class="app-main" style="min-height: 100%">
        <transition name="fade" mode="out-in">
          <router-view :key="key"></router-view>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
  import VHeader from './Header'

  export default {
    name: 'layout',
    components: {VHeader},
    data () {
      return {}
    },
    computed: {
      key(){
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .app-wrapper {
    background-color: #0A1014;
    background-image: url("../../assets/images/mobile/background.jpg");
    background-position: top;
    background-size: cover;
    /*min-width: 1170px;*/
  }

</style>
