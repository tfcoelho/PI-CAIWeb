function adjustBodyHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', adjustBodyHeight);
window.addEventListener('DOMContentLoaded', adjustBodyHeight); 

document.addEventListener("DOMContentLoaded", function () {
    let message = document.querySelector(".scroll-message");
    if (!message) return;

    let lastScrollTop = 0;

    function showScrollMessage() {
        message.style.opacity = "1";
        message.style.visibility = "visible";
    }

    function hideScrollMessage() {
        message.style.opacity = "0";
        message.style.visibility = "hidden";
    }

    // Detect scroll direction
    document.addEventListener("scroll", function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            showScrollMessage();
        } else {
            // Scrolling up
            hideScrollMessage();
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });

    // Prevent default scrolling behavior and show message on wheel or touch
    document.addEventListener("wheel", function (event) {
        event.preventDefault(); // Prevent scrolling
        if (event.deltaY > 0) {
            // Scrolling down
            showScrollMessage();
        } else {
            // Scrolling up
            hideScrollMessage();
        }
    }, { passive: false });

    document.addEventListener("touchmove", function (event) {
        event.preventDefault(); // Prevent scrolling
        let touch = event.touches[0];
        let currentTouchY = touch.clientY;

        if (currentTouchY > lastTouchY) {
            // Scrolling down
            showScrollMessage();
        } else {
            // Scrolling up
            hideScrollMessage();
        }

        lastTouchY = currentTouchY;
    }, { passive: false });

    let lastTouchY = 0;
});