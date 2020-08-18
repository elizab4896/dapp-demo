
## 开发指南
此脚本分为2个部分，分别为开发阶段和测试阶段（开发环境和生产环境）。
> **测试环境**
> 注意：
> 测试阶段不用完成第三方认证，直接调用 [API](https://github.com/elizab4896/dapp-demo/blob/master/API.md) 申请商家测试地址即可。
> 测试地址有效期为7天，过期后可调用 [API](https://github.com/elizab4896/dapp-demo/blob/master/API.md) 重复申请。
> 测试阶段购买成交为实时到账。
> 测试阶段商品对 GMC 价格可通过负溢价的方式降低测试成本
#### 测试环境
* 如何成为商家：
   * 下载 GMCC。 [下载](https://gmc-core.com/index.html)
   * 注册 GMCC 账户（生成商城账户地址）。 [如何注册？](https://gmc-core.com/help/index.html#/newAccount)
   * 将注册好的商城账户地址申请成为商城测试地址。此地址为商城收款地址。[如何申请？](https://github.com/elizab4896/dapp-demo/blob/master/API.md)
* 如何生成支付定单：
   * 获取当前 GMC 汇率。[如何获取？](https://github.com/elizab4896/dapp-demo/blob/master/API.md)
   * 根据获取的 GMC 汇率在商城平台自动换算商品对应 gmc 价格，如需溢价请自行在商城平台添加对应的设置。
   * 在商城生成商城待付款订单，然后调用 GMCC DApp 接口进行支付。[如何调用？](https://github.com/elizab4896/dapp-demo/blob/master/API.md)
   * 支付成功后

* 如何购买商品？
   * 下载 GMCC。 [下载](https://gmc-core.com/index.html)
   * 注册 GMCC 账户。 [如何注册？](https://gmc-core.com/help/index.html#/newAccount)
   * 兑换 GMC，用于商城购物。
   * 通过 GMCC 内置浏览器输入商城的URL，进入商城购买进行购买操作。[如何进入浏览器？](https://gmc-core.com/help/index.html#/store)

> **正式环境**
> 注意：
> 原测试账户不可用于正式商家账户。
> 必须完成第三方认证，并成功发布广告和应用。
> 为保证公平交易，购买成功的货款为7天自动到账，如果7天内有纠纷则会延迟到纠纷处理后到账
> 可通过 API 查看末到账的交易报表
#### 正式环境
* 如何发布应用？
   * 下载 GMCC。 [下载](https://gmc-core.com/index.html)
   * 注册 GMCC 账户（生成商城账户地址）。 [如何注册？](https://gmc-core.com/help/index.html#/newAccount)
   * 完成第三方认证。[如何认证？](https://gmc-core.com/help/index.html#/authentication)
   * 发布应用对应的广告，为应用上线作推广。[如何发布广告？](https://gmc-core.com/help/index.html#/ad)
   * 发布应用（必须先成功发布广告）。 [如何发布应用？](https://gmc-core.com/help/index.html#/application)
* 如何维护升级应用？
   * 已成功发布的应用可以单独设置应用的权限。[如何设置？](https://gmc-core.com/help/index.html#/application)
* 如何查看交易报表？
   * 为保证公平交易，购买成功的货款为7天自动到账。可通过 API 查看交易报表。[如何调用？](https://github.com/elizab4896/dapp-demo/blob/master/API.md)

* 如何购买商品？
   * 下载 GMCC。 [下载](https://gmc-core.com/index.html)
   * 注册 GMCC 账户。 [如何注册？](https://gmc-core.com/help/index.html#/newAccount)
   * 兑换 GMC，用于商城购物。
   * 在 GMCC => DAPPS => 应用，在应用列表中点击应用进入商城。
   * 或者在 GMCC => DPAAS => DE-ADS，在广告列表中点击广告进入商城
