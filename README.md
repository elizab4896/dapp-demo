## Preface

This function is used to call each other's methods across platforms to achieve cross platform compatibility.

## Function

- [x] Acquire device terminal system
- [x] Ajax encapsulation
- [x] Cross platform

## Script description and presentation
  
  First, Introduce "./js/common.js" public script.
  ```html
    <script src="./js/common.js"></script>
  ```

  Second, initialize data to obtain current equipment and current exchange rate.

  Third, get the order number generated by the server.

  Fourth, H5 cross platform(IOS/Andriod) bridge.
  ```JavaScript
    let params = {
        order_id: "202005180029", // Generated and returned by the server
        gmc_num: gmcNUm,
        address: "gmc59265e7673c997089e74ffedfgrw00e954787jkh"
    }
    if (terminal == "ios") {
        app.setupWebViewJavascriptBridge(function(bridge) {
            payBtn.onclick = function (e) {
                bridge.callHandler("payAction", params, callback(response) {
                    payForCallback(response)
                })
            }
        })
    } else {
        payBtn.onclick = function (e) {
            let paramStr = JSON.stringify(params)
            android.payAction(paramStr, callback(response) {
                payForCallback(response)
            })
        }
    }
  ```

  Finally, after the cross platform call, get the return value from the callback function and handle the callback event.

## Notice

  1.Ajax cross domain problem.

  2.Cross platform agreement.
  

# API
  1. Order Status Query
     ```
     /**
     * orderId: Order number 
     * address: Merchant authentication address
     */
     Get Request
     https://ccmg.gmc-core.com/qdapps/v3/api/storePay/{orderId}?address=
     
     Response
     {
         "status": "1",
         "message": "SECCESS",
         "data": {
             "status": 1 // 1 Unpaid,  200 SUCCESS
         },
         "timestamp": "08/07/2020 08:20:59679"
     }
     ```
  2. Account Details Query
     ```
     /**
      * address: Merchant authentication address
      */
     Get Request
     https://ccmg.gmc-core.com/qdapps/v3/api/storePay/fundLog/{address}
     
     Response
     {
         "status": "1",
         "message": "SECCESS",
         "data": [
             {
                 "id": 7,
                 "faddress": "",// Pay Address
                 "amount": 0.80000,// Amount
                 "orderId": "6", // Order Number
                 "status": 8, // 1 Account not received, 8 Received account
                 "ptype": "GMC" // Coin type
             },
            ...
         ],
         "timestamp": "10/07/2020 06:14:27518"
     }
     ```