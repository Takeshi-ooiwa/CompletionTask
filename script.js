//初期設定
set = new Array();

flag = 0;
seiseki = "";
cnt1 = 0;
cnt2 = 0;
blank = 100;

cd_text = new Array("①", "②①", "③②①");

color_text = "#000000";
color_count = "#CCCCCC";

function f_start() {
    if (flag == 0) {
        //初期値
        set[0] = document.flash.set1.value;
        set[1] = document.flash.set2.value;
        set[2] = document.flash.set3.value;
        // set[3] = document.flash.set4.value;
        //タイマー起動
        // timerID = setInterval('f_count()', set[2] * 1000);
        count = 0;
        document.flash.b_start.disabled = true;
        kotae = 0;
        //タイマー処理
        count = 3;
        f_countdown();
    } else {
        f_kotae();
    }
}

function f_count() {
    count++;
    if (set[1] < count) {
        f_clear();
    } else {
        //乱数の生成
        var r = Math.random();
        r = Math.floor(r * Math.pow(10, set[0]) * 0.9 + Math.pow(10, set[0] - 1));
        //数値の表示
        document.flash.number.style.color = color_text;
        document.flash.number.value = getComma(r);
        kotae += r;

        timerID = setTimeout('f_blank()', set[2] * 1000);
    }
}

function f_blank() {
    //空白表示
    document.flash.number.value = "";
    timerID = setTimeout('f_count()', blank);
}

function f_clear() {
    //タイマー停止
    clearInterval(timerID);
    // document.flash.number.value = "";
    document.flash.b_start.disabled = false;
    document.flash.b_start.value = "解答表示";
    document.flash.b_start.focus();
    flag = 1;
}


function f_kotae() {
    var s = document.flash.number.value;
    var t = "";
    if (s != "") {
        //答え合わせ
        cnt2++;
        if (s == kotae) {
            // alert("正解です！！");
            alert(" \nYay! Test PASSED. \n\n 正解です！！");

            t = "○";
            cnt1++;
        } else {
            alert("答えは" + getComma(kotae) + "でした。");
            alert("    actual: ", s);
            alert("  expected: ", getComma(kotae));
            t = "×";
        }
    } else {
        //入力なし
        // alert("答えは" + getComma(kotae) + "です。");
        alert("    actual: ", s);
        alert("  expected: ", getComma(kotae));


        // t = "×";





    }
    //初期化
    document.flash.b_start.value = "スタート";
    flag = 0;
    document.flash.number.value = "";
    //成績の履歴
    seiseki += " " + t + getComma(kotae);
    if (cnt2 > 0) {
        t = " [" + cnt1 + "/" + cnt2 + "]  ";
    }
    document.getElementById("f_seiseki").innerHTML = "【履歴】" + t + seiseki;
}

function getComma(num) {
    num = new String(num).replace(/,/g, "");
    while (num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
    return num;
}

function f_countdown() {
    count--;
    document.flash.number.style.color = color_count;
    document.flash.number.value = cd_text[count];
    if (count == 0) {
        timerID = setTimeout('f_blank()', 1000);
    } else {
        timerID = setTimeout('f_countdown()', 1000);
    }
}

number_format();

function number_format() {
    //初期化
    document.flash.reset();
    document.flash.number.value = "";
    document.flash.number.style.color = color_text;
    document.flash.b_start.disabled = false;
    document.flash.b_start.focus();
}
