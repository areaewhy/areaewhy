areaewhy -- Moose project
========

This is a project to use the Sebastian Kutsch "ContentFlow" (jacksasylum.eu/ContentFlow/docu.php) 
for displaying search results from www.bullmoose.com.

The "bm_files" and "bm.htm" files were used during testing, and provided as a "default" search
so the initial load doesn't hit the bullmoose.com page.

Subsequent searches follow this process:

- ajax pass the query term into "prox.php", which returns the relevant html portion as a string
( ideally, "prox.php" would do the parsing and return objects, but I wanted to play with jQuery )
- in "index.php", pass this string to a jQuery parsing function
- extract pieces from html (image path, item path, item attributes) into array of objects
- pass array to cfFns.init

cfFns.js contains all of my js to allow the ContentFlow plugin to work in this manner.
cfFns.init will:
- create appropriate DOM elements
- create holder div for images paths
- instantiate and (after all images have loaded) initialize the ContentFlow object
- handle the loading gif, details area... everything related to ContentFlow.

This is done as an experiment to play a little with jQuery, and to fulfill a dream of browsing
your media search in "cover flow" format.
