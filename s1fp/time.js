function printTime() {
  var d = new Date();
  var hours = d.getHours() % 12;
  var mins = d.getMinutes();
  if (mins < 10) {
    mins = "0" + mins;
  }
  var ampm = hours <= 12 ? 'PM' : 'AM';
  clock = document.getElementById("time")
  clock.innerHTML = hours+":"+mins+" "+ampm;
}