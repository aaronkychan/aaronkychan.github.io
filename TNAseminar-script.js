let talks = [
    {
        ymd: "2022-05",
        //start: "1300",
        title: `TBC III`,
        speaker: "Martin Kalck",
        abstract: `Continuation of <a href="#Kalck202205a"> part I</a> and <a href="#Kalck202205b">II</a>`,
        lang: "en",
        access: {
            id: `TBC`,
            psw: `TBC`,
        },
        // record: {
        //     slides: `TNA/2022/.pdf`,
        // },
    },
    {
        ymd: "2022-05",
        //start: "1300",
        id: "Kalck202205b",
        title: `TBC II`,
        speaker: "Martin Kalck",
        abstract: `Continuation of <a href="#Kalck202205a"> part I</a>`,
        lang: "en",
        access: {
            id: `TBC`,
            psw: `TBC`,
        },
        // record: {
        //     slides: `TNA/2022/.pdf`,
        // },
    },
    {
        ymd: "2022-05",
        //start: "1300",
        id: "Kalck202205a",
        title: `TBC I`,
        speaker: "Martin Kalck",
        abstract: `TBC`,
        lang: "en",
        access: {
            id: `TBC`,
            psw: `TBC`,
        },
        // record: {
        //     slides: `TNA/2022/.pdf`,
        // },
    },
    {
        ymd: "2022-06-08",
        start: "1030",
        title: `TBC II`,
        speaker: "Masahiko Yoshinaga 吉永 正彦",
        affil: "Osaka University 大阪大学",
        web: "http://www4.math.sci.osaka-u.ac.jp/~yoshinaga/index.html",
        abstract: `Continuation of <a href="#Yoshinaga202206a"> part I</a>`,
        lang: "jp",
        access: {
            id: `TBC`,
            psw: `TBC`,
        },
        // record: {
        //     slides: `TNA/2022/.pdf`,
        // },
    },
    {
        ymd: "2022-06-01",
        start: "1030",
        title: `TBC I`,
        id: "Yoshinaga202206a",
        speaker: "Masahiko Yoshinaga 吉永 正彦",
        affil: "Osaka University 大阪大学",
        web: "http://www4.math.sci.osaka-u.ac.jp/~yoshinaga/index.html",
        abstract: `TBC`,
        lang: "jp",
        access: {
            id: `TBC`,
            psw: `TBC`,
        },
        // record: {
        //     slides: `TNA/2022/.pdf`,
        // },
    },
    {
        ymd: "2022-04-13",
        start: "1030",
        title: `Tilting ideals of deformed preprojective algebras`,
        speaker: "Yuta Kimura 木村 雄太",
        affil: "Osaka Metropolitan University 大阪公立大学",
        abstract: `<p>Let $K$ be a field and $Q$ a finite quiver.
        For a weight $\\lambda \\in K^{|Q_0|}$, the deformed preprojective
        algebra $\\Pi^{\\lambda}$ was introduced by Crawley-Boevey and Holland
        to study deformations of Kleinian singularities.
        If $\\lambda = 0$, then $\\Pi^{0}$ is the preprojective algebra
        introduced by Gelfand-Ponomarev, and appears in many areas of
        mathematics.
        Among interesting properties of $\\Pi^{0}$, the classification of
        tilting ideals of $\\Pi^{0}$, shown by Buan-Iyama-Reiten-Scott, is
        fundamental and important.
        They constructed a bijection between the set of tilting ideals of
        $\\Pi^{0}$ and the Coxeter group $W_Q$ of $Q$.</p>
        <p>
        In this talk, when $Q$ is non-Dynkin, we see that $\\Pi^{\\lambda}$ is a
        $2$-Calabi-Yau algebra, and show that there exists a bijection between
        tilting ideals and a Coxeter group.
        However $W_Q$ does not appear, since $\\Pi^{\\lambda}$ is not necessarily basic.
        Instead of $W_Q$, we consider the Ext-quiver of rigid simple modules,
        and use its Coxeter group.
        When $Q$ is an extended Dynkin quiver, we see that the Ext-quiver is
        finite and this has information of singularities of a
        representation space of semisimple modules.
        This is joint work with William Crawley-Boevey.</p>`,
        lang: "jp",
        access: {
            id: `893 7563 9538`,
            psw: `069232`,
        },
        record: {
            slides: `TNA/2022/Kimura-Tilting_ideals_of_deformed_preprojective_algebras.pdf`,
        },
    },
];

let talkList = "",
    pastList = "";

let docTalkList = document.getElementById("talkList");
let docPastList = document.getElementById("pastList");

// ***** Determine time offset
const ourZone = "Asia/Tokyo";
//const ourZone = "Asia/Pyongyang";
//const ourZone = "Europe/Paris";
//const ourZone = "America/New_York";
let localtime = luxon.DateTime.local();
let ourtime = localtime.setZone(ourZone);
const sameTime = ourtime.offset == localtime.offset;
document.getElementById("timeInfo").innerHTML =
    ourZone !== localtime.zoneName
        ? `<p>Our timezone is ${ourZone} (${ourtime.offsetNameShort})<br/>
    Your timezone is ${localtime.zoneName} (${localtime.offsetNameShort}), ${
              sameTime ? "same as" : "different from"
          } ours.</p>`
        : "";

for (talk of talks) {
    let str = "";
    let inSchedule = true;
    //if (talk.ymd != "TBC") {
    if (talk.ymd.match(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)) {
        // check date and determine output
        //let d = new Date();
        //let talkdate = new Date(talk.ymd);
        let [hh, mm] =
            "start" in talk
                ? [
                      [0, 2],
                      [2, 4],
                  ].map((x) => talk.start.slice(x[0], x[1]))
                : ["16", "00"];
        let duration = "duration" in talk ? talk.duration : 90;
        let talkstart = luxon.DateTime.fromISO(`${talk.ymd}T${hh}:${mm}:00`, {
            zone: ourZone,
        });
        let talkends = talkstart.plus({ minutes: duration });

        let dayString = `(${
            [
                "Sun 日",
                "Mon 月",
                "Tue 火",
                "Wed 水",
                "Thu 木",
                "Fri 金",
                "Sat 土",
                "Sun 日",
            ][talkstart.weekday]
        })`;
        let hasTime = "start" in talk;
        //let legend = `${localtime.zoneName} (${localtime.offsetNameShort}) time: `;
        let legend = `${talk.ymd} ${dayString} ${
            hasTime
                ? `${simpleISOTime(talkstart)} ~ ${simpleISOTime(talkends)}`
                : `(Time TBC)`
        }`;

        let legendLocal = legend;
        if (!sameTime) {
            let localstart = talkstart.setZone(localtime.zoneName);
            legendLocal = `${localtime.zoneName} time: `;
            legendLocal += `${localstart.toISODate()} (${localstart.toFormat(
                "EEE"
            )})`;
            if (hasTime) {
                let localstartTime = simpleISOTime(localstart);
                let localends = localstart.plus({ minutes: duration });

                legendLocal += ` ${localstartTime} ~ ${
                    localends.hasSame(localstart, "day") ? "" : "+1day "
                }${simpleISOTime(localends)}`;
            } else {
                legendLocal += `(Time TBC)`;
            }
        }

        // ***** OLD simpler version *****
        // if ("start" in talk) {
        //     // work out time string
        //     let hh = parseInt(talk.start.slice(0, 2)),
        //         mm = parseInt(talk.start.slice(-2));
        //     let duration = "duration" in talk ? +duration : 90;
        //     let endTime = hh * 60 + mm + duration;
        //     timeString = `${hh}:${("0" + mm).slice(-2)} - ${Math.floor(
        //         endTime / 60
        //     )}:${("0" + (endTime % 60)).slice(-2)} Japan time`;
        //     // compare now and talk's end time
        //     talkdate.setHours(
        //         parseInt(timeString.slice(8, 12)),
        //         parseInt(timeString.slice(11, 13))
        //     );
        // }
        //inSchedule = d.valueOf() <= talkdate.valueOf();
        inSchedule = localtime.valueOf() <= talkstart.valueOf();
        str +=
            "id" in talk
                ? `<fieldset id=${talk.id}> <legend> ${legendLocal}`
                : `<fieldset> <legend> ${legendLocal}`;
        str += sameTime
            ? ""
            : `<br/><span style='color:#D0D0D0;'>In the seminar timezone: ${legend}</span>`;

        str += `</legend>`;
    } else {
        str += `<fieldset> <legend>${talk.ymd}</legend>`;
    }

    // start piecing data entry

    str += `<ul class="twocolumns left80 leftbold">`;
    str += `<li><div class="leftcolumn">Title:</div><div class="maincolumn">${talk.title}</div></li>`;
    let affilString = "affil" in talk ? ` (${talk.affil})` : "";
    let spString =
        "web" in talk
            ? `<a href=${talk.web}>${talk.speaker}${affilString}</a>`
            : `${talk.speaker}${affilString}`;
    str += `<li><div class="leftcolumn">Speaker:</div><div class="maincolumn">${spString}</div></li>`;
    str += `<li><div class="leftcolumn">Abstract:</div><div class="maincolumn">${talk.abstract}</div></li>`;
    str += `<li><div class="leftcolumn">Language:</div><div class="maincolumn">${
        talk.lang === "jp" ? "Japanese 日本語" : "English"
    }</div></li>`;
    if ("access" in talk) {
        let accessString =
            "id" in talk.access
                ? `<b>Zoom ID</b>&nbsp;${talk.access.id}&nbsp;`
                : "";
        accessString +=
            "psw" in talk.access
                ? `<b>Password</b>&nbsp;${talk.access.psw}&nbsp;`
                : "";
        accessString +=
            "link" in talk.access
                ? `<a href="${talk.access.link}">${
                      "custom" in talk.access ? talk.access.custom : "LINK"
                  }</a>`
                : `${"custom" in talk.access ? talk.access.custom : ""}`;
        str +=
            accessString === ""
                ? ""
                : `<li><div class="leftcolumn">Access:</div><div class="maincolumn">${accessString}</div></li>`;
    }

    if ("record" in talk) {
        str += `<li><div class="leftcolumn">Record:</div><div class="maincolumn">`;
        if ("slides" in talk.record) {
            str +=
                talk.record.slides === "contact"
                    ? "Contact speaker for slides. "
                    : `<a href="${talk.record.slides}">${
                          "slideDesc" in talk.record
                              ? talk.record.slideDesc
                              : "Slides here"
                      }</a>. `;
        } else {
            str += "No slide will be made available. ";
        }
        //str += ("vid" in talk.record)?`<a href="${talk.record.vid}">Video</a>. `:"Video not available.";
        str += `</div></li>`;
    }
    str += `</ul></fieldset>`;

    inSchedule ? (talkList = str + talkList) : (pastList += str);

    docTalkList.innerHTML = `<p>Loading talks...</p>` + talkList;
    docPastList.innerHTML = `<p>Loading talks...</p>` + pastList;
}

docTalkList.innerHTML = talkList;
docPastList.innerHTML = pastList;

/**
 *
 * @param {luxon.DateTime} dt - luxon DateTime object
 */

function simpleISOTime(dt) {
    return dt.toISOTime({
        suppressSeconds: true,
        includeOffset: false,
    });
}

/*** Smooth scroll shortcut ***/
function smScroll(to) {
    let y = document.getElementById(to).offset - 5;
    window.scrollTo({ top: y, behaviour: "smooth" });
}

/****  Scroll to top ****/
//Get the button:
btnToTop = document.getElementById("btnToTop");

// When the user scrolls down 20px from the top of the document, show the button
window.addEventListener("scroll", () => {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        btnToTop.style.display = "block";
    } else {
        btnToTop.style.display = "none";
    }
});

let scrollToPos = document.getElementById("sec:schedule").offsetTop - 10; //give 10px padding to top
btnToTop.addEventListener("click", () => {
    window.scrollTo({ top: scrollToPos, behavior: "smooth" });
});

/* FOR COPY AND PASTE:
{ 
    ymd: "2000-01-01",
    start: "1600",
    duration: "90",
    title: "TBC",
    speaker: "ABC Suzuki",
    web: "http://www.math.nagoya-u.ac.jp/"
    affil: "Nagoya",
    abstract: "TBC",
    lang: "jp",
    access: {"id": "123&nbsp;345&nbsp;6789", "psw":"4321", 
            "link":"http://www.math.nagoya-u.ac.jp", 
            "custom": "SEE HERE"}
    record: {"slides" : "Contact speaker/link", "vid": "link"}
}
*/

/*
data structure:  
"ymd": "YYYY-MM-DD",
"id": string  (use if you want to set up anchor)
"start": "hhmm" 24hr format  (NOTE: this is in Asia/Tokyo timezone)
"duration": optional number representing duration in mintue (default to 90, i.e. 1.5hr)
"title": string
"speaker": string
"web": string (to speaker's webpage)
"affil": optional (speaker affiliation)
"abstract": string possibly with HTML code
"lang": optional (default to "en") can only take "en" or "jp" for now
"access": { "id": string, "psw": string, "link": string, "custom": string }  all entry optional (leave blank = TBC)
"record": { "slides": string ("contact" or provide link), "vid": string (provide link, leave blank = display "No video recorded" } (leave blank = don't display)

about acess data:
id, psw = zoom id/zoom psw
link = provide link (anchor to custom text)
custom = any string for extra info (can be HTML)

***** 1st entry of array  = NEWEST TALK *******
*/
