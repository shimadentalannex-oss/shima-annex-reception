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

}