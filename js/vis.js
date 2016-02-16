$(function() {

    //Store viewport dimensions & midpoint
    var vpWidth = $(window).width();
    var vpHeight = $(window).height();
    var vpMidpoint = {x: vpWidth / 2, y: vpHeight / 2};

    //Set canvas to full viewport size
    var canvas = $('#main_canvas');
    canvas.attr({
        "width": vpWidth,
        "height": vpHeight
    });

    //Global counter for radius increases
    var count = 0;
    //Remember first arc radius
    var firstR = 0;
    //Remember second arc radius
    var secondR = 0;

    //Respond to message containing stream data
    $(document).on("message", callback);
    function callback(event, data) {
        var HSL = analyzeColor(data.color);
        drawNewArc(data.color, HSL, data.weight);
        count += 1;
    }

    //Calculate RGB values from random hex string
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
            //Achromatic
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
        //h, s, l percent as [0,1] range
        return [h, s, l];
    }

    //Draw color arc with midpoint corresponding to HSL Hue degree 'h'
    function drawNewArc(hexColor, hslColor, weight) {
        var arcMidpoint = hslColor[0] * (2 * Math.PI);
        var arcStart = arcMidpoint - (weight/100 * Math.PI * 0.5);
        var arcEnd = arcMidpoint + (weight/100 * Math.PI * 0.5);


        if (count == 0) {
            //First arc uses viewport dimensions for size
            firstR = Math.max(vpHeight, vpWidth) / 20;
            drawCanvasArc(firstR, firstR / 2, hexColor);
        } else if (count == 1) {
            //Second arc matches first arc area * weight%
            secondR = Math.sqrt(2) * firstR;
            drawCanvasArc(secondR - firstR, firstR + ((secondR - firstR) / 2), hexColor);
        } else {
            //Subsequent arcs use two previous arcs to maintain area proportionality
            var newR =  Math.sqrt(2 * Math.pow(secondR, 2) - Math.pow(firstR, 2));
            drawCanvasArc(newR - secondR, secondR + ((newR - secondR) / 2), hexColor);
            //update previous arc radii for future calculation
            firstR = secondR;
            secondR = newR;
        }

        //Draws arc on canvas using 2d context
        function drawCanvasArc(lineWidth, radius, hexColor) {
            var c = document.getElementById('main_canvas').getContext('2d');
            c.strokeStyle = hexColor;
            c.lineWidth = lineWidth;
            c.beginPath();
            c.arc(vpMidpoint.x, vpMidpoint.y, radius, arcStart, arcEnd, false);
            c.stroke();
        }
    }
});