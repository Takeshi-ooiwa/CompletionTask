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
//空白の回答対応
let sss = "";

function f_style() {
    let typ = document.flash.set4.value;
    if (typ === "Hard") {
        document.getElementById("number").style.transform = "scale(-1,-1)";
    } else if (typ === "Very Hard") {
        document.getElementById("number").style.transform = "skew(15deg, 20deg)scale(-1,-1) ";
    } else {
        document.getElementById("number").style.transform = "skew(0deg, 0deg)scale(1,1) ";
    }
}



function f_start() {

    f_style();

    if (flag == 0) {
        //初期値
        set[0] = document.flash.set1.value;
        set[1] = document.flash.set2.value;
        set[2] = document.flash.set3.value;
        // set[3] = document.flash.set4.value;
        //タイマー起動
        // timerID = setInterval('f_count()', set[2] * 1000);
        document.querySelector('h4').innerText = "";
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
        let r = Math.random();
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
    document.flash.b_start.value = "答え合わせをする";
    document.flash.b_start.focus();
    document.getElementById("number").style.transform = "skew(0deg, 0deg)scale(1,1) ";
    flag = 1;
}

function f_kotae() {
    let s = document.flash.number.value;
    sss = s;
    let t = "";
    //答え合わせ
    cnt2++;
    if (s === "") {
        //入力なし
        // alert("答えは" + getComma(kotae) + "です。");
        document.querySelector('h4').innerText = `actual:  ${s}\nexpected:  ${getComma(kotae)}\n\nNothing has been entered`;
        t = "×";
    } else if (s == kotae) {
        // alert("正解です！！");
        document.querySelector('h4').innerText = ` \nYay! Test PASSED. \n\n 正解です！！`;
        t = "○";
        cnt1++;
    } else if (s !== kotae) {
        // alert("答えは" + getComma(kotae) + "でした。");
        document.querySelector('h4').innerText = `actual:  ${s}\nexpected:  ${getComma(kotae)}\n\nOh my God! Is Wrong, so again`;
        t = "×";
    }

    //初期化
    document.flash.b_start.value = "スタート";
    flag = 0;
    document.flash.number.value = "";
    //成績の履歴
    seiseki += " " + t + getComma(kotae) + " ; ";
    if (cnt2 > 0) {
        t = " [" + cnt1 + "/" + cnt2 + "]  ";
    }
    document.getElementById("f_seiseki").innerHTML = "【履歴】" + t + seiseki;
    document.getElementById("number").style.transform = "skew(0deg, 0deg)scale(1,1) ";
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
    if (sss === true) {
        document.flash.number.value = "";
        document.flash.number.style.color = color_text;
        document.flash.b_start.disabled = false;
        document.flash.reset();
        document.flash.b_start.focus();
        document.getElementById("number").style.transform = "skew(0deg, 0deg)scale(1,1) ";
    }

}
