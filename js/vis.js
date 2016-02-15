$(function() {

    //Store viewport dimensions & midpoint
    var vpWidth = $(window).width();
    var vpHeight = $(window).height();
    var vpMidpoint = {x: vpWidth / 2, y: vpHeight / 2};

    //counter for radius increase
    var count = 0;

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
        var HSL = analyzeColor(data.color);
        drawNewArc(data.color, HSL, data.weight);
        count += 1;
    }

    //Calculate RGB values from hex string
    function analyzeColor(hex) {
        var R = fromHex(hex, 1, 3);
        var G = fromHex(hex, 3, 5);
        var B = fromHex(hex, 5, 7);

        function fromHex(s, beg, end) {
            return parseInt(s.substring(beg, end),16)
        }
        return rgbToHsl(R, G, B);
    }

    //Calculate HSL values from RGB values
    function rgbToHsl(r, g, b){
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            // achromatic
            h = s = 0;
        } else {
            var d = max - min;
            s = l > 0.5
                ? d / (2 - max - min)
                : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        //h, s, l between [0,1]
        return [h, s, l];
    }

    //first circle radius
    var firstR = 0;
    //second circle radius
    var secondR = 0;

    //Draw color arc with midpoint corresponding to HSL Hue degree
    // & wight # of radians
    function drawNewArc(hexColor, hslColor, weight) {
        var arcMidpoint = hslColor[0] * (2 * Math.PI);
        var arcStart = arcMidpoint - (weight/100 * Math.PI * 0.5);
        var arcEnd = arcMidpoint + (weight/100 * Math.PI * 0.5);
        c.strokeStyle = hexColor;

        if (count == 0) {
            firstR = Math.max(vpHeight, vpWidth) / 20;
            c.lineWidth = firstR;
            c.beginPath();
            c.arc(
                vpMidpoint.x,
                vpMidpoint.y,
                firstR / 2,
                arcStart,
                arcEnd,
                false
            );
            c.stroke();
        } else if (count == 1) {
            secondR = Math.sqrt(2) * firstR;
            c.lineWidth = (secondR - firstR);
            c.beginPath();
            c.arc(
                vpMidpoint.x,
                vpMidpoint.y,
                firstR + ((secondR - firstR) / 2),
                arcStart,
                arcEnd,
                false
            );
            c.stroke();
        } else {
            var newR =  Math.sqrt(2 * Math.pow(secondR, 2) - Math.pow(firstR, 2));
            c.lineWidth = (newR - secondR);
            c.beginPath();
            c.arc(
                vpMidpoint.x,
                vpMidpoint.y,
                secondR + ((newR - secondR) / 2),
                arcStart,
                arcEnd
            );
            c.stroke();
            firstR = secondR;
            secondR = newR;
        }
    }

});