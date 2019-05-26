if (localStorage.mute == "true") {
    $('#checkbox3').prop('checked', true);
} else {
    $('#checkbox3').prop('checked', false);

}

function saveSettings(checkbox, setting) {
    if (setting == "sound" && checkbox.checked) {
        localStorage.mute = "true";
    } else if (setting == "sound" && !checkbox.checked) {
        localStorage.mute = "false";
    }
    console.log(localStorage.mute);
}