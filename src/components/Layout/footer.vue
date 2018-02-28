<template>

  <footer class="footer">
    <img src="../../assets/images/footer_back.png" class="mobile-hide" style="width: 100%;margin-bottom: -5px">
    <img src="../../assets/images/mobile/footer_back.png" class="mobile-show" style="width: 100%;margin-bottom: -5px">
    <p>版权所有©️2014-2018 Interstellar chain基金会</p>
    <p style="color: #666666;margin-top: 20px">Email:Interstellarchain@outlook.com</p>
  </footer>
</template>

<script>
  export default {
    name: 'VHeader',
    data () {
      return {}
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .footer {
    margin-top: 110px;
    width: 100%;
    position: relative;
  }

  .footer p {
    font-size: 12px;
    color: #424246;
    text-align: center;
    position: absolute;
    width: 100%;
    top: 50%;
  }
</style>
<style scoped>
  @media screen and (max-width: 1170px){
    .footer{
      margin-top: 60px;
    }

  }
</style>
