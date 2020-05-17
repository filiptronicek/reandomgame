function initTheme() {
  var darkThemeSelected =
    localStorage.getItem("themeSwitch") !== null &&
    localStorage.getItem("themeSwitch") === "dark";
  // update checkbox
  themeSwitch.checked = darkThemeSelected;
  // update body data-theme attribute
  darkThemeSelected
    ? document.body.setAttribute("data-theme", "dark")
    : document.body.removeAttribute("data-theme");
}

function resetTheme() {
  if (themeSwitch.checked) {
    // dark theme has been selected
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("themeSwitch", "dark");
    $(".github-dark").fadeIn(500);
    $(".github-light").fadeOut(500);
  } else {
    document.body.removeAttribute("data-theme");
    localStorage.removeItem("themeSwitch");
    $(".github-light").fadeIn(500);
    $(".github-dark").fadeOut(500);
  }
}

if (localStorage.mute == "true") {
  $("#checkbox3").prop("checked", true);
} else {
  $("#checkbox3").prop("checked", false);
}

function saveSettings(checkbox, setting) {
  if (setting == "sound" && checkbox.checked) {
    localStorage.mute = "true";
  } else if (setting == "sound" && !checkbox.checked) {
    localStorage.mute = "false";
  }
  console.log(localStorage.mute);
}

// Theme switch
var themeSwitch = document.getElementById("themeSwitch");
if (themeSwitch) {
  initTheme(); // if user has already selected a specific theme -> apply it
  themeSwitch.addEventListener("change", function () {
    resetTheme(); // update color theme
  });
}
