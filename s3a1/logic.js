let temp = "";
let type = "";
let milk = "";
let sweetener = "";
let points = 0;
let dialog = "";


function getTemp() {
    var el = document.getElementsByName('temp');
    for (i = 0; i < el.length; i++) {
        if (el[i].checked) {
            console.log(el[i].value);
            temp = el[i].value
        }
    }
}

function getType() {
    var el = document.getElementsByName('type');
    for (i = 0; i < el.length; i++) {
        if (el[i].checked) {
            console.log(el[i].value);
            type = el[i].value
        }
    }
}

function getMilk() {
    var el = document.getElementsByName('milk');
    for (i = 0; i < el.length; i++) {
        if (el[i].checked) {
            console.log(el[i].value);
            milk = el[i].value
        }
    }
}

function getSweetener() {
    var el = document.getElementsByName('sweetener');
    for (i = 0; i < el.length; i++) {
        if (el[i].checked) {
            console.log(el[i].value);
            sweetener = el[i].value
        }
    }
}

function getAll() {
    console.log(temp, type, milk, sweetener)
}

function getPoints() {
    if (type == "Matcha") {
        points = points + 1;
    } else {
        points = points + 0.5;
    }

    if (milk == "Oat milk") {
        points += 1;
    } else {
        points += 0.5;
    }

    if (sweetener == "Vanilla syrup") {
        points += 1;
    } else if (sweetener == "Simple syrup") {
        points += 0.7;
    } else if (sweetener == "Sugar") {
        points -= 1;
    } else {
        points += 0.25;
    }
    console.log(points, points / 3);
}

function getDialog() {
    if (sweetener == "Sugar") {
        dialog = "Honestly, who puts sugar in a cold drink? Can't you see the sugar crystals sinking to the bottom? Take this away from me..."
    } else if (type == "Coffee" && milk == "No milk") {
        dialog = "Oh... straight black coffee? Are you a coffee snob or are we pulling an all-nighter? I promise my beans aren't nearly expensive enough for this..."
    } else if (type == "Matcha" && milk == "Oat milk" && sweetener == "Vanilla syrup") {
        dialog = "Absolutely divine! How did you know this was my favorite? Come back again tomorrow, same time same place!"
    } else {
        dialog = "Hmmm... pretty good... I guess. What's wrong? Oh nothing's wrong. Come back tomorrow and try again."
    }
    document.getElementById('prompter').innerText = dialog;
    
    const button = document.createElement('button');
    button.onclick(window.reload());
    button.innerText = 'Try again';
    document.getElementById('prompter').append(button);
    // const anchor = document.createElement('a');
    // anchor.href = '#scene0';
    // anchor.innerText = 'Try again >';
    // document.getElementById('prompter').appendChild(anchor);
}

function show(id) {
    var name = document.getElementById(id);
    name.style.display = "block";
    console.log('show')
}

function hide(id) {
    var name = document.getElementById(id);
    name.style.display = "none";
}

function showdrink() {
    if (type == "Coffee") {
        if (milk == "No milk") {
            var img = 's3a1-assets/americano.png';
        } else {
            var img = 's3a1-assets/latte.png';
        }
    } else if (milk == "No milk") {
        var img = 's3a1-assets/matchadrink.png';
    } else {
        var img = 's3a1-assets/matchalatte.png';
    }
    var scene = document.getElementById('img5');
    var elem = document.createElement("img");
    elem.setAttribute("src", img);  
    scene.appendChild(elem); 
    console.log('show drink')
}
