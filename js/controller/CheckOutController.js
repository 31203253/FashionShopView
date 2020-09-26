const loadOrderDetails = () => {
    let orderList = JSON.parse(localStorage.getItem("orderListSession"));
    let parentNode = document.getElementById("orderDetails");
    let nodeList = new Array(orderList.length);
    for (let i = 0; i < nodeList.length; i++) {
        if (document.getElementById(`particular_${orderList[i].id}`) !== null)
            document.getElementById(`particular_${orderList[i].id}`).remove();
        nodeList[i] = document.createElement("li");
        nodeList[i].id=`particular_${orderList[i].id}`
        nodeList[i].innerHTML = `
            <span>${orderList[i].quantity.toString().concat(" ", orderList[i].name)}</span>
            <span>$${orderList[i].currentPrice * orderList[i].quantity}</span>`;
        parentNode.insertBefore(nodeList[i], document.getElementById("markedNode"));
    };
    getBill();

}



function loadOrderListOverride() {
    let orderList = JSON.parse(localStorage.getItem("orderListSession"));
    let content = ""
    for (const object of orderList) {
        content += `
            <div id="cart_${object.id}" class="single-cart-item">
                <div class="product-image">
                    <img src="img/product-img/${object.id}/main.jpg" class="cart-thumb" alt="">
                    <div class="cart-item-desc">
                        <span class="product-remove" onclick="deleteSingleCartOverride('${object.id}')">
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
                                        onchange="changeItemQuantityOverride('${object.id}')"
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

function loading() {
    loadOrderListOverride();
    changeCartIndex();
    calculate();
    loadOrderDetails();
}

