const talkOrder = [
    "zwara",
    "mizuno",
    "kimura",
    "tomonaga",
    "ishii",
    "barcelonieves",
    "fushimi",
    "hirano",
    "hiramae",
    "hanihara",
    "capellan",
    "fan",
    "mousavand",
    "murakami",
    "yahiro",
    "chalupnik",
    "saito",
    "mochizuki",
    "yoshino",
];
const lectureSeries = [
    {
        author: "Grzgeorz Zwara",
        id: "zwara",
        affiliate: "Nicolaus Copernicus",
        title: `Singularities of orbit closures in module varieties`,
        abstract: ``,
        category: "lecture",
        timeIndex: 0,
    },
    {
        author: "Yuya Mizuno 水野 有哉",
        id: "mizuno",
        affiliate: "Osaka Metropolitan 大阪公立大学",
        title: `Silting theory and related topics`,
        abstract: ``,
        category: "lecture",
        timeIndex: 1,
    },
    {
        author: "Harm Derksen",
        id: "derksen",
        affiliate: "Northeastern",
        title: `Representation Theory of Algebras and Invariant Theory`,
        abstract: ``,
        category: "lecture",
        timeIndex: 2,
    },
];

const invitedTalks = [
    {
        author: "Akira Ishii 石井 亮",
        id: "ishii",
        affiliate: "Nagoya 名古屋大学",
        title: `On the McKay correspondence for some reflection groups in dimension three`,
        abstract: ``,
        category: "invited",
        timeIndex: 0,
    },
    {
        author: "Yuki Hirano 平野 雄貴",
        id: "hirano",
        affiliate: "Tokyo U. of Agriculture and Technology 東京農工大学",
        title: `Length of triangulated categories`,
        abstract: ``,
        category: "invited",
        timeIndex: 1,
    },
    {
        author: "Norihiro Hanihara 埴原 紀宏",
        id: "hanihara",
        affiliate: "Kyushu 九州大学",
        title: `Tilting ideals and Calabi-Yau structures`,
        abstract: ``,
        category: "invited",
        timeIndex: 2,
    },
    {
        author: "Naoya Hiramae 平前 直也",
        id: "hiramae",
        affiliate: "Kyoto 京都大学",
        title: `Silting-discreteness of group algebras`,
        abstract: ``,
        category: "invited",
        timeIndex: 3,
    },
    {
        author: "Kaveh Mousavand",
        id: "mousavand",
        affiliate: "OIST 沖縄科学技術大学院大学",
        title: `Hom-orthogonal modules and brick-Brauer-Thrall conjectures`,
        abstract: `We investigate the set of pairwise Hom-orthogonal modules in the context of several open conjectures
                    that have emerged in recent years, to which we refer as the brick-Brauer-Thrall (bBT) Conjectures.
                    The bBT conjectures are closely connected to the study of bricks, and therefore to wide
                    subcategories, torsion pairs, $\tau$-tilting theory, stability conditions, g-fan, and related
                    subjects. In this talk, we first adopt a geometric perspective to see the significance of
                    Hom-orthogonality in the context of a conjecture that I posed in 2019, now known as the Second
                    Brick-Brauer-Thrall (2nd bBT) Conjecture. Then, we show that some of the more recent bBT conjectures
                    actually follow from the 2nd bBT conjecture. This provides new insights into these challenging open
                    problems. As a result, we are able to verify the validity of the bBT conjectures for some new
                    families of algebras.
                    This talk is primarily based on a recent joint work (arXiv:2407.20877) with Charles Paquette.`,
        category: "invited",
        timeIndex: 4,
    },
    {
        author: "Kota Murakami 村上 浩大",
        id: "murakami",
        affiliate: "Tokyo 東京大学",
        title: `On graded preprojective algebras and certain cluster combinatorics`,
        abstract: ``,
        category: "invited",
        timeIndex: 5,
    },
    {
        author: "Yuji Yoshino 吉野 雄二",
        id: "yoshino",
        affiliate: "Okayama 岡山大学",
        title: `Introduction to deformation and degeneration of modules`,
        abstract: `In this lecture, I will outline an introductory theory of deformation and degeneration of modules
                    over rings. If time permits, I will also mention their generalization to
                    differential graded modules.`,
        category: "invited",
        timeIndex: 6,
    },
];

const contribtuedTalks = [
    {
        author: "Yuta Kimura 木村 雄太",
        id: "kimura",
        affiliate: "Hiroshima Institute of Technology 広島工業大学",
        title: "Tilting for Artin-Schelter Gorenstein algebras of dimension one",
        abstract: `The existence of tilting or silting objects is a significant feature in algebraic triangulated categories, as it establishes an equivalence with the derived category of a ring. In this study, we focus on the existence of tilting objects in the stable category of Cohen-Macaulay modules over Artin-Schelter Gorenstein algebras. These algebras extend the concept of Gorenstein commutative characterization of the existence of tilting objects in stable categories using Gorenstein parameters. Our result is a noncommutative generalization of results established by Buchweitz, Iyama, and Yamaura.`,
        category: "contributed",
        timeIndex: 0,
    },
    {
        author: "Ryo Tomonaga 朝永 龍",
        id: "tomonaga",
        affiliate: "Tokyo 東京大学",
        title: "Cohen-Macaulay representations of invariant subrings admitting field extensions",
        abstract: `The two-dimensional quotient singularities provide examples of rings of finite Cohen-Macaulay type.
                    Furthermore, the Auslander-Reiten quivers of the categories of Cohen-Macaulay modules coincide with
                    the McKay quivers (algebraic McKay correspondence). Conversely, two-dimensional Cohen-Macaulay local
                    rings of finite Cohen-Macaulay type are precisely quotient singularities if their residue fields are
                    algebraically closed and of characteristic zero. In this talk, we generalize the above classical
                    results to situations where the coefficient fields are not necessarily algebraically closed by
                    introducing quotient singularities admitting field extensions. Moreover, we will see how to draw the
                    McKay quivers in this new setting through determining irreducible representations of skew group
                    algebras.`,
        category: "contributed",
        timeIndex: 1,
    },
    {
        author: "Diego Alberto Barceló Nieves",
        id: "barcelonieves",
        affiliate: "Verona",
        title: `On (Co)silting Bijections Involving the Category of Large Projective Presentations`,
        abstract:
            "" /*`Based on results by Adachi-Iyama-Reiten, Marks-Šťovíček, Pauksztello-Zvonareva and Adachi-Tsukamoto,
                    García successfully completed a commutative 'triangular prism' of bijections connecting the classes
                    of support tau-tilting modules, functorially-finite torsion pairs and left finite wide subcategories
                    in the category of finitely-generated A-modules—where A is a finite-dimensional algebra over an
                    algebraically closed field—to the classes of 'silting objects', complete cotorsion pairs and thick
                    subcategories with enough injectives in the category of projective presentations of objects in
                    mod(A)—which has many powerful properties. In this talk, we will present advances towards
                    generalizing these results to the realm of infinite-dimensional modules over more general classes of
                    rings—and, furthermore, dualizing them to the cosilting side. It is based on joint work in progress
                    with Lidia Angeleri Hügel.`,*/,
        category: "contributed",
        timeIndex: 2,
    },
    {
        author: "Riku Fushimi 伏見 陸",
        id: "fushimi",
        affiliate: "Nagoya 名古屋大学",
        title: `Non-positive dg algebras and positive dg algebras`,
        abstract:
            "" /*`本公演では silting objects と simple-minded collections の間の双対関係を対応する dg 代数の間の Koszul 双対性の理論へと持ち上げる。`,*/,
        category: "contributed",
        timeIndex: 3,
    },
    {
        author: "John Ashley Capellan",
        id: "capellan",
        affiliate: "Nagoya 名古屋大学",
        title: `The McKay correspondence for dihedral groups: The moduli space and the
                        tautological bundles`,
        abstract: `A conjecture by Ishii states that for a finite subgroup $G$ of $GL(2,\\mathbb{C})$, a resolution $Y$
                    of $\\mathbb{C}^2/G$
                    is isomorphic to a
                    moduli space $\\mathcal{M}_{\\theta}$ of $G$-constellations for some
                    generic stability parameter $\\theta$ if and only if $Y$ is dominated by
                    the maximal resolution. This paper affirms the conjecture in the case of
                    dihedral groups as a class of complex reflection groups, and offers an
                    extension of McKay correspondence.`,
        category: "contributed",
        timeIndex: 4,
    },
    {
        author: "Linghu Fan 范 凌虎",
        id: "fan",
        affiliate: "Tokyo 東京大学",
        title: `McKay correspondence in positive characteristic for specific modular groups`,
        abstract: `Over complex numbers, McKay correspondence can be described as a re-
                    lation between irreducible representations of finite groups and geometric properties of
                    the associated quotient singularities, such as Euler characteristic of crepant resolutions.
                    This relation is known as Batyrev's theorem. When the ground field is replaced by an
                    algebraically closed field of prime characteristic, the naive analog of Batyrev's theorem
                    fails for modular groups in general. In this talk, after giving a necessary introduction of
                    background, I will introduce a series of specific modular groups for which the analogous
                    McKay correspondence in positive characteristic holds, and discuss about a potential way
                    to adjust the analog as a conjecture, such that it may hold for more modular groups.`,
        category: "contributed",
        timeIndex: 5,
    },
    {
        author: "Kohei Yahiro 八尋 耕平",
        id: "yahiro",
        affiliate: "Kyoto 京都大学",
        title: `Crystal structures on 2-parameter persistence modules`,
        abstract: `Persistence modules are representations of a certain quiver with relation used for topological data
                    analysis. We show that the set of irreducible components of moduli space of 2D persistence module
                    has a structure of a Kashiwara crystal. In the $2 \\times 2$ case, we give an explicit description
                    of
                    the crystal structure.`,
        category: "contributed",
        timeIndex: 6,
    },
    {
        author: "Marcin Chałupnik",
        id: "chalupnik",
        affiliate: "Warsaw",
        title: `Tilting in functor categories`,
        abstract: `I will survey how the idea of tilting can be used in various functor categories including the
                    category of strict polynomial functors $P_d$, which is closely related to the category of
                    representations of $GL_n$. More specifically I will discuss such topics as Koszul duality, de Rham
                    complex and certain form of the Hilbert-Riemann correspondence, which can be studied in $P_d$.`,
        category: "contributed",
        timeIndex: 7,
    },
    {
        author: "Shunya Saito 齋藤 峻也",
        id: "saito",
        affiliate: "Tokyo 東京大学",
        title: `Classifying KE-closed subcategories over a noetherian commutative ring`,
        abstract:
            "" /*`Classifying subcategories is an active subject in the representation theory of algebras. Especially,
                    several subcategories of the module category of a commutative noetherian ring have been classified
                    so far. In this talk, we will give a classification result of KE-closed subcategories (additive
                    subcategories closed under extensions and kernels) for a commutative noetherian ring.`,*/,
        category: "contributed",
        timeIndex: 8,
    },
    {
        author: "Nao Mochizuki 望月 直央",
        id: "mochizuki",
        affiliate: "Nagoya 名古屋大学",
        title: `High-dimensional generalization of abelian categories via DG categories`,
        abstract:
            "" /*`In this lecture, we introduce a higher-dimensional analogue of abelian categories in DG categories as
                    an axiomatization of subcategories called n-extended hearts of t-structures in triangulated
                    categories, and provide an overview of the fundamental theory.`,*/,
        category: "contributed",
        timeIndex: 8,
    },
];

const groupedTalks = [
    { heading: "Lecture series 連続講演", talks: lectureSeries },
    { heading: "Invited lectures 招待講演", talks: invitedTalks },
    { heading: "Contributed talks 一般講演", talks: contribtuedTalks },
];

/**
 * simple JSON containing talk data
 * @typedef {Object} TalkData
 * @property {string} author
 * @property {string} affiliate
 * @property {string} title
 * @property {string} abstract
 * @property {string} category - lecture, invited, contributed
 * @property {number} timeIndex - chronological order in each category
 */

/**
 * @param  {TalkData} talkData
 * @return {HTMLElement} a details tag containing everything
 */
function talkDetails(talkData) {
    const details = document.createElement("details");
    details.classList.add("talk_details");
    details.setAttribute("id", talkData.id);
    details.setAttribute("aria-talkcategory", talkData.category);
    details.setAttribute("aria-talkorder", talkData.timeIndex);

    const summary = document.createElement("summary");
    summary.classList.add("talk_summary");
    summary.textContent = `${talkData.author} (${talkData.affiliate})`;

    const title = document.createElement("div");
    title.classList.add("subtitle");
    title.innerHTML = talkData.title;

    const abstract = document.createElement("p");
    abstract.innerHTML =
        talkData.abstract.length > 0 ? talkData.abstract : "TBC";

    summary.appendChild(title);
    details.appendChild(summary);
    details.appendChild(abstract);
    return details;
}

function sortListOfTalks(talks, order = "time") {
    return talks.toSorted((a, b) =>
        order === "time" ? a.timeIndex - b.timeIndex : a.id.localeCompare(b.id)
    );
}

function populateTalksHTML(grouped = true, order = "time") {
    const mother = document.getElementById("titleAbstractDiv");
    mother.replaceChildren();
    const fullList = grouped
        ? groupedTalks
        : { talks: [...groupedTalks.map(({ talks }) => talks)] };

    for (const group of fullList) {
        const container = document.createElement("div");
        container.classList.add("clamp");
        if (grouped) {
            const heading = document.createElement("h3");
            heading.textContent = group.heading;
            container.append(heading);
        }

        const sorted = sortListOfTalks(group.talks, order);
        for (const talk of sorted) {
            container.append(talkDetails(talk));
        }

        mother.append(container);
    }

    // re-render latex content
    renderMathInElement(document.body, {
        delimiters: [{ left: "$", right: "$", display: false }],
    });

    // add event to button
    document
        .getElementById("btnAbstractOpen")
        .addEventListener("click", (e) => {
            document
                .querySelectorAll("details.talk_details")
                .forEach((t) => (t.open = true));
        });
}

window.onload = function () {
    // assign time index first
    for (let i = 0; i < talkOrder.length; i++) {
        for (const { talks } of groupedTalks) {
            const elt = talks.find(({ id }) => id === talkOrder[i]);
            if (elt !== undefined) {
                elt.timeIndex = i;
                break;
            }
        }
    }
    // append HTML
    populateTalksHTML(true, "time");
    // add events
    const orderOpts = document.querySelectorAll("input[name=order]");
    for (const rad of orderOpts) {
        rad.addEventListener("change", (e) => {
            if (e.target.checked) {
                populateTalksHTML(true, e.target.value);
            }
        });
    }
};
