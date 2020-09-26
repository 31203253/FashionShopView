const postInvoiceApi = 'http://localhost:8080/api/invoice/addInvoice';

function deleteSingleCartOverride(id) {
    deleteSingleCart(id);
    document.getElementById(`particular_${id}`).remove();
    getBill();
}

function getBill() {
    document.getElementById("orderSubtotal").innerHTML = document.getElementById("subtotal").innerHTML;
    document.getElementById("orderVat").innerHTML = document.getElementById("vat").innerHTML;
    document.getElementById("orderDelivery").innerHTML = document.getElementById('delivery').innerHTML;
    document.getElementById("orderTotal").innerHTML = document.getElementById('total').innerHTML;
}

function changeItemQuantityOverride(id) {
    const index = changeItemQuantity(id);
    const orderList = JSON.parse(localStorage.getItem("orderListSession"));
    let node = document.getElementById(`particular_${id}`);
    node.innerHTML = `
        <span>${orderList[index].quantity.toString().concat(" ", orderList[index].name)}</span>
        <span>$${orderList[index].currentPrice * orderList[index].quantity}</span>`;
    getBill();
}

function placeOrder() {
    const element = document.getElementById('orderForm');
    const formData = new FormData(element);
    const invoice = Object.fromEntries(formData);
    const session = localStorage.getItem('orderListSession');
    invoice.session = session;
    async function addInvoice() {
        const addInvoiceApi = await axios({
            method: 'post',
            url: `${postInvoiceApi}`,
            data: invoice
        });
        const response = await swal("Your order was placed! Thanks for choosing us. We will contact you as soon as!", {
            buttons: {
                cancel: "Cancel",
                ok: "Go to Shop",
            },
        });
        return response;
    }
    if (session === '[]') {
        swal("You haven't bought anything yet! Comeback to the shop?", {
            buttons: {
                cancel: "Cancel",
                ok: "OK",
            },
        })
            .then((value) => {
                if (value === 'ok') window.open('http://localhost:63342/Test/index.html', '_self');
            });
    } else addInvoice().then((response) => {
        console.log(response);
        if (response === 'ok') window.open('http://localhost:63342/Test/index.html', '_self');
    })



    // axios({
    //     method: 'post',
    //     url: `${postInvoiceApi}`,
    //     data: invoice
    // }).then((response) => {
    //     console.log(response.data);
    //     swal("Your order was placed! Thanks for choosing us. We will contact you as soon as!", {
    //         buttons: {
    //             cancel: "Cancel",
    //             ok: "Go to Shop",
    //         },
    //     })
    //         .then((value) => {
    //             if (value === 'ok') window.open('http://localhost:63342/Test/index.html', '_self');
    //         });
    // }).catch((error) => swal(error));
}