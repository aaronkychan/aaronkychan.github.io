/* FOR COPY AND PASTE:
{ 
    "ymd": "2000-01-01",
    "start": "1600",
    "duration": "90",
    "title": "TBC",
    "speaker": "ABC Suzuki",
    "affil": "Nagoya",
    "abstract": "TBC",
    "lang": "jp",
    "access": {"id": "123&nbsp;345&nbsp;6789", "psw":"4321", 
            "link":"http://www.math.nagoya-u.ac.jp", 
            "custom": "SEE HERE"}
}
*/

/*
data structure:  
"ymd": "YYYY-MM-DD",
"start": "hhmm" 24hr format  (NOTE: this is in Asia/Tokyo timezone)
"duration": optional number representing duration in mintue (default to 90, i.e. 1.5hr)
"title": string
"speaker": string
"affil": optional (speaker affiliation)
"abstract": string possibly with HTML code
"lang": optional (default to "en") can only take "en" or "jp" for now
"access": { "id": string, "psw": string, "link": string, "custom": string }  all entry optional (leave blank = TBC)

about acess data:
id, psw = zoom id/zoom psw
link = provide link (anchor to custom text)
custom = any string for extra info (can be HTML)
*/


let talks = [{
    "ymd": "2020-10-27",
    "start": "1630",
    "title": "Positive cluster complex and tau-tilting complex",
    "speaker": "Yasuaki Gyoda 行田 康晃",
    "affil": "Nagoya",
    "abstract": "In cluster algebra theory, cluster complexes are actively studied as simplicial complexes, which represent the structure of a seed and its mutations. In this talk, I will discuss a certain subcomplex, called positive cluster complex, of a cluster complex. This is a subcomplex whose vertex set consists of all cluster variables except for those in the initial seed. I will also introduce another simplicial complex in this talk - the tau-tilting complex, which has vertices given by all indecomposable tau-rigid modules, and simplices given by basic tau-rigid modules. In the case of a cluster-tilted algebra, it turns out that a tau-tilting complex corresponds to some positive cluster complex. Due to this fact, we can investigate the structure of a tau-tilting complex of tau-tilting finite type by using the tools of cluster algebra theory. This is joint work with Haruhisa Enomoto.",
    "lang": "jp",
    "access": {"id":"959 &nbsp;5475 &nbsp;2309", "psw": "803431"}
    },
    {"ymd": "2020-11-12",
    "start": "1600",
    "title": "TBC",
    "speaker": "Arashi Sakai 酒井 嵐士",
    "affil": "Nagoya",
    "abstract": "TBC",
    "lang": "jp",
    "access": {"custom": "TBC"}
    },
    
    {"ymd": "2019-11-12",
    "start": "1000",
    "title": "TBC",
    "speaker": "test",
    "affil": "Nagoya",
    "abstract": "TBC",
    "lang": "jp",
    "access": {"custom": "TBC"}
    }
];

let listHTML = "";
let pastlistHTML = "";

for (talk of talks){
    // TODO: check date and determine output
    
    let d = new Date();
    let talkdate = new Date(talk.ymd);
    let inSchedule = (d.valueOf() <= talkdate.valueOf());
    
    // work out time string
    let dayString = `(${[ "Sun 日", "Mon 月", "Tue 火", "Wed 水", "Thu 木", "Fri 金", "Sat 土" ][talkdate.getDay()]})`;
    let hh = parseInt(talk.start.slice(0,2)), mm=parseInt(talk.start.slice(-2));
    let duration = ("duration" in talk)?(+duration):90;
    let timeString = `${hh}:${mm} - ${hh+Math.floor(duration/60)}:${mm+duration%60} Japan time`;

    // start piecing data entry
    let str = `<fieldset> <legend>${talk.ymd} ${dayString}<br/>${timeString}</legend>`;
    str += `<ul class="twocolumns left80 leftbold">`;
    str += `<li><div class="leftcolumn">Title:</div><div class="maincolumn">${talk.title}</div></li>`;
    let affilString = ("affil" in talk)?` (${talk.affil})`:"";
    str += `<li><div class="leftcolumn">Title:</div><div class="maincolumn">${talk.speaker}${affilString}</div></li>`;
    str += `<li><div class="leftcolumn">Abstract:</div><div class="maincolumn">${talk.abstract}</div></li>`;
    str += `<li><div class="leftcolumn">Langauge:</div><div class="maincolumn">${talk.lang==="jp"?"Japanese 日本語":"English"}</div></li>`;
    let accessString = ("id" in talk.access)?`<b>Zoom ID</b>&nbsp;${talk.access.id}&nbsp;`:"";
    accessString += ("psw" in talk.access)?`<b>Password</b>&nbsp;${talk.access.psw}&nbsp;`:"";
    accessString += ("link" in talk.access)?`<a href="${talk.access.link}">${("custom" in talk.access)?talk.access.custom:"LINK"}</a>`:"";
    str += `<li><div class="leftcolumn">Access:</div><div class="maincolumn">${accessString}</div></li>`;
    str += `</ul></fieldset>`; 

    inSchedule?(listHTML+=str):(pastlistHTML+=str);
}


document.getElementById("talkList").innerHTML = listHTML;
document.getElementById("pastList").innerHTML = pastlistHTML;