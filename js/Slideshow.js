let slideIndex = 1;
let imagesInterval = setInterval(() => showSlides(++slideIndex), 2000);


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function onMouseEnter() {
    clearInterval(imagesInterval)
}

function onMouseLeave() {
    imagesInterval = setInterval(() => showSlides(++slideIndex), 2000)
}

function showAllSlides() {
    const id = getProductParameter();
    let content = "";
    for (const slot of imagesList) {
        content += `
                <div class="mySlides">
                    <img 
                        onmouseenter="onMouseEnter()"
                        onmouseleave="onMouseLeave()"
                        src="img/product-img/${id}/${slot}.jpg" alt="">
                </div>
            `
    }
    content += `
            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>
        `;
    document.getElementById("productImages").innerHTML = content;
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("demo");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";

}

