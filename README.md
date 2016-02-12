Stream Visualization
====================

The goal of this project is to visualize an abstract stream of data on a fixed sized canvas. On a fixed interval, in this case every second, the page will emit an event with a random hex color and "weight" number. On each event the page should render a new shape where the area of the shape is proportional to the associated object's weight. Each shape should also have a background color matching the associated color. 

Please use only jQuery and lodash or underscore for this project. Feel free to use the HTML5 canvas for rendering the shapes if you'd like, but using a fully DOM-backed representation is fine too. Assume the window will not scroll and that the canvas size should match the window size. 

The "stream.js" file contains the small script that generates random colors and weights. Each weight will be in the range [1, 100). It will use jQuery to trigger an event on the document object every second, so in order to catch those events you will want to register a listener function on the document for the "message" event. 

This is a very open ended problem, and as such can be solved in any number of ways. An ideal solution is one that follows the area restriction, efficiently minimizes wasted space between objects, and looks relatively “balanced”.

You can use any shape or combination of shapes that you’d like as long as the area restriction holds. A good solution is one that breaks the problem down to a set of heuristics that can be implemented in a reasonable amount of time. Please don’t try to brute force a “perfect” solution that works for all shapes on all canvas sizes, but instead use this as an opportunity to apply some creative visual data mapping techniques.

Also, feel free to change the method used to generate colors in stream.js. That pattern can get pretty ugly sometimes.

