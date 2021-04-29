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
        ymd: "2021-05-20",
        start: "1600",
        title: "",
        speaker: "Ryo Kanda 神田 遼",
        affil: "Osaka City University",
        web: "https://ryokanda.net/",
        abstract: ``,
        lang: "jp",
    },
    {
        ymd: "2021-05-06",
        start: "1600",
        title: "Derived quotients of Cohen-Macaulay rings",
        speaker: "Liran Shaul",
        affil: "Charles University",
        web: "https://liranshaul.wordpress.com/",
        abstract: `
        It is well known that if A is a Cohen-Macaulay ring and $a_1,\\dots,a_n$ is an $A$-regular sequence, then the quotient ring $A/(a_1,\\dots,a_n)$ is also a Cohen-Macaulay ring. In this talk we explain that by deriving the quotient operation, if A is a Cohen-Macaulay ring and $a_1,\\dots,a_n$ is any sequence of elements in $A$, the derived quotient of $A$ with respect to $(a_1,\\dots,a_n)$ is Cohen-Macaulay. Several applications of this result are given, including a generalization of Hironaka's miracle flatness theorem to derived algebraic geometry.`,
        lang: "en",
        access: { id: `860 8615 4138`, psw: `396966` },
    },
    {
        ymd: "2021-04-22",
        start: "1600",
        title: "Exact categories via $A_\\infty$-algebras",
        speaker: "Julian Külshammer‬",
        affil: "Uppsala University",
        web: "https://katalog.uu.se/profile/?id=N18-1115",
        abstract: `Many instances of extension closed subcategories appear throughout representation theory, e.g. 
        filtered modules, Gorenstein projectives, as well as modules of finite projective dimension. 
        In the first part of the talk, I will outline a general strategy to realise such subcategories as categories 
        of induced modules from a subalgebra using $A_\\infty$-algebras. In the second part, I will describe 
        how this strategy has been successfully applied for the exact category of filtered modules over a 
        quasihereditary algebra. In particular I will present compatibility results of this approach with heredity 
        ideals in a quasihereditary algebra from joint work with Teresa Conde.`,
        lang: "en",
        access: { id: `852 0087 3196`, psw: `828611` },
    },
    {
        ymd: "2021-04-08",
        start: "1600",
        title: "Abelian envelopes of monoidal categories",
        speaker: "Kevin Coulembier",
        affil: "University of Sydney",
        web: "https://www.maths.usyd.edu.au/u/kevinc/",
        abstract: `For the purposes of this talk, a ‘tensor category’ is an abelian rigid monoidal category, linear over some field. I will try to argue that there are good reasons (inspired by classification attempts of tensor categories, by motives, by Frobenius twists on tensor categories and by the idea of universal tensor categories), to try to associate tensor categories to non-abelian rigid monoidal categories. Then I will comment on some of the recent progress made on such constructions (in work of Benson, Comes, Entova, Etingof, Heidersdof, Hinich, Ostrik, Serganova and myself).`,
        lang: "en",
        access: { id: `874 1154 7147`, psw: `405113` },
        record: {
            slides: `TNA/2021/Coulembier-Abelian_envelopes_of_monoidal_categories.pdf`,
        },
    },
    {
        ymd: "2021-03-11",
        start: "1600",
        title: "相対不変式で生成されるゴレンスタイン環のレフシェッツ性",
        speaker: "Akihito Wachi 和地 輝仁",
        affil: "Hokkaido University of Education",
        abstract: `<p>可換環論にアルチン次数環のレフシェッツ性の問題がある。これは、コホモロ
        ジー環が満たす性質を抽出した性質である。表現論的に興味のある環、例えば、
        複素鏡映群の余不変式環のほぼすべてがレフシェッツ性を持つことが証明され
        ていたり、Schur-Weyl双対性に関わる環がレフシェッツ性を持つことも知られ
        ている。</p>
        
        <p>他方、斉次多項式 F が与えられたとき、別の多項式を微分作用素と見て F に
        作用させることを考え、Fを消す多項式全体のなすイデアルによる剰余環を作る
        と、アルチンゴレンスタイン次数環が得られる。そこで、多項式 F が与えられ
        たとき、こうして作られる環がレフシェッツ性を持つかどうかという問題が考
        えられる。</p>
        
        <p>
        例えば、F が単項式や差積などの場合はレフシェッツ性が証明されているが、
        レフシェッツ性を持つための F の条件は一般には何も知られていない。この講
        演では、F が行列式、対称行列の行列式、パフィアン等の場合にレフシェッツ
        性が証明されることを紹介する。</p>
        
        <p>
        これらのレフシェッツ性は概均質ベクトル空間の正則性との関係があり、また、
        証明に一般Verma加群を用いるなど、可換環論の問題ではあるが表現論が活用
        できることを中心に話したい。</p>
        
        <p>
        この講演は、京都大学の長岡高広氏との共同研究に基づく。
        </p>`,
        lang: "jp",
        access: { id: `993 9220 6758`, psw: `781248` },
        record: {
            slides: `TNA/2021/Wachi-Lefschetz_properties_of_Gorenstein_rings_generated_by_relative_invariants.pdf`,
        },
    },
    {
        ymd: "2021-02-24",
        start: "1600",
        title: "周期三角圏上の傾理論",
        speaker: "Shunya Saito 齋藤 峻也",
        affil: "Nagoya University",
        abstract: `周期三角圏とは、シフト関手のある累乗が恒等関手になる三角圏であり、Cohen-Macaulay表現論や自己移入多元環の表現論で自然に姿を現す。このような三角圏は周期性から傾対象を決して持たず、特に代数上の導来圏と三角同値にならないことが知られている。本講演では、傾理論の周期三角圏における類似である周期傾理論について紹介する。まず、導来圏の周期類似である周期導来圏について説明し、周期傾対象を持つ三角圏は周期導来圏と三角同値になるという周期傾定理を紹介する。最後に、DG代数を用いた証明手法について触れる。`,
        lang: "jp",
        access: { id: `939 3406 9215`, psw: `346554` },
        record: {
            slides: `TNA/2021/Saito_S-Tilting_theory_on_periodic_triangulatged_categories.pdf`,
        },
    },
    {
        ymd: "2021-02-10",
        start: "1600",
        title: "Gentle代数の2重次数付きCalabi-Yau完備化と曲面の幾何学",
        speaker: "Akishi Ikeda 池田 曉志",
        affil: "Josai University",
        abstract: `<p>Gentle代数は多元環の表現論において非常に重要な研究対象であるが, 近年, Haiden-Katzarkov-Kontsevich(HKK)は次数付きgentle代数の導来圏に対し, 曲面の(位相的)深谷圏との導来同値を与えた. この対応においては, 直既約加群と曲面上のあるクラスの弧の対応が与えられている.
        一方, (punctureの無い)曲面の三角形分割から現れるquiver with potentialのGinzburg Calabi-Yau(CY)-3代数の導来圏に対し, Qiuは(到達可能な)球面対象と曲面のあるクラスの弧の対応を与えた. このCY-3代数のJacobi代数はあるクラスのgentle代数になるので, Qiuによる結果は, HKKによる結果の一部をCY-完備化にリフトしたように見ることもできる.</p>
        
        <p>この背景に基づき, この講演ではまず最初に次数付きgentle代数に付随した2重次数付きquiver with potential構成法を曲面の深谷圏から来る幾何学的アイディアに沿って説明し, そのGinzburg CY代数を用いて一般的なgentle代数のCY-X完備化の構成について説明をする. (Xは2重次数の中のコホモロジー的次数とは独立な方向の次数.)
        次に, このようにして得られたCY-X代数の導来圏の(到達可能)球面対象が, ある曲面の無限巡回被覆として得られる被覆空間の中の弧と対応するという, QiuのCY-3の場合の結果の一般化, あるいはHKKの結果のCY完備化へのリフトに相当する結果について説明をする. 時間があれば, Xを整数Nに特殊化することで曲面のN角形分割に付随したquiver with potentialの構成になっていることについても説明をしたいと考えている.
        この結果は, Yu Qiu氏, Yu Zhou氏との共同研究に基づく.</p>`,
        lang: "jp",
        access: { id: `976 1527 7438`, psw: `800490` },
        record: {
            slides: `TNA/2021/Ikeda-CY_completion_of_gentel_algebras_and_surface_geometry.pdf`,
        },
    },
    {
        ymd: "2021-01-21",
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
        access: { id: `948 5610 9443`, psw: `800703` },
        record: {
            slides: `TNA/2021/Watanabe-Based_module_over_quantum_groups_of_type_AI.pdf`,
        },
    },
    {
        ymd: "2021-01-14",
        start: "1600",
        title: `$(-2)$ blow-up formula`,
        speaker: "Ryo Ohkawa 大川 領",
        web: "http://www.math.kobe-u.ac.jp/home-j/ohkawa.html",
        affil: "Kobe University",
        abstract: `この講演では$A_1$特異点から定まるネクラソフ分配関数について
        紹介する. これは特異点解消上の枠付き連接層のモジュライにおける
        積分を係数とする母関数である.
        特異点解消として二つ, 極小解消とスタック的な解消, つまり,
        射影平面を位数$2$の巡回群で割った商スタックを考える.
        これら二つの特異点解消から定まるネクラソフ分配関数の
        関数等式について紹介する.
        ひとつは, 伊藤-丸吉-奥田が予想した関数等式であり,
        もうひとつを$(-2)$ blow-up formulaとして提案したい.
        証明については細部を省略し, 望月拓郎氏による壁越え公式について基本的な例を使って紹介する。`,
        lang: "jp",
        access: { id: `954 7015 9407`, psw: `487212` },
        record: { slides: `TNA/2021/Ohkawa-minus2_blowup-formula.pdf` },
    },
    {
        ymd: "2020-12-17",
        start: "1600",
        title: "The finite EI categories of Cartan type",
        speaker: "Xiao-Wu Chen 陈 小伍",
        web: "http://home.ustc.edu.cn/~xwchen/",
        affil: "University of Science and Technology of China",
        abstract: `We will recall the notion of a finite free EI category introduced by Li. To each Cartan triple, we associate a finite free EI category, called the finite EI category of Cartan type. The corresponding category algebra is isomorphic to the 1-Gorenstein algebra, introduced by Geiss-Leclerc-Schroer, which is associated to possibly another Cartan triple. The construction of the second Cartan triple is related to the well-known unfolding of valued graphs. We will apply the obtained algebra isomorphism to re-interpret some tau-locally free modules as induced modules over a certain skew group algebra. This project is joint with Ren Wang.`,
        lang: "en",
        access: { id: `921 0388 8808`, psw: `563837` },
        record: {
            slides: `TNA/2020/XWChen-The_Finite_EI_Categories_of_Cartan_Type.pdf`,
        },
    },
    {
        ymd: "2020-12-10",
        start: "1630",
        title:
            "Subcategories of module/derived categories and subsets of Zariski spectra",
        speaker: "Hiroki Matsui 松井 紘樹",
        web: "https://www.ms.u-tokyo.ac.jp/~mhiroki/",
        affil: "Uuniversity of Tokyo",
        abstract:
            "The classification problem of subcategories has been well considered in many areas. This problem was initiated by Gabriel in 1962 by giving a classification of localizing subcategories of the module category Mod R via specialization-closed subsets of the Zariski spectrum Spec R for a commutative noetherian ring. After that several authors tried to generalize this result in many ways. For example, four decades later, Krause introduced the notion of coherent subsets of Spec R and used it to classify wide subcategories of Mod R. In this talk, I will introduce the notions of n-wide subcategories of Mod R and n-coherent subsets of Spec R for a (possibly infinite) non-negative integer n. I will also introduce the notion of n-uniform subcategories of the derived category D(Mod R) and prove the correspondences among these classes. This result unifies/generalizes many known results such as the classification given by Gabriel, Krause, Neeman, Takahashi, Angeleri Hugel-Marks-Stovicek-Takahashi-Vitoria. This talk is based on joint work with Ryo Takahashi.",
        lang: "jp",
        access: { id: `964 9976 5624`, psw: "195094" },
        record: {
            slides: `TNA/2020/Matsui-Subcategories_of_DModA_and_subsets_of_Zariski_spectra.pdf`,
        },
    },
    {
        ymd: "2020-12-03",
        start: "1600",
        title:
            "Full strong exceptional collections for invertible polynomials of chain type",
        speaker: "Yuki Hirano 平野 雄貴",
        affil: "Kyoto University",
        abstract:
            "Constructing a tilting object in the stable category of graded maximal Cohen-Macaulay modules over a given graded Gorenstein ring is an important problem in the representation theory of graded Gorenstein rings. For a hypersurface S/f in a graded regular ring S, this problem is equivalent to constructing a tilting object in the homotopy category of graded matrix factorizations of f. In this talk, we discuss this problem in the case when S is a polynomial ring, f is an invertible polynomial of chain type and S has a rank one abelian group grading (called the maximal grading of f), and in this case we show the existence of a tilting object arising from a full strong exceptional collection. This is a joint work with Genki Ouchi.",
        lang: "jp",
        access: { id: "959 &nbsp;0189 &nbsp;8837", psw: "541801" },
        record: {
            slides: `TNA/2020/Hirano-Full_strong_exceptional_collections_for_invertible_polynomials_of_chain_type.pdf`,
        },
    },
    {
        ymd: "2020-11-12",
        start: "1600",
        title: "ICE-closed subcategories and wide tau-tilting modules",
        speaker: "Arashi Sakai 酒井 嵐士",
        affil: "Nagoya University",
        abstract:
            "多元環の表現論では、多元環上の加群のなす圏の部分圏が調べられてきた。例えば、torsion class やwide部分圏などがある。今回の講演ではこれら2つの共通の一般化であるアーベル圏のICE-closed 部分圏を紹介する。そしてICE-closed部分圏はwide 部分圏のtorsion classであることを見る。またsupport tau-tilting 加群の一般化であるwide tau-tilting 加群を導入し、ICE-closed 部分圏がwide tau-tilting 加群と対応することを見る。本公演の内容は榎本悠久氏との共同研究に基づいている。",
        lang: "jp",
        access: { id: "977 &nbsp;4841 &nbsp;4223", psw: "154055" },
        record: {
            slides: `TNA/2020/Sakai-ICE-closed_subcats_and_wide_tau-tilting.pdf`,
        },
    },
    {
        ymd: "2020-10-27",
        start: "1630",
        title: "Positive cluster complex and tau-tilting complex",
        speaker: "Yasuaki Gyoda 行田 康晃",
        web: "https://yasuaki-gyoda.sakura.ne.jp/wp/",
        affil: "Nagoya University",
        abstract:
            "In cluster algebra theory, cluster complexes are actively studied as simplicial complexes, which represent the structure of a seed and its mutations. In this talk, I will discuss a certain subcomplex, called positive cluster complex, of a cluster complex. This is a subcomplex whose vertex set consists of all cluster variables except for those in the initial seed. I will also introduce another simplicial complex in this talk - the tau-tilting complex, which has vertices given by all indecomposable tau-rigid modules, and simplices given by basic tau-rigid modules. In the case of a cluster-tilted algebra, it turns out that a tau-tilting complex corresponds to some positive cluster complex. Due to this fact, we can investigate the structure of a tau-tilting complex of tau-tilting finite type by using the tools of cluster algebra theory. This is joint work with Haruhisa Enomoto.",
        lang: "jp",
        access: { id: "959 &nbsp;5475 &nbsp;2309", psw: "803431" },
        record: { slides: "contact" },
    },
];

let talkList = "",
    pastList = "";

let docTalkList = document.getElementById("talkList");
let docPastList = document.getElementById("pastList");

for (talk of talks) {
    let str = "";
    let inSchedule = true;
    if (talk.ymd != "TBC") {
        // check date and determine output
        let d = new Date();
        let talkdate = new Date(talk.ymd);
        let dayString = `(${
            [
                "Sun 日",
                "Mon 月",
                "Tue 火",
                "Wed 水",
                "Thu 木",
                "Fri 金",
                "Sat 土",
            ][talkdate.getDay()]
        })`;
        let timeString = `Time: TBC`;

        if ("start" in talk) {
            // work out time string
            let hh = parseInt(talk.start.slice(0, 2)),
                mm = parseInt(talk.start.slice(-2));
            let duration = "duration" in talk ? +duration : 90;
            let endTime = hh * 60 + mm + duration;
            timeString = `${hh}:${("0" + mm).slice(-2)} - ${Math.floor(
                endTime / 60
            )}:${("0" + (endTime % 60)).slice(-2)} Japan time`;
            // compare now and talk's end time
            talkdate.setHours(
                parseInt(timeString.slice(8, 12)),
                parseInt(timeString.slice(11, 13))
            );
        }
        inSchedule = d.valueOf() <= talkdate.valueOf();
        str += `<fieldset> <legend>${talk.ymd} ${dayString}<br/>${timeString}</legend>`;
    } else {
        str += `<fieldset> <legend>TBC</legend>`;
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
                    : `<a href="${talk.record.slides}">Slides here</a>. `;
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
