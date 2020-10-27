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


let talks = [
    
    {
        ymd: "2020-12-10",
        start: "1600",
        title: "TBC",
        speaker: "Hiroki Matsui 松井 紘樹",
        web: "https://www.ms.u-tokyo.ac.jp/~mhiroki/",
        affil: "Tokyo",
        abstract: "TBC",
        lang: "jp",
        access: {"custom":"TBC"}
    },
    {
        ymd: "2020-12-03",
        start: "1600",
        title: "Derived factorization categories of non-Thom--Sebastiani-type sums of potentials (tentative)",
        speaker: "Yuki Hirano 平野 雄貴",
        affil: "Kyoto",
        abstract: "TBC",
        lang: "jp",
        access: {"custom":"TBC"}
    },
    {
        ymd: "2020-11-12",
        start: "1600",
        title: "ICE-closed subcategories and wide tau-tilting modules",
        speaker: "Arashi Sakai 酒井 嵐士",
        affil: "Nagoya",
        abstract: "多元環の表現論では、多元環上の加群のなす圏の部分圏が調べられてきた。例えば、torsion class やwide部分圏などがある。今回の講演ではこれら2つの共通の一般化であるアーベル圏のICE-closed 部分圏を紹介する。そしてICE-closed部分圏はwide 部分圏のtorsion classであることを見る。またsupport tau-tilting 加群の一般化であるwide tau-tilting 加群を導入し、ICE-closed 部分圏がwide tau-tilting 加群と対応することを見る。本公演の内容は榎本悠久氏との共同研究に基づいている。",
        lang: "jp",
        access: {"id":"997 &nbsp;4841 &nbsp;4223", "psw":"154055", "custom": "TBC"}
    },
    {
        ymd: "2020-10-27",
        start: "1630",
        title: "Positive cluster complex and tau-tilting complex",
        speaker: "Yasuaki Gyoda 行田 康晃",
        web: "https://yasuaki-gyoda.sakura.ne.jp/wp/",
        affil: "Nagoya",
        abstract: "In cluster algebra theory, cluster complexes are actively studied as simplicial complexes, which represent the structure of a seed and its mutations. In this talk, I will discuss a certain subcomplex, called positive cluster complex, of a cluster complex. This is a subcomplex whose vertex set consists of all cluster variables except for those in the initial seed. I will also introduce another simplicial complex in this talk - the tau-tilting complex, which has vertices given by all indecomposable tau-rigid modules, and simplices given by basic tau-rigid modules. In the case of a cluster-tilted algebra, it turns out that a tau-tilting complex corresponds to some positive cluster complex. Due to this fact, we can investigate the structure of a tau-tilting complex of tau-tilting finite type by using the tools of cluster algebra theory. This is joint work with Haruhisa Enomoto.",
        lang: "jp",
        access: {"id":"959 &nbsp;5475 &nbsp;2309", "psw": "803431"},
        record: {"slides": "contact"}
    }
];

let listHTML = "";
let pastlistHTML = "";

for (talk of talks){
    // check date and determine output
    let d = new Date();
    let talkdate = new Date(talk.ymd);
    
    // work out time string
    let dayString = `(${[ "Sun 日", "Mon 月", "Tue 火", "Wed 水", "Thu 木", "Fri 金", "Sat 土" ][talkdate.getDay()]})`;
    let hh = parseInt(talk.start.slice(0,2)), mm=parseInt(talk.start.slice(-2));
    let duration = ("duration" in talk)?(+duration):90;
    let endTime = hh*60+mm+duration;
    let timeString = `${hh}:${('0'+mm).slice(-2)} - ${Math.floor(endTime/60)}:${('0'+(endTime%60)).slice(-2)} Japan time`;
    // compare now and talk's end time
    talkdate.setHours(parseInt(timeString.slice(8,12)), parseInt(timeString.slice(11,13)));
    let inSchedule = (d.valueOf() <= talkdate.valueOf());

    // start piecing data entry
    let str = `<fieldset> <legend>${talk.ymd} ${dayString}<br/>${timeString}</legend>`;
    str += `<ul class="twocolumns left80 leftbold">`;
    str += `<li><div class="leftcolumn">Title:</div><div class="maincolumn">${talk.title}</div></li>`;
    let affilString = ("affil" in talk)?` (${talk.affil})`:"";
    let spString = ("web" in talk)?`<a href=${talk.web}>${talk.speaker}${affilString}</a>`:`${talk.speaker}${affilString}`;
    str += `<li><div class="leftcolumn">Speaker:</div><div class="maincolumn">${spString}</div></li>`;
    str += `<li><div class="leftcolumn">Abstract:</div><div class="maincolumn">${talk.abstract}</div></li>`;
    str += `<li><div class="leftcolumn">Langauge:</div><div class="maincolumn">${talk.lang==="jp"?"Japanese 日本語":"English"}</div></li>`;
    let accessString = ("id" in talk.access)?`<b>Zoom ID</b>&nbsp;${talk.access.id}&nbsp;`:"";
    accessString += ("psw" in talk.access)?`<b>Password</b>&nbsp;${talk.access.psw}&nbsp;`:"";
    accessString += ("link" in talk.access)?`<a href="${talk.access.link}">${("custom" in talk.access)?talk.access.custom:"LINK"}</a>`:`${("custom" in talk.access)?talk.access.custom:""}`;
    str += (accessString === "")?"":`<li><div class="leftcolumn">Access:</div><div class="maincolumn">${accessString}</div></li>`;
    if ("record" in talk) {
        str += `<li><div class="leftcolumn">Record:</div><div class="maincolumn">`;
        if ("slides" in talk.record){
            str += (talk.record.slides === "contact")?"Contact speaker for slides. ":`<a href="${talk.record.slides}">Slides</a>. `;
        }else{
            str += "No slide will be made available. ";
        }
        str += ("vid" in talk.record)?`<a href="${talk.record.vid}>Video</a>. `:"Video not available.";
        str += `</div></li>`;
    }
    str += `</ul></fieldset>`; 

    inSchedule?(listHTML=str+listHTML):(pastlistHTML+=str);
}


document.getElementById("talkList").innerHTML = listHTML;
document.getElementById("pastList").innerHTML = pastlistHTML;