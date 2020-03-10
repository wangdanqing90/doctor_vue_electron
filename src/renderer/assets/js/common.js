var myInterval = ''
var myisLoaded = true
export default {
    myInterval,
    myisLoaded,
    login: function () {

    },

    // 判断是否为空
    isNullOrBlank: function (strJudge) {
        return strJudge === null || strJudge === undefined || strJudge === '';
    },

    // 计算两个日期时间差
    DateDiff: function (sDate1, sDate2) { // sDate1和sDate2是2002-12-18格式
        var aDate, oDate1, oDate2, iDays
        aDate = sDate1.split('-')
        oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
        aDate = sDate2.split('-')
        oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
        return iDays
    },

    //获取今天日期，格式YYYY-MM-DD
    getNowFormatDate: function () {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },

    getUserInfo: function () {
        //ws start
        const WS = new WebSocket({
            url: 'wss://www.irego.cn:8080',
            reconnectTimes: 60
        })
        WS.onopen((event) => {
            this.$store.commit('SET_WS', WS)

            var authMSG = {
                type: 'sigin',
                utype: 'user',
                uid: "111",
                key: "key"
            }
            WS.send(authMSG)
            WS.onheartbeat()
        })

        WS.onmessage((data) => {
            var timestamp = new Date().getTime();
            var msg = {
                data: data,
                time: timestamp
            }
            this.$store.commit('SET_WS_MSG', msg)
        })
    },
    //时间id转换
    timeType: function (timeid) {
        switch (timeid) {
            case '0':
                return '8:00 - 8:30';
            case '1':
                return '8:30 - 9:00';
            case '2':
                return '9:00 - 9:30';
            case '3':
                return '9:30 - 10:00';
            case '4':
                return '10:00 - 10:30';
            case '5':
                return '10:30 - 11:00';
            case '6':
                return '11:00 - 11:30';
            case '7':
                return '11:30 - 12:00';
            case '8':
                return '12:00 - 12:30';
            case '9':
                return '12:30 - 13:00';
            case '10':
                return '13:00 - 13:30';
            case '11':
                return '13:30 - 14:00';
            case '12':
                return '14:00 - 14:30';
            case '13':
                return '14:30 - 15:00';
            case '14':
                return '15:00 - 15:30';
            case '15':
                return '15:30 - 16:00';
            case '16':
                return '16:00 - 16:30';
            case '17':
                return '16:30 - 17:00';
            default:
                return ''
        }
    },
    // 判断是否为手机号
    isPoneAvailable: function (pone) {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(pone)) {
            return false;
        } else {
            return true;
        }
    },
}