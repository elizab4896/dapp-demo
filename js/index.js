window.onload = function() {
    let payBtn = this.document.getElementById("pay")
    let gmcNUm = this.document.getElementById("gmc_num").innerText

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
    app.initialize()
    app.certificationAddress("gmcf2b02c1d467c5d90c6dbebd5b7e0584bf8bcc420").then(res => {
        console.log(res) // Apply for mall test accoun 
        params.address = res.data
    })
    
    
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
     * @param {message: '', status: 1} res  
     * // status: {
     *       '0': 'Network Error',
     *       '1': 'Success',
     *       '2': 'The payment function of the mall is temporarily closed',
     *       '3': 'Wrong payment currency type of mall',
     *       '4': 'Wrong amount',
     *       '5': 'The mall is not a trusted address',
     *       '6': 'Repeat payment for order',
     *       '7': 'Payment account address does not exist',
     *       '8': 'Insufficient account balance'
     *    }
     */
    function payForCallbackIos(res) {
        alert(res)  
        // To do something ... 
    }
}