function saveOrderListSession(orderList) {
    localStorage.setItem("orderListSession", JSON.stringify(orderList))
}

function changeCartIndex() {
    const orderList = JSON.parse(localStorage.getItem("orderListSession"));
    document.getElementById("cartIndex").innerHTML = (orderList.length > 0) ?
        `${orderList.length}` : "";
    document.getElementById("slideCartIndex").innerHTML = (orderList.length > 0) ?
        `${orderList.length}` : "";
}

function deleteSingleCart(id) {
    let orderList = JSON.parse(localStorage.getItem("orderListSession"));
    const deleteIndex = orderList.findIndex((object) => object.id === id);
    orderList.splice(deleteIndex, 1);
    saveOrderListSession(orderList);
    let cart = document.getElementById(`cart_${id}`);
    document.getElementById("cartList").removeChild(cart);
    changeCartIndex();
    calculate();
}

function changeItemQuantity(id) {
    let orderList = JSON.parse(localStorage.getItem("orderListSession"));
    let index = orderList.findIndex((object) => object.id === id);
    orderList[index].quantity = document.getElementById(`quantity_${id}`).value;
    saveOrderListSession(orderList);
    calculate();
    return index;
}

function selectProductSize(id) {
    let orderList = JSON.parse(localStorage.getItem("orderListSession"));
    const index = orderList.findIndex((object) => object.id === id);
    const element = document.getElementById(`productSize_${id}`);
    orderList[index].size = element.value;
    saveOrderListSession(orderList);
}

function calculate() {
    const orderList = JSON.parse(localStorage.getItem("orderListSession"));
    let subTotal = 0;
    for (const object of orderList) {
        subTotal += document.getElementById(`currentPrice_${object.id}`).innerHTML.slice(1) * object.quantity;
    }
    document.getElementById("vat").innerHTML=`$${subTotal * 10 / 100}`;
    document.getElementById("subtotal").innerHTML = `$${subTotal}`;
    document.getElementById('total').innerHTML = `$${subTotal * 110 / 100}`;
    document.getElementById("delivery").innerHTML = (subTotal <= 1000) ? "Depend on distance" : "FREE";
}

function loadSelectedSize() {
    const orderList = JSON.parse(localStorage.getItem("orderListSession"));
    for (const object of orderList) {
        document.getElementById(`productSize_${object.id}`).options[object.size].selected = true;
    }
}

function loadOrderList() {
    let orderList = JSON.parse(localStorage.getItem("orderListSession"));
    let content = ""
    for (const object of orderList) {
        content += `
            <div id="cart_${object.id}" class="single-cart-item">
                <div class="product-image">
                    <img src="img/product-img/${object.id}/main.jpg" class="cart-thumb" alt="">
                    <div class="cart-item-desc">
                        <span class="product-remove" onclick="deleteSingleCart('${object.id}')">
                            <i class="fa fa-close" aria-hidden="true"></i>
                        </span>
                        <span class="badge">${object.brand}</span>
                        <h6>${object.name}</h6>
                        <p id="currentPrice_${object.id}" class="price">$${object.currentPrice}</p>
                        <br>
                        <div class="select-boz d-flex">  
                            <div>
                                    <label for="quantity_${object.id}" class="badge">Qty:</label>
                                    <input class="form-control quantityProduct" 
                                        value="${object.quantity}" type="number" 
                                        id="quantity_${object.id}" name="quantity" min="1" max="100"
                                        onchange="changeItemQuantity('${object.id}')"
                                    >
                                </div>
                                <div>
                                    <label for="productSize_${object.id}" class="badge">Size:</label>
                                    <select 
                                        onchange="selectProductSize('${object.id}')" 
                                        class="form-control sizeProduct" 
                                        name="select" id="productSize_${object.id}"  >
                                        <option value="0">XL</option>
                                        <option value="1">X</option>
                                        <option value="2">M</option>
                                        <option value="3">S</option>
                                    </select>   
                                </div> 
                        </div>
                   </div>  
                </div>  
            </div>
        `;
    }
    document.getElementById("cartList").innerHTML = content;
}

function getSingleCart(id, name, brand, img, currentPrice) {
    let orderList = JSON.parse(localStorage.getItem("orderListSession"));
    let existence = orderList.findIndex((object) => object.id === id);
    if (existence < 0) {
        orderList.push({id: id, name: name, brand: brand, currentPrice: currentPrice, quantity: 1, size: 0});
        saveOrderListSession(orderList);
        let cartList = document.getElementById("cartList");
        cartList.innerHTML += `
        <div id="cart_${id}" class="single-cart-item">
            <div class="product-image">
                <img src="${img}" class="cart-thumb" alt="">
                <div class="cart-item-desc">
                    <span class="product-remove" onclick="deleteSingleCart('${id}')">
                        <i class="fa fa-close" aria-hidden="true"></i>
                    </span>
                    <span class="badge">${brand}</span>
                        <h6>${name}</h6>
                        <p id="currentPrice_${id}" class="price">$${currentPrice}</p>
                        <br>
                         <div class="select-box d-flex">
                                <div>
                                    <label for="quantity_${id}" class="badge">Qty:</label>
                                    <input class="form-control quantityProduct" 
                                        value="1" type="number" id="quantity_${id}" name="quantity" min="1" max="100"
                                        onchange="changeItemQuantity('${id}')"
                                    >
                                </div>
                                <div>
                                    <label for="productSize_${id}" class="badge">Size:</label>
                                    <select 
                                        onchange="selectProductSize('${id}')"
                                        class="form-control sizeProduct" name="select" id="productSize_${id}" >
                                        <option value="0">XL</option>
                                        <option value="1">X</option>
                                        <option value="2">M</option>
                                        <option value="3">S</option>
                                    </select>   
                                </div> 
                        </div>
                 </div>
            </div>
        </div>
`;
        changeCartIndex();
        calculate();
    } else swal("This product is already in your cart!");
}