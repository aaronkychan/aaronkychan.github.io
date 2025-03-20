let talks = [
    {
        ymd: "2025-03-27",
        start: "1030",
        duration: 90,
        title: `Reduction理論における変異が誘導する三角圏構造`,
        speaker: "Ryota Iitsuka 飯塚 亮太",
        affil: "Nagoya University 名古屋大学",
        // web: `https://lmbp.uca.fr/~riche/`,
        abstract: `準傾部分圏、$n$-団傾部分圏、単純系や $n$-simple-minded
systemの変異は三角圏構造を誘導することが知られている。この三角圏構造は,
変異で不変な部分を「潰すこと(reduction)」で得られる。また、潰す前の圏における変異は、潰した後に得られる三角圏のシフト関手を定める。そのためこの結果は、準傾部分圏などの特別な部分圏(または単純系などの特別な対象の集まり)が変異で保たれることを示す際に、重要な役割を果たした(いわゆるreduction理論)。しかしその一方で、それぞれの変異は独立に定義されており、それらの変異が三角圏構造を誘導するという結果も独立に示されていた。

本公演では、準傾部分圏、$n$-団傾部分圏、単純系や $n$-simple-minded system
の変異を共通一般化した枠組みである「reducible triple」を導入する。Reducible
tripleがまさに既に紹介した4つの変異の例を一般化した概念になっていること、reducible
tripleが定める変異は三角圏構造を誘導することを紹介する予定である。また、mutation
tripleとの関連性についても紹介したいと考えている。`,
        lang: "jp",
        access: {
            id: "871 6340 9751",
            psw: "381921",
        },
        // record: {
        //     slides: `TNA/2024/Riche-Semiinfinite_sheaves_on_affine_flag.pdf`,
        // },
    },
    {
        ymd: "2025-03-17",
        start: "1430",
        duration: 90,
        title: `On Amiot's conjecture`,
        speaker: "Junyang Liu",
        affil: "University of Science and Technology of China",
        // web: `https://lmbp.uca.fr/~riche/`,
        abstract: `In 2010, Claire Amiot conjectured that algebraic
2-Calabi-Yau categories with cluster-tilting object must come from
quivers with potential. This would extend a structure theorem obtained
by Keller-Reiten in the case where the endomorphism algebra of the
cluster-tilting object is hereditary. Many other classes of examples
are also known. We will report on the proof of the conjecture in the
general case for categories with *algebraic* 2-Calabi-Yau structure.
This result has been obtained in joint work with Bernhard Keller and
is based on Van den Bergh's structure theorem for complete Calabi-Yau
algebras. We also generalize his structure theorem to the relative
case and use it to prove a relative variant of the conjecture.`,
        lang: "en",
        access: {
            id: "853 1951 5047",
            psw: "900788",
        },
        record: {
            slides: [
                `TNA/2025/LiuJungyang-GinzburgMorphism.pdf`,
                `TNA/2025/LiuJungyang-AmiotConjecture.pdf`,
            ],
        },
    },
];

//#region Code starts
let talkList = "",
    pastList = "";

let docTalkList = document.getElementById("talkList");
let docPastList = document.getElementById("pastList");

//const defaultStartTime = ["10", "30"];
const daysString = [
    "Sun 日",
    "Mon 月",
    "Tue 火",
    "Wed 水",
    "Thu 木",
    "Fri 金",
    "Sat 土",
    "Sun 日",
];

// ***** Determine time offset
const ourZone = "Asia/Tokyo";
//const ourZone = "Asia/Pyongyang";
//const ourZone = "Europe/Paris";
//const ourZone = "America/New_York";
let localtime = luxon.DateTime.local();
let ourtime = localtime.setZone(ourZone);
const sameTime = ourtime.offset == localtime.offset;
if (ourZone !== localtime.zoneName) {
    document.getElementById(
        "timeInfo"
    ).innerHTML = `<p>Date/time are displayed in your timezone (<b>${localtime.zoneName}, ${localtime.offsetNameShort}</b>).<br/>
    Our timezone is ${ourZone} (${ourtime.offsetNameShort})</p>`;
}

const expandToArr = (val, len) =>
    Array.isArray(val) ? val : Array(len).fill(val);
const isISODate = (d) =>
    d.match(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
/**
 * @param  {string} date (in ISO format "yyyy-mm-dd")
 * @param  {string} start (4 character string "hhmm", or empty)
 */
const toDateTimeObj = (date, start) => {
    let timeSubstr =
        start !== "" ? `${start.slice(0, 2)}:${start.slice(2, 4)}` : "13:00";
    return luxon.DateTime.fromISO(`${date}T${timeSubstr}:00`, {
        zone: ourZone,
    });
};
/**
 *
 * @param {luxon.DateTime} dt - luxon DateTime object
 */
const simpleISOTime = (dt) =>
    dt.toISOTime({
        suppressSeconds: true,
        includeOffset: false,
    });
/**
 * @param  {luxon.DateTime} DT
 * @param  {boolean} hasStart
 * @param  {int} duration
 * @param  {string} zone adjust DT to zone
 */
function getDTString(DT, hasStart, duration, zone) {
    let t = zone !== ourZone ? DT.setZone(zone) : DT; //adjust start time if needed
    let day = zone !== ourZone ? t.toFormat("EEE") : daysString[t.weekday];

    let endt = t.plus({ minutes: duration });
    let spant = hasStart
        ? `${simpleISOTime(t)} ~ ${
              endt.hasSame(t, "day") ? "" : "+1day "
          }${simpleISOTime(endt)}`
        : `Time TBC`;

    return `${t.toISODate()} (${day}) ${spant}`;
}

function timeDataToHTML(ymd, start, duration) {
    let str = "",
        inSchedule = true;
    if (isISODate(ymd)) {
        let hasStart = start !== "" && start !== "TBC";
        let dt = toDateTimeObj(ymd, hasStart ? start : "");
        str = getDTString(
            dt,
            hasStart,
            duration,
            sameTime ? ourZone : localtime.zoneName
        );

        inSchedule = localtime.valueOf() <= dt.plus({ minutes: 30 }).valueOf();
        str +=
            sameTime || !inSchedule
                ? ""
                : ` <span style='color:#D0D0D0;'>[<abbr title=" ${getDTString(
                      dt,
                      hasStart,
                      duration,
                      ourZone
                  )} "> In our time: </abbr>]</span>`;
    } else {
        str = ymd;
    }
    return [str, inSchedule];
}

//#region Page Generation
// ***** Actual page generation starts here
for (let talk of talks) {
    let str = `<fieldset ${
        "id" in talk ? 'id="' + talk.id + '"' : ""
    }><legend>`;
    let inSchedule = true;
    if (Array.isArray(talk.ymd)) {
        let startArr = expandToArr(
            "start" in talk ? talk.start : "",
            talk.ymd.length
        );
        let durArr = expandToArr(
            "duration" in talk ? talk.duration : 90,
            talk.ymd.length
        );
        let lastTalk = [
            talk.ymd.slice(-1)[0],
            startArr.slice(-1)[0],
            durArr.slice(-1)[0],
        ];
        inSchedule = timeDataToHTML(lastTalk[0], lastTalk[1], lastTalk[2])[1];
        let lines = [];
        for (let [i, ymd] of talk.ymd.entries()) {
            let [s, isFuture] = timeDataToHTML(ymd, startArr[i], durArr[i]);
            s =
                isFuture || !inSchedule
                    ? `Talk ${i + 1}: ${s}`
                    : `<span style='color:#D0D0D0;text-decoration: line-through;'>Talk ${
                          i + 1
                      }: ${s} </span>`;
            lines.push(s);
        }
        str += lines.join("<br/>");
        str += `</legend>`;
    } else {
        let [s, b] = timeDataToHTML(
            talk.ymd,
            "start" in talk ? talk.start : "",
            "duration" in talk ? talk.duration : 90
        );
        inSchedule = b;
        str += `${s}</legend>`;
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
        let linkurl =
            "link" in talk.access
                ? talk.access.link
                : "id" in talk.access
                ? `https://u-tokyo-ac-jp.zoom.us/j/${talk.access.id.replaceAll(
                      /[\s\xA0\uFEFF\u180E\u2000-\u200A\u202F\u205F\u3000]+/g,
                      ""
                  )}`
                : "";

        let label = "custom" in talk.access ? talk.access.custom : "Zoom";
        let accessString = inSchedule
            ? linkurl.length > 1
                ? `[&nbsp;<a href="${linkurl}" target="_blank">${label}</a>&nbsp;]&nbsp;`
                : label
            : `Meeting ended `;

        accessString +=
            "customInfo" in talk.access ? talk.access.customInfo : "";

        accessString +=
            "id" in talk.access
                ? `<b>Zoom ID</b>&nbsp;${talk.access.id}&nbsp;`
                : ``;

        accessString +=
            "psw" in talk.access
                ? `<b>Password</b>&nbsp;${talk.access.psw}&nbsp;`
                : "";

        str +=
            accessString === ""
                ? ""
                : `<li><div class="leftcolumn">Access:</div><div class="maincolumn">${accessString}</div></li>`;
    }

    if ("record" in talk) {
        str += `<li><div class="leftcolumn">Record:</div><div class="maincolumn">`;
        if ("slides" in talk.record) {
            let multiple = Array.isArray(talk.record.slides);
            let slidesArr = multiple
                ? talk.record.slides
                : [talk.record.slides];
            let sdArr =
                "slidesDesc" in talk.record
                    ? Array.isArray(talk.record.slidesDesc)
                        ? talk.record.slidesDesc
                        : [talk.record.slidesDesc]
                    : new Array(slidesArr.length).fill("");
            sdArr[0] = multiple || sdArr[0] != "" ? sdArr[0] : "Slides";
            let out = slidesArr.map((s, i) => {
                let desc = sdArr[i] === "" ? `Slides ${i + 1}` : sdArr[i];
                return s === "contact"
                    ? "Contact speaker for slides. "
                    : `<a href="${s}">${desc}</a>`;
            });
            str += out.join(" ; ");
            str += ".";
        } else {
            str += "No slide will be made available. ";
        }
        if ("vid" in talk.record) {
            str += "&nbsp;&nbsp;";
            let desc =
                "desc" in talk.record.vid
                    ? talk.record.vid.desc
                    : `Link to video`;
            desc =
                desc === "request"
                    ? `Video recording can be provided upon request.`
                    : desc;
            str +=
                "url" in talk.record.vid
                    ? `<a href="${talk.record.vid.url}">${desc}</a>`
                    : desc;
        }
        //str += ("vid" in talk.record)?`<a href="${talk.record.vid}">Video</a>. `:"Video not available.";
        str += `</div></li>`;
    }
    str += `</ul></fieldset>`;

    inSchedule ? (talkList = str + talkList) : (pastList += str);

    // for producing pastlist as HTML without compiling KaTex
    // console.log(pastList);

    docTalkList.innerHTML = `<p>Loading talks...</p>` + talkList;
    docPastList.innerHTML = `<p>Loading talks...</p>` + pastList;
}

docTalkList.innerHTML = talkList;
docPastList.innerHTML = pastList;
// console.log(MathJax);
// MathJax.typeset();

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

document.addEventListener(`click`, (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
        //e.preventDefault();
        //console.log(`You clicked ${e.target.href}`);
        let anc = e.target.href.split("#").pop();
        let elt = document.getElementById(anc);
        if (elt.classList.contains("highlighted")) {
            elt.classList.remove("highlighted");
        }
        elt.classList.add("highlighted");
        elt.addEventListener("animationend", () => {
            elt.classList.remove("highlighted");
        });
    }
});

//#region Notes for json data
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
"ymd": "YYYY-MM-DD",  can be an array for lecture series
"id": string  (use if need anchoring)
"start": "hhmm" 24hr format  (NOTE: this is in Asia/Tokyo timezone), can be array for lecture series
"duration": optional number representing duration in mintue (default to 90, i.e. 1.5hr), can be array for lecture series
"title": string
"speaker": string
"web": string (to speaker's webpage)
"affil": optional (speaker affiliation)
"abstract": string possibly with HTML code
"lang": optional (default to "en") can only take "en" or "jp" for now
"access": { "id": string, "psw": string, "link": string, "custom": string }  all entry optional (leave blank = TBC)
"record": { "slides": string ("contact" or provide link), "vid": string (provide link, leave blank = display "No video recorded" } (leave blank = don't display)

about array form:
Example
{
    ymd: ["2023-12-25", "2023-12-25"],
    start: ["1030", "1445"],
    ...
}

about acess data:
id, psw = zoom id/zoom psw
link = provide link (anchor to custom text)
custom = any string for extra info (can be HTML)

Example of hardcoding zoom info into custom:
access: {
    custom: ` ~Hybrid~<br> `,
    customInfo: `&nbsp;<b>Online</b>: <a href="https://u-tokyo-ac-jp.zoom.us/j/87435810573">Zoom</a> <b>ID</b> 874 3581 0573 <b>Password</b> 957963 <br>&nbsp;<b>Location</b>: 東京大学大学院数理科学研究科 002号室<br/>&nbsp;Graduate School of Mathematical Science Room 002, University of Tokyo`,
}
            

***** 1st entry of array  = NEWEST TALK *******
*/
