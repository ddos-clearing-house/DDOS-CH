const partner = $("#nameContainer").data("partner");

// Start traffic button in confirmation screen
$("#start-button").on('click', (event) => {
    event.preventDefault();
    const req = new XMLHttpRequest();
    req.onreadystatechange = handleError;
    const formData = new FormData($("#start-form")[0]);
    req.open("POST", `https://api.ddosclearinghouse.eu/${partner}/start`, false);
    req.withCredentials = true;
    req.send(formData);

    const duration = $("input#duration").val()
    $("#count-down").html(duration);
    $("#count-down-alert").removeClass('collapse');

    const targetDate = new Date()
    targetDate.setSeconds(targetDate.getSeconds() + parseInt(duration));
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        const seconds = Math.ceil(distance / 1000);

        $("#count-down").html(seconds);

        if (distance < 0) {
            console.log("times up.")
            clearInterval(countdown);
            $("#count-down-alert").addClass('collapse');
        }
    }, 1000);
});

// Stop traffic button
$("#stop-button").on('click', (event) => {
    $("#count-down-alert").addClass('collapse');
    event.preventDefault();
    const req = new XMLHttpRequest();
    req.onreadystatechange = handleError;
    req.open("POST", `https://api.ddosclearinghouse.eu/${partner}/stop`, true);
    req.withCredentials = true;
    req.send();
    $("#staffic-stopped-alert").removeClass("collapse").delay(2500).queue(function (next) {
        $(this).addClass("collapse");
        next();
    });
});

// "Next" button under attack form
$("#to-confirm").on('click', (event) => {
    // Check if not already sending traffic (sort of)
    if (!$("#count-down-alert").hasClass('collapse')) {
        $("#alert-busy").removeClass("collapse").delay(5000).queue(function (next) {
            $(this).addClass("collapse");
            next();
        });
        return;
    }
    // Validate form contents
    const duration = $("input#duration").val();
    if (duration < 1 || duration > 300) {
        $("#alert-duration").removeClass("collapse").delay(5000).queue(function (next) {
            $(this).addClass("collapse");
            next();
        });
        return;
    }
    const port = $("input#port").val();
    if (port < 1 || port > 65535) {
        $("#alert-port").removeClass("collapse").delay(5000).queue(function (next) {
            $(this).addClass("collapse");
            next();
        });
        return;
    }

    // Insert form data into modal
    $("#modal-attack").html($("select#attacks").children("option:selected").html());
    $("#modal-duration").html(duration);
    $("#modal-speed").html($("select#speed").children("option:selected").html());
    $("#modal-port").html(port);

    // Show modal
    $("#confirmationModal").modal("show");
});

function handleError() {
    if (this.readyState === 4) { // Ready
        if (this.status !== 200) {  // Status not OK
            alert("Something went wrong sending your request to the API: " + this.statusText);
        }
    }
}