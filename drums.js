document.addEventListener("DOMContentLoaded", function () {
  var numberOfButtons = document.querySelectorAll(".button").length;

  for (var j = 0; j < numberOfButtons; j++) {
    document
      .querySelectorAll(".button")
      [j].addEventListener("click", function () {
        var buttonStyle = this.innerHTML;
        sound(buttonStyle);
        animation(buttonStyle);
      });
  }

  document.addEventListener("keypress", function (event) {
    sound(event.key);
    animation(event.key);
  });

  function sound(key) {
    switch (key) {
      case "a":
        var sound1 = new Audio("drums/kick.wav");
        sound1.play();
        break;

      case "s":
        var sound2 = new Audio("drums/snare.wav");
        sound2.play();
        break;

      case "d":
        var sound3 = new Audio("drums/hihat.wav");
        sound3.play();
        break;

      case "f":
        var sound4 = new Audio("drums/openhat.wav");
        sound4.play();
        break;

      case "j":
        var sound5 = new Audio("drums/clap.wav");
        sound5.play();
        break;

      case "k":
        var sound6 = new Audio("drums/ride.wav");
        sound6.play();
        break;

      case "l":
        var sound7 = new Audio("drums/glass.wav");
        sound7.play();
        break;

      case "p":
        var sound8 = new Audio("drums/hey.wav");
        sound8.play();
        break;

      default:
        console.log(key);
    }
  }

  function animation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("animation");

    setTimeout(function () {
      activeButton.classList.remove("animation");
    }, 100);
  }
  let button = document.querySelector(".my-button");
  if (button) {
    button.classList.add("active");
  }
});
