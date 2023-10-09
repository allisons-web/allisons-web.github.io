function printTime() {
  var d = new Date();
  var hours = d.getHours();
  var mins = d.getMinutes();
  if (mins < 10) {
    mins = "0" + mins;
  }
  var ampm = hours <= 12 ? 'AM' : 'PM';
  clock = document.getElementById("time")
  clock.innerHTML = (hours % 12)+":"+mins+" "+ampm;
}