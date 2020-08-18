var app = {
    /**
     * @function initialize
     */
    initialize: function() {
        window.terminal = this.getTerminal()
        this.ajax({
            url:"https://api.gmc-core.com/data/v3/api/gmc",
            type:"get",
            data: {
                to: "CMY"
            },
            dataType: "json",
            timeout: 10000,
            contentType: "application/json",
            success: function(data) {
                let res = JSON.parse(data)
                if (res.status == 1 && res.data) {
                    document.getElementById("rmb").innerHTML = res.data
                    document.getElementById("pay_rmb").innerHTML = res.data
                }
            },
            error: function(e) {
                console.log(e)
            }
        })
    },

    certificationAddress: function (addr) {
        return new Promise((resolve, reject) => {
            this.ajax({
                url:"http://192.168.4.215/data/v3/api/storePay/testAccount/" + addr,
                type:"get",
                dataType: "json",
                timeout: 10000,
                contentType: "application/json",
                success: function(data) {
                    resolve(data)
                },
                error: function(e) {
                    reject(e)
                }
            })
        })
    },

    /**
     * @function getTerminal
     * 
     * Acquire device terminal system
     */
    getTerminal: function() {
        let u = navigator.userAgent, app = navigator.appVersion
        console.log("app", window.devicePixelRatio, window.screen.height)
        console.log("u", u)
        let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1
        let isIOS = !!u.match(/\(i[^]+( U)? CPU.+Mac OS X/)
        if (isAndroid) {
            return "android"
        }
        if (isIOS) {
            return "ios"
        }
    },


    /**
     * @function ajax
     * @param {object} options 
     * 
     * Ajax encapsulation
     */
    ajax: function(options) {
        options = options || {}
        options.type = (options.type || "GET").toUpperCase()
        options.dataType = options.dataType || "json"

        let params = this.formatParams(options.data)

        let xhr
        if(window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        }else if(window.ActiveObject) { //Compatible with IE6 and below
            xhr = new ActiveXobject("Microsoft.XMLHTTP")
        }

        //启动并发送一个请求
        if(options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true)
            xhr.send(null)
        } else if(options.type == "POST") {
            xhr.open("post", options.url, true)
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xhr.send(params)
        }

        setTimeout(function() {
            if(xhr.readySate != 4) {
                xhr.abort()
            }
        }, options.timeout)

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                let status = xhr.status
                if(status >= 200 && status < 300 || status == 304){
                    options.success && options.success(xhr.responseText,xhr.responseXML)
                } else {
                    options.error && options.error(status)
                }
            }
        }

    },

    /**
     * @function formatParams
     * @param {object} data 
     */
    formatParams: function(data) {
        let arr = []
        for(let name in data){
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]))
        }
        arr.push(("v=" + Math.random()).replace(".",""))
        return arr.join("&")
    },

    /**
     * @function setupWebViewJavascriptBridge
     * @param {function} callback 
     * 
     * Cross platform
     */
    setupWebViewJavascriptBridge: function(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge)
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback)
        }
        window.WVJBCallbacks = [callback]
        let WVJBIframe = document.createElement("iframe")
        WVJBIframe.style.display = "none"
        WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__"
        document.documentElement.appendChild(WVJBIframe)
        setTimeout(function() { 
            document.documentElement.removeChild(WVJBIframe) 
        }, 0)
    }
}