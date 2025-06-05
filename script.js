// Dark-Mode:

let mode = "light";
let htmlBody = document.querySelector("body");
let toggleButton = document.querySelector(".dark-mode");
let container = document.getElementsByClassName("bg-black")
let widgetSection = document.querySelector(".footer-widgets")
let socialApps = document.querySelector(".social");

toggleButton.addEventListener("click", () => {
    if(mode === "light") {
        mode = "dark";
        htmlBody.classList.add("dark");
        htmlBody.classList.remove("light");
        toggleButton.style.color = "white";
        widgetSection.style.backgroundColor = "black";
        socialApps.style.backgroundColor = "black";
    } else if(mode === "dark") {
        mode = "light";
        htmlBody.classList.add("light");
        htmlBody.classList.remove("dark");
        toggleButton.style.color = "black";
        widgetSection.style.backgroundColor = "#F2F3F5";
        socialApps.style.backgroundColor = "white";
    }
});

// Copy menu for phone:

function copyMenu() {
    // copy inside .dpt-cat to .departments
    var dptCategory = document.querySelector(".dpt-cat");
    var dptPlace = document.querySelector(".departments");
    dptPlace.innerHTML = dptCategory.innerHTML;

    // Copy inside nav to nav

    var mainNav = document.querySelector(".header-nav nav");
    var navPlace = document.querySelector(".off-canvas nav");
    navPlace.innerHTML = mainNav.innerHTML;

    // Copy .header-top .wrapper to .thetop-nav

    var topNav = document.querySelector(".header-top .wrapper");
    var topPlace = document.querySelector(".off-canvas .thetop-nav");
    topPlace.innerHTML = topNav.innerHTML;
}

copyMenu();

// Show mobile menu
const menuButton = document.querySelector(".trigger"),
      closeButton = document.querySelector(".t-close"),
      addclass = document.querySelector(".site");
      
menuButton.addEventListener("click", function() {
    addclass.classList.toggle("showmenu");
});

closeButton.addEventListener("click", function() {
    addclass.classList.remove("showmenu");
});

// Show sub menu on mobile:

const submenu = document.querySelectorAll(".has-child .icon-small");
submenu.forEach((menu) => menu.addEventListener("click", toggle));

function toggle(e) {
    e.preventDefault();
    submenu.forEach((item) => item != this ? item.closest(".has-child ").classList.remove("expand") : null);
    if(this.closest(".has-child").classList != "expand");
    this.closest(".has-child").classList.toggle("expand");
}

// Slider
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 2000, 
        disableOnInteraction: false, 
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Show search
const searchButton = document.querySelector(".t-search"),
      tClose = document.querySelector(".search-close"),
      showClass = document.querySelector(".site");

searchButton.addEventListener("click", function() {
    showClass.classList.toggle("showsearch");
});

tClose.addEventListener("click", function () {
    showClass.classList.remove("showsearch");
});

// Show dpt menu

const dptButton = document.querySelector(".dpt-cat .dpt-trigger"),
      dptClass = document.querySelector(".site");

dptButton.addEventListener("click", function() {
    dptClass.classList.toggle("showdpt")
});

// Produc image slider

var productThumb = new Swiper(".small-large", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        481: {
            spaceBetween: 32,
        }
    }
});

var productBig = new Swiper(".big-image", {
    loop: true,
    autoHeight: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: productThumb
    }
});

// Show cart on click

const divtoShow = ".mini-cart";
const divPopup = document.querySelector(divtoShow);
const divTrigger = document.querySelector(".cart-trigger");

// if (divPopup && divTrigger) {
//     divTrigger.addEventListener("click", () => {
//         setTimeout(() => {
//             if (!divPopup.classList.contains("show")) {
//                 divPopup.classList.add("show");
//             }
//         }, 250);
//     });
// } else {
//     console.error("Elements not found: divPopup or divTrigger.");
// }


// close by click outside

document.addEventListener("click", (e) => {
    const isClosest = e.target.closest(divtoShow);
    if(!isClosest && divPopup.classList.contains("show")) {
        divPopup.classList.remove("show");
    }
})

 ///////////////////////////


 // Initial cart data
let cartData = {
    itemCount: 0,
    total: 0,
};

// Function to update cart display dynamically
function updateCartDisplay() {
    document.getElementById("cart-count").textContent = cartData.itemCount;
    document.getElementById("cart-total").textContent = `$${cartData.total.toFixed(2)}`;
}

// Function to add an item to the cart
function addToCart(price) {
    cartData.itemCount++;
    cartData.total += price;
    updateCartDisplay();
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        const price = parseFloat(button.getAttribute("data-price"));
        addToCart(price);
    });
});

//////////////////////////////////

// Function to update totals
function updateTotals() {
    const rows = document.querySelectorAll("#cart-table tbody tr");
    let subtotal = 0;

    rows.forEach(row => {
        const price = parseFloat(row.dataset.price);
        const quantity = parseInt(row.querySelector(".item-quantity").value);
        const subtotalElement = row.querySelector(".item-subtotal");

        // Update subtotal for each item
        const itemSubtotal = price * quantity;
        subtotalElement.textContent = `$${itemSubtotal.toFixed(2)}`;

        // Add to cart subtotal
        subtotal += itemSubtotal;
    });

    // Update subtotal and total
    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("total").textContent = `$${subtotal.toFixed(2)}`;
}

// Function to remove a row
function removeRow(row) {
    row.remove();
    updateTotals();
}

// Add event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Handle quantity changes
    document.querySelectorAll("#cart-table .qty-control").forEach(control => {
        const minusButton = control.querySelector(".minus");
        const plusButton = control.querySelector(".plus");
        const quantityInput = control.querySelector(".item-quantity");

        // Decrease quantity
        minusButton.addEventListener("click", () => {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantity--;
                quantityInput.value = quantity;
                updateTotals();
            }
        });

        // Increase quantity
        plusButton.addEventListener("click", () => {
            let quantity = parseInt(quantityInput.value);
            quantity++;
            quantityInput.value = quantity;
            updateTotals();
        });

        // Manual input
        quantityInput.addEventListener("input", () => {
            let quantity = parseInt(quantityInput.value);
            if (isNaN(quantity) || quantity < 1) {
                quantityInput.value = 1;
            }
            updateTotals();
        });
    });

    // Handle item removal
    document.querySelectorAll("#cart-table .item-remove").forEach(removeButton => {
        removeButton.addEventListener("click", (e) => {
            e.preventDefault();
            const row = removeButton.closest("tr");
            removeRow(row);
        });
    });
});


///////////////////////////////////////////

