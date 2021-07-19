
const ADV={
  A_LIST:'/getAdv.php',// get 首页大广告list
  A_UPDATE:'/postAdvUpdate.php',// post 更新首页大广告
  Achieve:'/getAchieve.php',//get 获取全部成就
  Achieve_SET:'/setAchieve.php',//set 成就
  Achieve_COMPLETE:'/completeAchieve.php',//完成 成就
}

const BADGE={
  B_ALL:'/getBadge.php',// get 所有徽章
}

const COUPON={
  C_INSERT:'/insertCoupon.php',//post 添加优惠券
  C_ALL:'/getCoupons.php',//get 查询所有发布的优惠券
  C_ADD:'/addUserCoupon.php',// get 领取
  C_SEARCH:'/getUserCoupon.php',// get 查询用户领的优惠券
}
const DICT={
  D_GET:'/getDict.php',// get一级分类字典
}

const FILE={
  F_UPLOAD:'/upimg.php',//上传图片
}

const HOME={
  H_ALL:'/product/v1/publish',// get 首页数据
}

const H5={
  H5_LIST:'/h5gameGetList.php',// get h5游戏列表
  H5_SETPOINT:'/h5gameSetPoint.php',// 
  H5_SETPLAY:'/h5gameSetPlay.php',// 
}

const INTEGRAL={
  I_LIST:'/getIntegralList.php',// get 积分储值list
}

const LOG={
  L_INTEGRAL:'/getIntegralLog.php',// get 积分log列表
  L_INTEGRAL_DEL:'/delIntegralLog.php',// 删除 积分log 
}

const ORDER={
  O_INSERT:'/insertOrder.php',// post 添加订单
  O_SEARCH:'/getOneOrder.php',// get 订单详情
  O_USERALL:'/getUserOrder.php',// get 用户订单列表
  O_ADDCART:'/cart/v1/insert',// post 添加购物车
  O_CARTNUM:'/cart/v1/selectAll',// get 购物车数量
  O_USERCART:'/cart/v1/selectGroupByP',// get 我的购物车
  O_DELCART:'/delCart.php',// get 删除cart
  O_SETCARTNUM:'/setCartNumber.php',// get 修改购物车商品数量
  O_PAYCARTSUCCESS:'/toWxPay_success.php',// get 购物车支付成功
  O_PAYCARTMonthSUCCESS:'/toWxPay_month_success.php',// get 月卡支付成功
  O_PAYCARTMonthSUCCESS:'/toWxPay_integral_success.php',// get 积分储值支付成功
  O_CARTCACHE:'/getCartCache.php',// get getCartCache
}

const PRODUCT={
  P_LIST:'/postUserProducts.php',// post 分页查询用户的产品
  P_INSERT:'/insertUserProduct.php',// post 发布用户商品
  P_UPDATE:'/updateUserProduct.php',// post 更新用户商品
  P_DELETE:'/delUserProduct.php',// GET 删除用户商品
  P_DETAIL:'/product/v1/selectOne',// GET 产品详情
}

const PAY={
  PAY_CART_1_month:'/toWxPay_1_month.php', //post 月卡支付下单
  PAY_CART_1_integral:'/toWxPay_1_integral.php', //post 积分储值 下单
  PAY_CART_1:'/toWxPay_1.php', //post 微信支付第一步：统一下单
  PAY_DELETE_ORDER_CACHE:'/toWxPay_delete.php',//删除 缓存的未支付的订单

  REFUND_INSERT:'/insertRefund.php',//post 申请退款
  PAY_REFUND_AGREE:'/toWxPay_refund.php',//post 同意退款
}

const REFUND={
  RE_LIST:'/getRefundList.php',// get 退款申请的列表
  RE_DETAIL:'/getRefundDetail.php?out_trade_no=',// get 退款单详情 
}

const STORE={
  S_STATUS:'/storeStatus.php',// get 查询用户店铺状态
  S_INSERT:'/storeInsert.php',// post 申请开店 
  S_UPDATE:'/storeUpdate.php',// post 修改店铺信息
  S_ALL:'/getAllStore.php',// get 获取店铺列表 status 
  S_SET:'/setStoreStatus.php',// get 审核店铺

  S_VISIT:'/storeVisit.php',// get 访客访问商家店铺
  S_VISIT_CHANGE:'/storeVisit_Change.php',// get 访客切换店铺1级分类
  S_VISIT2:'/storeVisit2.php',// get 访客点击商家二级分类
  S_VISIT3:'/storeVisit3.php',// get 访客点击商家3级分类
  S_VISIT_CART:'/getCartNumberStore.php',// get 获取当前店铺当前用户的购物车列表

  S_INFO:'/storeService.php',//get 获取自己店铺单据信息
  S_WAIT:'/storeWait.php',//get 待发货订单
  S_DELIVER:'/storeSetDeliver.php',//get 发货
}

const TASK={
  T_ALL:'/getTasks.php',// get 获取当前所有积分任务
  T_USER:'/getTaskUser.php',// get 获取user积分任务
  T_SETR:'/setTaskUserResident.php',//post set user resident 任务
  T_SETD:'/setTaskUserDaily.php',//post set user daily 任务
  T_SETDS:'/setTaskUserDailyShare.php',//post set user daily share 任务
  T_SETVIP:'/setTaskVip.php',//post set user vip 任务
  T_SETW:'/setTaskWeek.php',//post set user weekly 任务
}

const USER={
  USER_UPD:'/membership/v1/updateMyPage', //修改用户信息 并返回最终结果集
  USER_LOGIN:'/user/v1/login', //GET   登录
  USER_GETINFO:'/membership/v1/selectOne', //GET 获取数据库用户信息
  U_GETUSERADDRESS:'/user_address/v1/selectAll', //GET 获取用户收货地址all
  U_ADDADDRESS:'/user_address/v1/insert', //POST 添加用户收货地址
  U_ADDPHONE:'/setUserPhone.php', //get 添加用户手机号
  U_GETQRCODE:'/getUserQrcode.php', //get 获取用户小程序码
  U_GETRF:'/getUserReferent.php', //get 用户推荐的信息
};

const WX={
  W_CRYPT:'/wxBizDataCrypt/get.php', //post 添加用户收货地址
};


export default{
  ...ADV,
  ...BADGE,
  ...COUPON,
  ...DICT,
  ...FILE,
  ...HOME,
  ...H5,
  ...INTEGRAL,
  ...LOG,
  ...ORDER,
  ...PRODUCT,
  ...PAY,
  ...REFUND,
  ...STORE,
  ...TASK,
  ...USER,
  ...WX
}