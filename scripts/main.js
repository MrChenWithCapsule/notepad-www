$(document).ready(function() {
    $(".options").hide();
    $(".menu > div > button").click(function() {
        $(this)
            .next()
            .toggle();
    });

    $(".menu .help .options").click(function() {
        alert("Dummy Text Editor v0.01");
    });
});
