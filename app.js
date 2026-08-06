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

function printReceipt() {
    
　　　saveSale();

    window.print();

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

        total: cart.reduce((sum, item) => sum + item.price, 0)

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

        history.slice().reverse().forEach(sale => {

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
   売上集計
========================================== */

function showSalesSummary() {

    document.getElementById("salesModal").style.display = "flex";

}

function closeSalesSummary() {

    document.getElementById("salesModal").style.display = "none";

}

function printSalesSummary() {

    window.print();

}