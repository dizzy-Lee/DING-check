//数组去重
function outRepeat(a) {
    var hash = [],
        arr = [];
    for (var i = 0, elem;
        (elem = a[i]) != null; i++) {
        if (!hash[elem]) {
            arr.push(elem);
            hash[elem] = true;
        }
    }
    return arr;
}
module.exports = {
    outRepeat: function outRepeat(a) {
        var hash = [],
            arr = [];
        for (var i = 0, elem;
            (elem = a[i]) != null; i++) {
            if (!hash[elem]) {
                arr.push(elem);
                hash[elem] = true;
            }
        }
        return arr;
    },
    formatData: function formatData(data) {


        data.forEach(value => {

            // for(let i  = 0;i<value.detail.length;i++){
            //     arr.push(Number(item.frequency)); //先将次数加入到数组里
            //     console.log(value.date,'这是用户的第几次验收：',Number(item.frequency))
            // }
            var arr = [];
            value.detail.forEach(item => {
                if (item.frequency == undefined) {
                    arr.push(Number(item.count)); //先将次数加入到数组里
                    console.log(value.date, '这是用户的第几次验收：', Number(item.count))
                } else {
                    arr.push(Number(item.frequency)); //先将次数加入到数组里
                    console.log(value.date, '这是用户的第几次验收：', Number(item.frequency))
                }




            });

            arr = outRepeat(arr).sort(); //使用数组去重法进行对次数去重然后挨个加入

            var set = []; //保存对象的数组这是



            for (let i = 0; i < arr.length; i++) {
                var obj = {
                    chajin: 0,
                    chaoshen: 0,
                    weijiao: 0,
                    dakeng: 0,
                    youxiu: 0,
                    zhongdeng: 0,
                    count: 0
                };
                set.push(obj);
            }


            value.detail.forEach(item => {
                for (let i = 0; i < arr.length; i++) {
                    if (item.frequency == undefined) {
                        if (arr[i] == Number(item.count)) { //加入到数组中
                            set[i].count = Number(item.count);
                            switch (item.evaluate) {
                                case "大坑":
                                    set[i].dakeng += 1;
                                    break;
                                case "优秀":
                                    set[i].youxiu += 1;
                                    break;
                                case "超神":
                                    set[i].chaoshen += 1;
                                    break;
                                case "差劲":
                                    set[i].chajin += 1;
                                    break;
                                case "未交":
                                    set[i].weijiao += 1;
                                    break;
                                case "中等":
                                    set[i].zhongdeng += 1;
                                    break;
                            }
                        }
                    } else {
                        if (arr[i] == Number(item.frequency)) { //加入到数组中
                            set[i].count = Number(item.frequency);
                            switch (item.evaluate) {
                                case "大坑":
                                    set[i].dakeng += 1;
                                    break;
                                case "优秀":
                                    set[i].youxiu += 1;
                                    break;
                                case "超神":
                                    set[i].chaoshen += 1;
                                    break;
                                case "差劲":
                                    set[i].chajin += 1;
                                    break;
                                case "未交":
                                    set[i].weijiao += 1;
                                    break;
                                case "中等":
                                    set[i].zhongdeng += 1;
                                    break;
                            }
                        }
                    }

                }
            });
            value.detail_1 = set;


        });
        //两极反转

        return data.reverse();
    },
    getTimes: function getTime(num) {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        if (month < 10) {
            month = "0" + String(month);
        }
        if (day < 10) {
            day = "0" + String(day);
        }
        if (hour < 10) {
            hour = "0" + String(hour);
        }
        if (minute < 10) {
            minute = "0" + String(minute);
        }
        if (second < 10) {
            second = "0" + String(second);
        }
        if (num == 1) {
            return year + "-" + month + "-" + day + " 23:59:59";
        } else if (num == 2) {
            return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        } else if (num == 3) {
            return hour + ":" + minute;
        } else if (num == 4) {
            return date.getMonth() + 1 + "月" + date.getDate() + "日";
        } else if (num == 5) {
            return year + " / " + month + " / " + day;
        }


    }
}