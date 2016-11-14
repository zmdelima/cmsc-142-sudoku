"use strict";
let w = new Worker("/src/js/worker.js");
let startWorker = function() {
    w.postMessage([9,false,false,20]);
}


