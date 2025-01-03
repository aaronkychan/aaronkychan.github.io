let talks = [
    {
        ymd: "2024-12-20",
        start: "1700",
        duration: 90,
        title: `Semiinfinite sheaves on affine flag varieties`,
        speaker: "Simon Riche",
        affil: "Université Clermont Auvergne",
        web: `https://lmbp.uca.fr/~riche/`,
        abstract: `We will explain how, generalizing a construction of Gaitsgory, one can define and study a category of sheaves on the affine flag variety of a complex reductive group that "models" sheaves on the corresponding semiinfinite flag variety, with coefficients in a field of positive characteristic, and which should provide a geometric model for a category of representations of the Langlands dual Lie algebra over the given coefficient field. As an application, we use this construction to compute the dimensions of stalks of the intersection cohomology complex on Drinfeld's compactification, with coefficients in any field of good characteristic. This is joint work with Pramod Achar and Gurbir Dhillon.`,
        lang: "en",
        access: {
            id: "882 1561 8969",
            psw: "531394",
        },
        record: {
            slides: `TNA/2024/Riche-Semiinfinite_sheaves_on_affine_flag.pdf`,
        },
    },
    {
        ymd: "2024-10-23",
        start: "1030",
        duration: 90,
        title: `一般化マルコフ数とそのSL(2,Z)行列化`,
        speaker: "Yasuaki Gyoda 行田 康晃",
        affil: "University of Tokyo 東京大学",
        web: `https://yasuaki-gyoda.github.io/jp/`,
        abstract: `<p>マルコフ数とは、マルコフ方程式 $x^2 + y^2 + z^2 = 3xyz$の正整数解に現れる整数である。私は、共同研究者の松下浩大氏とともに、2021年から2022年にかけてこのマルコフ方程式を一般化し、次の形に拡張した。</p>
<p> $x^2 + y^2 + z^2 + k(yz + zx + xy) = (3 + 3k)xyz$  ($k$は非負整数)</p>
<p>この方程式を「$k$ 一般化マルコフ方程式」と呼び、その正整数解に現れる数を「$k$ 一般化マルコフ数」とする。私は、このクラスの方程式およびその解に関連する数が、古典的なマルコフ方程式やマルコフ数と同様の性質を保持していることを明らかにした。
今回の発表では、これらのマルコフ数および $k$ 一般化マルコフ数を $(1,2)$ 成分に持つ $2 \\times 2$ 行列（特に $SL(2, \\mathbb{Z})$ の元）を導入する。そしてこの行列が、マルコフ数や一般化マルコフ数に備わる組み合わせ構造を保存することを説明する。さらにその応用として、スネークグラフの完全マッチングを利用して、既約分数から$k$一般化マルコフ数を計算する方法を紹介する予定である。</p>`,
        lang: "jp",
        access: {
            id: "810 1799 9876",
            psw: "456782",
        },
        record: {
            slides: `TNA/2024/Gyoda-Generalised_Markov_numbers.pdf`,
        },
    },
    {
        ymd: "2024-06-28",
        start: "1630",
        duration: 90,
        title: `Classifying KE-closed subcategories`,
        speaker: "Shunya Saito 斎藤 峻也",
        affil: "University of Tokyo 東京大学",
        web: `https://sites.google.com/view/shunya-saito-math`,
        abstract: `圏の局所化や導来圏のt構造、傾加群とその変異など種々の理論と関連して、これまで様々な種類のアーベル圏の部分圏が導入・研究されてきた。とくに環を固定したとき、その加群圏にはどのような部分圏があり、それらはどのように分類されるのかという問題は環の表現論において活発に研究されてきた。可換環の場合には、様々な部分圏がプライム・スペクトラムを用いて分類できることや、一般のアーベル圏では異なるクラスの部分圏が一致してしまうことなどがこれまでの研究で明らかにされてきた。
本公演では、進行中の可換環上の加群圏におけるKE閉部分圏（＝核と拡大で閉じる部分圏）の分類について話す。とくに良いクラスの可換環に対してはKE閉部分圏がプライム・スペクトラムを用いて分類できることや他のクラスの部分圏と一致してしまうことを紹介する。またこれらを示すうえで加群の自己準同型環の中心の考察が重要な役割を果たしており、その性質やKE閉部分圏の分類との関係について述べる。分類に関する予想や関連する問題についても述べたいと考えている。
本公演の内容は小林稔周氏（明治大学）との共同研究に基づく。`,
        lang: "jp",
        access: {
            id: "890 0928 7250",
            psw: "360908",
        },
        record: {
            slides: `TNA/2024/Saito-Classify_KE-closed_subcats.pdf`,
        },
    },
    {
        ymd: "2024-06-21",
        start: "1630",
        duration: 90,
        title: `松井スペクトラムを用いた復元定理の再解釈`,
        speaker: "Daigo Ito 伊藤 大悟",
        affil: "UC Berkeley",
        web: `https://daigoi.github.io/`,
        abstract: `代数多様体$X$上の連接層の導来圏は多くの幾何学的情報を含んでいることが知られており，特にBondal-OrlovとBallard氏によって$X$がGorenstein
        (反)Fano多様体の場合は導来圏の三角圏構造から$X$を復元できることが示されている．一方で一般の代数多様体$X$についてもBalmer氏によって導来圏の三角圏構造と導来テンソル積によるモノイダル構造の組からXを復元できることが示されている．本講演では近年松井氏によって導入された三角圏の松井スペクトラムを用いることでBalmer氏による復元をモノイダル構造なしでどの程度理解することができるかという問いから出発し，この視点からBondal-OrlovとBallard氏の復元定理に完全な別証明を与える．この別証明をもとにこの復元定理のさらなる一般化やFavero氏によるいくつかの関連する復元定理の別証明や一般化に関しても解説する．またこの視点を採用することでFourier-Mukaiパートナーが複数存在する場合にどのように復元問題を考えることができるかについても双有理幾何との関係にも触れつつ時間が許す限り解説する．一部の内容は徳島大学の松井氏との共同研究(arXiv:2405.16776)に基づく．`,
        lang: "jp",
        access: {
            id: "871 0903 4557",
            psw: "788435",
        },
        record: {
            slides: `TNA/2024/Ito-Reinterpret_reconstruction_theorem_for_Matsui_spectrum.pdf`,
        },
    },
    {
        ymd: "2024-06-07",
        start: "1630",
        duration: 90,
        title: `スーパー代数群の表現と奇鏡映について`,
        speaker: "Taiki Shibata 柴田 大樹",
        affil: "Okayama University of Science 岡山理科大学",
        web: `https://sites.google.com/site/mathshibata`,
        abstract: `<p>良く知られているように分裂簡約代数群の表現論は，原理的には付随するルート・データ（やワイル群）の言葉で記述することが可能であり，既約表現の分類や指標理論などの研究が今日に至るまで盛んに行われてきている．一方で，スーパー代数群は対称テンソル圏の理論で本質的な役割を果たす（Deligneの定理）ことは知られていたが，それ自体の構造論や表現論に関する研究はまだ始まったばかりであり，非スーパーのときと比べて十分理解されているとは言い難い．例えば「付随するルート系の言葉で既約表現のパラメータを記述せよ」という問いは基本的であるにもかかわらず，いくつかのスーパー代数群に対してしか解決されていない．その理由としては，スーパーの場合はルートやボレル部分群の振る舞いが特異であり，そのコントロールが難しいという点があげられる．</p>

        <p>本講演では，スーパー代数群の定義から始めて，いくつかの具体例をそのルート系とともに見ていく．そして誘導表現を用いた既約表現の構成法を紹介し，現状でどこまで（既約）表現に関して分かっているのか，またどのような困難があるのかを具体例を見ながら解説する．その後に Serganova らによって導入された（ワイル群のある意味の補完である）奇鏡映と呼ばれる操作が，スーパー代数群の誘導表現に対してどのように振る舞うかを解説する．</p>
        `,
        lang: "jp",
        access: {
            id: "858 1659 5222",
            psw: "692360",
        },
        record: {
            slides: `TNA/2024/Shibata-Rep_algebraic_supergroup_odd_reflection`,
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
