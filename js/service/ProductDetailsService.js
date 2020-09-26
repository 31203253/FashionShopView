const imagesList = ["hover", "leftside", "rightside", "waistband", "main"];
const productIdApi = "http://localhost:8080/api/product/getById";
function setProductParameter(id) {
    let productUrl = new URL("http://localhost:63342/Test/single-product-details.html?id=1");
    productUrl.searchParams.set('id', id);
    window.open(
        productUrl.toString()
    )
}
function getProductParameter() {
        const stringQuery = window.location.search;
        const productUrl = new URLSearchParams(stringQuery);
        return productUrl.get("id");
}

async function getProductDetails(productId) {
    return await axios({
        url: `${productIdApi}/${productId}`,
        method: "GET"
    })
}
async function callProductApi() {
    const details = await getProductDetails(getProductParameter());
    return details
}
function loadImagesInterval(prop) {
    let i = 0;
    let imagesInterval = setInterval(() => {
        const id = prop.id.slice(3);
        prop.src = `img/product-img/${id}/${imagesList[i]}.jpg`;
        i++;
        if (i === imagesList.length - 1) {
            clearInterval(imagesInterval);
            prop.src = `img/product-img/${id}/main.jpg`;
        }
    }, 1000);
}

function stopImagesInterval(prop) {
    const id = prop.id.slice(3);
    prop.src = `img/product-img/${id}/main.jpg`;
}
function loadPrice(discount, price) {
    let priceContent = (discount === 0) ? `$${price}` :
        `<span class="old-price">$${price}</span> $${(1 - discount)*100 * price/100}</p>`;
    return priceContent;
}
function loadStatus(discount, status) {
    let code = "";
    if (discount !== 0) {
        code = `<div class="product-badge offer-badge"><span>-${discount * 100}%</span></div>`;
    }
    else if (status != null && status !== "") {
        code = `<div class="product-badge new-badge"><span>${status}</span></div>`;
    }
    return code;
}