var Webflow = Webflow || [];
Webflow.push(function () {
  var plyApple = document.getElementById("apple");
  var plyHarmony = document.getElementById("harmony");
  var plyPhone = document.getElementById("phone");
  var duration = document.getElementById("duration--nplayer");
  var togglebtn = document.getElementById("checkbox_nplayer");
  var switchEnabled = false;
  var playing = 1;
  var waveForm = WaveSurfer.create({
    container: ".waveform-share--nplayer",
    barWidth: 2.5,
    barHeight: 1.5,
    barMinHeight: 3,
    barGap: 3,
    responsive: true,
    interact: false,
    progressColor: "#00fff6",
    cursorColor: "transparent",
    height: 28,
    barRadius: 2,
  });

  //functions jquery

  $("a").mouseenter(function () {
    $(".cursor").click();
  });
  $("a").mouseleave(function () {
    $(".cursor").click();
  });

  $(document).ready(function () {
    $(".w-webflow-badge").removeClass("w-webflow-badge").empty();
  });

  function toggleIcon(showPlay) {
    if (showPlay) {
      document.getElementsByClassName("play_icon--nplayer")[0].style.display =
        "block";
      document.getElementsByClassName("pause_icon--nplayer")[0].style.display =
        "none";
    } else {
      document.getElementsByClassName("play_icon--nplayer")[0].style.display =
        "none";
      document.getElementsByClassName("pause_icon--nplayer")[0].style.display =
        "block";
    }
  }

  function secondsToTime(e) {
    var h = Math.floor(e / 3600)
        .toString()
        .padStart(2, "0"),
      m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, "0");

    return m + ":" + s;
    //return `${h}:${m}:${s}`;
  }

  //on load
  $(window).on("load", function () {
    $(".apple-btn").addClass("current");
    $(".apple-img").addClass("current");
    $(".apple-title").addClass("current");
    waveForm.load("audio/an_apple_a_day_original.mp3");
  });

  //change current button
  $(".nplayer--btn").on("click", function () {
    $(".current").removeClass("current");
    $(this).addClass("current");
  });

  plyApple.onclick = function () {
    waveForm.load("audio/an_apple_a_day_original.mp3");
    $(".control_play--nplayer").removeClass("control_disable");
    $(".checkbox--nplayer").removeClass("w--redirected-checked");
    waveForm.on("ready", function () {
      waveForm.stop();
      duration.innerHTML = secondsToTime(waveForm.getDuration().toFixed(2));
    });
    switchEnabled = false;
    playing = 1;
    toggleIcon(true);
    togglebtn.disabled = true;
  };

  plyHarmony.onclick = function () {
    waveForm.load("audio/harmony_original.mp3");
    $(".control_play--nplayer").removeClass("control_disable");
    $(".checkbox--nplayer").removeClass("w--redirected-checked");
    waveForm.on("ready", function () {
      waveForm.stop();
      duration.innerHTML = secondsToTime(waveForm.getDuration().toFixed(2));
    });
    switchEnabled = false;
    playing = 2;
    toggleIcon(true);
    togglebtn.disabled = true;
  };

  plyPhone.onclick = function () {
    waveForm.load("audio/phone_effect_original.mp3");
    $(".control_play--nplayer").removeClass("control_disable");
    $(".checkbox--nplayer").removeClass("w--redirected-checked");
    waveForm.on("ready", function () {
      waveForm.stop();
      duration.innerHTML = secondsToTime(waveForm.getDuration().toFixed(2));
    });
    switchEnabled = false;
    playing = 3;
    toggleIcon(true);
    togglebtn.disabled = true;
  };
  plyApple.click();

  var audioOne = new Audio("audio/an_apple_a_day_vm.mp3");
  audioOne.muted = true;

  $(".control_play--nplayer").on("click", function () {
    if (waveForm.isPlaying()) {
      toggleIcon(true);
      togglebtn.disabled = true;
    } else {
      toggleIcon(false);
      togglebtn.disabled = false;
    }
    audioOne.play();
    waveForm.playPause();
    waveForm.on("finish", function () {
      waveForm.stop();
      togglebtn.disabled = true;
      toggleIcon(true);
    });
  });

  $("#checkbox_nplayer").on("click", function () {
    if (switchEnabled) {
      switchEnabled = false;
      var time = waveForm.getCurrentTime();
      if (time !== 0) {
        if (playing === 1) {
          waveForm.load("audio/an_apple_a_day_original.mp3");
          waveForm.on("ready", function () {
            waveForm.play(time);
          });
        } else if (playing === 2) {
          waveForm.load("audio/harmony_original.mp3");
          waveForm.on("ready", function () {
            waveForm.play(time);
          });
        } else if (playing === 3) {
          waveForm.load("audio/phone_effect_original.mp3");
          waveForm.on("ready", function () {
            waveForm.play(time);
          });
        }
      }
    } else if (!switchEnabled) {
      switchEnabled = true;
      var time = waveForm.getCurrentTime();
      console.log(time);
      if (time !== 0) {
        if (playing === 1) {
          waveForm.load("audio/an_apple_a_day_vm.mp3");
          waveForm.on("ready", function () {
            waveForm.play(time);
          });
        } else if (playing === 2) {
          waveForm.load("audio/harmony_vm.mp3");
          waveForm.on("ready", function () {
            waveForm.play(time);
          });
        } else if (playing === 3) {
          waveForm.load("audio/phone_effect_vm.mp3");
          waveForm.on("ready", function () {
            waveForm.play(time);
          });
        }
      }
    }
  });
});
