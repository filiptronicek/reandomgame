function toggleDarkLight() {
    var body = document.getElementById('body');
    var currentClass = body.className;
    body.className = currentClass == 'dark-mode' ? 'light-mode' : 'dark-mode';
}

// the NTP algorithm
// t0 is the client's timestamp of the request packet transmission,
// t1 is the server's timestamp of the request packet reception,
// t2 is the server's timestamp of the response packet transmission and
// t3 is the client's timestamp of the response packet reception.
function ntp(t0, t1, t2, t3) {
    return {
        roundtripdelay: t3 - t0 - (t2 - t1),
        offset: (t1 - t0 + (t2 - t3)) / 2
    };
}

// calculate the difference in seconds between the client and server clocks, use
// the NTP algorithm, see: http://en.wikipedia.org/wiki/Network_Time_Protocol#Clock_synchronization_algorithm
var t0 = new Date().valueOf();

$.ajax({
    url: '/ntp',
    success: function(servertime, text, resp) {
        // NOTE: t2 isn't entirely accurate because we're assuming that the server spends 0ms on processing.
        // (t1 isn't accurate either, as there's bound to have been some processing before that, but we can't avoid that)
        var t1 = servertime,
            t2 = servertime,
            t3 = new Date().valueOf();

        // we can get a more accurate version of t2 if the server's response
        // contains a Date header, which it generally will.
        // EDIT: as @Ariel rightly notes, the HTTP Date header only has
        // second resolution, thus using it will actually make the calculated
        // result worse. For higher accuracy, one would thus have to
        // return an extra header with a higher-resolution time. This
        // could be done with nginx for example:
        // http://nginx.org/en/docs/http/ngx_http_core_module.html
        // var date = resp.getResponseHeader("Date");
        // if (date) {
        //     t2 = (new Date(date)).valueOf();
        // }

        var c = ntp(t0, t1, t2, t3);

        // log the calculated value rtt and time driff so we can manually verify if they make sense
        console.log('NTP delay:', c.roundtripdelay, 'NTP offset:', c.offset, 'corrected: ', new Date(t3 + c.offset));
    }
}); // the NTP algorithm
// t0 is the client's timestamp of the request packet transmission,
// t1 is the server's timestamp of the request packet reception,
// t2 is the server's timestamp of the response packet transmission and
// t3 is the client's timestamp of the response packet reception.
function ntp(t0, t1, t2, t3) {
    return {
        roundtripdelay: t3 - t0 - (t2 - t1),
        offset: (t1 - t0 + (t2 - t3)) / 2
    };
}

// calculate the difference in seconds between the client and server clocks, use
// the NTP algorithm, see: http://en.wikipedia.org/wiki/Network_Time_Protocol#Clock_synchronization_algorithm
var t0 = new Date().valueOf();

$.ajax({
    url: '/ntp',
    success: function(servertime, text, resp) {
        // NOTE: t2 isn't entirely accurate because we're assuming that the server spends 0ms on processing.
        // (t1 isn't accurate either, as there's bound to have been some processing before that, but we can't avoid that)
        var t1 = servertime,
            t2 = servertime,
            t3 = new Date().valueOf();

        // we can get a more accurate version of t2 if the server's response
        // contains a Date header, which it generally will.
        // EDIT: as @Ariel rightly notes, the HTTP Date header only has
        // second resolution, thus using it will actually make the calculated
        // result worse. For higher accuracy, one would thus have to
        // return an extra header with a higher-resolution time. This
        // could be done with nginx for example:
        // http://nginx.org/en/docs/http/ngx_http_core_module.html
        // var date = resp.getResponseHeader("Date");
        // if (date) {
        //     t2 = (new Date(date)).valueOf();
        // }

        var c = ntp(t0, t1, t2, t3);

        // log the calculated value rtt and time driff so we can manually verify if they make sense
        console.log('NTP delay:', c.roundtripdelay, 'NTP offset:', c.offset, 'corrected: ', new Date(t3 + c.offset));
    }
});

// Set the date we're counting down to
var countDownDate = new Date('Aug 5, 2018 21:20').getTime();

// Update the count down every 1 second
var x = setInterval(function() {
    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById('demo').innerHTML = hours + ' hours ' + minutes + ' minutes ' + seconds + ' secounds ';

    // If the count down is over, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById('demo').innerHTML = 'The tournament will begin shortly ';
    }
}, 1000);