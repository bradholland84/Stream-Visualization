$(function() {

    //Store viewport dimensions, midpoint
    var vpWidth = $(window).width();
    var vpHeight = $(window).height();
    var vpMidpoint = {w: vpWidth / 2, h: vpHeight / 2};

    //Set canvas to full viewport size
    var canvas = $('#main_canvas');
    canvas.attr({
        "width": vpWidth,
        "height": vpHeight
    });

    //Get DOM Canvas object context
    var c = document.getElementById('main_canvas').getContext('2d');

    //hold onto previous shapes in each 'quadrant'
    var previousShapes = [{},{},{},{}];

    //Respond to message containing stream data
    $(document).on("message", callback);
    function callback(event, data) {
        analyzeColor(data.color);
        drawShape(data.color, data.weight);

        if (_.isEmpty(previousShapes[idx])) {
            //first time drawing triangle in 'quadrant'

        } else {
            //add to triangle stack
            
        }
    }

    //Calculate RGB values from hex string
    function analyzeColor(hex) {
        //Hex to RBG conversion
        var R = fromHex(hex, 1, 3);
        var G = fromHex(hex, 3, 5);
        var B = fromHex(hex, 5, 7);

        function fromHex(s, beg, end) {
            return parseInt(s.substring(beg, end),16)
        }

        var HSL = rgbToHsl(R, G, B);
        console.log(HSL);
    }

    //Calculate HSL values from RGB values
    // algorithm credit: MJackson of @ReactJSTraining, 2008
    function rgbToHsl(r, g, b){
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h, s, l];
    }

    function drawFirstTri(hsl) {

    }

    //Draw rectangle on Canvas
    function drawShape(color, weight) {
        c.fillStyle = color;
        c.fillRect(
            _.random(0,vpWidth),
            _.random(0,vpHeight),
            weight,
            weight);
    }

    function drawTri(hsl) {
        var h = hsl[0];
        var s = hsl[1];
        var l = hsl[2];

        var quadrants = {
            1: {
                x: 1,
                y: 1
            },
            2: {
                x: -1,
                y: 1
            },
            3: {
                x: -1,
                y: 1
            },
            4: {
                x: 1,
                y: -1
            }
        };

        var extendPixels = Math.sqrt(weight * 100 + (innerAreaPreviousShape));

        c.beginPath();
        c.moveTo(previousShapePointleftX, previousShapePointleftY);
        c.lineTo(previousShapePointleftX + extendPixels, previousShapePointY);
        c.lineTo(previousShapePointtopX, previousShapePointtopY + extendPixels);
        c.lineTo(previousShapePointrightX + extendPixels, previousShapePointrightY);
        c.lineTo(previousShapePointrightX, previousShapePointrightY);
        c.lineTo(previousShapePointtopX, previousShapePointtopY);
        c.fill();




    }

});