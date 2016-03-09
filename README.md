Stream Visualization
====================

The goal of this project was to visualize an abstract stream of data on a fixed sized canvas. On a fixed interval, in this case every second, the page emits an event with a random hex color and "weight" number. On each event the page renders a new shape where the area of the shape is proportional to the associated object's weight. Each shape also has a background color matching the associated color. 

###[Launch Visualization](http://bradholland.me/Data-Stream-Visualization/)

I took an approach that uses circular rings that grow around a circle. These rings maintain the same area regardless of their position in the figure by reducing their width proportionally as their radius increases. The arc length is calculated in radians using the 1-100 weight to maintain proportionality of area, essentially cutting the rings down from a full 360° to the correct given weight. To achieve a balanced look, the midpoints of every arc point towards the Hue degree of their HSL color-equivalent. This creates a canvas that looks like the HSL color-wheel. The longer you leave it running, the cooler the effect!

