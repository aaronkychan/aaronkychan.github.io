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
        ymd:"2021-02-10",
        start: "1600",
        title: "TBC",
        speaker: "Akishi Ikeda 池田 曉志",
        affil: "Josai University",
        abstract: "TBC",
        lang: "jp",
        access: {custom: "TBC"}
    },
    {
        ymd:"2021-01-21",
        start: "1700",
        title: `Based modules over the $\\imath$-quantum group of type AI`,
        speaker: "Hideya Watanabe 渡邉 英也",
        affil: "RIMS, Kyoto University",
        abstract: `In recent years, $\\imath$-quantum groups are intensively studied because of their importance in various branches of mathematics and physics. 
        Although $\\imath$-quantum groups are thought of as generalizations of Drinfeld-Jimbo quantum groups, their representation theory is much more difficult than that of quantum groups. 
        In this talk, I will focus on the $\\imath$-quantum group of type AI. It is a non-standard quantization of the special orthogonal Lie algebra $\\mathfrak{so}_n$. 
        I will report my recent research on based modules, which are modules equipped with distinguished bases, called the $\\imath$-canonical bases. 
        The first main result is a new combinatorial formula describing the branching rule from $\\mathfrak{sl}_n$ to $\\mathfrak{so}_n$. 
        The second one is the irreducibility of cell modules associated with the $\\imath$-canonical bases.`,
        lang: "jp",
        access: {custom: "TBC"}
    },
    {
        ymd:"2021-01-14",
        start: "1600",
        title: "TBC",
        speaker: "Ryo Ohkawa 大川 領",
        web: "http://www.math.kobe-u.ac.jp/home-j/ohkawa.html",
        affil: "Kobe University",
        abstract: "TBC",
        lang: "jp",
        access: {custom: "TBC"}
    },
    {
        ymd:"2020-12-17",
        start: "1600",
        title: "The finite EI categories of Cartan type",
        speaker: "Xiao-Wu Chen 陈 小伍",
        web: "http://home.ustc.edu.cn/~xwchen/",
        affil: "University of Science and Technology of China",
        abstract: `We will recall the notion of a finite free EI category introduced by Li. To each Cartan triple, we associate a finite free EI category, called the finite EI category of Cartan type. The corresponding category algebra is isomorphic to the 1-Gorenstein algebra, introduced by Geiss-Leclerc-Schroer, which is associated to possibly another Cartan triple. The construction of the second Cartan triple is related to the well-known unfolding of valued graphs. We will apply the obtained algebra isomorphism to re-interpret some tau-locally free modules as induced modules over a certain skew group algebra. This project is joint with Ren Wang.`,
        lang: "en",
        access: {id: `921 0388 8808`, psw: `563837`},
        record: {slides: `TNA/2020/XWChen-The_Finite_EI_Categories_of_Cartan_Type.pdf`}
    },
    {
        ymd: "2020-12-10",
        start: "1630",
        title: "Subcategories of module/derived categories and subsets of Zariski spectra",
        speaker: "Hiroki Matsui 松井 紘樹",
        web: "https://www.ms.u-tokyo.ac.jp/~mhiroki/",
        affil: "Uuniversity of Tokyo",
        abstract: "The classification problem of subcategories has been well considered in many areas. This problem was initiated by Gabriel in 1962 by giving a classification of localizing subcategories of the module category Mod R via specialization-closed subsets of the Zariski spectrum Spec R for a commutative noetherian ring. After that several authors tried to generalize this result in many ways. For example, four decades later, Krause introduced the notion of coherent subsets of Spec R and used it to classify wide subcategories of Mod R. In this talk, I will introduce the notions of n-wide subcategories of Mod R and n-coherent subsets of Spec R for a (possibly infinite) non-negative integer n. I will also introduce the notion of n-uniform subcategories of the derived category D(Mod R) and prove the correspondences among these classes. This result unifies/generalizes many known results such as the classification given by Gabriel, Krause, Neeman, Takahashi, Angeleri Hugel-Marks-Stovicek-Takahashi-Vitoria. This talk is based on joint work with Ryo Takahashi.",
        lang: "jp",
        access: {id: `964 9976 5624`, psw: "195094"},
        record:{ slides: `TNA/2020/Matsui-Subcategories_of_DModA_and_subsets_of_Zariski_spectra.pdf`}
    },
    {
        ymd: "2020-12-03",
        start: "1600",
        title: "Full strong exceptional collections for invertible polynomials of chain type",
        speaker: "Yuki Hirano 平野 雄貴",
        affil: "Kyoto University",
        abstract: "Constructing a tilting object in the stable category of graded maximal Cohen-Macaulay modules over a given graded Gorenstein ring is an important problem in the representation theory of graded Gorenstein rings. For a hypersurface S/f in a graded regular ring S, this problem is equivalent to constructing a tilting object in the homotopy category of graded matrix factorizations of f. In this talk, we discuss this problem in the case when S is a polynomial ring, f is an invertible polynomial of chain type and S has a rank one abelian group grading (called the maximal grading of f), and in this case we show the existence of a tilting object arising from a full strong exceptional collection. This is a joint work with Genki Ouchi.",
        lang: "jp",
        access: {"id": "959 &nbsp;0189 &nbsp;8837", "psw":"541801"},
        record: {"slides": `TNA/2020/Hirano-Full_strong_exceptional_collections_for_invertible_polynomials_of_chain_type.pdf`}
    },
    {
        ymd: "2020-11-12",
        start: "1600",
        title: "ICE-closed subcategories and wide tau-tilting modules",
        speaker: "Arashi Sakai 酒井 嵐士",
        affil: "Nagoya University",
        abstract: "多元環の表現論では、多元環上の加群のなす圏の部分圏が調べられてきた。例えば、torsion class やwide部分圏などがある。今回の講演ではこれら2つの共通の一般化であるアーベル圏のICE-closed 部分圏を紹介する。そしてICE-closed部分圏はwide 部分圏のtorsion classであることを見る。またsupport tau-tilting 加群の一般化であるwide tau-tilting 加群を導入し、ICE-closed 部分圏がwide tau-tilting 加群と対応することを見る。本公演の内容は榎本悠久氏との共同研究に基づいている。",
        lang: "jp",
        access: {"id":"977 &nbsp;4841 &nbsp;4223", "psw":"154055"},
        record: {"slides" : `TNA/2020/Sakai-ICE-closed_subcats_and_wide_tau-tilting.pdf`}
    },
    {
        ymd: "2020-10-27",
        start: "1630",
        title: "Positive cluster complex and tau-tilting complex",
        speaker: "Yasuaki Gyoda 行田 康晃",
        web: "https://yasuaki-gyoda.sakura.ne.jp/wp/",
        affil: "Nagoya University",
        abstract: "In cluster algebra theory, cluster complexes are actively studied as simplicial complexes, which represent the structure of a seed and its mutations. In this talk, I will discuss a certain subcomplex, called positive cluster complex, of a cluster complex. This is a subcomplex whose vertex set consists of all cluster variables except for those in the initial seed. I will also introduce another simplicial complex in this talk - the tau-tilting complex, which has vertices given by all indecomposable tau-rigid modules, and simplices given by basic tau-rigid modules. In the case of a cluster-tilted algebra, it turns out that a tau-tilting complex corresponds to some positive cluster complex. Due to this fact, we can investigate the structure of a tau-tilting complex of tau-tilting finite type by using the tools of cluster algebra theory. This is joint work with Haruhisa Enomoto.",
        lang: "jp",
        access: {"id":"959 &nbsp;5475 &nbsp;2309", "psw": "803431"},
        record: {"slides": "contact"}
    }
];

let listHTML = "";
let pastlistHTML = "";

for (talk of talks){
    let str="";
    let inSchedule=true;
    if (talk.ymd != "TBC"){    
        // check date and determine output
        let d = new Date();
        let talkdate = new Date(talk.ymd);
        let dayString = `(${[ "Sun 日", "Mon 月", "Tue 火", "Wed 水", "Thu 木", "Fri 金", "Sat 土" ][talkdate.getDay()]})`;
        let timeString = `Time: TBC`;

        if ("start" in talk){
            // work out time string
            let hh = parseInt(talk.start.slice(0,2)), mm=parseInt(talk.start.slice(-2));
            let duration = ("duration" in talk)?(+duration):90;
            let endTime = hh*60+mm+duration;
            timeString = `${hh}:${('0'+mm).slice(-2)} - ${Math.floor(endTime/60)}:${('0'+(endTime%60)).slice(-2)} Japan time`;
            // compare now and talk's end time
            talkdate.setHours(parseInt(timeString.slice(8,12)), parseInt(timeString.slice(11,13)));
        }
        inSchedule = (d.valueOf() <= talkdate.valueOf());
        str += `<fieldset> <legend>${talk.ymd} ${dayString}<br/>${timeString}</legend>`;        
    }else{
        str += `<fieldset> <legend>TBC</legend>`;
    }

    // start piecing data entry
    
    str += `<ul class="twocolumns left80 leftbold">`;
    str += `<li><div class="leftcolumn">Title:</div><div class="maincolumn">${talk.title}</div></li>`;
    let affilString = ("affil" in talk)?` (${talk.affil})`:"";
    let spString = ("web" in talk)?`<a href=${talk.web}>${talk.speaker}${affilString}</a>`:`${talk.speaker}${affilString}`;
    str += `<li><div class="leftcolumn">Speaker:</div><div class="maincolumn">${spString}</div></li>`;
    str += `<li><div class="leftcolumn">Abstract:</div><div class="maincolumn">${talk.abstract}</div></li>`;
    str += `<li><div class="leftcolumn">Language:</div><div class="maincolumn">${talk.lang==="jp"?"Japanese 日本語":"English"}</div></li>`;
    let accessString = ("id" in talk.access)?`<b>Zoom ID</b>&nbsp;${talk.access.id}&nbsp;`:"";
    accessString += ("psw" in talk.access)?`<b>Password</b>&nbsp;${talk.access.psw}&nbsp;`:"";
    accessString += ("link" in talk.access)?`<a href="${talk.access.link}">${("custom" in talk.access)?talk.access.custom:"LINK"}</a>`:`${("custom" in talk.access)?talk.access.custom:""}`;
    str += (accessString === "")?"":`<li><div class="leftcolumn">Access:</div><div class="maincolumn">${accessString}</div></li>`;
    if ("record" in talk) {
        str += `<li><div class="leftcolumn">Record:</div><div class="maincolumn">`;
        if ("slides" in talk.record){
            str += (talk.record.slides === "contact")?"Contact speaker for slides. ":`<a href="${talk.record.slides}">Slides here</a>. `;
        }else{
            str += "No slide will be made available. ";
        }
        //str += ("vid" in talk.record)?`<a href="${talk.record.vid}">Video</a>. `:"Video not available.";
        str += `</div></li>`;
    }
    str += `</ul></fieldset>`; 


    inSchedule?(listHTML=str+listHTML):(pastlistHTML+=str);
}


document.getElementById("talkList").innerHTML = listHTML;
document.getElementById("pastList").innerHTML = pastlistHTML;