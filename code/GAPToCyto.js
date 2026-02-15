const letters = [...Array(52).keys()].map((i) =>
    String.fromCharCode(97 + (i % 26) + (i < 26 ? 0 : -32)),
);
// 26 small letters, then 26 capital letters
var QuiverData, cy, Relations;
let mode = "default";
let addingArrow = false;
let sourceNodeID = null;

function infLetters(i) {
    // i=0,...,51 gives alphabet, othersie alphabet-with-hat
    var res = letters[i % 52];
    res += Array(parseInt(i / 52 + 1))
        .fill("")
        .reduce((prev, curr) => prev + "^");
    return res;
}

const primes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61,
];
const gens = [1, 2, 2, 3, 2, 2, 3, 2, 5, 2, 3, 2, 6, 3, 5, 2, 2, 2];

const pa = (msg) => {
    document.getElementById("outTxtBox").innerHTML =
        `<span style='color:red; font-size: 20pt'>${msg}</span>`;
};

const stripLineBreaksAndSpaces = (str) =>
    str.replace(/(\\\r\n|\\\r|\\\n)/, "").replace(/\s+/g, "");

const matchDeepestBrackets = (str) => str.match(/\[([^\[\]])*\]/g);

function isPowerOfPrime(x) {
    for (let p of primes) {
        if (x == p) return [p, 1];
        let logp = Math.log(x) / Math.log(p);
        if (logp % 1 === 0) return [p, logp];
    }
    console.log(`Cannot find ${x} as a power of prime less than 62`);
    return [0, 0];
}

//#region  *** Translation ***
function findFieldChar(str) {
    // find the charactersitic of the field,
    // str is of the form "(Z(n)^d)"" or "(Z(n))" for some integers n,d if over finite field
    // over rations, it will be of the form (1)
    return str[1] == "Z"
        ? isPowerOfPrime(parseInt(str.slice(3, str.indexOf(")"))))[0]
        : 0;
}

function getCpxNum(str) {
    // if str is of the form (n) for some integer n, then return n; otherwise return everything
    if (str.indexOf("/") != -1) return str;
    if (str.indexOf(".") != -1) return str;
    if (str.indexOf("i") != -1) return str;
    return str.indexOf("(") != -1 ? str.slice(1, -1) : str;
}

function translateScalar(a, char) {
    //input a is of the form "(s)" for string s
    if (char == -1) return a; //something is strange
    if (char == 0) {
        var res = getCpxNum(a);
        if (res[0] != "(") {
            return res == "1" ? "" : res == "-1" ? "-" : res;
        } else {
            return res;
        }
    }
    // char p case, a is of the form "(Z(n)^d)"" or "(Z(n))" for some integers n,d
    var hasExpo = a.indexOf("^");
    var expo = hasExpo != -1 ? a.slice(hasExpo + 1, -1) : 1; //exponent
    if (expo == 0) return "";
    else {
        var result = Math.pow(gens[primes.indexOf(char)], parseInt(expo));
        return result == char - 1 ? "-" : result; //convert to just a minus sign if it is p-1
    }
}

function detectRelation(str) {
    // brackets that do not contain brackets inside
    let deepest = matchDeepestBrackets(str);
    // console.log(deepest);
    // match a double bracket
    // ! there should be only one such; code breaks if this is not the case
    let s = str.search(/\[\s*\[/),
        t = str.search(/\]\s*\]/);
    // the sliced string contains the list of arrays inside the 2-dim array
    // without the outermost bracket
    let m = matchDeepestBrackets(
        str.slice(s + 1, t + str.match(/\]\s*\]/)[0].length - 1),
    ).length;

    // bad if deepest.length-m is neither 2 nor 1
    // console.log("deepest.len - level2.len = ", deepest.length - m);
    s = deepest.length - m == 2 ? str.search(/\[([^\[\]])*\]\s*$/) : str.length;
    return [str.slice(0, s), str.slice(s)];
}

const positiveCoeffFirst = (x, y) =>
    x.scalar > 0 ? (y.scalar > 0 ? 0 : -1) : 1;
const increasingMonomialLength = (x, y) =>
    x.monomials.length - y.monomials.length;
const increasingNumOfTerms = (r1, r2) => r1.terms.length - r2.terms.length;
const monomialWithPositiveCoeffFirst = (r1, r2) =>
    r1.terms.length == 1 && r2.terms.length == 1
        ? positiveCoeffFirst(r1.terms[0], r2.terms[0])
        : increasingNumOfTerms(r1, r2);

/**
 * @typedef {object} TermsData
 * @property {string} scalar
 * @property {string[]} monomials
 * @property {number} originalIdx the n-th term in the relation
 */
/**
 * @param  {TermsData} terms
 */
function termsToRelation(terms, joinStr = "·") {
    return terms.reduce(
        (str, t) =>
            str + t.scalar == ""
                ? t.monomials.join(joinStr)
                : t.scalar == "-"
                  ? `-${t.monomials.join("·")}`
                  : `${t.scalar}·${t.monomials.join("·")}`,
        "",
    );
}

function translateGraphToQPA(graphData) {
    const nodes = graphData.nodes || [];
    const edges = graphData.edges || [];
    const vxNames = nodes.map((node) => node.data.id);
    const arrStrs = edges.map((edge) => {
        const { source, target, label } = edge.data;
        return `["${source}", "${target}", "${label}"]`;
    });
    const relStrs = Relations.map(({ terms }) => termsToRelation(terms, "*"));
    const relations = `[${relStrs.join(", ")}]`;
    return `Q:=Quiver([${vxNames.map((v) => `"${v}"`).join(", ")}], [${arrStrs.join(", ")}]);\nR:=${relations};`;
}

/**
 * @typedef {[string, string, string]} Arrow
 * An arrow: [source, target, name]
 */

/**
 * @typedef {[string[], Arrow[]]} Quiver
 * [nameOfVertices, arrows]
 */

//#region ** Relation **
/**
 * @typedef {object} RelationData
 * @property {string} reln  string display in output
 * @property {TermsData[]} terms  details of each term
 */

/**
 * @param  {string} relnStr
 * @param  {Quiver} quiver
 * @return {RelationData}
 */
function transalteQPARelation(relationStr, quiver) {
    const arrows = quiver[1];
    var arrRef = arrows.map(({ data }) => data.id);
    // strip brackets and whitespaces
    relationStr =
        relationStr === ""
            ? document.getElementById("inRelation").value
            : relationStr;
    document.getElementById("inRelation").value = relationStr;
    // remove line change and spaces
    var arrRelns = relationStr
        .replace(/(\\\r\n|\\\r|\\\n)/g, "")
        .replace(/[\s\[\]]/g, "")
        .split(",");
    var charFound = -1; // charactersitic of the field

    /** @type {RelationData[]} */
    var relData = [];
    for (let rel of arrRelns) {
        let readIndex = 0;
        let monomials = rel.split(/[\+-]/);
        let newRel = "";
        let reldataentry = Array(monomials.length).fill({
            scalar: 1,
            monomials: [],
            originalIdx: 0,
        });
        for (let i = 0; i < monomials.length; i++) {
            reldataentry[i].originalIdx = i;
            // split each monomial into scalar and generating factors
            let factors = monomials[i].split("*");
            let arrInMon = [],
                scalar = "1";
            if (factors[0][0] != "(") {
                // first factor is probably not a scalar
                if (arrRef.indexOf(factors[0]) > -1) {
                    arrInMon = factors;
                } else {
                    scalar = factors[0];
                    arrInMon = factors.slice(1);
                }
            } else {
                scalar = factors[0];
                arrInMon = factors.slice(1);
            }
            // let [scalar, ...arrs] = monomials[i].split("*");
            if (charFound == -1) {
                // try to find characteristic if not yet known
                charFound = findFieldChar(scalar);
                document.getElementById("controlOutput").innerHTML =
                    `Detected characteristic as ${
                        charFound != -1 ? charFound : "unknown"
                    }.`;
            }
            // translate scalar string to more readable form if possible
            scalar = translateScalar(scalar, charFound);
            reldataentry[i].scalar = scalar; // empty string if scalar is 1

            // translate a summand of the relation
            let newMono = arrInMon
                .map((x) => {
                    let q = arrRef.indexOf(x);
                    // q!=-1 => return replaced letters; otherwise its a scalar elt
                    let arr =
                        q != -1
                            ? document.getElementById("forceArrow").checked
                                ? infLetters(q)
                                : x
                            : x;
                    reldataentry[i].monomials.push(arr);
                    return arr;
                })
                .join("·");
            readIndex += monomials[i].length;
            newMono += i + 1 == monomials.length ? "" : rel[readIndex];
            newRel +=
                scalar == ""
                    ? newMono
                    : scalar == "-"
                      ? `-${newMono}`
                      : `${scalar}·${newMono}`;
            readIndex++;
        }
        relData.push({ reln: newRel, terms: reldataentry });
        // relns.push(newRel);
    }
    relData.sort(monomialWithPositiveCoeffFirst);

    return relData;
}

function translateQPA() {
    var [quiverIn, relationStr] = detectRelation(
        document.getElementById("inQuiver").value,
    );

    // console.log("quiver: ", quiverIn);
    // console.log("relations: ", relationStr);

    quiverIn = stripLineBreaksAndSpaces(quiverIn);
    quiverIn = quiverIn.replace(/(\r\n|\n|\r)/g, ""); // remove linebreaks
    quiverIn = quiverIn.replace(/\\/g, ""); // replace " \ "
    quiverIn = quiverIn.replace(/;/g, ""); // replace " ; "
    quiverIn = quiverIn.replace(/^(\s*)Quiver(\(*)/, "");
    quiverIn = quiverIn.replace(/\)(\s*)$/, "");
    // turn input Quiver([vxs], [arrows]) into array [ [vxs], [arrows] ]
    if (quiverIn[0] != "[") {
        // input is possibly in the from Quiver( n, [arrows] )
        let numVx = parseInt(quiverIn.split(",", 1));
        if (numVx > 0) {
            let arrv = Array.from({ length: numVx }, (_, i) => i + 1);
            quiverIn =
                JSON.stringify(arrv) + quiverIn.slice(quiverIn.indexOf(","));
        } else {
            console.log("not a number before first comma");
        }
    }
    quiverIn = "[" + quiverIn + "]";
    /** @type {QuiverData} */
    var quiverQPA = JSON.parse(quiverIn);

    // Forbid too many vertices
    if (quiverQPA[0].length > 70) {
        pa("More than 70 vertices! Abort translation.");
        // document.getElementById("outTxtBox").innerHTML =
        //     "<span style='color:red; font-size: 20pt'>More than 25 vertices! Abort translation.</span>";
        clearAll();
        return;
    }

    //region# Vertices
    var forceID = document.getElementById("forceID").checked;
    var vxQPA = quiverQPA[0].map((v, i) =>
        forceID ? i + 1 : `${v}`.replace(/"/g, ""),
    );
    var vx = vxQPA.map((v) => {
        return {
            data: { id: v },
        };
    });
    //console.table(vxQPA);
    //console.table(vx);

    //region# Arrows
    var arrows = quiverQPA[1].map((ar, i) => {
        var idlabel = document.getElementById("forceArrow").checked
            ? infLetters(i)
            : ar[2];
        var core = {
            id: idlabel,
            source: forceID ? quiverQPA[0].indexOf(ar[0]) + 1 : ar[0],
            target: forceID ? quiverQPA[0].indexOf(ar[1]) + 1 : ar[1],
            label: idlabel,
        };
        return { data: core };
    });

    //Tidy up data
    QuiverData = { nodes: vx, edges: arrows };
    Relations = transalteQPARelation(relationStr, quiverQPA);
    //console.log("Quiver prepared: ", QuiverData);
    //console.log("Relations: ", Relations);
    presentData(QuiverData, Relations);
}

function refreshRelationsOutput(relations) {
    let outputDiv = document.getElementById("relOutput");
    outputDiv.innerHTML = `Relations:<br>`;
    for (let i = 0; i < relations.length; i++) {
        // for (const r of relations) {
        let divElt = document.createElement("div");
        divElt.classList.add("relationRow");
        divElt.setAttribute("id", relations[i].reln);
        divElt.innerHTML = relations[i].reln;
        divElt.addEventListener("click", () => {
            selectNthRelation(i);
            //     relations[i].reln,
            //     i % 2 == 0 ? "#ff6f00" : "#0080ff"
            // );
            // divElt.classList.add("selectedRelationRow");
        });
        outputDiv.appendChild(divElt);
    }
}

function presentData(quiver, relations, isPreset = false) {
    refreshRelationsOutput(relations);
    // get Cyto ready
    document.getElementById("saveSVG").disabled = false;
    document.getElementById("fixCyto").disabled = false;
    document.getElementById("wriggle").disabled = false;
    document.getElementById("toQPABtn").disabled = false;
    cy = initCyto(quiver, isPreset);
}

// composition of comparisons (sort order)
/**
 * @param  {[ [any,any]->int ]} compfuncs array of comparison functions
 * @param  {any} a
 * @param  {any} b
 */
function composeCompares(compfuncs, a, b) {
    let c = range(compfuncs.length).map((i) => compfuncs[i](a[i], b[i]));
    return c.reduce((accum, curr) => (accum ? accum : curr));
}

function selectNthRelation(n) {
    let rows = document.querySelectorAll("#relOutput div");
    // unselect all paths
    for (const e of cy.edges()) {
        e.style(coloredEdgeStyle("#000"));
    }
    // un/highlight the row and select new paths
    // if n=-1, then it will just unhighlight all rows and select no path
    for (let i = 0; i < rows.length; i++) {
        if (i == n) {
            rows[i].classList.add("selectedRelationRow");
            for (const t of Relations[i].terms) {
                for (const m of t.monomials) {
                    cy.edges(`[id="${m}"]`).style(
                        coloredEdgeStyle(i % 2 == 0 ? "#ff6f00" : "#0080ff"),
                    );
                }
            }
        } else {
            rows[i].classList.remove("selectedRelationRow");
        }
    }
}

// var testdata = {
//     nodes: [
//         { data: { id: "a1" } },
//         { data: { id: "a2" } },
//         { data: { id: "b1" } },
//         { data: { id: "b2" } },
//         { data: { id: "c1" } },
//         { data: { id: "c2" } },
//     ],
//     edges: [
//         {
//             data: {
//                 id: "a1a2",
//                 source: "a1",
//                 target: "a2",
//                 label: "a",
//             },
//         },
//         {
//             data: {
//                 id: "b1b2",
//                 source: "b1",
//                 target: "b2",
//                 label: "b",
//             },
//         },
//         {
//             data: {
//                 id: "b1b22",
//                 source: "b1",
//                 target: "b2",
//                 label: "b'",
//             },
//         },
//         {
//             data: {
//                 id: "c1c2",
//                 source: "c1",
//                 target: "c2",
//                 label: "c",
//             },
//         },
//         {
//             data: {
//                 id: "AB",
//                 source: "a2",
//                 target: "b1",
//                 label: "ab",
//             },
//         },
//         {
//             data: {
//                 id: "AC",
//                 source: "a2",
//                 target: "c1",
//                 label: "ac",
//             },
//         },
//         {
//             data: {
//                 id: "cc",
//                 source: "c2",
//                 target: "c2",
//                 label: "cc",
//             },
//            classes: "loop"
//         },
//         {
//             data: {
//                 id: "d",
//                 source: "b2",
//                 target: "a1",
//                 label: "d",
//             },
//         },
//     ],
// };]
const coloredEdgeStyle = (color) => {
    return {
        width: 2,
        "line-color": color,
        "target-arrow-color": color,
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
        "loop-direction": "0deg",
        "loop-sweep": "45deg",
    };
};

function promptNameAndCheck(msg, cyInstance) {
    let name = prompt(msg);
    if (name) {
        if (cyInstance.getElementById(name).length !== 0) {
            pa("Vertex/Arrow with this name already exists.");
        } else {
            return name;
        }
    }
    return null;
}

//#region *** Cyto ***
function initCyto(inputData, isPreset = false) {
    let layout = isPreset
        ? { name: "preset" }
        : {
              // name: "dagre",
              // rankDir: "LR",
              name: "breadthfirst",
              fit: true,
              padding: 20,
              nodeDimensionsIncludeLabels: true,
          };
    // TODO: add relation handling; c.f. https://github.com/dmx-systems/cytoscape-edge-connections
    let cyInstance = cytoscape({
        container: document.getElementById("cy"),
        elements: inputData,
        style: [
            {
                selector: "node",
                css: {
                    width: 25,
                    height: 25,
                    shape: "ellipse",
                    "background-color": "#ffffff",
                    "border-width": "1px",
                    "border-style": "solid",
                    "border-color": "#000",
                    // border: "1px solid #000",
                    content: "data(id)",
                    "text-valign": "center",
                    "text-halign": "center",
                },
            },

            {
                selector: "node:selected",
                style: {
                    "background-color": "#fa5252",
                    width: 30,
                    height: 30,
                },
            },
            {
                selector: "edge",
                style: coloredEdgeStyle("#000"),
            },
            {
                selector: "edge:selected",
                style: coloredEdgeStyle("#7379f4"),
            },
            // todo: dynamically add edge.loopCounter with "Counter"=1,2,...
            // todo: use inputData to determine loop
            // {
            //     selector: "edge.loop2",
            //     style: {
            //         width: 2,
            //         "line-color": "#000",
            //         "target-arrow-color": "#000",
            //         "target-arrow-shape": "triangle",
            //         "curve-style": "bezier",
            //         "loop-direction": "45deg",
            //         "loop-sweep": "45deg",
            //     },
            // },
            {
                selector: "edge[label]",
                style: {
                    label: "data(label)",
                    color: "#ff1818",
                    "font-size": "22pt",
                    "font-weight": "bold",
                    "text-outline-color": "#ee0",
                    "text-outline-width": 2,
                    // "text-background-color": "#DDD",
                    // "text-background-opacity": 0.6,
                },
            },
        ],

        layout: layout,

        selectionType: "single",
        userZoomingEnabled: true,
        userPanningEnabled: true,
        wheelSensitivity: 0.5,
        pan: { x: 40, y: 40 },
    });

    cyInstance.on("tap", (ev) => clickOnCanvas(ev, cyInstance));

    return cyInstance;
}

//#region Edit Quiver
function clickOnCanvas(ev, cyInstance) {
    var evtTarget = ev.target;
    if (mode === "add") {
        if (evtTarget === cyInstance) {
            // Clicked on background: Add Node
            let name = promptNameAndCheck(
                "Enter name for new vertex:",
                cyInstance,
            );
            if (name) {
                cyInstance.add({
                    group: "nodes",
                    data: { id: name },
                    position: ev.position,
                });
            }
        } else if (evtTarget.isNode()) {
            if (addingArrow) {
                let name = promptNameAndCheck(
                    "Enter name for new arrow:",
                    cyInstance,
                );
                if (name) {
                    cyInstance.add({
                        group: "edges",
                        data: {
                            id: name,
                            source: sourceNodeID,
                            target: evtTarget.id(),
                            label: name,
                        },
                    });
                    addingArrow = false;
                    sourceNodeID = null;
                    evtTarget.unselect();
                }
            } else {
                addingArrow = true;
                sourceNodeID = evtTarget.id();
                // pa("Select arrow target");
            }
        }
    } else if (mode === "delete") {
        if (evtTarget !== cyInstance) {
            let removedArrows = [];
            if (evtTarget.isNode()) {
                removedArrows = evtTarget.connectedEdges().map((e) => e.id());
            } else if (evtTarget.isEdge()) {
                removedArrows = [evtTarget.id()];
            }
            cyInstance.remove(evtTarget);

            if (removedArrows.length > 0) {
                Relations = Relations.filter(
                    (rel) =>
                        !rel.terms.some((term) =>
                            term.monomials.some((m) =>
                                removedArrows.includes(m),
                            ),
                        ),
                );
                refreshRelationsOutput(Relations);
            }
        }
    } else if (mode === "rename") {
        if (evtTarget !== cyInstance) {
            let oldId = evtTarget.id();
            let typeName = evtTarget.isNode() ? "vertex" : "arrow";
            let newName = promptNameAndCheck(
                `Enter new name for ${typeName} (current: ${oldId}):`,
                cyInstance,
            );
            evtTarget.unselect();
            if (newName) {
                if (evtTarget.isNode()) {
                    let edges = evtTarget.connectedEdges();
                    let edgesJson = edges.jsons();
                    let nodeJson = evtTarget.json();

                    // remove -> change -> add, instead of jsut change
                    // because we cannot alter data id
                    cyInstance.remove(evtTarget);
                    nodeJson.data.id = newName;
                    cyInstance.add(nodeJson);

                    edgesJson.forEach((edge) => {
                        if (edge.data.source === oldId)
                            edge.data.source = newName;
                        if (edge.data.target === oldId)
                            edge.data.target = newName;
                        cyInstance.add(edge);
                    });
                } else {
                    let edgeJson = evtTarget.json();
                    cyInstance.remove(evtTarget);
                    edgeJson.data.id = newName;
                    edgeJson.data.label = newName;
                    cyInstance.add(edgeJson);
                    // update relations
                    for (let r of Relations) {
                        let needUpdate = false;
                        for (let t of r.terms) {
                            for (let i = 0; i < t.monomials.length; i++) {
                                if (t.monomials[i] === oldId) {
                                    t.monomials[i] = newName;
                                    needUpdate = true;
                                }
                            }
                        }
                        if (needUpdate) r.reln = termsToRelation(r.terms);
                    }
                    refreshRelationsOutput(Relations);
                }
            }
        }
    }
}

function bendArrow(dir) {
    let edges = cy.$("edge:selected");
    for (let e of edges) {
        let strCurrDist = e.style("control-point-distance");
        let dist = 0;
        switch (dir) {
            case "L":
                dist = -40;
                break;
            case "R":
                dist = 40;
                break;
            case "S":
                dist = 0;
                break;
        }
        console.log(strCurrDist);
        if (!strCurrDist) {
            e.style("control-point-weights", 0.5); // at midpoint
            e.style("control-point-distance", dist); // >0 = bend right, <0 = bend left
        } else {
            let currDist = parseInt(
                strCurrDist.substring(0, strCurrDist.indexOf("px")),
            );
            if ((currDist >= 0 && dist > 0) || (currDist <= 0 && dist < 0)) {
                e.style("control-point-distance", currDist + dist);
            } else {
                e.style("control-point-distance", 0);
            }
            e.style("control-point-weights", 0.5);
        }
        if (e.codirectedEdges().length == 1) {
            // need this to make it curve
            e.style("curve-style", "unbundled-bezier");
        }
    }
}

function clearAll() {
    document.getElementById("inQuiver").value = "";
    document.getElementById("inRelation").value = "";
    document.getElementById("toQPABtn").disabled = true;
    document.getElementById("fixCyto").disabled = true;
    document.getElementById("wriggle").disabled = true;
    document.getElementById("saveSVG").disabled = true;
}

function savefile(type) {
    var content, blob, fn;
    switch (type) {
        case "svg":
            content = cy.svg({ scale: 1, full: true, bg: "#ffffff" });
            blob = new Blob([content], {
                type: "image/svg+xml;charset=utf-8",
            });
            break;
        case "json":
            content = { cy: cy.json(), reln: Relations };
            console.log(JSON.stringify(content));
            blob = new Blob([JSON.stringify(content)], {
                type: "application/json;charset=utf-8",
            });
            break;
        default:
            console.log("Invalid filetype");
    }
    saveAs(blob, document.getElementById("filenameInput").value + "." + type);
}

//region# Event handlers
document
    .getElementById("bendLeft")
    .addEventListener("click", () => bendArrow("L"));
document
    .getElementById("bendRight")
    .addEventListener("click", () => bendArrow("R"));

document.getElementById("fixCyto").addEventListener("click", () => cy.fit());
document
    .getElementById("saveSVG")
    .addEventListener("click", () => savefile("svg"));
document
    .getElementById("saveJSON")
    .addEventListener("click", () => savefile("json"));
document.getElementById("loadJsonBtn").addEventListener("change", (event) => {
    let reader = new FileReader();
    reader.addEventListener(
        "load",
        () => {
            let res = JSON.parse(reader.result);
            presentData(res.cy.elements, res.reln, true);
            // this will then display a text file
        },
        false,
    );
    reader.readAsText(event.target.files[0]);
});

// document
//     .getElementById("testBtn")
// .addEventListener("click", () => initCyto(testdata));
document
    .getElementById("translateBtn")
    .addEventListener("click", () => translateQPA());

document.querySelectorAll('input[name="editMode"]').forEach((elem) => {
    elem.addEventListener("change", (event) => {
        mode = event.target.value;
        if (cy) cy.elements().unselect();
    });
});

document
    .getElementById("btnUnselectRelns")
    .addEventListener("click", () => selectNthRelation(-1));

document.getElementById("wriggle").addEventListener("click", () => {
    cy.layout({
        name: "cose",
        animate: true,
        animationDuration: 1500,
        randomize: false,
        nodeDimensionsIncludeLabels: true,
    }).run();
});

document.getElementById("toQPABtn").addEventListener("click", () => {
    const qpaCode = translateGraphToQPA(cy.json().elements);
    console.log(qpaCode);
    document.getElementById("outTxtBox").innerHTML = qpaCode;
});
