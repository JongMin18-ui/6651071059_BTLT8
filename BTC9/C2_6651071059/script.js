
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");

    if (mobileMenu.classList.contains("hidden")) {
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    } else {
        menuToggle.textContent = "✕";
        menuToggle.setAttribute("aria-expanded", "true");
    }
});

document.querySelectorAll(".mobile-link").forEach(function (link) {
    link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const orderForm = document.getElementById("order-form");
const formMessage = document.getElementById("form-message");

orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    formMessage.textContent =
        "Cảm ơn " + name +
        "! Tiệm đã nhận yêu cầu demo. Đây chưa phải đơn hàng gửi lên máy chủ.";

    orderForm.reset();
});