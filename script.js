const countDownDate = new Date("Jun 13, 2023 15:00:01").getTime();

const offDays = [
    new Date("May 26, 2023"),
    new Date("May 29, 2023"),
    new Date("June 1, 2023")
]

const StudentOnlyOffDays = [
    new Date("Apr 21, 2023")
]

var TeacherMode = false

const TimerRefreshRate = 1 // Milliseconds !

function load() {
    var scriptUrl = 'https:\/\/www.youtube.com\/s\/player\/23010b46\/www-widgetapi.vflset\/www-widgetapi.js'; try { var ttPolicy = window.trustedTypes.createPolicy("youtube-widget-api", { createScriptURL: function(x) { return x } }); scriptUrl = ttPolicy.createScriptURL(scriptUrl) } catch (e) { } if (!window["YT"]) var YT = { loading: 0, loaded: 0 }; if (!window["YTConfig"]) var YTConfig = { "host": "https://www.youtube.com" };
    if (!YT.loading) {
        YT.loading = 1; (function() {
            var l = []; YT.ready = function(f) { if (YT.loaded) f(); else l.push(f) }; window.onYTReady = function() { YT.loaded = 1; for (var i = 0; i < l.length; i++)try { l[i]() } catch (e$0) { } }; YT.setConfig = function(c) { for (var k in c) if (c.hasOwnProperty(k)) YTConfig[k] = c[k] }; var a = document.createElement("script"); a.type = "text/javascript"; a.id = "www-widgetapi-script"; a.src = scriptUrl; a.async = true; var c = document.currentScript; if (c) { var n = c.nonce || c.getAttribute("nonce"); if (n) a.setAttribute("nonce", n) } var b =
                document.getElementsByTagName("script")[0]; b.parentNode.insertBefore(a, b)
        })()
    };
}
load()
function heheheha() {
    function onPlayerReady(event) {
        event.target.playVideo();
        setInterval(() => { event.target.playVideo(); }, 0.000000001)
    }
    //window.location.href = ""
    document.getElementById("heheheha").innerHTML = "<b>I told you. You could have avoided this, but no. Enjoy.</b>"
    document.getElementById("appearOnPress-h3").innerHTML = "oh and by the way, you cant pause it lol"
    document.getElementById("appearOnPress-h4").innerHTML = "if you manage to pause it for longer than 1 second you are legend"
    document.getElementById("appearOnPress-h5").innerHTML = "on mobile and tablet devices it doesnt autoplay :("
    document.getElementById("heheheha").style.color = "#ff0000"
    new YT.Player('video', {
        height: '390',
        width: '640',
        videoId: 'dQw4w9WgXcQ',
        playerVars: {
            'playsinline': 1,
            'controls': 0
        },
        playsinline: 1,
        events: {
            'onReady': onPlayerReady
        },
        allow: 'autoplay'
    });
}

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
function CalculateStudentOnlyOffDays() {
    const now = new Date()
    var daysOffRemaining = 0
    for (let index = 0; index < StudentOnlyOffDays.length; index++) {
        if (StudentOnlyOffDays[index] >= now && StudentOnlyOffDays[index] <= countDownDate) {
            daysOffRemaining++
        }
    }
    return daysOffRemaining
}
function CalculateDaysOffRemaining() {
    const now = new Date()
    var daysOffRemaining = 0
    for (let index = 0; index < offDays.length; index++) {
        if (offDays[index] >= now && offDays[index] <= countDownDate) {
            daysOffRemaining++
        }
    }

    if (!TeacherMode) {
        daysOffRemaining += CalculateStudentOnlyOffDays()
    }

    return daysOffRemaining
}

const x = setInterval(function() {
    const now = new Date().getTime();

    const distance = countDownDate - now;

    // Calculate any days off from school
    const daysOffRemaining = CalculateDaysOffRemaining()
    var days = ((Math.floor(distance / (1000 * 60 * 60 * 24))));
    const weekends = Math.floor((days / 7) * 2)
    
    days -= (weekends + daysOffRemaining)
    
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
    document.getElementById("teacher-mode-box-label").innerHTML = "Teacher Mode (doesn't count days only students are off) - Remaining Student Only Off Days: " + CalculateStudentOnlyOffDays()
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "SUMMER VACATION!!!!";
        heheheha()
    }
    document.getElementById("refresh-rate").innerHTML = "Timer Refresh Rate: " + TimerRefreshRate + "ms"
}, TimerRefreshRate);

document.getElementById("teachermode").addEventListener("change", (event) => {
    TeacherMode = event.target.checked
    document.getElementById("timer").innerHTML = "Calculating..."
})