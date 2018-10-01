var os = require('os');

function uptime (seconds) {
    if (seconds < 60) {
        return seconds + ' sek.';
    } else { 
        if (seconds >= 60 && seconds <= 3600) {
            var minute = Math.floor(seconds / 60);
            var restSek = seconds - minute * 60;
        return minute + ' min. ' + restSek + ' sek.';
        }
        if (seconds > 3600) {
            var hour = Math.floor(seconds / 3600);
            var restMin = Math.floor((seconds - hour * 3600) / 60);
            var restSek = (seconds - (hour * 3600) - (restMin * 60));
        return hour + ' h ' + restMin + ' min. ' + restSek + ' sek.';
        }
    }
}

exports.print = uptime; //wyeksportowanie funkcji uptime