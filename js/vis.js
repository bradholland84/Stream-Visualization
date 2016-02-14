$(function() {
    var c = $('#main_canvas');

    $(document).on("message", callback);

    function callback(event, data) {
        console.log(data);
    }

});