<template>
  <div class="header" :class="{fixed:isFixed}">
    <div class="header-box">
      <!--<div style="background-image: url('../../assets/images/logo_title.png');width: 332px;height: 104px"></div>-->
      <img src="../../assets/images/logo_title.png" class="logo">
      <div class="menu-list mobile-hide">
        <router-link :to="{path: '/home'}" key="1"><p :class="{active:$route.path === '/home'}"
                                                      v-text="$tc('page.menu', 0)"></p></router-link>
        <p :class="{active:$route.path === '/wallet/index'}" v-text="$tc('page.menu', 1)"
           @click="authUser('/wallet/index')"></p>
      </div>
      <ul class="login mobile-hide" v-if="!userInfo.phone">
        <li @click="showLoginModal(1)" v-text="$tc('page.btn_login', 0)">登录</li>
        &nbsp;|&nbsp;
        <li @click="showLoginModal(2)" v-text="$tc('page.btn_login', 1)">注册</li>
      </ul>
      <div class="user mobile-hide" v-else>
        <div style="position: relative">
          <Dropdown trigger="click">
            <a href="javascript:void(0)">
              {{userInfo.nickName || userInfo.phone}}
              &nbsp;&nbsp;<Icon type="chevron-down" class="c5-icon"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem class="updateName">
                <div @click="operationModal.show = true"><i class="icon"></i><span
                  v-text="$tc('page.menu2',0)">修改昵称</span></div>
              </DropdownItem>
              <DropdownItem class="updatePassword">
                <div @click="showLoginModal(4)"><i class="icon"></i><span v-text="$tc('message.register',1)">修改密码</span>
                </div>
              </DropdownItem>
              <DropdownItem class="logout">
                <div @click="logout"><i class="icon"></i><span v-text="$tc('page.menu2',1)">退出登录</span></div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div class="internationalization" @click="changeLang()" v-text="language"></div>
      <div @click="headerMenu.show = !headerMenu.show" class="mobile-show header-menu-icon">
        <!--<Icon type="navicon" :type="headerMenu.show ? 'ios-close-empty' : 'navicon'"></Icon>-->
        <div class="c5-animate" :class="{show:headerMenu.show}">
          <i class="c5-icon close"></i>
          <i class="c5-icon open"></i>
        </div>
      </div>

      <ul class="header-menu mobile-show c5-animate" :class="{show:headerMenu.show}" @click="headerMenu.show = false">
        <li class="c5-animate" :class="{show:headerMenu.show}" @click="authUser('/home')">
          <span v-text="$tc('page.menu', 0)"></span>
          <Icon type="chevron-right"></Icon>
        </li>
        <li class="c5-animate" :class="{show:headerMenu.show}" @click="authUser('/wallet/index')">
          <span v-text="$tc('page.menu', 1)"></span>
          <Icon type="chevron-right"></Icon>
        </li>
        <li v-if="userInfo.phone" class="c5-animate" :class="{show:headerMenu.show}"
            @click="operationModal.show = true">
          <span v-text="$tc('page.menu2',0)">修改昵称</span>
          <Icon type="chevron-right"></Icon>
        </li>
        <li v-if="userInfo.phone" class="c5-animate" :class="{show:headerMenu.show}"
            @click="showLoginModal(4)">
          <span v-text="$tc('message.register',1)">修改密码</span>
          <Icon type="chevron-right"></Icon>
        </li>
        <li v-if="userInfo.phone" class="c5-animate" :class="{show:headerMenu.show}"
            @click="logout">
          <span v-text="$tc('page.menu2',1)">退出登录</span>
          <Icon type="chevron-right"></Icon>
        </li>
        <li v-else class="c5-animate" :class="{show:headerMenu.show}" @click="showLoginModal(1)">
          <span v-text="$tc('page.btn_login', 0) + '/' + $tc('page.btn_login', 1)"></span>
          <Icon type="chevron-right"></Icon>
        </li>
      </ul>
    </div>

    <!--登录、注册、找回密码 弹窗-->
    <Modal v-model="loginModal.show" class="c5-modal-login">
      <ul slot="header" class="modal-title">
        <li v-if="loginModal.showType === 1 || loginModal.showType === 2" @click="loginModal.showType = 1"
            :class="{active:loginModal.showType === 1}" v-text="$tc('page.btn_login', 0)">
        </li>
        <li v-if="loginModal.showType === 1 || loginModal.showType === 2" @click="loginModal.showType = 2"
            :class="{active:loginModal.showType === 2}" v-text="$tc('page.btn_login', 1)">
        </li>
        <li v-if="loginModal.showType === 3" @click="loginModal.showType = 3"
            :class="{active:loginModal.showType === 3}" v-text="$tc('page.btn_login', 2)">
        </li>
        <li v-if="loginModal.showType === 4" @click="loginModal.showType = 4"
            :class="{active:loginModal.showType === 3}" v-text="$tc('message.register', 1)">
        </li>
      </ul>
      <div>

        <!--登录-->
        <Form v-show="loginModal.showType === 1" ref="loginForm" :model="loginParams" :rules="validateRule"
              :show-message="loginModal.message">
          <FormItem prop="phone">
            <Input type="text" v-model="loginParams.phone" :placeholder="$tc('page.input_username',0)"
                   class="c5-input">
            </Input>
          </FormItem>
          <FormItem prop="pwd">
            <Input type="password" v-model="loginParams.pwd" :placeholder="$tc('message.input_pwassword', 0)"
                   class="c5-input">
            </Input>
          </FormItem>
          <FormItem style="padding-top: 15px">
            <Button type="primary" class="c5-btn" :disabled="false"
                    @click="submitLogin()" v-text="$tc('page.btn_login', 0)">
            </Button>
            <Row style="margin-top: 10px">
              <Col span="12">&nbsp;&nbsp;&nbsp;&nbsp;
              <div class="c5-radio" @click="rememberLogin = !rememberLogin"
                   :class="{active:rememberLogin}">
                <label v-text="$tc('page.btn_text', 0)"></label>
              </div>
              </Col>
              <Col span="12" style="text-align: right">
              <span style="color: #9B9B9B;font-size: 14px;cursor: pointer"
                    @click="showLoginModal(3)" v-text="$tc('page.btn_text', 1)"></span>&nbsp;&nbsp;&nbsp;&nbsp;
              </Col>
            </Row>
          </FormItem>
        </Form>

        <!--注册-->
        <Form v-show="loginModal.showType === 2" ref="registerForm" :model="registerParams" :rules="validateRule"
              :show-message="loginModal.message">
          <FormItem prop="phone">
            <Input type="text" :placeholder="$tc('page.input_username', 0)" v-model="registerParams.phone"
                   class="c5-input">
            </Input>
          </FormItem>
          <FormItem prop="pwd">
            <Input type="password" :placeholder="$tc('message.input_pwassword', 0)" v-model="registerParams.pwd"
                   class="c5-input">
            </Input>
          </FormItem>
          <FormItem prop="pwdConfirm">
            <Input type="password" :placeholder="$tc('message.input_pwassword', 2)" v-model="registerParams.pwdConfirm"
                   class="c5-input">
            </Input>
          </FormItem>
          <FormItem prop="smsCode">
            <Row>
              <Col span="12">
              <Input type="text" :placeholder="$tc('message.input_code', 0)" v-model="registerParams.smsCode"
                     class="c5-input">
              </Input>
              </Col>
              <Col span="11" offset="1">
              <Button v-show="registerData.codeCountDown === -1" type="primary" class="c5-btn-primary"
                      @click="sendCode(1,registerParams.phone)"
                      v-text="$tc('message.input_code', 1)"></Button>
              <Button v-show="registerData.codeCountDown !== -1" type="primary" class="c5-btn-primary" :disabled="true"
                      v-text="registerData.codeCountDown + $tc('message.input_code2', 1)"></Button>
              </Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button type="primary" class="c5-btn" v-text="$tc('page.btn_login', 1)"
                    @click="submitRegister"></Button>
            <div class="c5-radio" style="margin-top: 10px;display:block;margin-left: 20px"
                 @click="registerData.agree = !registerData.agree"
                 :class="{active:registerData.agree}">
              <label>{{$tc('page.btn_text', 2)}}<span style="color: #009EE6;"
                                                      onclick="window.open('static/protocol.html')"
                                                      v-text="$tc('page.file', 1)"></span></label>
            </div>
          </FormItem>
        </Form>

        <!--找回密码-->
        <Form v-show="loginModal.showType === 3 || loginModal.showType === 4" :show-message="loginModal.message"
              ref="updatePasswordForm" :model="updatePasswordParams" :rules="validateRule">
          <FormItem prop="phone">
            <Input type="text" v-model="updatePasswordParams.phone" :placeholder="$tc('page.input_username', 0)"
                   class="c5-input">
            </Input>
          </FormItem>
          <FormItem prop="pwd">
            <Input type="password" v-model="updatePasswordParams.pwd" :placeholder="$tc('message.input_pwassword2', 0)"
                   class="c5-input">
            </Input>
          </FormItem>
          <FormItem prop="pwdConfirm">
            <Input type="password" v-model="updatePasswordParams.pwdConfirm"
                   :placeholder="$tc('message.input_pwassword', 2)" class="c5-input">
            </Input>
          </FormItem>
          <FormItem prop="smsCode">
            <Row>
              <Col span="13">
              <Input type="text" v-model="updatePasswordParams.smsCode" :placeholder="$tc('message.input_code', 0)"
                     class="c5-input">
              </Input>
              </Col>
              <Col span="10" offset="1">
              <Button v-show="registerData.codeCountDown === -1" type="primary" class="c5-btn-primary"
                      @click="sendCode(2,updatePasswordParams.phone)"
                      v-text="$tc('message.input_code', 1)"></Button>
              <Button v-show="registerData.codeCountDown !== -1" type="primary" class="c5-btn-primary" :disabled="true"
                      v-text="registerData.codeCountDown + $tc('message.input_code2', 1)"></Button>
              </Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button type="primary" class="c5-btn" v-text="$tc('page.btn', 0)" @click="submitUpdatePassword()"></Button>
            <span @click="showLoginModal(1)" v-if="loginModal.showType === 3"
                  style="color: #009EE6;font-size: 14px;margin-left: 20px;margin-top:10px;display: inline-block;cursor: pointer"
                  v-text="$tc('page.btn_text2', 0)"></span>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <Modal v-model="operationModal.show" class="c5-modal operation-modal">
      <div class="title-box">
        <label v-text="$tc('message.edit',0)"></label>
        <span v-text="userInfo.nickName"></span>
      </div>
      <div class="input-box">
        <Input type="text" :placeholder="$tc('message.edit',1)" v-model="updateNameParams.nickname"
               style="max-width: 340px"
               class="c5-input"></Input>
        <label v-text="$tc('message.edit',2)"></label>
        <Button type="primary" class="c5-btn" style="max-width: 178px;margin-top: 30px" v-text="$tc('page.btn',1)"
                @click="submitUpdateName">
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'VHeader',
    data () {
      const validatePhone = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$tc('message.input_username', 0)));
        } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
          callback(new Error(this.$tc('message.input_username', 1)));
        } else {
          callback();
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$tc('message.input_pwassword', 0)));
        } else if (value.length < 3) {
          callback(new Error(this.$tc('message.input_pwassword', 1)));
        } else {
          callback();
        }
      }
      const validateConfirmPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$tc('message.input_pwassword2', 1)));
        } else {
          callback();
        }
      }
      return {
        language: '',
        isFixed: false,
        headerMenu: {
          show: false,
        },
        loginModal: {
          show: false,
          showType: 1,
          remember: false,
          message: false
        },
        operationModal: {
          show: false
        },
        userInfo: this.$sessionStore.get('user') || {},
        loginParams: {
          phone: '',
          pwd: ''
        },
        rememberLogin: false,
        registerData: {
          noSubmit: true,
          codeCountDown: -1,
          agree: true
        },
        registerParams: {
          phone: '',
          smsCode: '',
          pwd: '',
          pwdConfirm: ''
        },
        updatePasswordParams: {
          phone: '',
          smsCode: '',
          pwd: '',
          pwdConfirm: ''
        },
        updateNameParams: {nickname: ''},
        validateRule: {
          phone: [{validator: validatePhone, trigger: 'blur'}],
          pwd: [{validator: validatePassword, trigger: 'blur'}],
          pwdConfirm: [{validator: validateConfirmPassword, trigger: 'blur'}],
          smsCode: [{required: true, message: this.$tc('message.input_code', 2), trigger: 'blur'}]
        }
      }
    },
    created() {
      this.language = (this.$sessionStore.get('language') || 'en') === 'en' ? '中文' : 'EN';

      window.onscroll = () => {
        this.isFixed = window.scrollY > 40;
      }
    },
    watch: {
      $route(){
        this.headerMenu.show = false;
      }
    },
    methods: {
      showLoginModal(type){
        this.loginModal.showType = type || 1;
        this.loginModal.show = true;
        this.loginModal.message = false;
        this.headerMenu.show = false;
      },
      submitLogin(){
        this.loginModal.message = true;
        this.$refs.loginForm.validate().then(vd => {
          if (!vd) return false;
          this.loginModal.message = false;
          this.ajax.post('/auth/login', this.loginParams, {noAuth: true})
            .then(data => {
              this.$Message.success(this.$tc('message.login', 0));
              this.userInfo = data;
              this.loginModal.show = false;
              this.headerMenu.show = false;
              this.rememberLogin ? this.$localStore.set('user', data) : this.$sessionStore.set('user', data);
            });
        });
      },
      submitRegister(){
        this.loginModal.message = true;
        this.$refs.registerForm.validate().then(vd => {
          if (!vd) return false;
          this.loginModal.message = false;
          if (this.registerParams.pwd !== this.registerParams.pwdConfirm) {
            return this.$Message.warning(this.$tc('message.input_pwassword2', 2));
          }
          if (!this.registerData.agree) {
            return this.$Message.warning(this.$tc('message.agreement', 0));
          }
          this.ajax.post('/auth/register', this.registerParams, {noAuth: true})
            .then(data => {
              this.$Message.success(this.$tc('message.register', 0));
              this.$refs.registerForm.resetFields();
              this.showLoginModal(1);
            })
        })
      },
      submitUpdatePassword(){
        this.loginModal.message = true;
        this.$refs.updatePasswordForm.validate().then(vd => {
          if (!vd) return false;
          this.loginModal.message = false;
          if (this.updatePasswordParams.pwd !== this.updatePasswordParams.pwdConfirm) {
            return this.$Message.warning(this.$tc('message.input_pwassword2', 2));
          }
          this.ajax.post('/auth/update-password', this.updatePasswordParams, {noAuth: true})
            .then(data => {
              this.$Message.success(this.$tc('message.modal', 1));
              this.$refs.updatePasswordForm.resetFields();
              this.loginModal.show = false;
            });
        });
      },
      submitUpdateName(){
        if (!this.updateNameParams.nickname || this.updateNameParams.nickname.length > 10) {
          return this.$Message.warning(this.$tc('message.edit2', 0));
        }
        this.ajax.post('/v1/user/update-nickname', {nickname: this.updateNameParams.nickname})
          .then(data => {
            this.$Message.success(this.$tc('message.modal', 1));
            this.updateNameParams.nickname = '';
            this.operationModal.show = false;
            this.getUserInfo();
          });
      },
      getUserInfo(){
        this.ajax.post('/v1/user/user-info').then(data => {
          this.userInfo = data;
          this.$sessionStore.set('user', data);
          this.$localStore.set('user', data);
        });
      },
      sendCode(type, phone){
        let ref = null;
        switch (type) {
          case 1:
            ref = this.$refs.registerForm;
            break;
          case 2:
            ref = this.$refs.updatePasswordForm;
            break;
        }

        ref.validateField('phone', vd => {
          if (vd) return;
          this.ajax.post('/auth/register/send-sms', {phone: phone}, {noAuth: true})
            .then(data => {
              this.$Message.success(this.$tc('message.input_code2', 0));
              this.registerData.codeCountDown = 60;
              let cd = setInterval(() => {
                if (this.registerData.codeCountDown <= 0) {
                  this.registerData.codeCountDown = -1;
                  clearInterval(cd);
                  return;
                }
                this.registerData.codeCountDown--;
              }, 1000);
            });
        });
      },
      logout(){
        this.headerMenu.show = false;
        this.$Modal.confirm({
          title: this.$tc('message.modal', 0),
          content: this.$tc('message.login', 1),
          onOk: () => {
            this.ajax.post('/auth/logout-user', {accessToken: this.userInfo.accessToken}, {noAuth: true})
              .then(res => {
                this.$localStore.clearAll();
                this.$sessionStore.clearAll();
                this.$refs.loginForm.resetFields();
                this.authUser('/');
                this.userInfo = {};
              })
          },
        })
      },
      changeLang(){
        let lang = this.language === 'EN' ? 'en' : 'zh';

        this.language = lang === 'en' ? '中文' : 'EN';
        this.$sessionStore.set('language', lang);

        this.$root.$i18n.locale = lang;
      },
      authUser(path){
        if (_.isEmpty(this.userInfo)) {
          this.showLoginModal(1);
        } else {
          this.$router.push(path);
        }
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../assets/style/base.less';

  .header {
    position: fixed;
    width: 100%;
    z-index: 9;
  }

  .header.fixed {
    opacity: 0.8;
    background-color: #000F15;
  }

  .header-box {
    max-width: 1170px;
    max-height: 80px;
    line-height: 80px;
    margin: 0 auto;
    position: relative;
  }

  .logo {
    height: 50px;
    vertical-align: middle;
  }

  .menu-list {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .menu-list p {
    padding-left: 20px;
    padding-right: 20px;
    line-height: 80px;
    display: inline-block;
    font-size: 14px;
    color: #BBBBBB;
    cursor: pointer;
  }

  .menu-list p.active {
    background-image: url("../../assets/images/header_menu_back.png");
    background-size: 100% 100%;
    color: #FFFFFF;
  }

  .login {
    font-size: 14px;
    color: #BBBBBB;
    position: absolute;
    top: 0;
    right: 80px;
    font-family: Arial;
  }

  .login li {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }

  .menu-list p:hover,
  .login li:hover {
    color: #4AA1E6;
  }

  .header .user {
    position: absolute;
    top: 0;
    right: 80px;
    font-size: 14px;
  }

  .header .user a {
    color: #FFFFFF;
  }

  .updateName i {
    background-image: url("../../assets/images/icon/icon_user.png");
  }

  .updateName:hover i {
    background-image: url("../../assets/images/icon/icon_user_2.png");
  }

  .updatePassword i {
    background-image: url("../../assets/images/icon/icon_lock.png");
  }

  .updatePassword:hover i {
    background-image: url("../../assets/images/icon/icon_lock_2.png");
  }

  .logout i {
    background-image: url("../../assets/images/icon/icon_logout.png");
  }

  .logout:hover i {
    background-image: url("../../assets/images/icon/icon_logout_2.png");
  }

  .internationalization {
    position: absolute;
    right: 0;
    width: 57px;
    line-height: 32px;
    border: 1px solid #9B9B9B;
    border-radius: 100px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    color: #9B9B9B;
    top: 24px;
  }

  .internationalization.active,
  .internationalization:hover {
    border-color: #009EE6;
    color: #009EE6;
  }

  .operation-modal .title-box {
    width: 100%;
    padding-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px dotted #DDDDDD;
  }

  .operation-modal .title-box {
    font-size: 18px;
    color: #666666;
  }

  .operation-modal .title-box span {
    color: #343437;
    display: inline-block;
    margin-left: 145px;
    font-weight: bold;
  }

  .operation-modal .input-box {
    padding-top: 20px;
    padding-left: 186px;
    margin-bottom: 50px;
  }

  .operation-modal .input-box label {
    display: block;
    font-size: 12px;
    color: #999999;
    line-height: 30px;
    margin-left: 20px;
  }

</style>
<style>
  .header .user .ivu-select-dropdown {
    top: 60px !important;
    min-width: 200px;
    /*left: inherit !important;*/
    /*right: -20px !important;*/
    /*padding: 0;*/
  }

  .header .user .ivu-select-dropdown:before {
    content: '';
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid #FFFFFF;
    position: absolute;
    top: -7px;
    right: 68px;
  }

  .header .user .ivu-dropdown-item {
    line-height: 50px;
    padding: 0 20px 0 20px;
    color: #999999;
  }

  .header .user .ivu-dropdown-item i {
    display: inline-block;
    vertical-align: middle;
    background-size: 100% 100%;
    width: 18px;
    height: 18px;
  }

  .header .user .ivu-dropdown-item span {
    vertical-align: middle;
    margin-left: 30px;
    font-size: 14px;
  }

  .header .user .ivu-dropdown-item:hover span {
    color: #4AA1E6;
  }
</style>

<style scoped>
  @media screen and (max-width: 1170px) {
    .header-box {
      height: 49px;
      line-height: 49px;
      padding-left: 20px;
      opacity: 0.9;
      background-color: #000F15;
    }

    .logo {
      height: 33px;
    }

    .internationalization {
      width: 55px;
      height: 29px;
      line-height: 27px;
      font-size: 12px;
      top: 10px;
      right: 70px;
    }

    .header-menu-icon {
      position: absolute;
      right: 5px;
      line-height: 49px;
      cursor: pointer;
      width: 45px;
      text-align: center;
      top: 0;
      overflow: hidden;
    }

    .header-menu-icon i {
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      margin-right: 12px;
      margin-top: -3px;
    }

    .header-menu-icon > div {
      width: 100px;
      opacity: 1;
      transform: translate(-40px, 0);
    }

    .header-menu-icon i.open {
      background-image: url("../../assets/images/mobile/menu-open.png");
    }

    .header-menu-icon i.close {
      background-image: url("../../assets/images/mobile/menu-close.png");
    }

    .header-menu-icon .ivu-icon-ios-close-empty {
      font-size: 50px;
    }

    .header-menu {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      opacity: .9;
      transform: translate(-100%, 0);
      background-color: rgba(0, 0, 0, .8);
    }

    .header-menu li {
      height: 49px;
      line-height: 49px;
      font-size: 14px;
      color: #FFFFFF;
      padding-left: 20px;
      background-color: #2E2E2E;
      margin-bottom: 1px;
      cursor: pointer;
      transform: translate(-100%, 0);
    }

    .header-menu li:nth-child(2) {
      transition-delay: .05s;
    }

    .header-menu li:nth-child(3) {
      transition-delay: .1s;
    }

    .header-menu li:nth-child(4) {
      transition-delay: .15s;
    }

    .header-menu li:nth-child(5) {
      transition-delay: .2s;
    }

    .header-menu li:nth-child(6) {
      transition-delay: .25s;
    }

    .header-menu li:nth-child(7) {
      transition-delay: .3s;
    }

    .header-menu li > i {
      position: absolute;
      right: 20px;
      line-height: 49px;
    }

    .operation-modal .title-box {
      padding-top: 15px;
      padding-bottom: 10px;
    }

    .operation-modal .title-box span {
      margin-left: 8%;
    }

    .operation-modal .input-box {
      padding-left: 0;
    }

    .operation-modal .input-box .c5-btn {
      max-width: 100% !important;
    }
  }
</style>
