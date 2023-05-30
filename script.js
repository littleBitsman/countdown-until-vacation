const countDownDate = new Date("Jun 13, 2023 15:00:01").getTime();
const lol = "https://youtu.be/dQw4w9WgXcQ" //"https://youtu.be/-CbxUk8QX9M"
const offDays = [
    new Date("May 26, 2023"),
    new Date("May 29, 2023")
]

const StudentOnlyOffDays = [
    new Date("June 1, 2023"),
    new Date("June 7, 2023")
]

var TeacherMode = false

const IsBetaVersion = !(window.location.href.includes("github"))

const Version = "1.3.5"
const BetaVersion = "1.3.6-SNAPSHOT"
if (IsBetaVersion) {
    document.getElementById("beta-indicator").innerHTML = "Beta Version " + BetaVersion
} else {
    document.getElementById("beta-indicator").innerHTML = "Version " + Version
}

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

function doVideo(unlucky) {
    function onPlayerReady(event) {
        event.target.playVideo();
        setInterval(() => { event.target.playVideo(); }, 0.000000001)
    }
    //window.location.href = ""
    document.getElementById("heheheha").innerHTML = "<b>I told you. You could have avoided this, but no. Enjoy.</b> <small>gottem</small>"
    document.getElementById("appearOnPress-h3").innerHTML = "oh and by the way, you cant pause it lol"
    document.getElementById("appearOnPress-h4").innerHTML = "<strong>what have you done...</strong>"
    if (unlucky == true) {
        document.getElementById("appearOnPress-h4").innerHTML += " also you got really unlucky 5% chance the rickroll happens when its not the last school day L bozo"
    }
    document.getElementById("appearOnPress-h5").innerHTML = "on mobile and tablet devices it doesnt autoplay :("
    document.getElementById("funnystuff").style.color = "#ff0000"
    const videoId = lol.replace("https://youtu.be/", "")
    new YT.Player('video', {
        height: '390',
        width: '640',
        videoId: videoId,
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


function heheheha() {
    document.getElementById("heheheha").innerHTML = "<b>haha theres nothing anymore!!</b>"
    document.getElementById("rickroll").disabled = true
    document.getElementById("lol").style.visibility = "visible"
    const thingy = Math.floor(Math.random() * 20)
    if (thingy == 1 || ((countDownDate - new Date()) <= 25200000)) {
        setTimeout(function() {
            document.getElementById("lol").style.visibility = "hidden"
            doVideo((thingy == 1 && !((countDownDate - new Date()) <= 25200000)))
        }, 5000)
    }
}
/*
function heheheha() {
    document.getElementById("lol").style.visibility = "show"
}
*/

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
    document.getElementById("teacher-mode-box-label").innerHTML = "Remaining Student Only Off Days: " + CalculateStudentOnlyOffDays()
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "SUMMER VACATION!!!!";
        heheheha(true)
    }
}, TimerRefreshRate);

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

document.getElementById("teachermode").addEventListener("change", (event) => {
    TeacherMode = event.target.checked
    setCookie("teachermode", TeacherMode, 30)
    document.getElementById("timer").innerHTML = "Calculating..."
})

document.getElementById("customcolor").addEventListener("change", (event) => {
    if (event.target.value == "#ffffff") {
        event.target.value = "#000000"
        alert("please dont set the color to white kthx")
    }
    document.getElementById("body").style.color = event.target.value
    setCookie("color", event.target.value, 30)
    console.log("cookie: " + getCookie("color"))
})
document.getElementById("font-customization-menu").addEventListener("change", () => {
    document.getElementById('body').style.fontFamily = document.getElementById("font-customization-menu").value
    setCookie("font", document.getElementById("font-customization-menu").value, 30)
})
var font = getCookie("font")
document.getElementById("font-customization-menu").value = font == "" ? "sans-serif" : font
document.getElementById('body').style.fontFamily = document.getElementById("font-customization-menu").value

var color = getCookie("color")
document.getElementById("customcolor").value = color
document.getElementById("body").style.color = color
if (getCookie("teachermode") == "true") {
    TeacherMode = true
}
document.getElementById("teachermode").checked = TeacherMode

const settingsButton = document.getElementById('settings-button');
const settingsMenu = document.getElementById('settings-menu');
const overlay = document.getElementById('overlay');

settingsButton.addEventListener('click', () => {
    settingsMenu.classList.toggle('open');
    overlay.classList.toggle('open');
});

const closeButton = document.getElementById('close-button');

closeButton.addEventListener('click', () => {
    settingsMenu.classList.remove('open');
    overlay.classList.remove('open');
});

document.addEventListener('click', (event) => {
    if (!settingsMenu.contains(event.target) && event.target !== settingsButton) {
        settingsMenu.classList.remove('open');
        overlay.classList.remove('open');
    }
});

document.getElementById("reset-settings").addEventListener("click", (event) => {
    document.getElementById("body").style.color = event.target.value
    setCookie("color", event.target.value, 30)
    TeacherMode = event.target.checked
    setCookie("teachermode", TeacherMode, 30)
    document.getElementById("timer").innerHTML = "Calculating..."
})