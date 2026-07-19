// const talkOrder = ["nordskova", "kulshammer", "liu", "odeho", "minamoto"];  //chronological order amongst all talks regardless of category

/**
 * @typedef {Object} TalkData
 * @property {string} author
 * @property {string} id // format XXX(/YZW_...)  XXX=surname(use _ for space), YZW=first name initial or other refined distinguish method
 * @property {string} affiliate
 * @property {string} [web]
 * @property {string} title
 * @property {string} abstract
 * @property {string} category - lecture, invited, contributed
 * @property {boolean} [tbc]
 * @property {number} timeIndex - chronological order in each category
 */
const speakersTalks = [
    {
        author: "Julian Külshamme",
        id: "kulshammer",
        affiliate: "Uppsala",
        web: "https://julian-kuelshammer.github.io/",
        title: `TBC`,
        abstract: ``,
        category: "lecture",
        timeIndex: 1,
    },
    {
        author: "Anya Nordskova",
        id: "nordskova",
        affiliate: "Kavli IPMU, University of Tokyo",
        web: "https://anyanord.ru/",
        title: `Around abelian envelopes of exact categories`,
        abstract: ``,
        category: "lecture",
        timeIndex: 0,
    },
    // {
    //     author: "Samuel Odeberg Hollifeldt",
    //     id: "odeho",
    //     affiliate: "Uppsala",
    //     title: ``,
    //     abstract: ``,
    //     category: "invited",
    //     timeIndex: 3,
    // },
    {
        author: "Shunsuke Hirota",
        id: "hirota",
        affiliate: "RIMS Kyoto",
        title: ``,
        abstract: ``,
        category: "invited",
        timeIndex: 0,
    },
    {
        author: "Junyang Liu",
        id: "liu",
        affiliate: "Tokyo",
        web: "https://webusers.imj-prg.fr/~junyang.liu/",
        title: ``,
        abstract: ``,
        category: "invited",
        timeIndex: 1,
    },
    {
        author: "Hiroyuki Minamoto",
        id: "minamoto",
        affiliate: "Osaka Metropolitan",
        title: ``,
        abstract: ``,
        category: "invited",
        timeIndex: 2,
    },
];

const groupedList = speakersTalks.reduce(
    (res, item) => {
        res[item.category === "lecture" ? 0 : 1].talks.push(item);
        return res;
    },
    [
        { heading: "Lecture series 連続講演", talks: [] },
        { heading: "Invited lectures 招待講演", talks: [] },
    ],
);
// [
//     { heading: "Lecture series 連続講演", talks: speakers.filter(({category})=>category==="lecture") },
//     { heading: "Invited lectures 招待講演", talks: speakers.filter(({category})=>category==="lecture") },
//     // { heading: "Contributed talks 一般講演", talks: ... },
// ];

/**
 * @param  {TalkData} talkData
 * @return {HTMLElement} a details tag containing everything
 */
function talkDetails(talkData) {
    const hasAbstract = talkData.abstract.length > 0,
        hasTitle = talkData.title.length > 0;
    // console.log(talkData.id, " : hasAbs=", hasAbstract, " hasTitle=", hasTitle);
    const details = document.createElement(hasAbstract ? "details" : "div");
    details.classList.add("talk_details");
    details.setAttribute("id", talkData.id);
    details.setAttribute("aria-talkcategory", talkData.category);
    details.setAttribute("aria-talkorder", talkData.timeIndex);

    const summary = document.createElement(hasAbstract ? "summary" : "div");
    summary.classList.add(hasAbstract ? "talk_summary" : "talk_title_only");
    summary.textContent = `${talkData.author} (${talkData.affiliate})`;

    if (hasTitle) {
        const title = document.createElement("div");
        title.classList.add("subtitle");
        title.innerHTML = talkData.title;
        summary.appendChild(title);
    }
    details.appendChild(summary);

    if (hasAbstract) {
        const abstract = document.createElement("p");
        abstract.innerHTML = talkData.abstract;
        details.appendChild(abstract);
    }
    return details;
}

function sortListOfTalks(talks, order = "id") {
    let method = (a, b) => a.id.localeCompare(b.id);
    switch (order) {
        case "time":
            method = (a, b) => a.timeIndex - b.timeIndex;
            break;
        case "author":
            method = (a, b) => a.author.localeCompare(b.author);
            break;
    }
    return talks.toSorted(method);
}

function populateTalksHTML(grouped = true, order = "time") {
    // Update Speaker list on heading info
    const listDiv = document.getElementById("headingInfo_talk_list");
    listDiv.replaceChildren();
    for (const group of groupedList) {
        const eltHeading = document.createElement("h4");
        eltHeading.append(group.heading);
        const eltList = document.createElement("ul");
        eltList.classList.add("compact", "lineChangeAfter");
        for (const { author, affiliate, web } of sortListOfTalks(group.talks)) {
            const itm = document.createElement("li");
            itm.innerHTML =
                (web ? `<a href="${web}">` : "") +
                author +
                (web ? `</a>` : "") +
                ` (${affiliate})`;
            eltList.appendChild(itm);
        }
        listDiv.appendChild(eltHeading);
        listDiv.appendChild(eltList);
    }

    // Update Title & Abstract section
    const mother = document.getElementById("titleAbstractDiv");
    mother.replaceChildren();
    const fullList = grouped ? groupedList : { talks: speakersTalks };

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
    // for (let i = 0; i < talkOrder.length; i++) {
    //     for (const { talks } of groupedList) {
    //         const elt = talks.find(({ id }) => id === talkOrder[i]);
    //         if (elt !== undefined) {
    //             elt.timeIndex = i;
    //             break;
    //         }
    //     }
    // }
    // append HTML
    // *** switch to "time" when timetable is decided
    // populateTalksHTML(true, "time");
    populateTalksHTML(true, "alpha");
    // add events
    // *** use after timetable is decided
    // const orderOpts = document.querySelectorAll("input[name=order]");
    // for (const rad of orderOpts) {
    //     rad.addEventListener("change", (e) => {
    //         if (e.target.checked) {
    //             populateTalksHTML(true, e.target.value);
    //         }
    //     });
    // }
};
