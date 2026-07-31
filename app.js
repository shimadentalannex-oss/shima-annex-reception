/* ==========================================
   SHIMA DENTAL ANNEX
   Reception System
   app.js Part1
========================================== */

let cart = [];

let paymentMethod = ”カード”;



/* ==========================================
   商品追加
========================================== */

function addItem(name, price){

    cart.push({

        name: name,

        price: price

    });

    updateCart();

}



/* ==========================================
   商品削除
========================================== */

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}



/* ==========================================
   カート更新
========================================== */

function updateCart(){

    const cartArea =
        document.getElementById(”cartItems”);

    const totalArea =
        document.getElementById(”totalPrice”);

    cartArea.innerHTML = ””;

    if(cart.length===0){

        cartArea.innerHTML=

        ’＜div class=”empty”＞商品を選択してください＜/div＞’;

        totalArea.innerHTML=”¥0”;

        return;

    }

    let total=0;

    cart.forEach(function(item,index){

        total += item.price;

        cartArea.innerHTML +=

        `

        ＜div class=”cart-item”＞

            ＜div＞

                ＜div class=”cart-name”＞

                    ${item.name}

                ＜/div＞

            ＜/div＞

            ＜div＞

                ＜span class=”cart-price”＞

                    ¥${item.price.toLocaleString()}

                ＜/span＞

                ＜button

                    class=”delete-btn”

                    onclick=”removeItem(${index})”＞

                    ×

                ＜/button＞

            ＜/div＞

        ＜/div＞

        `;

    });

    totalArea.innerHTML=

    ”¥”+total.toLocaleString();

}



/* ==========================================
   支払方法
========================================== */

function selectPayment(type){

    paymentMethod = type;

    document

    .getElementById(”cardBtn”)

    .classList.remove(”active”);

    document

    .getElementById(”cashBtn”)

    .classList.remove(”active”);

    if(type===”カード”){

        document

        .getElementById(”cardBtn”)

        .classList.add(”active”);

    }

    else{

        document

        .getElementById(”cashBtn”)

        .classList.add(”active”);

    }

}



/* ==========================================
   会計クリア
========================================== */

function clearCart(){

    if(confirm(”会計内容をクリアしますか？”)){

        cart=[];

        updateCart();

    }

}
/* ==========================================
   プレビュー
========================================== */

function previewReceipt(){

    const patient =
        document.getElementById(”patientName”).value.trim();

    document.getElementById(”receiptPatient”).innerHTML =
        patient ? patient + ” 様” : ”患者名未入力”;

    const receiptItems =
        document.getElementById(”receiptItems”);

    receiptItems.innerHTML = ””;

    let total = 0;

    cart.forEach(function(item){

        total += item.price;

        receiptItems.innerHTML += `

        ＜div style=”
            display:flex;
            justify-content:space-between;
            margin-bottom:12px;
            font-size:20px;
        ”＞

            ＜span＞${item.name}＜/span＞

            ＜span＞¥${item.price.toLocaleString()}＜/span＞

        ＜/div＞

        `;

    });

    document.getElementById(”receiptTotal”).innerHTML =
        ”¥” + total.toLocaleString();

    const today = new Date();

    document.getElementById(”today”).innerHTML =

        today.getFullYear() + ”年” +

        (today.getMonth()+1) + ”月” +

        today.getDate() + ”日”;

}



/* ==========================================
   印刷
========================================== */

function printReceipt(){

    previewReceipt();

    window.print();

}



/* ==========================================
   売上保存（簡易版）
========================================== */

function saveSales(){

    let history =

        JSON.parse(

            localStorage.getItem(”annexSales”)

            || ”[]”

        );

    let total = 0;

    cart.forEach(function(item){

        total += item.price;

    });

    history.push({

        patient:

            document.getElementById(”patientName”).value,

        items: cart,

        payment: paymentMethod,

        total: total,

        date: new Date().toLocaleString()

    });

    localStorage.setItem(

        ”annexSales”,

        JSON.stringify(history)

    );

}



/* ==========================================
   印刷時に自動保存
========================================== */

const originalPrint = window.print;

window.print = function(){

    saveSales();

    originalPrint();

};



/* ==========================================
   初期表示
========================================== */

updateCart();

selectPayment(”カード”);

previewReceipt();
