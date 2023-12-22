let caps = [
    "Good day!",
    "Thanks for stopping by today.",
    "It's lovely to see you!",
    "My portfolio is divided into three sections,",
    "each represents a segment of the web.",
    "What are you waiting for?",
    "Click around and explore!"
]

var d = new Date();
var hours = d.getHours();
if (hours < 12) {
    caps[0] = "Good morning!";
} else {
    caps[0] = "Good evening!";
}

let i = 0

function capRotate() {
    document.getElementById('caption-line').innerText = caps[i];
    if (i == caps.length - 1) {
        i = 0;
    } else {
        i++;
    }
}

setInterval(capRotate, 5000);