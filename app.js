/* ==========================================
   SHIMA DENTAL ANNEX
   Reception System v1.0
========================================== */

// 会計データ
let cart = [];

// 支払方法
let paymentMethod = "カード";

// 保存済み判定

let saleSaved = false;

/* ==========================================
   商品追加
========================================== */

function addItem(name, price) {

    cart.push({
        name: name,
        price: price
    });

    saleSaved = false;

    updateCart();

    if (button) {

        button.classList.add("selected");

    }

/* ==========================================
   商品削除
========================================== */

function removeItem(index) {

    cart.splice(index, 1);
    saleSaved = false;
    updateCart();

}

/* ==========================================
   会計一覧更新
========================================== */

function updateCart() {

    const cartArea = document.getElementById("cartItems");

    const totalArea = document.getElementById("totalPrice");

    const receiptArea = document.getElementById("receiptItems");

    cartArea.innerHTML = "";

    receiptArea.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartArea.innerHTML =
            '<div class="empty">商品を選択してください</div>';

        totalArea.textContent = "¥0";

        document.getElementById("receiptTotal").textContent = "¥0";

        return;

    }

    cart.forEach((item, index) => {

        total += item.price;

        cartArea.innerHTML += `

        <div class="cart-item">

            <div class="cart-left">

                <div class="cart-name">

                    ${item.name}

                </div>

                <div class="cart-price">

                    ¥${item.price.toLocaleString()}

                </div>

            </div>

            <button
                class="delete-button"
                onclick="removeItem(${index})">

                ×

            </button>

        </div>

        `;

        receiptArea.innerHTML += `

        <tr>

            <td>

                ${item.name}

            </td>

            <td style="text-align:right">

                ¥${item.price.toLocaleString()}

            </td>

        </tr>

        `;

    });

    totalArea.textContent =
        "¥" + total.toLocaleString();

    document.getElementById("receiptTotal").textContent =
        "¥" + total.toLocaleString();
        const patient =
    document.getElementById("patientName").value;

document.getElementById("receiptPatient").textContent =
    patient ? patient + " 様" : "患者名";

const today = new Date();

document.getElementById("today").textContent =
    today.getFullYear() + "年" +
    (today.getMonth() + 1) + "月" +
    today.getDate() + "日";

document.getElementById("receiptPayment").textContent =
    paymentMethod;

}/* ==========================================
   支払方法
========================================== */

function selectPayment(method) {

    paymentMethod = method;

    document.getElementById("receiptPayment").textContent = method;

    document.getElementById("cardBtn").classList.remove("active");
    document.getElementById("cashBtn").classList.remove("active");

    if (method === "カード") {
        document.getElementById("cardBtn").classList.add("active");
    } else {
        document.getElementById("cashBtn").classList.add("active");
    }

}

/* ==========================================
   印刷
========================================== */

function printReceipt(){

    if(cart.length === 0){
        alert("商品を選択してください。");
        return;
    }

    saveSale();

    document.body.classList.add("print-receipt");

    window.print();

    document.body.classList.remove("print-receipt");

}

/* ==========================================
   会計クリア
========================================== */

function clearCart() {

    if (!confirm("会計内容をクリアしますか？")) {
        return;
    }

    cart = [];
    
    saleSaved = false;

    document.getElementById("patientName").value = "";

    updateCart();
document.querySelectorAll(".menu-button").forEach(button => {

        button.classList.remove("selected");

    });

}

/* ==========================================
   初期表示
========================================== */

window.onload = function () {

    updateCart();
    
    selectPayment("カード");
    
    document.getElementById("patientName")

        .addEventListener("input", updateCart);

};
/* ==========================================
   売上保存
========================================== */

function saveSale() {

    if (cart.length === 0) return;
    if (saleSaved) return;

    const patient =
        document.getElementById("patientName").value || "";

    const sale = {

        datetime: new Date().toISOString(),

        patient: patient,

        payment: paymentMethod,

        items: [...cart],

        total: cart.reduce((sum, item) => sum + item.price, 0),

        cancelled: false
    };

    const history =
        JSON.parse(localStorage.getItem("annexSales") || "[]");

    history.push(sale);

    localStorage.setItem(
        "annexSales",
        JSON.stringify(history)
    );
// 保存済みにする
saleSaved = true;

}

/* ==========================================
   売上一覧取得
========================================== */

function getSales() {

    return JSON.parse(
        localStorage.getItem("annexSales") || "[]"
    );

}

/* ==========================================
   会計完了
========================================== */

function finishPayment() {

    saveSale();

    clearCart();

    alert("会計を保存しました。");

}
function toggleCategory(title){

    const items = title.nextElementSibling;

    items.classList.toggle("open");

    title.textContent =
        (items.classList.contains("open") ? "▼ " : "▶ ")
        + title.textContent.substring(2);

}
/* ==========================================
   履歴表示
========================================== */

function showHistory() {

    const history =
        JSON.parse(localStorage.getItem("annexSales") || "[]");

    const list =
        document.getElementById("historyList");

    list.innerHTML = "";

    if (history.length === 0) {

        list.innerHTML =

            "<p>履歴はありません。</p>";

    } else {

        history.slice().reverse().forEach((sale, reverseIndex) => {

            const originalIndex = history.length - 1 - reverseIndex;

            let itemsHtml = "";

            sale.items.forEach(item => {

                itemsHtml += `

                <div class="history-item">

                    <span>${item.name}</span>

                    <span>¥${item.price.toLocaleString()}</span>

                </div>

                `;

            });

            const date = new Date(sale.datetime);

            const dateText =
                date.getFullYear() + "年" +
                (date.getMonth() + 1) + "月" +
                date.getDate() + "日 " +
                date.getHours().toString().padStart(2,"0") + ":" +
                date.getMinutes().toString().padStart(2,"0");

            list.innerHTML += `

            <div class="history-card">

                <div class="history-date">

                    ${dateText}

                </div>

                <div class="history-patient">

                    <strong>患者名：</strong>

                    ${sale.patient || "未入力"}

                </div>

                <div class="history-payment">

                    <strong>支払：</strong>

                    ${sale.payment}

                </div>

                ${itemsHtml}

               <div class="history-total">

合計

¥${sale.total.toLocaleString()}

</div>

<div style="margin-top:15px;text-align:right;">

${
sale.cancelled

?

`<span style="color:red;font-weight:bold;">
取消済
</span>`

:

`<button
class="cancel-button"
onclick="cancelSale(${originalIndex})">

取消

</button>`

}

</div>

            </div>

            `;

        });

    }

    document.getElementById("historyModal").style.display = "flex";

}

/* ==========================================
   履歴を閉じる
========================================== */

function closeHistory(){

    document.getElementById("historyModal").style.display = "none";

}
/* ==========================================
   売上集計表示
========================================== */

function showSalesSummary() {

    const history =
        JSON.parse(localStorage.getItem("annexSales") || "[]");

    const now = new Date();

    const thisMonth = history.filter(sale => {

        // 取消済みの会計は売上集計から除外
        if (sale.cancelled === true) return false;

        const d = new Date(sale.datetime);

        return (
            d.getFullYear() === now.getFullYear() &&
            d.getMonth() === now.getMonth()
        );

    });

    let totalSales = 0;
    let cardSales = 0;
    let cashSales = 0;

    const itemSummary = {};

    thisMonth.forEach(sale => {

        totalSales += sale.total;

        if (sale.payment === "カード") {
            cardSales += sale.total;
        } else {
            cashSales += sale.total;
        }

        sale.items.forEach(item => {

            if (!itemSummary[item.name]) {

                itemSummary[item.name] = {

                    count: 0,
                    total: 0

                };

            }

            itemSummary[item.name].count++;

            itemSummary[item.name].total += item.price;

        });

    });

    let table = "";

    Object.keys(itemSummary)
        .sort()
        .forEach(name => {

            table += `

<tr>

<td>${name}</td>

<td>${itemSummary[name].count}</td>

<td>¥${itemSummary[name].total.toLocaleString()}</td>

</tr>

`;

        });

    document.getElementById("salesSummary").innerHTML = `

<div class="sales-title">

${now.getFullYear()}年${now.getMonth()+1}月 売上集計

</div>

<div class="sales-total">

<div class="sales-row">

<span>件数</span>

<span>${thisMonth.length}件</span>

</div>

<div class="sales-row">

<span>カード売上</span>

<span>¥${cardSales.toLocaleString()}</span>

</div>

<div class="sales-row">

<span>現金売上</span>

<span>¥${cashSales.toLocaleString()}</span>

</div>

<div class="sales-row">

<span>総売上</span>

<span>¥${totalSales.toLocaleString()}</span>

</div>

</div>

<div class="sales-section">

<h3>商品別集計</h3>

<table class="sales-table">

<thead>

<tr>

<th>商品名</th>

<th>件数</th>

<th>売上</th>

</tr>

</thead>

<tbody>

${table}

</tbody>

</table>

</div>

`;

    document.getElementById("salesModal").style.display = "flex";

}

function closeSalesSummary() {

    document.getElementById("salesModal").style.display = "none";

}

function printSalesSummary() {

    document.body.classList.add("print-sales");

    setTimeout(() => {

        window.print();

    }, 100);

    window.onafterprint = function() {

        document.body.classList.remove("print-sales");

    };

}
/* ==========================================
   会計取消
========================================== */

function cancelSale(index){

    if(!confirm("この会計を取消しますか？")){

        return;

    }

    const history =
        JSON.parse(localStorage.getItem("annexSales")||"[]");

    if (!history[index]) {
        return;
    }

    history[index].cancelled = true;

    localStorage.setItem(

        "annexSales",

        JSON.stringify(history)

    );

    showHistory();

}