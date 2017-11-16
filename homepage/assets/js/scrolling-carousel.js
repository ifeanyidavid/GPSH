document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

function determineOverflow(content, container) {
    var containerMetrics = container.getBoundingClientRect();
    var containerMetricsRight = Math.floor(containerMetrics.right);
    var containerMetricsLeft = Math.floor(containerMetrics.left);
    var contentMetrics = content.getBoundingClientRect();
    var contentMetricsRight = Math.floor(contentMetrics.right);
    var contentMetricsLeft = Math.floor(contentMetrics.left);
	 if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
        return "both";
    } else if (contentMetricsLeft < containerMetricsLeft) {
        return "left";
    } else if (contentMetricsRight < containerMetricsRight) {
        return "right";
    } else {
        return "none";
    }
}

var v_voucher_container = document.getElementById("v-voucher-container");
var voucher_row = document.getElementById("voucher-row");

v_voucher_container.setAttribute("data-overflowing", determineOverflow(voucher_row, v_voucher_container));

// Handle the scroll of the horizontal container
var last_known_scroll_position = 0;
var ticking = false;

function doSomething(scroll_pos) {
    v_voucher_container.setAttribute("data-overflowing", determineOverflow(voucher_row, v_voucher_container));
}

v_voucher_container.addEventListener("scroll", function () {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function () {
            doSomething(last_known_scroll_position);
            ticking = false;
        });
    }
    ticking = true;
});

var SETTINGS = {
    navBarTravelling: false,
    navBarDirection: "",
    navBarTravelDistance: 150
}

// Our advancer buttons
var advancerLeft = document.getElementById('advancerLeft');
var advancerRight = document.getElementById('advancerRight');

advancerLeft.addEventListener("click", function () {

    // If in the middle of a move return
    if (SETTINGS.navBarTravelling === true) {
        return;
    }
    // If we have content overflowing both sides or on the left
    if (determineOverflow(voucher_row, v_voucher_container) === "left" || determineOverflow(voucher_row, v_voucher_container) === "both") {
        // Find how far this panel has been scrolled
        var availableScrollLeft = v_voucher_container.scrollLeft;
        // If the space available is less than two lots of our desired distance, just move the whole amount
        // otherwise, move by the amount in the settings
        if (availableScrollLeft < SETTINGS.navBarTravelDistance * 2) {
            voucher_row.style.transform = "translateX(" + availableScrollLeft + "px)";
        } else {
            voucher_row.style.transform = "translateX(" + SETTINGS.navBarTravelDistance + "px)";
        }
        // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
        voucher_row.classList.remove("pn-ProductNav_Contents-no-transition");
        // Update our settings
        SETTINGS.navBarTravelDirection = "left";
        SETTINGS.navBarTravelling = true;
    }
    // Now update the attribute in the DOM
    v_voucher_container.setAttribute("data-overflowing", determineOverflow(voucher_row, v_voucher_container));
});

advancerRight.addEventListener("click", function () {
    // If in the middle of a move return
    if (SETTINGS.navBarTravelling === true) {
        return;
    }
    // If we have content overflowing both sides or on the right
    if (determineOverflow(voucher_row, v_voucher_container) === "right" || determineOverflow(voucher_row, v_voucher_container) === "both") {
        // Get the right edge of the container and content
        var navBarRightEdge = voucher_row.getBoundingClientRect().right;
        var navBarScrollerRightEdge = v_voucher_container.getBoundingClientRect().right;
        // Now we know how much space we have available to scroll
        var availableScrollRight = Math.floor(navBarRightEdge - navBarScrollerRightEdge);
        // If the space available is less than two lots of our desired distance, just move the whole amount
        // otherwise, move by the amount in the settings
        if (availableScrollRight < SETTINGS.navBarTravelDistance * 2) {
            voucher_row.style.transform = "translateX(-" + availableScrollRight + "px)";
        } else {
            voucher_row.style.transform = "translateX(-" + SETTINGS.navBarTravelDistance + "px)";
        }
        // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
        voucher_row.classList.remove("pn-ProductNav_Contents-no-transition");
        // Update our settings
        SETTINGS.navBarTravelDirection = "right";
        SETTINGS.navBarTravelling = true;
    }
    // Now update the attribute in the DOM
    v_voucher_container.setAttribute("data-overflowing", determineOverflow(voucher_row, v_voucher_container));
});

voucher_row.addEventListener("transitionend", function () {
        // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
        var styleOfTransform = window.getComputedStyle(voucher_row, null);
        var tr = styleOfTransform.getPropertyValue("-webkit-transform") || styleOfTransform.getPropertyValue("transform");
        // If there is no transition we want to default to 0 and not null
        var amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
        voucher_row.style.transform = "none";
        voucher_row.classList.add("pn-ProductNav_Contents-no-transition");
        // Now lets set the scroll position
        if (SETTINGS.navBarTravelDirection === "left") {
            v_voucher_container.scrollLeft = v_voucher_container.scrollLeft - amount;
        } else {
            v_voucher_container.scrollLeft = v_voucher_container.scrollLeft + amount;
        }
        SETTINGS.navBarTravelling = false;
    },
    false
);