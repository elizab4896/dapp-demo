window.onload = function() {
    let payBtn = this.document.getElementById("pay")
    let gmcNUm = this.document.getElementById("gmc_num").innerText
     /**
     * @function payForCallback
     * @param {*} res 
     */
    let payForCallback = function (res) {
        alert(res)
        // To do something .. 
    }
    app.initialize()
    let params = {
        order_id: "202005180029", // Generated and returned by the server
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
            // let paramStr = JSON.stringify(params)
            // android.payAction(paramStr)

            let paramStr = JSON.stringify(params)
            alert(params);
            if(window.android!=null&&typeof(window.android)!="undefined"){
                window.android.payAction(paramStr);
            }else{
                alert(typeof(window.android));
            }
        }
    }
    /**
     * @function payForCallback
     * @param {*} res 
     */
    function payForCallbackIos(res) {
        alert(res)
        // To do something .. 
    }
}