/* ==========================================
   SHIMA DENTAL ANNEX
   Reception System v1.0
========================================== */

// 会計データ
let cart = [];

// 支払方法
let paymentMethod = "カード";

/* ==========================================
   商品追加
========================================== */

function addItem(name, price) {

    cart.push({
        name: name,
        price: price
    });

    updateCart();

}

/* ==========================================
   商品削除
========================================== */

function removeItem(index) {

    cart.splice(index, 1);

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
   領収書プレビュー更新
========================================== */

function previewReceipt() {

    const patient =
        document.getElementById("patientName").value.trim();

    document.getElementById("receiptPatient").textContent =
        patient ? patient + " 様" : "患者名";

    const today = new Date();

    document.getElementById("today").textContent =
        today.getFullYear() + "年" +
        (today.getMonth() + 1) + "月" +
        today.getDate() + "日";

    document.getElementById("receiptPayment").textContent =
        paymentMethod;

}

/* ==========================================
   印刷
========================================== */

function printReceipt() {

    previewReceipt();

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

    document.getElementById("patientName").value = "";

    updateCart();

    previewReceipt();

}

/* ==========================================
   初期表示
========================================== */

window.onload = function () {

    updateCart();

    previewReceipt();

    selectPayment("カード");

};/* ==========================================
   売上保存
========================================== */

function saveSale() {

    if (cart.length === 0) return;

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