$(function() {

    //Store viewport dimensions & midpoint
    var vpWidth = $(window).width();
    var vpHeight = $(window).height();
    var vpMidpoint = {x: vpWidth / 2, y: vpHeight / 2};

    //counter for radius increase
    var count = 0;

    //first circle radius
    var firstR = 0;
    //second circle radius
    var secondR = 0;

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
        //drawArc(data.color, HSL, data.weight);

        drawNewArc(data.color, data.weight);
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

    //Draw color arc with midpoint corresponding to HSL Hue degree
    // & wight # of radians
    function drawArc(hexColor, hslColor, weight) {
        var arcMidpoint = hslColor[0] * (2 * Math.PI);
        //var arcStart = arcMidpoint - (weight/360);
        //var arcEnd = arcMidpoint + (weight/360);
        var arcStart = arcMidpoint - 10;
        var arcEnd = arcMidpoint + 10;
        //var arcStart = 0;
        //var arcEnd = 2 * Math.PI;
        Math.pow(2, 1/count);

        c.beginPath();
        c.lineWidth = 3;
        c.strokeStyle = hexColor;
        c.arc(
            vpMidpoint.x,
            vpMidpoint.y,
            Math.sqrt(Math.pow(2, count)),
            arcStart,
            arcEnd,
            false
        );
        c.stroke();
    }

    function drawNewArc(hexColor, weight) {
        c.strokeStyle = hexColor;
        c.lineWidth = 3;
        if (count == 0) {
            firstR = 100;
            //draw first circle
            c.beginPath();
            c.arc(
                vpMidpoint.x,
                vpMidpoint.y,
                100,
                0,
                2 * Math.PI,
                false
            );
            c.stroke();
        } else if (count == 1) {
            secondR = 150;
            //draw second circle
            c.beginPath();
            c.arc(
                vpMidpoint.x,
                vpMidpoint.y,
                150,
                0,
                2 * Math.PI,
                false
            );
            c.stroke();
        } else {
            var newR =  Math.sqrt(2 * Math.pow(secondR, 2) - Math.pow(firstR, 2));
            console.log(newR);
            c.lineWidth = (newR - secondR)
            c.beginPath();
            c.arc(
                vpMidpoint.x,
                vpMidpoint.y,
                secondR + ((newR - secondR) / 2),
                0,
                2 * Math.PI
            );
            c.stroke();
            firstR = secondR;
            secondR = newR;
        }
    }

});