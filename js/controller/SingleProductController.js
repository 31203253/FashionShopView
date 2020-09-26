function loadProductApi() {
    callProductApi().then(response => {
        let button = document.getElementById("addToCart");
        const {id, name, brand, description, discount, price} = response.data;
        const mainImg = `img/product-img/${id}/main.jpg`;
        let currentPrice = (1 - discount) * price;
        document.getElementById("productBrand").innerHTML = brand;
        document.getElementById("productName").innerHTML = name;
        document.getElementById("productDescription").innerHTML = description;
        document.getElementById("productPrice").innerHTML = loadPrice(discount, price);
        button.onclick = function () {
            getSingleCart(getProductParameter(), name, brand, mainImg, currentPrice);
        };
    })
}

function loading() {
    loadProductApi();
    showAllSlides();
    showSlides(1);
    loadOrderList();
    changeCartIndex();
    calculate();
    loadSelectedSize();
}
function updateCart() {
    loadOrderList();
    changeCartIndex();
    calculate();
    loadSelectedSize();
}









