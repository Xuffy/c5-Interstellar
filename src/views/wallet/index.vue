<template>
  <div class="wallet">
    <div class="wallet-box">
      <div class="info-box">
        <label class="title" v-text="$tc('page.wallet',0)"></label>
        <div class="balance">
          <span>{{balance.isc | numberSplit}}</span><label>ISC</label>
        </div>
        <div class="address">
          <span><label>{{$tc('page.wallet',1)}}：</label>{{balance.iscAddress}}</span>
          <Button type="primary" class="c5-btn-primary btn copy-btn" v-text="$tc('page.wallet2',0)"
                  :data-clipboard-text="balance.iscAddress">
          </Button>
        </div>
        <div style="width: 100%;text-align: center;padding-top: 10px">
          <Button type="primary" class="c5-btn" @click="giveModal.show = true" v-text="$tc('page.wallet',2)"></Button>
        </div>
      </div>

      <div class="info-box mobile-hide">
        <label class="title" v-text="$tc('page.wallet6',1)"></label>
        <div style="width: 530px;height: 310px;padding-top: 30px">
          <v-charts :options="lineOptions"></v-charts>
        </div>
      </div>

      <div class="info-box mobile-show mobile-record">
        <label class="title" v-text="$tc('page.wallet3',0)"></label>
        <div class="no-transaction" v-if="!transactionList.rows.length">
          <span v-text="$tc('message.edit2',1)"></span>
        </div>
        <div v-if="transactionList.showPage" v-for="(item,index) in transactionList.showNum">
          <template v-if="transactionList.rows[index]">
            <label class="time"
                   v-text="$dateFormat(transactionList.rows[index].createTime,'yyyy-mm-dd HH:MM:ss')"></label>
            <ul class="detail">
              <li>
                <label v-text="$tc('page.wallet4',2) + ':'"></label>{{$tc('page.wallet3',transactionList.rows[index].inOutType
                === 1 ? 1 : 2)}}
              </li>
              <li>
                <label v-text="$tc('page.wallet5',0) + ':'"></label>{{(transactionList.rows[index].inOutType === 1 ? '+'
                : '-') +
                transactionList.rows[index].transactionIsc}}
              </li>
              <li>
                <label v-text="$tc('page.wallet5',2) + ':'"></label>{{transactionList.rows[index].transactionAddress}}
              </li>
              <li>
                <label v-text="$tc('page.wallet6',0) + ':'"></label>{{transactionList.rows[index].orderId}}
              </li>
            </ul>
          </template>
        </div>
        <p style="color: #009EE6;font-size: 14px;width: 100%;text-align: center;padding: 10px 0;cursor: pointer"
           v-if="transactionList.showNum < transactionList.rows.length"
           @click="pagingTransactionList()">加载更多</p>
      </div>

      <div class="info-box mobile-hide">
        <label class="title" v-text="$tc('page.wallet3',0)"></label>
        <div class="no-transaction" v-if="!transactionList.rows.length">
          <span v-text="$tc('message.edit2',1)"></span>
        </div>
        <ul class="transaction" v-else>
          <li v-for="item in transactionList.rows">
            <label v-text="$dateFormat(item.createTime,'yyyy-mm-dd HH:MM:ss')"></label>
            <span v-text="$tc('page.wallet3',item.inOutType === 1 ? 1 : 2)"></span>
            <span v-text="(item.inOutType === 1 ? '+' : '-') + item.transactionIsc"></span>
            <span @click="showTransactionInfo(item)" v-text="$tc('page.wallet4',0)"></span>
          </li>
        </ul>
      </div>

      <div class="info-box mobile-show user-statistics">
        <label class="title" v-text="$tc('page.wallet6',1)"></label>
        <div style="width: 530px;height: 310px;padding-top: 30px">
          <v-charts :options="lineOptions"></v-charts>
        </div>
      </div>

      <div class="info-box statistics">
        <label class="title" v-text="$tc('page.wallet6',2)"></label>
        <div style="width: 240px;height: 300px;" class="chart">
          <v-charts :options="pieOptions"></v-charts>
        </div>
        <div class="charts-title">
          <label v-text="$tc('page.wallet7',0)"></label>
          <span>{{pieChartData.circulations | numberSplit}}</span>
          <!--<span>&#45;&#45;</span>-->
        </div>
        <div class="charts-title" style="margin-top: 60px">
          <label v-text="$tc('page.wallet7',1)"></label>
          <span>{{pieChartData.hold_total | numberSplit}}</span>
          <!--<span>&#45;&#45;</span>-->
        </div>
        <div class="charts-title" style="margin-top: 120px">
          <label v-text="$tc('page.wallet7',2)"></label>
          <span>{{pieChartData.uncirculated | numberSplit}}</span>
          <!--<span>&#45;&#45;</span>-->
        </div>
        <p v-text="$tc('page.wallet8',0)"></p>
      </div>
    </div>

    <v-footer></v-footer>

    <!--转赠 弹窗-->
    <Modal v-model="giveModal.show" class="c5-modal give-modal">
      <h1>{{$tc('page.wallet',2)}} ISC</h1>
      <ul>
        <li class="title" v-text="$tc('page.wallet2',1)">接收者</li>
        <li>
          <Input type="text" placeholder="请输入对方钱包地址" v-model="transferParams.iscAddress"
                 class="c5-input">
          </Input>
          <label v-text="$tc('message.modal',2)"></label>
        </li>
        <li class="title" v-text="$tc('page.wallet2',2)">数量</li>
        <li>
          <Input type="text" placeholder="请输入数量" v-model="transferParams.number"
                 class="c5-input">
          </Input>
        </li>
        <li style="width: 200px;margin-top: 50px">
          <Button type="primary" class="c5-btn" v-text="$tc('page.btn', 0)" @click="submitTransfer"
                  :loading="giveModal.loading"></Button>
        </li>
      </ul>
    </Modal>

    <!--交易详情 弹窗-->
    <Modal v-model="infoModal.show" class="c5-modal info-modal">
      <Row class="item">
        <Col span="9">
        <label v-text="$tc('page.wallet4',1)"></label>
        <span v-text="$dateFormat(infoModal.data.createTime,'yyyy-mm-dd HH:MM:ss')"></span>
        </Col>
        <Col span="5">
        <label v-text="$tc('page.wallet4',2)"></label>
        <span v-text="infoModal.data.transactionDesc"></span>
        </Col>
        <Col span="5">
        <label v-text="$tc('page.wallet5',0)"></label>
        <span v-text="infoModal.data.transactionIsc"></span>
        </Col>
        <Col span="5">
        <label v-text="$tc('page.wallet5',1)"></label>
        <span v-text="infoModal.data.transactionStatus === 1 ? '成功' : '失败'"></span>
        </Col>
      </Row>
      <Row class="item">
        <Col span="24">
        <label v-text="$tc('page.wallet5',2)"></label>
        <span v-text="infoModal.data.transactionAddress"></span>
        </Col>
      </Row>
      <Row class="item">
        <Col span="24">
        <label v-text="$tc('page.wallet6',0)"></label>
        <span v-text="infoModal.data.orderId"></span>
        </Col>
      </Row>
    </Modal>

    <span style="display: none" v-text="pageUpdate"></span>
  </div>

</template>

<script>
  import VCharts from 'components/common/charts'
  import VFooter from 'components/Layout/footer'
  import Cipboard from 'clipboard'


  export default {
    name: 'wallet',
    components: {VCharts, VFooter},
    data () {
      return {
        pageUpdate: 0,
        balance: {},
        cipboard: null,
        transactionList: {rows: [], showPage: 0, showNum: 0},
        infoModal: {show: false, data: {}},
        giveModal: {show: false, loading: false},
        transferParams: {iscAddress: '', number: ''},
        lineOptions: {
          chart: {
            type: 'line',
//            backgroundColor: '#040408',
            backgroundColor: 'rgba(0,0,0,0)',
            plotBorderColor: 'rgba(76,76,80,.7)',
            plotBorderWidth: 1,
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false // 禁用版权信息
          },
          title: {
            text: null
          },
          xAxis: {
            tickLength: 0,
            lineColor: 'rgba(76,76,80,.7)',
            categories: [],
            minTickInterval: 2,
            labels: {autoRotationLimit: 0},
          },
          yAxis: {
            title: {
              text: null
            },
            softMin: 0,
            tickAmount: 9,
            allowDecimals: true,
            gridLineColor: 'rgba(76,76,80,.7)'
          },
          tooltip: {
            formatter: function () {
              return this.y
            },
            backgroundColor: '#009EE6',   // 背景颜色
            borderColor: '#009EE6',         // 边框颜色
            borderRadius: 5,             // 边框圆角
            borderWidth: 1,               // 边框宽度
            animation: true,               // 是否启用动画效果
            style: {                      // 文字内容相关样式
              color: '#ffffff',
              fontSize: '12px'
            }
          },
          plotOptions: {
            line: {
              lineWidth: 1,
              color: '#3296E0',
              marker: {
                enabled: true,
                fillColor: '#ffffff',
                lineWidth: 0,
                width: 1,
                height: 1,
                states: {
                  hover: {fillColor: '#009EE6', lineWidth: 0,}
                }
              }
            }
          },
          series: [{
            data: []
          }]
        },
        pieOptions: {
          chart: {
            type: 'pie',
            backgroundColor: 'rgba(0,0,0,0)',
            plotBorderColor: null,
          },
          credits: {
            enabled: false // 禁用版权信息
          },
          title: {
            text: null
          },
          tooltip: {
            formatter: function () {
              return `${this.key}：${this.y}`
            },
            backgroundColor: 'rgba(0,158,230,.5)',   // 背景颜色
            borderColor: '#009EE6',         // 边框颜色
            borderRadius: 5,             // 边框圆角
            borderWidth: 1,               // 边框宽度
            animation: true,               // 是否启用动画效果
            style: {                      // 文字内容相关样式
              color: '#ffffff',
              fontSize: '12px'
            }
          },
          plotOptions: {
            pie: {
              borderWidth: 0,
              dataLabels: {
                enabled: false,
              }
            }
          },
          series: [{
            data: [{
              y: 100000000,
              name: this.$tc('page.wallet7', 2),
              color: '#2E11DD'
            }]
          }]
        },
        pieChartData: {}
      }
    },
    mounted(){
      this.getBalance();
      this.getTransactionList();
      this.getUserStatistics();
      this.getIscStatistics();
      this.cipboard = new Cipboard('.copy-btn');
      this.cipboard.on('success', (e) => {
        this.$Message.success('复制成功');
      });
    },
    beforeDestroy(){
      this.cipboard.destroy();
    },
    methods: {
      getBalance(){
        this.ajax.post('/v1/user/isc-balance').then(data => {
          this.balance = data;
        });
      },
      getTransactionList(){
        this.ajax.post('/v1/user/iscTransaction/list', {pageSize: 500}).then(data => {
          this.transactionList = data;
          this.pagingTransactionList(0);
        });
      },
      pagingTransactionList(num){
        let page = 0
          , total = this.transactionList.total
          , cur = this.transactionList.showPage || num;

        cur++;
        page = Math.ceil(total / 5);

        this.transactionList.showPage = cur > page ? page : cur;

        this.$set(this.transactionList, 'showNum', this.transactionList.showPage * 5);

      },
      submitTransfer(){
        this.transferParams.iscAddress = this.transferParams.iscAddress.trim();

        if (_.isEmpty(this.transferParams.iscAddress)) {
          return this.$Message.warning('请输入对方钱包地址');
        }

        if (this.transferParams.iscAddress === this.balance.iscAddress) {
          return this.$Message.warning('不能转赠给自己');
        }

        if (this.transferParams.iscAddress.length !== 34) {
          return this.$Message.warning('请输入正确的钱包地址');
        }

        if (!/^\d+(\.\d+)?$/.test(this.transferParams.number)) {
          return this.$Message.warning('请输入正确数量');
        }

        this.$Modal.confirm({
          title: '确认本次交易',
          content: `转入地址： ${this.transferParams.iscAddress}<br> 转入数量： ${this.transferParams.number}`,
          onOk: () => {
            this.giveModal.loading = true;
            this.ajax.post('/v1/user/transfer', this.transferParams).then(data => {
              this.$Message.success('赠送成功');
              this.transferParams.iscAddress = '';
              this.transferParams.number = '';
              this.getBalance();
              this.getTransactionList();
              this.giveModal.show = false;
              this.giveModal.loading = false;
            }).catch(() => {
              this.giveModal.loading = false;
            });
          },
        })
      },
      getUserStatistics(){
        this.ajax.post('/v1/user/user-number-day').then(data => {
          let d = _.clone(this.lineOptions);
          d.xAxis.categories = _.keys(data);
          d.series[0].data = _.values(data);
          this.lineOptions = d;
        })
      },
      getIscStatistics(){
        this.ajax.post('/v1/user/isc-statistics').then(data => {
          let d = _.clone(this.pieOptions);
          d.series[0].data = [
            {
              y: data.uncirculated,
              name: this.$tc('page.wallet7', 2),
              color: '#2E11DD'
            },
            {
              y: data.hold_total,
              name: this.$tc('page.wallet7', 1),
              color: '#8A1BCC'
            },
            {
              y: data.circulations,
              name: this.$tc('page.wallet7', 0),
              color: '#2876AE'
            }
          ];
          this.pieOptions = d;
          this.pieChartData = data;
        })
      },
      showTransactionInfo(item){
        this.infoModal.show = true;
        this.infoModal.data = item;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wallet {
    background-image: url("../../assets/images/wallet_back.jpg");
    background-position: top;
    background-size: cover;
  }

  .wallet-box {
    width: 1170px;
    padding-top: 140px;
    margin: 0 auto;
  }

  .info-box {
    width: 570px;
    height: 360px;
    float: left;
    background-image: url("../../assets/images/wallet_box_back.png");
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 20px;
    margin-right: 30px;
    margin-bottom: 30px;
    position: relative;
  }

  .info-box:nth-child(2),
  .info-box:last-child {
    margin-right: 0;
  }

  .info-box .title {
    font-size: 18px;
    color: #FFFFFF;
  }

  .info-box .balance {
    background-image: url("../../assets/images/wallet_balance_back.png");
    width: 362px;
    height: 206px;
    color: #009EE6;
    text-align: center;
    line-height: 206px;
    background-size: 100% 100%;
    margin: -45px auto 0 auto;
  }

  .info-box .balance span {
    font-size: 38px;
  }

  .info-box .balance label {
    font-size: 18px;
    display: inline-block;
    margin-left: 10px;
  }

  .info-box .address {
    font-size: 12px;
    color: #BBBBBB;
    margin: 20px 0 20px 0;
    opacity: .8;
  }

  .info-box .address .btn {
    width: 56px;
    height: 24px;
    line-height: 10px;
    display: inline-block;
    margin-left: 20px;
    font-size: 12px;
  }

  .info-box .c5-btn {
    width: 200px;
  }

  .info-box .transaction {
    margin-top: 15px;
    max-height: 272px;
    overflow: auto;
  }

  .info-box .transaction li {
    line-height: 34px;
    width: 100%;
    color: #BBBBBB;
    opacity: .8;
  }

  .info-box .transaction label,
  .info-box .transaction span {
    text-align: center;
    float: left;
  }

  .info-box .transaction li:nth-child(odd) label,
  .info-box .transaction li:nth-child(odd) span {
    background-image: linear-gradient(90deg, rgba(33, 41, 51, 0.4) 0%, rgba(35, 42, 51, 0.8) 48%, rgba(37, 42, 50, 0.4) 100%);
  }

  .info-box .transaction li:nth-child(even) label,
  .info-box .transaction li:nth-child(even) span {
    background-image: linear-gradient(90deg, rgba(16, 16, 20, 0.4) 0%, rgba(21, 24, 28, 0.8) 48%, rgba(14, 15, 19, 0.4) 100%);
  }

  .info-box .transaction label {
    width: 40%;
  }

  .info-box .transaction span {
    width: 20%;
  }

  .info-box .transaction span:last-child {
    color: #009EE6;
    cursor: pointer;
  }

  .wallet-box:after,
  .info-box .transaction li:after {
    content: '';
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }

  .info-box .no-transaction {
    background-image: url("../../assets/images/no_transaction.png");
    width: 156px;
    height: 156px;
    background-size: 100% 100%;
    margin: 30px auto;
    position: relative;
  }

  .info-box .no-transaction span {
    color: #BBBBBB;
    font-size: 14px;
    opacity: .8;
    position: absolute;
    bottom: -35px;
    width: 100%;
    text-align: center;
  }

  .statistics > P {
    font-size: 12px;
    color: #9B9B9B;
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 20px;
  }

  .statistics .charts-title {
    position: absolute;
    right: 50px;
    top: 100px;
    width: 180px;
  }

  .statistics .charts-title label {
    font-size: 12px;
    color: #BBBBBB;
  }

  .statistics .charts-title label:before {
    content: '';
    display: inline-block;
    width: 9px;
    height: 9px;
    background-color: #3A82B8;
    margin-right: 10px;
  }

  .statistics .charts-title span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    color: #009EE6;
    margin-left: 20px;
  }

  .statistics .charts-title:nth-child(4) label:before {
    background-color: #8D34D5;
  }

  .statistics .charts-title:nth-child(4) span {
    color: #8D34D5;
  }

  .statistics .charts-title:nth-child(5) label:before {
    background-color: #3231E6;
  }

  .statistics .charts-title:nth-child(5) span {
    color: #3946E6;
  }

  .info-modal .item {
    width: 100%;
    height: 140px;
    border-bottom: dotted 1px #DDDDDD;

    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: center;
    -webkit-box-align: center;

    display: -moz-box;
    -moz-box-orient: horizontal;
    -moz-box-pack: center;
    -moz-box-align: center;

    display: -o-box;
    -o-box-orient: horizontal;
    -o-box-pack: center;
    -o-box-align: center;

    display: -ms-box;
    -ms-box-orient: horizontal;
    -ms-box-pack: center;
    -ms-box-align: center;

    display: box;
    box-orient: horizontal;
    box-pack: center;
    box-align: center;
  }

  .info-modal .item label {
    font-size: 18px;
    color: #666666;
    display: block;
    margin-bottom: 15px;
  }

  .info-modal .item span {
    font-size: 16px;
    color: #343437;
    line-height: 28px;
  }

  .give-modal h1 {
    font-size: 42px;
    color: #222328;
    font-weight: 400;
    margin-bottom: 40px;
  }

  .give-modal ul {
    max-width: 670px;
  }

  .give-modal li {
    font-size: 12px;
    color: rgba(102, 102, 102);
    margin-bottom: 10px;
  }

  .give-modal li > label,
  .give-modal li.title {
    padding-left: 15px;
  }

  .give-modal li > label {
    color: #999999;
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>

<style scoped>
  @media screen and (max-width: 1170px) {
    .wallet {
      background: none;
    }

    .wallet-box {
      width: 100%;
      padding-top: 75px;
    }

    .info-box {
      width: calc(100vw - 40px);
      margin-left: 20px;
      height: auto;
      padding: 17px 15px;
      background: none;
      border: 1px solid rgba(0, 137, 200, .3);
      border-radius: 8px;
    }

    .info-box .balance {
      width: 95%;
      height: calc((100vw - 40px) * .9 * .5718);
      line-height: calc((100vw - 40px) * .9 * .5718);
    }

    .info-box .balance span {
      font-size: 30px;
    }

    .info-box .balance label {
      font-size: 14px;
    }

    .info-box .address {
      font-size: 14px;
      padding-left: 70px;
      position: relative;
      word-wrap: break-word;
    }

    .info-box .address label {
      position: absolute;
      left: 0;
      color: #FFFFFF;
    }

    .info-box .address .btn {
      display: block;
      margin-left: 0;
      margin-top: 10px;
    }

    .user-statistics > div {
      height: calc((100vw - 60px) * .6) !important;
      margin-left: -10px;
      width: calc(100vw - 60px) !important;
    }

    .mobile-record > div {
      margin-top: 10px;
    }

    .mobile-record .time {
      font-size: 14px;
      color: #BBBBBB;
      position: relative;
    }

    .mobile-record .time:before {
      content: '';
      position: absolute;
      left: -18px;
      width: 6px;
      height: 6px;
      background-color: #009EE6;
      border-radius: 50%;
      top: 5px;
    }

    .mobile-record .detail {
      width: 100%;
      background-color: #1A1F28;
      border-radius: 8px;
      padding: 15px;
      font-size: 14px;
      color: #BBBBBB;
      position: relative;
      margin-top: 5px;
    }

    .mobile-record .detail label {
      color: #9B9B9B;
      position: absolute;
      left: 15px;
    }

    .mobile-record .detail li {
      margin-bottom: 10px;
      padding-left: 65px;
      word-wrap: break-word;
    }

    .statistics .chart {
      height: 47.46vw !important;
      width: 47.46vw !important;
      position: relative;
      margin: 0 auto 20px auto;
    }

    .statistics .charts-title {
      position: relative;
      top: inherit;
      left: inherit;
      right: inherit;
      width: 100%;
      margin-top: 10px !important;
    }

    .statistics > P {
      top: calc(47.46vw + 30px);
    }

  }
</style>
