let caps = [
    "Good day!",
    "Thanks for stopping by today.",
    "It's lovely to see you!",
    "What are you waiting for?"
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
    if (i == 3) {
        i = 0;
    } else {
        i++;
    }
}

setInterval(capRotate, 5000);