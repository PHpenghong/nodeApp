const resCode = require('../utils/ResCode')
const alipaySdk = require('../utils/alipayUtil')
const AlipayFormData = require('alipay-sdk/lib/form').default
// const axios = require('axios')

const pay = async (req, res) => {
  try {
    const { orderId, total } = req.body
    const formData = new AlipayFormData()
    formData.setMethod('get')
    formData.addField('returnUrl', 'http://10.32.17.218:9425/Sundry/Test')
    formData.addField('bizContent', {
      outTradeNo: orderId,
      productCode: 'FAST_INSTANT_TRADE_PAY',
      totalAmount: total,
      subject: '商品',
      body: '商品详情'
    })
    const result = await alipaySdk.exec(
      'alipay.trade.page.pay',
      {},
      {
        formData
      }
    )
    // res.json({ url: result })
    return resCode(res, 200, '请求成功', result)
    // axios({
    //   method: 'GET',
    //   url: result
    // })
    //   .then((data) => {
    //     let rStr = ''
    //     const r = data.data.alipay_trade_query_response
    //     if (r.code == '10000') {
    //       switch (r.trade_status) {
    //         case 'WAIT_BUYER_PAY':
    //           rStr = '交易创建，等待买家付款'
    //           break
    //         case 'TRADE_SUCCESS':
    //           rStr = '交易支付成功'
    //           break
    //         case 'TRADE_FINISHED':
    //           rStr = '交易结束，不可退款'
    //           break
    //       }
    //     } else if (r.code == '40004') {
    //       rStr = '交易不存在'
    //     }
    //     return resCode(res, 200, '请求成功', { message: rStr })
    //   })
    //   .catch((err) => resCode(res, 500, err))
  } catch (err) {
    return resCode(res, 500, err)
  }
}

const Pay = {
  pay
}

module.exports = Pay
