const partner = $("#nameContainer").data("partner");

$("#start-button").on('click', (event) => {
    event.preventDefault();
    const req = new XMLHttpRequest();
    req.onreadystatechange = handleError;
    const formData = new FormData($("#start-form")[0]);
    req.open("POST", `https://api.ddosclearinghouse.eu/${partner}/start`, true);
    req.withCredentials = true;
    req.send(formData);

    // TODO: function cooldown (attack duration or until stop)
});

$("#stop-button").on('click', (event) => {
    event.preventDefault();
    const req = new XMLHttpRequest();
    req.onreadystatechange = handleError;
    req.open("POST", `https://api.ddosclearinghouse.eu/${partner}/stop`, true);
    req.withCredentials = true;
    req.send();
});

// Put form contents in confirmation modal (popup)
$("#to-confirm").on('click', (event) => {
    $("#modal-attack").html($("select#attacks").children("option:selected").html());
    $("#modal-duration").html($("input#duration").val());
    $("#modal-speed").html($("select#speed").children("option:selected").html());
    $("#modal-port").html($("input#port").val());
});

function handleError() {
    if (this.readyState === 4) { // Ready
        if (this.status !== 200) {  // Status not OK
            alert("Something went wrong sending your request to the API: " + this.responseText);
        }
    }
}