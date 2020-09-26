// Pagination
const perPage = 6, productQuantity = countProduct();
let currentApiUrl = "http://localhost:8080/api/product/getAllProducts";
const bestSellingApiUrl = "http://localhost:8080/api/product/getBestSelling";
const arcPriceApiUrl = "http://localhost:8080/api/product/ascPrice";
const descPriceApiUrl = "http://localhost:8080/api/product/descPrice";
const transactionUrl = 'http://localhost:8080/api/product/checkout';
const sortSelect = document.getElementById("sortBySelect");
let currentPage = 1;

function loading() {
    loadProducts(currentApiUrl, currentPage, perPage);
    loadPageNum();
    localStorage.setItem("orderListSession", "[]");
}

function updateCart() {
    loadOrderList();
    changeCartIndex();
    calculate();
    loadSelectedSize();
}

function sortBy() {
    switch (sortSelect.value) {

        case "highest":
            currentApiUrl = descPriceApiUrl;
            inPage(1);
            break;
        case "lowest":
            currentApiUrl = arcPriceApiUrl;
            inPage(1);
            break;
        default:
            inPage(1);
    }
}


function inPage(pageIndex) {
    document.getElementById(`page_${currentPage}`).style.color = '#787878';
    currentPage = pageIndex;
    loadProducts(currentApiUrl, currentPage, perPage)
}

function loadPageNum() {
    productQuantity.then(function (response) {
        document.getElementById("productsFound").innerHTML = response.data;

        let content = `
              <li class="page-item">
                <button class="page-link" id="btnPrev"><</button>
              </li>  
        `;
        const pageMax = Math.ceil(response.data / perPage);
        for (let i = 1; i <= pageMax; i++) {
            content += `
                <li class="page-item">
                    <button 
                        id="page_${i}" 
                        class="page-link"
                        onclick="inPage(${i})" 
                        >
                        ${i}
                    </button>
                </li>
                `;
        }
        content += `
            <li class="page-item">
                <button class="page-link" id="btnNext">></button>
            </li>
        `;
        document.getElementById("pages").innerHTML = content;
        document.querySelector("#btnNext").addEventListener("click", () => {
            if (currentPage < pageMax) {
                loadProducts(currentApiUrl, ++currentPage, perPage);
                document.getElementById(`page_${currentPage - 1}`).style.color = "black";

            }
        });
        document.querySelector("#btnPrev").addEventListener("click", () => {
            if (currentPage > 1) {
                loadProducts(currentApiUrl, --currentPage, perPage);
                document.getElementById(`page_${currentPage + 1}`).style.color = "black";
            }
        });
    })
        .catch(function (error) {
            console.log(error);
        });
}

async function countProduct() {
    return await axios({
        url: "http://localhost:8080/api/product/count",
        method: "GET"
    });

}

function loadProducts(apiUrl) {
    let node = document.getElementById("singleProduct");
    node.scrollIntoView(true);
    axios({
        url: `${apiUrl}/${currentPage}/${perPage}`,
        method: 'GET'
    })
        .then(function (response) {
            let content = '';
            for (let i = 0; i < response.data.length; i++) {
                content += `
                <!-- Single Product -->
                    <div class="col-12 col-sm-6 col-lg-4" id="product_${response.data[i].id}">
                        <div class="single-product-wrapper">
                            <!-- Product Image -->
                            <div class="product-img">
                                    <img onclick="setProductParameter('${response.data[i].id}')"
                                        onmouseenter="loadImagesInterval(this)" id="img${response.data[i].id}"
                                        onmouseleave="stopImagesInterval(this)"    
                                        src="img/product-img/${response.data[i].id}/main.jpg">
                               

                                <!-- Product Badge -->
                                ${loadStatus(response.data[i].discount, response.data[i].status)}
                            </div>

                            <!-- Product Description -->
                            <div class="product-description" style="text-align: center">
                                <span>${response.data[i].brand}</span>
                                <a href="single-product-details.html?{id}=${response.data[i].id}">
                                    <h6>${response.data[i].name}</h6>
                                </a>
                                <p class="product-price">
                                    ${loadPrice(response.data[i].discount, response.data[i].price)}
                                </p>
                              
                                <!-- Hover Content -->
                                <div class="hover-content">
                                    <!-- Add to Cart -->
                                    <div class="add-to-cart-btn">
                                        <button class="btn essence-btn" onclick="getSingleCart(
                                            '${response.data[i].id}',
                                            '${response.data[i].name}',
                                            '${response.data[i].brand}',
                                            'img/product-img/${response.data[i].id}/main.jpg',
                                            ${response.data[i].price * (1 - response.data[i].discount)}
                                            )">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
        `;
            }
            document.getElementById('singleProduct').innerHTML = content;
            document.getElementById(`page_${currentPage}`).style.color = "blue";

        })
        .catch(function (error) {
            console.log(error);
        });
}


// class checkoutDto {
//     constructor(productName, productQuantity) {
//         this.name = productName;
//         this.quantity = productQuantity;
//     }
// }


// function checkout() {
//     const cartList = document.getElementsByClassName('single-cart-item');
//     let checkoutList = [];
//     for (let i = 0; i < cartList.length; i++) {
//         if (cartList[i].style.display !== 'none') {
//             let singleName = cartList[i].getElementsByTagName("h6")[0].innerText;
//             let singleQuantity = cartList[i].getElementsByTagName("input")[0].value;
//             checkoutList.push(new checkoutDto(singleName, singleQuantity));
//         }
//     }
//     transaction(checkoutList);
// }
// function transaction(checkoutList) {
//     axios({
//         url:`${transactionUrl}`,
//         data: checkoutList,
//         method: 'PUT'
//     })
// }




