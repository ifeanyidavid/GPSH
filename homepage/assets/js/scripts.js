// PASSWORD METER
var strength = {
    0: "Worst",
    1: "Bad",
    2: "Weak",
    3: "Good",
    4: "Strong"
};

var password = document.getElementById('password');
var meter = document.getElementById('password-strength-meter');
var text = document.getElementById('password-strength-text');

password.addEventListener('input', function () {
    var val = password.value;
    var result = zxcvbn(val);

    // Update the password strength meter
    meter.value = result.score;

    // Update the text indicator
    if (val !== "") {
        text.innerHTML = "Strength: " + "<strong>" + strength[result.score] + "</strong>" + "<br/><span class='feedback'>" + result.feedback.warning + " " + result.feedback.suggestions + "</span";
    } else {
        text.innerHTML = "";
    }
});

// REVEAL PASSWORD
var show_password_trigger = document.querySelector('.show-password-trigger');
show_password_trigger.addEventListener('click', revealPassword);

function revealPassword() {
    var password_field = document.querySelector('#password');
    var reveal_password_trigger = document.querySelector('#showpassword');
    if (reveal_password_trigger.checked) {
        password_field.setAttribute("type", "text");
        this.innerText = "hide";
    } else {
        password_field.setAttribute("type", "password");
        this.innerText = "show";
    }
}


// FLICKITY
var voucher_scroll_elements = document.querySelectorAll('.main-carousel');
for (var i = 0, len = voucher_scroll_elements.length; i < len; i++) {
    var voucher_scroll_element = voucher_scroll_elements[i];
    var flickity = new Flickity(voucher_scroll_element, {
        cellSelector: '.carousel-cell',
        cellAlign: 'center',
        freeScroll: false,
        prevNextButton: true,
        pageDots: false,
        wrapAround: false,
        contain: true,
        draggable: Modernizr.touchevents,
        groupCells: '80%',
        selectedAttraction: 0.4,
        friction: 1,
        imagesLoaded: true,
        setGallerySize: false,
        warchCSS: true,
        arrowShape: {
            x0: 10,
            x1: 60,
            y1: 50,
            x2: 70,
            y2: 40,
            x3: 30
        }
    });
}