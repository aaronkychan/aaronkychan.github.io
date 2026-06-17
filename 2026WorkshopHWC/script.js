const talkOrder = ["nordskova", "kulshammer", "", "", "odeho"];
const lectureSeries = [
    {
        author: "Julian Külshamme",
        id: "kulshammer",
        affiliate: "Uppsala",
        title: `TBC`,
        abstract: `TBC`,
        category: "lecture",
        timeIndex: 1,
    },
    {
        author: "Anya Nordskova",
        id: "nordskova",
        affiliate: "Kavli IPMU, University of Tokyo",
        title: `TBC`,
        abstract: `TBC`,
        category: "lecture",
        timeIndex: 0,
    },
];

const invitedTalks = [
    {
        author: "Samuel Odeberg Hollifeldt",
        id: "odeho",
        affiliate: "Uppsala",
        title: `TBC`,
        abstract: `TBC`,
        category: "invited",
        timeIndex: 3,
    },
    {
        author: "Yuki Hirano 平野 雄貴",
        id: "hirano",
        affiliate: "Tokyo U. of Agriculture and Technology 東京農工大学",
        title: `Length of triangulated categories`,
        abstract: `Composition series is fundamental in the study of finite groups and finite
dimensional modules. One of the most important properties of such composition series is
the Jordan-Hölder property, and this implies the property (called the Jordan–Dedekind
property) that all composition series have the same length. In this talk, I will introduce
the notion of composition series for triangulated categories, and discuss composition series
of derived categories of certain finite dimensional algebras and smooth projective varieties.
In particular, I will explain that the Jordan–Dedekind property does not hold for derived
categories of certain finite dimensional algebras of finite global dimension and certain
smooth projective toric surfaces. This talk is based on joint work with Kalck and Ouchi.`,
        category: "invited",
        timeIndex: 0,
    },
    {
        author: "Norihiro Hanihara 埴原 紀宏",
        id: "hanihara",
        affiliate: "Kyushu 九州大学",
        title: `Tilting ideals and Calabi-Yau structures`,
        abstract: `We study singularity categories of Gorenstein algebras. There are many
such rings whose singularity categories are Calabi-Yau, for example,
preprojective algebras, their quotients by tilting ideals, cluster
tilted algebras, and so on. These algebras and categories have played a
prominent role in the development of cluster theory. We will discuss a
lift of these Calabi-Yau properties to their dg enhancements. This is
based on joint works with Bernhard Keller.`,
        category: "invited",
        timeIndex: 1,
    },
    {
        author: "Naoya Hiramae 平前 直也",
        id: "hiramae",
        affiliate: "Kyoto 京都大学",
        title: `Silting-discreteness of group algebras`,
        abstract: `Silting-discreteness of finite dimensional algebras has been actively
studied in recent years. One of the motivations for studying
silting-discreteness is that over silting-discrete algebras, any two
silting complexes are connected by iterative irreducible silting
mutations. In this talk, we examine when group algebras are
silting-discrete. For a finite group $G$ and an algebraically closed
field $k$ of positive characteristic $p$, we give a sufficient condition
for a group algebra $kG$ to be silting-discrete in terms of a
$p$-hyperfocal subgroup of $G$. Moreover, we see that this is also a
necessary condition in some cases. This talk is based on a joint work
with Yuta Kozakai.<br><br>
                    <a href="./Hiramae.pdf">Slides</a>
`,
        category: "invited",
        timeIndex: 2,
    },
    {
        author: "Kaveh Mousavand",
        id: "mousavand",
        affiliate: "OIST 沖縄科学技術大学院大学",
        title: `Hom-orthogonal modules and brick-Brauer-Thrall conjectures`,
        abstract: `We investigate the set of pairwise Hom-orthogonal modules in the context of several open conjectures
                    that have emerged in recent years, to which we refer as the brick-Brauer-Thrall (bBT) Conjectures.
                    The bBT conjectures are closely connected to the study of bricks, and therefore to wide
                    subcategories, torsion pairs, $\\tau$-tilting theory, stability conditions, g-fan, and related
                    subjects. In this talk, we first adopt a geometric perspective to see the significance of
                    Hom-orthogonality in the context of a conjecture that I posed in 2019, now known as the Second
                    Brick-Brauer-Thrall (2nd bBT) Conjecture. Then, we show that some of the more recent bBT conjectures
                    actually follow from the 2nd bBT conjecture. This provides new insights into these challenging open
                    problems. As a result, we are able to verify the validity of the bBT conjectures for some new
                    families of algebras.
                    This talk is primarily based on a recent joint work (arXiv:2407.20877) with Charles Paquette.`,
        category: "invited",
        timeIndex: 3,
    },
];

const groupedTalks = [
    { heading: "Lecture series 連続講演", talks: lectureSeries },
    { heading: "Invited lectures 招待講演", talks: invitedTalks },
    // { heading: "Contributed talks 一般講演", talks: contribtuedTalks },
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
        order === "time" ? a.timeIndex - b.timeIndex : a.id.localeCompare(b.id),
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
