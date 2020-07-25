window.onload = function() {
    let payBtn = this.document.getElementById("pay")
    let gmcNUm = this.document.getElementById("gmc_num").innerText

    app.initialize()
    let Num = "";
    for(var i=0;i<6;i++) {
        Num += Math.floor(Math.random()*10);
    }
    let orderid = new Date().getTime() + Num
    let params = {
        order_id: orderid, // Generated and returned by the server
        gmc_num: gmcNUm,
        address: "gmcf2b02c1d467c5d90c6dbebd5b7e0584bf8bcc420"
    }
    if (terminal == "ios") {
        let el = document.getElementById('footerNav')
        el.setAttribute('style', 'bottom: 49px')
        app.setupWebViewJavascriptBridge(function(bridge) {
            payBtn.onclick = function (e) {
                bridge.callHandler("payAction", params, function(response) {
                    payForCallbackIos(response)
                })
            }
        })
    } else {
        payBtn.onclick = function (e) {
            let paramStr = JSON.stringify(params)
            if(window.android!=null&&typeof(window.android)!="undefined"){
                window.android.payAction(paramStr);
            }else{
                alert(typeof(window.android));
            }
        }
    }
    /**
     * @function payForCallbackIos
     * @param {message: '', status: 1} res  // status: 0 --> fail, 1 --> success
     */
    function payForCallbackIos(res) {
        alert(res)  
        // To do something .. 
    }
}