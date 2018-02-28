<template>
  <div class="index">
    <div class="layout-1" style="margin-top: 15%">
      <img src="../../assets/images/index_logo.png" class="logo-text" style="width: 180px">
      <p class="title" v-text="$t('text.index_4')">星际链</p>
      <span class="hr"></span>
      <p style="margin-top: 20px;font-size: 18px" v-html="$t('text.index_1')"></p>
      <div class="btn" @click="downFile()"><span v-text="$tc('page.file', 0)"></span></div>
    </div>

    <div class="layout-2" style="margin-top: 35%;">
      <img src="../../assets/images/index_2_1.png" style="width: 100px">
      <p class="title">星际链</p>
      <p style="font-size: 18px" class="vice-title">INTERSTELLAR CHAIN</p>
      <p style="font-size: 14px;text-align: left;max-width: 1170px;margin: 30px auto;text-indent:28px"
         v-html="$t('text.index_3')"></p>
      <div class="img-text">
        <img src="../../assets/images/index_2_2.png" style="max-width: 640px;margin-top: -300px">
        <span style="margin-top: 36px" v-text="$t('text.index_22')"></span>
        <span style="margin-top: 90px" v-text="$t('text.index_23')"></span>
        <span style="margin-top: 170px" v-text="$t('text.index_24')"></span>
        <span style="margin-top: 248px" v-text="$t('text.index_25')"></span>
        <span style="margin-top: 330px;margin-left: 170px;text-align: left" v-text="$t('text.index_26')"></span>
        <span style="margin-top: 510px;text-align: center;margin-left: 90px;" v-text="$t('text.index_27')"></span>
      </div>
    </div>

    <div class="layout-3">
      <img src="../../assets/images/index_3_1.png" style="width: 100px">
      <p class="title">区块技术</p>
      <p style="font-size: 18px" class="vice-title">BLOCK TECHNOLOGY</p>
      <p style="font-size: 14px;text-align: center;max-width: 870px;margin: 30px auto" class="text-box"
         v-text="$t('text.index_9')"></p>
      <div class="img-box">
        <img class="mobile-hide" src="../../assets/images/index_3_2.png">
        <div class="text mobile-hide">
          <p style="height: 40px">
            <label v-text="$tc('text.index_6',1)"></label>&nbsp;&nbsp;<span v-html="$tc('text.index_6',2)"></span>
          </p>
          <p style="margin-top: 28px">
            <label v-text="$tc('text.index_7',1)"></label>&nbsp;&nbsp;<span v-html="$tc('text.index_7',2)"></span>
          </p>
          <p style="margin-top: 13px">
            <label v-text="$tc('text.index_8',1)"></label>&nbsp;&nbsp;<span v-html="$tc('text.index_8',2)"></span>
          </p>
        </div>
      </div>
      <div class="text mobile-show">
        <p>
          <label v-text="$tc('text.index_8',1)"></label><span v-html="$tc('text.index_8',2)"></span>
        </p>
        <p>
          <label v-text="$tc('text.index_7',1)"></label><span v-html="$tc('text.index_7',2)"></span>
        </p>
        <p>
          <label v-text="$tc('text.index_6',1)"></label><span v-html="$tc('text.index_6',2)"></span>
        </p>
      </div>
      <div class="more"><img src="../../assets/images/index_3_3.png" style="width: 46px;opacity: .8"></div>
      <div class="block"></div>
    </div>

    <div class="layout-4">
      <img src="../../assets/images/index_4_1.png" style="width: 89px">
      <p class="title">团队介绍</p>
      <p style="font-size: 18px">BLOCK TECHNOLOGY</p>
      <div class="img-text">
        <img src="../../assets/images/index_4_2.png">
        <p>
          <span v-text="$tc('text.index_10',1)"></span><br><br class="mobile-hide">
          <span v-text="$tc('text.index_10',2)"></span>
        </p>
      </div>
    </div>

    <div class="layout-5" style="margin-top: 10%">
      <img src="../../assets/images/index_2_1.png" style="width: 89px">
      <p class="title">INTERSTELLAR CHAIN</p>
      <p style="margin-top: 40px" class="text" v-text="$t('text.index_11')"></p>
      <div class="img-text">
        <img src="../../assets/images/index_5_1.png" class="mobile-hide">
        <img src="../../assets/images/mobile/index_5_1.png" class="mobile-show">
        <ul>
          <li style="margin-top: 36px;height: 100px">
            <label class="mobile-show">1、</label><label v-text="$tc('text.index_12', 1)"></label>
            <span v-text="$tc('text.index_12', 2)"></span>
          </li>
          <li style="margin-top: 18px;height: 95px">
            <label class="mobile-show">2、</label><label v-text="$tc('text.index_13', 1)"></label>
            <span v-text="$tc('text.index_13', 2)"></span>
          </li>
          <li style="margin-top: 22px">
            <label class="mobile-show">3、</label><label v-text="$tc('text.index_14', 1)"></label>
            <span v-text="$tc('text.index_14', 2)"></span>
          </li>
        </ul>
        <ul>
          <li style="margin-top: 36px;height: 85px">
            <label class="mobile-show">4、</label><label v-text="$tc('text.index_15', 1)"></label>
            <span v-text="$tc('text.index_15', 2)"></span>
          </li>
          <li style="margin-top: 32px;height: 70px">
            <label class="mobile-show">5、</label><label v-text="$tc('text.index_16', 1)"></label>
            <span v-text="$tc('text.index_16', 2)"></span>
          </li>
          <li style="margin-top: 48px">
            <label class="mobile-show">6、</label><label v-text="$tc('text.index_17', 1)"></label>
            <span v-text="$tc('text.index_17', 2)"></span>
          </li>
        </ul>
      </div>
    </div>

    <div class="layout-6">
      <img src="../../assets/images/index_3_1.png" style="width: 89px">
      <p class="title">服务</p>
      <p style="font-size: 18px" class="text-1">INTERSTELLAR CHAIN</p>
      <p style="opacity: .8;margin-top: 40px" class="text-2" v-text="$t('text.index_18')"></p>
      <ul class="img-text">
        <li>
          <img src="../../assets/images/index_6_1.png">
          <label v-text="$tc('text.index_19', 1)"></label>
          <span v-text="$tc('text.index_19', 2)"></span>
        </li>
        <li>
          <img src="../../assets/images/index_6_2.png">
          <label v-text="$tc('text.index_20', 1)"></label>
          <span v-text="$tc('text.index_20', 2)"></span>
        </li>
        <li>
          <img src="../../assets/images/index_6_3.png">
          <label v-text="$tc('text.index_21', 1)"></label>
          <span v-text="$tc('text.index_21', 2)"></span>
        </li>
      </ul>
    </div>
    <v-footer></v-footer>
  </div>

</template>

<script>
  import VFooter from 'components/Layout/footer'

  export default {
    name: 'home',
    components: {VFooter},
    data () {
      return {}
    },
    mounted(){
    },
    methods: {
      downFile(){
        let lang = this.$sessionStore.get('language') || 'en';
        window.open(`static/${lang === 'en' ? 'InterstellarChainWhitePaper_EN.pdf' : 'InterstellarChainWhitePaper_ZH.pdf'}`);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index {
    width: 100%;
    height: 100%;
    padding-top: 1px;
    position: relative;
    background-image: url("../../assets/images/index_back.jpg");
    background-position: top;
    background-size: cover;
  }

  .index div[class^=layout] {
    width: 100%;
    text-align: center;
  }

  .index div[class^=layout] p {
    color: #BBBBBB;
    font-size: 14px;
    opacity: .8;
  }

  .index div[class^=layout] .title {
    color: #FFFFFF;
    font-size: 34px;
    letter-spacing: 2px;
  }

  .layout-1 p {
    color: #FFFFFF;
    letter-spacing: 1px;
    font-size: 34px;
  }

  .layout-1 .hr {
    height: 1px;
    opacity: 0.3;
    background: #FDFFFF;
    display: inline-block;
    width: 80px;
  }

  .layout-1 .btn {
    background-image: url("../../assets/images/index_btn.png");
    width: 307px;
    height: 50px;
    background-size: 100% 100%;
    margin: 30px auto;
    cursor: pointer;
    opacity: .8;
  }

  .layout-1 .btn > span {
    font-size: 14px;
    color: #FFFFFF;
    line-height: 50px;
    opacity: .8;
  }

  .layout-1 .btn:hover {
    background-image: url("../../assets/images/index_btn_hover.png");
  }

  .layout-2 .img-text {
    position: relative;
    display: inline-block;
  }

  .layout-2 .img-text span {
    position: absolute;
    color: #BBBBBB;
    opacity: .8;
    top: 0;
    left: 176px;
    width: 122px;
    text-align: right;
  }

  .layout-3 {
    position: relative;
    max-width: 1400px;
    margin: 5% auto;
  }

  .layout-3 .block {
    position: absolute;
    width: 100%;
    height: 650px;
    left: 50%;
    top: 100px;
    border-left: 2px solid #979797;
    border-right: 2px solid #979797;
    transform: translate(-50%, 0);
    opacity: .6;
  }

  .layout-3 .more {
    margin-top: -22px;
  }

  .layout-3 .more:after,
  .layout-3 .more:before,
  .layout-3 .title:after,
  .layout-3 .title:before {
    content: '';
    width: 40%;
    height: 2px;
    background-color: #979797;
    position: absolute;
    top: 100px;
    left: 0;
    opacity: .6;
  }

  .layout-3 .more:after,
  .layout-3 .title:after {
    left: inherit;
    right: 0;
  }

  .layout-3 .more:after,
  .layout-3 .more:before {
    top: inherit;
    bottom: 50px;
  }

  .layout-3 .img-box {
    width: 100%;
    text-align: left;
    position: relative;
  }

  .layout-3 .img-box img {
    max-width: 772px;
  }

  .layout-3 .img-box .text {
    position: absolute;
    top: 114px;
    left: 625px;
    max-width: 45%;
  }

  .layout-3 .img-box .text label {
    color: #FFFFFF;
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
  }

  .layout-4 .img-text {
    max-width: 1170px;
    margin: 5% auto;
  }

  .layout-4 .img-text img {
    width: 48%;
    display: inline-block;
    margin-right: 3%;
  }

  .layout-4 .img-text p {
    font-size: 14px;
    display: inline-block;
    width: 48%;
    line-height: 37px;
    opacity: .8;
    vertical-align: top;
    text-align: left;
  }

  .layout-4 .img-text p > span {
    background-image: url('../../assets/images/text_dotted.png');
    line-height: 40px;
    display: inline-block;
  }

  .layout-5 .img-text {
    position: relative;
    max-width: 1170px;
    margin: 60px auto;
  }

  .layout-5 .img-text img {
    max-width: 100%;
  }

  .layout-5 .img-text ul {
    position: absolute;
    top: 0;
    left: 35px;
  }

  .layout-5 .img-text ul li {
    max-width: 270px;
    text-align: right;
  }

  .layout-5 .img-text ul label {
    font-size: 14px;
    color: #FFFFFF;
    display: block;
    margin-bottom: 5px;
  }

  .layout-5 .img-text ul span {
    font-size: 12px;
    color: #BBBBBB;
  }

  .layout-5 .img-text ul:last-child {
    left: inherit;
    right: 35px;
  }

  .layout-5 .img-text ul:last-child li {
    text-align: left
  }

  .layout-6 .img-text li {
    text-align: center;
    display: inline-block;
    max-width: 246px;
    margin-right: 80px;
    margin-top: 60px;

  }

  .layout-6 .img-text li:last-child {
    margin-right: 0;
  }

  .layout-6 .img-text img {
    max-width: 144px;
  }

  .layout-6 .img-text label {
    color: #FFFFFF;
    font-size: 14px;
    display: block;
    margin-top: 20px;
    margin-bottom: 5px;
  }

  .layout-6 .img-text span {
    color: #BBBBBB;
    opacity: .8;
  }

</style>
<style scoped>
  @media screen and (max-width: 1170px) {
    .index {
      background: none;
      padding-top: 0;
    }

    .index div .title {
      font-size: 20px !important;
    }

    .index .vice-title {
      font-size: 14px !important;
    }

    .layout-1 {
      margin-top: 0 !important;
      background-image: url("../../assets/images/mobile/xingqiu_bg.png");
      height: 129vw;
      width: 100%;
      background-position: top;
      background-size: cover;
      padding-top: 23%;
    }

    .layout-1 .logo-text {
      width: 23.86% !important;
    }

    .layout-1 .hr {
      width: 51px;
    }

    .layout-1 > p {
      font-size: 15px !important;
      padding: 0 20px;
    }

    .layout-1 .btn {
      /*background-image: url("../../assets/images/mobile/index_btn.png");*/
      /*width: 168px;*/
      /*height: 40px;*/
      width: 225px;
      height: 40px;
    }

    .layout-1 .btn span {
      line-height: 40px;
    }

    .layout-1 .btn:hover,
    .layout-1 .btn:active {
      /*background-image: url("../../assets/images/mobile/index_btn_hover.png");*/
    }

    .layout-2 {
      margin-top: -15% !important;
      padding-left: 20px;
      padding-right: 20px;
    }

    .layout-2 .img-text {
      width: 100%;
      margin-top: -50%;
    }

    .layout-2 .img-text > img {
      max-width: 100% !important;
      margin-top: 0 !important;
    }

    .layout-2 .img-text span {
      left: 13%;
      width: 33% !important;
      margin: 0 !important;
    }

    .layout-2 .img-text span:nth-child(2) {
      top: 34.2% !important;
    }

    .layout-2 .img-text span:nth-child(3) {
      top: 40% !important;
    }

    .layout-2 .img-text span:nth-child(4) {
      top: 48.2% !important;
    }

    .layout-2 .img-text span:nth-child(5) {
      top: 56.1% !important;
    }

    .layout-2 .img-text span:nth-child(6) {
      top: 64.7% !important;
      left: 54.5% !important;
    }

    .layout-2 .img-text span:nth-child(7) {
      top: 83% !important;
      left: 34%;
    }

    .layout-3 {
      margin-top: 10%;
      padding: 0 15px 40px 15px;
    }

    .layout-3 .title {
      width: 100%;
      position: relative;
      font-size: 20px !important;
    }

    .layout-3 .title:before,
    .layout-3 .title:after {
      top: 50%;
      width: 30%;
    }

    .layout-3 .text-box {
      padding-left: 15px;
      padding-right: 15px;
    }

    .layout-3 .block {
      width: calc(100vw - 30px);
      height: calc(100% - 96px);
      left: 15px;
      top: 96px;
      transform: translate(0, 0);
    }

    .layout-3 .img-box {
      background-image: url("../../assets/images/mobile/index_3_2.png");
      background-position: top;
      background-size: cover;
      margin-left: 15px;
      height: calc(50.74vw - 30px);
      width: calc(100vw - 60px);
    }

    .layout-3 .img-box img {
      max-width: 100%;
    }

    .layout-3 .text {
      left: 0;
      top: 0;
      margin-left: 15px;
      position: relative;
      max-width: 100%;
      padding-right: 15px;
    }

    .layout-3 .text p {
      line-height: 22px;
      margin-top: 10px;
      text-align: left;
    }

    .layout-3 .text p label {
      display: block;
      color: #FFFFFF;
    }

    .layout-3 .more {
      position: absolute;
      bottom: 0;
      width: calc(100vw - 30px);
    }

    .layout-3 .more img {
      width: 23px !important;
      margin-bottom: -25px;
    }

    .layout-3 .more:after,
    .layout-3 .more:before {
      bottom: 0;
      width: 30%;
    }

    .layout-4 {
      margin-top: 80px;
    }

    .layout-4 .img-text {
      padding: 0 20px;
    }

    .layout-4 .img-text img {
      width: 100%;
    }

    .layout-4 .img-text p {
      width: 100%;
      padding-top: 10px;
    }

    .layout-4 .img-text p > span {
      background: none;
      line-height: 24px;
    }

    .layout-5 .text {
      padding: 0 20px;
      margin-top: 15px !important;
    }

    .layout-5 .img-text img {
      width: 100%;
    }

    .layout-5 .img-text {
      max-width: 100%;
      margin-top: 10px;
    }

    .layout-5 .img-text > ul {
      position: relative;
      top: inherit;
      left: inherit !important;
      right: inherit !important;
      padding: 0 20px 0 34px;
    }

    .layout-5 .img-text > ul li {
      text-align: left;
      margin-top: 10px !important;
      height: auto !important;
      max-width: 100%;
    }

    .layout-5 .img-text ul label {
      font-size: 16px;
      display: inline-block;
      margin-bottom: 0;
    }

    .layout-5 .img-text ul span {
      font-size: 14px;
      display: block;
    }

    .layout-6 .text-1 {
      font-size: 13px !important;
    }

    .layout-6 .text-2 {
      font-size: 14px !important;
      margin-top: 15px !important;
    }

    .layout-6 .img-text li {
      width: 100%;
      max-width: 100%;
      margin: 0;
      padding: 0 20px;
      margin-top: 30px;
    }

    .layout-6 .img-text label {
      margin-top: 5px;
    }
  }
</style>
