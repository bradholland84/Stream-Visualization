$(function() {
    //Store viewport dimensions
    var vpWidth = $(window).width();
    var vpHeight = $(window).height();

    //Set canvas to full viewport size
    var canvas = $('#main_canvas');
    canvas.attr({
        "width": vpWidth,
        "height": vpHeight
    });

    //Get DOM Canvas object context
    var c = document.getElementById('main_canvas').getContext('2d');

    //Respond to message containing stream data
    $(document).on("message", callback);
    function callback(event, data) {
        analyzeColor(data.color);
        drawShape(data.color, data.weight);
    }

    //Get RBG values from hex string
    function analyzeColor(hex) {
        //Hex to RBG conversion
        var R = fromHex(hex, 1, 3);
        var G = fromHex(hex, 3, 5);
        var B = fromHex(hex, 5, 7);

        function fromHex(s, beg, end) {
            return parseInt(s.substring(beg, end),16)
        }
    }

    function drawShape(color, weight) {
        c.fillStyle = color;
        c.fillRect(
            _.random(0,vpWidth),
            _.random(0,vpHeight),
            weight,
            weight);
    }

    function checkConflict(width, height ) {
        /*
         red=imgData.data[0];
         green=imgData.data[1];
         blue=imgData.data[2];
         alpha=imgData.data[3]; */

    }

});