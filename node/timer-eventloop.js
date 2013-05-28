
while (1) {
     // run all setTimeout() code that has past the current time
     _run_timer();
}


while (1) {
    var next_timeout = _run_timers();
    ms_sleep(next_timeout);
}

var Timers = []; // list of current Timers

// our Timer object constructor
function Timer (fire_time, cb) {
    this.fire_time = fire_time; // in epoch-ms
    this.callback = cb;
}

function _run_timers () {
    var now = Date.now();

    while (Timers.length > 0 && Timers[0].fire_time <= now) {
        var to_run = Timers.shift();
        if (to_run->callback) to_run->callback();
    }

    if (Timers.length === 0) return -1;

    return (Timers[0].fire_time - now);
}

function setTimeout (cb, ms) {
    var fire_time = ms + Date.now();

    var timer = new Timer (fire_time, cb);

    // Optimise for the case where a timer fires after
    // all current timers
    if (Timers.length === 0 || fire_time >= Timers[Timers.length - 1].fire_time) {
        Timers.push(timer);
        return timer;
    }

    // Otherwise find where we insert linearly:
    for (var i = 0; i < Timers.length; i++) {
        if (Timers[i].fire_time > fire_time) {
            Timers.splice(i, 0, timer);
            return timer;
        }
    }

    throw "Should never get here"
}

function setInterval (cb, ms) {
    var _f = function () {
        cb();
        setTimeout(_f, ms);
    };
    setTimeout(_f, ms);
}
