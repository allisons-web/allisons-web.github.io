// P_3_1_2_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * typewriter. uses input (text) as blueprint for a visual composition.
 *
 * MOUSE
 * click + drag        : move canvas
 *
 * KEYS
 * a-z                 : text input (keyboard)
 * ,.!? and return     : curves
 * space               : small curve with random direction
 * del, backspace      : remove last letter
 * arrow up            : zoom canvas +
 * arrow down          : zoom canvas -
 * alt                 : new random layout
 * ctrl                : save png
 */
"use strict";

var textTyped = "";
var font;

var shapeSpace;
var shapeSpace2;
var shapePeriod;
var shapeComma;
var shapeQuestionmark;
var shapeExclamationmark;
var shapeReturn;
var shapeStart;

var centerX;
var centerY;
var offsetX;
var offsetY;
var zoom;

var actRandomSeed;

function preload() {
  font = loadFont("assets/OpenSans-SemiBold.ttf");
  shapeSpace = loadImage("assets/space.svg");
  shapeSpace2 = loadImage("assets/space2.svg");
  shapePeriod = loadImage("assets/period.svg");
  shapeComma = loadImage("assets/comma.svg");
  shapeExclamationmark = loadImage("assets/exclamationmark.svg");
  shapeQuestionmark = loadImage("assets/questionmark.svg");
  shapeReturn = loadImage("assets/target.svg");
  shapeStart = loadImage("assets/source.svg");
}

function setup() {
  let theCanvas = createCanvas(windowWidth*0.6, windowHeight*0.7);
  theCanvas.parent('#content');


  textTyped += "~.Hi";

  centerX = width / 2;
  centerY = height / 2;
  offsetX = 0;
  offsetY = 0;
  zoom = 0.75;

  actRandomSeed = 6;

  cursor(HAND);
  textFont(font, 25);
  textAlign(LEFT, BASELINE);
  noStroke();
  fill(0);
}

function windowResized() {
  resizeCanvas(windowWidth*0.6, windowHeight*0.7);
}

function draw() {
  background(220);

  if (mouseIsPressed && mouseButton == LEFT) {
    centerX = mouseX - offsetX;
    centerY = mouseY - offsetY;
  }

  // allways produce the same sequence of random numbers
  randomSeed(actRandomSeed);

  translate(centerX, centerY);
  scale(zoom);

  for (var i = 0; i < textTyped.length; i++) {
    var letter = textTyped.charAt(i);
    var letterWidth = textWidth(letter);

    // ------ letter rule table ------
    switch (letter) {
      case " ": // space
        // 50% left, 50% right
        var dir = floor(random(0, 2));
        if (dir == 0) {
          image(shapeSpace, 1, -15, 100, 100);
          translate(4, 1);
          rotate(QUARTER_PI);
        }
        if (dir == 1) {
          image(shapeSpace2, 1, -15, 100, 100);
          translate(14, -5);
          rotate(-QUARTER_PI);
        }
        break;

      case ",":
        image(shapeComma, 1, -15, 100, 100);
        translate(35, 15);
        rotate(QUARTER_PI);
        break;

      case ".":
        image(shapePeriod, 1, -55, 100, 100);
        translate(56, -56);
        rotate(-HALF_PI);
        break;

      case "!":
        image(shapeExclamationmark, 1, -27, 100, 100);
        translate(42.5, -17.5);
        rotate(-QUARTER_PI);
        break;

      case "?":
        image(shapeQuestionmark, 1, -27, 100, 100);
        translate(42.5, -17.5);
        rotate(-QUARTER_PI);
        break;

      case "\n": // return
        image(shapeReturn, 1, -37, 20, 40);
        translate(1, 10);
        rotate(PI);
        document.getElementById('wordcount').innerText = (wordCount() + " words");
        let timetext = document.getElementById('eta-time')
        timetext.innerText = (eta());
        document.getElementById('flex-container-route').style.display = "flex";
        console.log(wordCount())
        break;

      case "~":
        image(shapeStart, -20, -16, 20, 20);
        break;

      default:
        // all others
        text(letter, 0, 0);
        translate(letterWidth, 0);
    }
  }

  // blink cursor after text
  if ((frameCount / 6) % 2 == 0) rect(0, 0, 15, 2);
}

function mousePressed() {
  offsetX = mouseX - centerX;
  offsetY = mouseY - centerY;
}

function keyReleased() {
  // export png
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), "png");
  if (keyCode == ALT) actRandomSeed++;
}

function keyPressed() {
  switch (keyCode) {
    case DELETE:
    case BACKSPACE:
      textTyped = textTyped.substring(0, max(0, textTyped.length - 1));
      print(textTyped);
      break;
    case ENTER:
    case RETURN:
      // enable linebreaks
      textTyped += "\n";
      break;
    case UP_ARROW:
      zoom += 0.05;
      break;
    case DOWN_ARROW:
      zoom -= 0.05;
      break;
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    print(textTyped);
  }
}

function wordCount() {
  var count = 1;
  var i = 0;
  for (i = 0; i < textTyped.length; i++){
    if (textTyped[i] == ' ') {
      count += 1;
    }
  }
  return count;
}

function eta() {
  var count = wordCount();
  var eta = count / 100;
  var text = " min"
  if (eta < 1) {
    eta = 1;
    return eta + text;
  }
  return eta + text + "s";
}
