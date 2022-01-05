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

let talks = [
    {
        ymd: "TBC",
        //start: "1030",
        title: `TBC II`,
        speaker: "Shigeo Koshitani 越谷 重夫",
        affil: "Chiba University 千葉大学",
        web: "http://www.math.s.chiba-u.ac.jp/~koshitan/index.html",
        abstract: `Continuation of <a href="#Koshitani202202"> part I</a>`,
        lang: "jp",
        access: {
            id: `TBC`,
            psw: `TBC`,
        },
        // record: {
        //     slides: `TNA/2021/Kozakai-tau-tilting_on_blocks_of_finite_groups.pdf`,
        // },
    },
    {
        ymd: "TBC",
        id: "Koshitani202202",
        //start: "1030",
        title: `TBC`,
        speaker: "Shigeo Koshitani 越谷 重夫",
        affil: "Chiba University 千葉大学",
        web: "http://www.math.s.chiba-u.ac.jp/~koshitan/index.html",
        abstract: `TBC`,
        lang: "jp",
        access: {
            id: `TBC`,
            psw: `TBC`,
        },
        // record: {
        //     slides: `TNA/2021/Kozakai-tau-tilting_on_blocks_of_finite_groups.pdf`,
        // },
    },
    {
        ymd: "2022-01-21",
        start: "1645",
        title: `Exact-categorical properties of subcategories of abelian categories II`,
        speaker: "Haruhisa Enomoto 榎本 悠久",
        affil: "Osaka Prefecture University 大阪府立大学",
        web: "https://haruhisa-enomoto.github.io/",
        abstract: `Continuation of <a href="#Enomoto202201">part I</a>`,
        lang: "jp",
        access: {
            id: `TBC`,
            psw: `TBC`,
        },
        // record: {
        //     slides: `TNA/2021/Kozakai-tau-tilting_on_blocks_of_finite_groups.pdf`,
        // },
    },
    {
        ymd: "2022-01-18",
        id: "Enomoto202201",
        start: "1500",
        title: `Exact-categorical properties of subcategories of abelian categories I`,
        speaker: "Haruhisa Enomoto 榎本 悠久",
        affil: "Osaka Prefecture University 大阪府立大学",
        web: "https://haruhisa-enomoto.github.io/",
        abstract: `Quillen's exact category is a powerful framework for studying
        extension-closed subcategories of abelian categories, and provides
        many interesting questions on such subcategories.
        In the first talk, I will explain the basics of some properties and
        invariants of exact categories (e.g. the Jordan-Holder property,
        simple objects, and Grothendieck monoid).
        In the second talk, I will give some results and questions about
        particular classes of exact categories arising in the representation
        theory of algebras (e.g. torsion(-free) classes over path algebras and
        preprojective algebras).
        If time permits, I will discuss questions of whether these results can
        be generalized to extriangulated categories (extension-closed
        subcategories of triangulated categories). `,
        lang: "jp",
        access: {
            id: `TBC`,
            psw: `TBC`,
        },
        // record: {
        //     slides: `TNA/2021/Kozakai-tau-tilting_on_blocks_of_finite_groups.pdf`,
        // },
    },
    {
        ymd: "2021-12-16",
        start: "1645",
        title: `Cyclic polytopes and higher Auslander-Reiten theory`,
        speaker: "Nicholas Williams",
        affil: "University of Cologne",
        //web: "",
        abstract: `<p>Oppermann and Thomas show that tilting modules over Iyama’s higher
        Auslander algebras of type A are in bijection with triangulations of
        even-dimensional cyclic polytopes. Triangulations of cyclic polytopes
        are partially ordered in two natural ways known as the higher
        Stasheff-Tamari orders, which were introduced in the 1990s by
        Kapranov, Voevodsky, Edelman, and Reiner as higher-dimensional
        generalisations of the Tamari lattice. These two partial orders were
        conjectured to be equal in 1996 by Edelman and Reiner, and we prove
        that this conjecture is true. </p>
        <p>
        We further show how the higher
        Stasheff-Tamari orders correspond in even dimensions to natural orders
        on tilting modules which were studied by Riedtmann, Schofield, Happel,
        and Unger. This then allows us to complete the picture of Oppermann
        and Thomas by showing that triangulations of odd-dimensional cyclic
        polytopes correspond to equivalence classes of d-maximal green
        sequences, which we introduce as higher-dimensional analogues of
        Keller’s maximal green sequences. We show that the higher
        Stasheff-Tamari orders correspond to natural orders on equivalence
        classes of d-maximal green sequences, which relate to the no-gap
        conjecture of Brustle, Dupont, and Perotin. The equality of the higher
        Stasheff-Tamari orders then implies that these algebraic orders on
        tilting modules and d-maximal green sequences are equal. If time
        permits, we will also discuss some results on mutation of
        cluster-tilting objects and triangulations.</p>
        
        `,
        lang: "en",
        access: {
            id: `819 1787 0607`,
            psw: `844177
        `,
        },
        record: {
            slides: `TNA/2021/Williams-Cyclic_polytopes_and_higher_AR.pdf`,
        },
    },
    {
        ymd: "2021-11-19",
        start: "1700",
        title: `有限群のブロック上の$\\tau$-傾理論`,
        speaker: "Yuta Kozakai 小境 雄太",
        affil: "Tokyo Science University 東京理科大学",
        //web: "",
        abstract: `Adachi-Iyama-Reiten(2014)により導入された台$\\tau$-傾加群は, 2項準傾複体や半煉瓦, 2項単純系といった,
        さまざまな表現論的に重要な対象と1対1で対応する。そのため, 近年では, 与えられた有限次元多元環に対して,
        それらの上での台$\\tau$-傾加群や, それらに対応する対象たちの研究が盛んに行われている。本講演では,
        $k$を標数$p>0$の代数的閉体とし, 有限群$\\tilde{G}$と, $\\tilde{G}$の正規部分群$G$,
        群環$kG$のブロック$B$, $B$を被覆する$k\\tilde{G}$のブロック$\\tilde{B}$に対して,
        より複雑な構造をもつ$\\tilde{B}$上の台$\\tau$-傾加群や2項準傾複体, 半煉瓦, 2項単純系が, $B$上のそれらから,
        有限群の表現論的な道具を用いて得られることを説明する。さらに, 剰余群$\\tilde{G}/G$が$p$-群のときには,
        $B$上の台$\\tau$-傾加群全体の集合は, $\\tilde{B}$上のそれと, 半順序集合として同型となることも説明する。
        本講演は、東京理科大学の小塩遼太郎氏との共同研究に基づく。
        `,
        lang: "jp",
        access: { id: `867 0063 1666`, psw: `088526` },
        record: {
            slides: `TNA/2021/Kozakai-tau-tilting_on_blocks_of_finite_groups.pdf`,
        },
    },
    {
        ymd: "2021-07-08",
        start: "1600",
        title: `Sign-stable mutation loops and pseudo-Anosov mapping classes`,
        speaker: "Tsukasa Ishibashi 石橋 典",
        affil: "RIMS, Kyoto University",
        web: "https://sites.google.com/view/tsukasa-ishibashi/home",
        abstract: `箙の変異ループは対応するクラスター代数およびクラスター多様体上の自己同型を誘導し、特にこれを繰り返し作用させることで離散力学系が定まる. 石橋-狩野 (Geom. Dedicata, 2021) では曲面上の写像類の擬Anosov性の類似として変異ループの符号安定性と呼ばれる一連の性質を導入し, 符号安定性のもとでクラスター多様体への作用の代数的エントロピーの計算などの応用を得た. 本講演では点付き曲面上の写像類から定まる変異ループについて, 擬Anosov性と種々の符号安定性との比較を行う. 本講演の内容は東北大学の狩野隼輔氏との共同研究に基づく.`,
        lang: "jp",
        access: { id: `811 2430 2065`, psw: `144718` },
        record: {
            slides: `TNA/2021/Ishibashi-Sign-stable_mutation_loops.pdf`,
        },
    },
    {
        ymd: "2021-06-24",
        start: "1600",
        title: `Rank 2 free subgroups in autoequivalence groups of Calabi-Yau categories`,
        speaker: "Kohei Kikuta 菊田 康平",
        affil: "Chuo University",
        abstract: `Via homological mirror symmetry, there is a relation between
        autoequivalence groups of derived categories of coherent sheaves on
        Calabi-Yau varieties, and the symplectic mapping class groups of
        symplectic manifolds.
        In this talk, as an analogue of mapping class groups of closed oriented
        surfaces, we study autoequivalence groups of Calabi-Yau triangulated
        categories. In particular, we consider embeddings of rank 2 (non-
        commutative) free groups generated by spherical twists. It is
        interesting that the proof of main results is almost similar to that of
        corresponding results in the theory of mapping class groups.
        `,
        lang: "jp",
        access: { id: `831 2206 2999`, psw: `134705` },
        record: {
            slides: `TNA/2021/Kikuta-Rank2_free_subgroups_of_autoquivalences_of_CY_categories.pdf`,
        },
    },
    {
        ymd: "2021-06-02",
        start: "1600",
        title: `An equivariant Hochster's formula for $S_n$-invariant monomial ideals`,
        speaker: "Satoshi Murai 村井 聡",
        affil: "Waseda University",
        web: "http://www.f.waseda.jp/s-murai/",
        abstract: ` <p>組合せ可換環論の分野では、多項式環の単項式イデアルや二項式イデアルの代
        数的な情報と凸多面体や単体的複体の組合せ論的な情報の関連がよく研究され
        る。イデアルの自由分解に関するHochsterの公式は、(squarefreeな)単項式イデ
        アルの自由分解のベッチ数と単体的複体のホモロジーとの関係を与える公式で、
        組合せ可換代数の分野における基本的な結果の一つである。本講演では、$n$変
        数多項式環$S=K[x_1,\\dots,x_n]$の単項式イデアル$I$が$n$次対称群の作用で固
        定されるときは、ベッチ数$\\beta_{ij}(I)=\\dim_K \\mathrm{Tor}_i(I,K)_j$のみ
        ならず、$\\mathrm{Tor}_i(I,K)_j$の表現の情報まで単体的複体のホモロジーを
        用いて計算できることを紹介する。 </p>
        <p>対称群の作用で固定される単項式イデアルの性質を調べた今回の研究結果は、
        無限変数多項式環上のイデアルで無限対称群の作用で固定されるイデアルにある
        種の有限生成性があること(Noetherianity up to symmetry)に関連する研究を動
        機としている。講演の前半ではこの問題の背景について簡単に話をし、後半に今
        回の結果とその応用について紹介したい。</p>
        <p>本研究はClaudiu Raicuとの共同研究である。</p>`,
        lang: "jp",
        access: { id: `884 2553 5348`, psw: `940363` },
    },
    {
        ymd: "2021-05-20",
        start: "1600",
        title: "Flat cotorsion modules over Noether algebras",
        speaker: "Ryo Kanda 神田 遼",
        affil: "Osaka City University",
        web: "https://ryokanda.net/",
        abstract: `This talk is based on joint work with Tsutomu Nakamura. For a module-finite algebra over a commutative noetherian ring, we give a
        complete description of flat cotorsion modules in terms of prime
        ideals of the algebra, as a generalization of Enochs' result for a
        commutative noetherian ring. As a consequence, we show that pointwise
        Matlis duality gives a bijective correspondence between the isoclasses
        of indecomposable flat cotorsion right modules and the isoclasses of
        indecomposable injective left modules. This correspondence is an
        explicit realization of Herzog's homeomorphism induced from elementary
        duality between Ziegler spectra.`,
        lang: "jp",
        access: { id: `853 5806 4498`, psw: `124345` },
        record: {
            slides: `TNA/2021/Kanda-Flat_cotorsion_modules_over_Noether_algebras.pdf`,
        },
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
        record: { slides: `TNA/2021/Shaul-Derived_quotients_of_CM_rings.pdf` },
    },
    {
        ymd: "2021-04-22",
        start: "1600",
        title: "Exact categories via $A_\\infty$-algebras",
        speaker: "Julian Külshammer",
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
        title: "Subcategories of module/derived categories and subsets of Zariski spectra",
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
        title: "Full strong exceptional collections for invertible polynomials of chain type",
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
    if (talk.ymd != "TBC") {
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
