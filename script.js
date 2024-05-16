var countDownDate = new Date("Jun 13, 2024 15:00:01").getTime();
const lol = "https://youtu.be/dQw4w9WgXcQ"
//const lol = "https://youtu.be/-CbxUk8QX9M"
const offDays = []

const lazyOffDays = [
    "Sep 25, 2023",
    "Oct 9, 2023",
    "Nov 10, 2023",
    "Nov 23, 2023",
    "Nov 24, 2023",
    "Dec 25, 2023",
    "Dec 26, 2023",
    "Dec 27, 2023",
    "Dec 28, 2023",
    "Dec 29, 2023",
    "Jan 1, 2024",
    "Jan 15, 2024",
    "Feb 19, 2024",
    "Feb 20, 2024",
    "Feb 21, 2024",
    "Feb 22, 2024",
    "Feb 23, 2024",
    "Mar 28, 2024",
    "Mar 29, 2024",
    "Apr 1, 2024",
    "Apr 22, 2024",
    "Apr 23, 2024",
    "Apr 24, 2024",
    "Apr 25, 2024",
    "Apr 26, 2024",
    "Apr 29, 2024",
    "Apr 30, 2024",
    "May 27, 2024"
]


lazyOffDays.forEach(v => offDays.push(new Date(v)))

const StudentOnlyOffDays = []

const lazyStudentOnlyOffDays = [
    "Nov 6, 2023",
    "Nov 7, 2023",
    "Apr 10, 2024"
]

lazyStudentOnlyOffDays.forEach(v => StudentOnlyOffDays.push(new Date(v)))

var TeacherMode = false

const Version = "1.12.3"
const BetaVersion = "1.12.3"
const IsBetaVersion = !(window.location.href.includes("github"))

if (IsBetaVersion && Version != BetaVersion) {
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

const string = `
well that just happened
k
😭😭😭
LOL
can you guys get markiplier to play now
hi :3
hewwo :3
NEVER LET BRO COOK 🔥🔥🔥🗣️🗣️
AND THE CROWD GOES MILD 🔥🔥🔥🔥
BRO DOESN'T UNDERSTAND ANYTHING 💯💯💯🔥🔥🔥🗣️🗣️
teehee ^w^
ItsThump is not a developer
you proud of yourself?
Look behind you.
wow...
LOOL bro what are you doing
try again
GG GO NEXT
great job!!
bro 💀💀
You have hidden talent 🔥🔥 keep it hidden 🔥🔥
true
umm... yea
STOP 💯💯🔥🔥
yup
april fools! did i get you
Not quite but we up 💯💯
GO AGANE
💀
┻━┻︵ヽ(\`▯´)ﾉ︵ ┻━┻
o3o
T_T
Started from bottom still there 🔥🔥🔥🗣️🗣️
>3<
nice one
o_o
alright then
good job
erm...
AND THE CROUD EXCHANGES WEIRD GLANCES 🔥🔥🔥🔥
🥺
>w<
<(0_0)>
hi
;-;
nah... what was bro doing 😭😭😭
bro...
yea you just suck. sorry
F
wow...
AND THE CROWD WANTS TO GO HOME 🔥🔥🔥🔥
O_O
;w;
what?
;_;
`
const guidinglight = string.split(`\n`)

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
    document.getElementById("guiding-light").style.color = "#77ABB4"
    document.getElementById("guiding-light").innerHTML = "my honest reaction: " + guidinglight[Math.floor(Math.random() * guidinglight.length)]
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
    setTimeout(function() {
        if (thingy == 1 || ((countDownDate - new Date()) <= 25200000)) {
            document.getElementById("lol").style.visibility = "hidden"
            doVideo((thingy == 1 && !((countDownDate - new Date()) <= 25200000)))
        } else {
            document.getElementById('appearOnPress-h4').innerHTML = 'you got lucky this time, but dont count on your luck for next time'
        }
    }, 5000)
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
    var daysOffRemaining = offDays.reduce((prev, v) => {
        if (v >= now && v <= countDownDate) return prev + 1
        else return prev
    }, 0)
    /*
    for (let index = 0; index < lazyOffDays.length; index++) {
        const a = new Date(lazyOffDays[index])
        if (a >= now && a <= countDownDate) {
            daysOffRemaining++
        }
    }
    */
    if (!TeacherMode) {
        daysOffRemaining += StudentOnlyOffDays.reduce((prev, v) => {
            if (v >= now && v <= countDownDate) return prev + 1
            else return prev
        }, 0)
    }
    return daysOffRemaining
}

var weekendsEnabled = false
const x = setInterval(function() {
    const now = new Date().getTime()
    const distance = countDownDate - now;
    // Calculate any days off from school
    const daysOffRemaining = CalculateDaysOffRemaining()
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const weekends = weekendsEnabled ? 0 : Math.floor((days / 7) * 2)
    days -= (weekends + daysOffRemaining)
    days = Math.max(days, 0)

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (minutes == 0 && hours == 0 && days == 0) {
        document.getElementById("timer").innerHTML = seconds + "s"
    } else if (hours == 0 && days == 0) {
        document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s"
    } else if (days == 0) {
        document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s";
    } else {
        document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s"
    }
    document.getElementById("teacher-mode-box-label").innerHTML = "Remaining Student Only Off Days: " + CalculateStudentOnlyOffDays()
    if (distance < 0) {
        doVideo(false)
        document.getElementById("timer").innerHTML = document.getElementById("period-end-toggle") ? "CLASS IS OVER!!!" : "SUMMER VACATION!!!!";
        countDownDate = new Date("Sep 1, 2023 8:00:00").getTime()
        clearInterval(x)
        document.getElementById("countdown-until").innerHTML = ""
        document.getElementById("settings-broken").style.visibility = ""
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

document.getElementById("weekends").addEventListener("change", (ev) => {
    weekendsEnabled = ev.target.checked
    document.getElementById("period-end-toggle").disabled = ev.target.checked || document.getElementById("period-setting-menu").value == '0'
})

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

const periods = [
    "15:00",
    "8:43",
    "9:31",
    "10:18",
    "11:05",
    "11:52",
    "12:39",
    "13:26",
    "14:13",
    "15:00"
]

const periodEndToggle = document.getElementById("period-end-toggle")

document.getElementById("period-setting-menu").addEventListener("change", () => {
    const number = Number.parseInt(document.getElementById("period-setting-menu").value)
    if(isNaN(number) || number == 0) {
        countDownDate = new Date(`Jun 13, 2024 15:00:01`).getTime()
        document.getElementById("countdown-until").textContent = "until summer vacation!"
        periodEndToggle.disabled = true
        periodEndToggle.checked = false
        document.getElementById("weekends").disabled = false
    } else {
        countDownDate = new Date(`Jun 13, 2024 ${periods[number]}:01`).getTime()

        document.getElementById("countdown-until").textContent = "until summer vacation! (For Period " + number.toString() + ")"
        periodEndToggle.disabled = false
    }
    if (periodEndToggle.checked) {
        const date = new Date()
        const current = new Date()
        current.setTime(countDownDate)
        date.setHours(current.getHours())
        date.setMinutes(current.getMinutes())
        date.setSeconds(current.getSeconds())
        countDownDate = date.getTime()
        document.getElementById("countdown-until").textContent = "until class is over! (Period " + number.toString() + ")"
    } else {
        const number = Number.parseInt(document.getElementById("period-setting-menu").value)
        countDownDate = new Date(`Jun 13, 2024 ${periods[number]}:01`).getTime()
        document.getElementById("countdown-until").textContent = "until summer vacation! (For Period " + number.toString() + ")"
    }
})


periodEndToggle.addEventListener("change", () => {
    if (periodEndToggle.checked) {
        const date = new Date()
        const current = new Date()
        current.setTime(countDownDate)
        date.setHours(current.getHours())
        date.setMinutes(current.getMinutes())
        date.setSeconds(current.getSeconds())
        countDownDate = date.getTime()
        const number = Number.parseInt(document.getElementById("period-setting-menu").value)
        document.getElementById("countdown-until").textContent = "until class is over! (Period " + number.toString() + ")"
    } else {
        const number = Number.parseInt(document.getElementById("period-setting-menu").value)
        countDownDate = new Date(`Jun 13, 2024 ${periods[number]}:01`).getTime()
        document.getElementById("countdown-until").textContent = "until summer vacation! (For Period " + number.toString() + ")"
    }
    document.getElementById("weekends").disabled = periodEndToggle.checked
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
    setCookie("font", "sans-serif", 30)
    document.getElementById('body').style.fontFamily = 'sans-serif'
})