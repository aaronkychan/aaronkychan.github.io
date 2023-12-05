const letters = [...Array(52).keys()].map((i) =>
    String.fromCharCode(97 + (i % 26) + (i < 26 ? 0 : -32))
);
// 26 small letters, then 26 capital letters
var QuiverData, cy, Relations;

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

function isPowerOfPrime(x) {
    for (let p of primes) {
        if (x == p) return [p, 1];
        let logp = Math.log(x) / Math.log(p);
        if (logp % 1 === 0) return [p, logp];
    }
    console.log(`Cannot find ${x} as a power of prime less than 62`);
    return [0, 0];
}

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
        var result = Math.pow(gens[primes.indexOf(char)], expo);
        return result == char - 1 ? "-" : result; //convert to just a minus sign if it is p-1
    }
}

const pa = (msg) => {
    document.getElementById(
        "outTxtBox"
    ).innerHTML = `<span style='color:red; font-size: 20pt'>${msg}</span>`;
};

function translateQPA() {
    var [quiverIn, relationStr] = document
        .getElementById("inQuiver")
        .value.split(";");

    quiverIn = quiverIn.replace(/(\\\r\n|\\\r|\\\n)/g, "");
    // quiverIn = quiverIn.replace(/;/g, "");
    quiverIn = quiverIn.replace(/^(\s*)Quiver(\(*)/, "");
    quiverIn = "[" + quiverIn.replace(/\)(\s*)$/, "") + "]";
    var quiverQPA = JSON.parse(quiverIn);
    relationStr = relationStr.replace(/\s+/, "");

    // Forbid too many vertices
    if (quiverQPA[0].length > 25) {
        pa("More than 25 vertices! Abort translation.");
        // document.getElementById("outTxtBox").innerHTML =
        //     "<span style='color:red; font-size: 20pt'>More than 25 vertices! Abort translation.</span>";
        clearAll();
        return;
    }

    // *** translate vx's***
    var forceID = document.getElementById("forceID").checked;
    var vxQPA = quiverQPA[0].map((v, i) =>
        forceID ? i + 1 : v.replace(/"/g, "")
    );
    var vx = vxQPA.map((v) => {
        return {
            data: { id: v },
        };
    });
    //console.table(vxQPA);
    //console.table(vx);

    // *** translate arrows ***
    var arr = quiverQPA[1].map(function (ar, i) {
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
    //console.table(arr);

    const quiverData = { nodes: vx, edges: arr };

    // **** translate relations ****
    //var relns = [];
    // strip brackets and whitespaces
    relationStr =
        relationStr == null
            ? document.getElementById("inRelation").value
            : relationStr;
    document.getElementById("inRelation").value = relationStr;
    var arrRelns = relationStr
        .replace(/(\\\r\n|\\\r|\\\n)/g, "")
        .replace(/[\s\[\]]/g, "")
        .split(",");
    var arrRef = quiverQPA[1].map((entry) => entry[2]);
    var charFound = -1; // charactersitic of the field
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
            let [scalar, ...arrs] = monomials[i].split("*");
            charFound = charFound == -1 ? findFieldChar(scalar) : charFound;
            document.getElementById(
                "controlOutput"
            ).innerHTML = `Detected characteristic as ${
                charFound != -1 ? charFound : "unknown"
            }.`;
            scalar = translateScalar(scalar, charFound); // scalar is integer now
            reldataentry[i].scalar = scalar;

            // translate a summand of the relation
            let newMono = arrs
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
    relData.sort(sortReln);

    //Tidy up data
    dataReady(quiverData, relData);
}

function dataReady(quiver, relations, isPreset = false) {
    // Display relations
    var relns = relations.map(({ reln }) => reln).join(" ,<br></span><span>");
    document.getElementById(
        "sysOutput"
    ).innerHTML = `Relations:<br> <span>${relns} </span>`;
    // TODO: add relation handling

    document.getElementById("saveSVG").disabled = false;
    document.getElementById("fixCyto").disabled = false;
    QuiverData = quiver;
    Relations = relations;
    //console.log("Quiver prepared: ", quiver);
    //console.log("Relations: ",relations);
    cy = initCyto(quiver, isPreset);
}

/**
 * relationdata obj: {reln: string, terms: Array<termdata>}
 * termdata obj: {scalar: number, monomials:Array<string>, originalIdx: number}
 * @param  {relationdata} a
 * @param  {relationdata} b
 */
function sortReln(a, b) {
    //sort by num of monomials first
    let firstsort = a.terms.length - b.terms.length;
    return firstsort != 0 ? firstsort : a.reln - b.reln;
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
// };
function initCyto(inputData, isPreset = false) {
    // **** Cytoscape part
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
    return cytoscape({
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
                style: {
                    width: 2,
                    "line-color": "#000",
                    "target-arrow-color": "#000",
                    "target-arrow-shape": "triangle",
                    "curve-style": "bezier",
                    "loop-direction": "0deg",
                    "loop-sweep": "45deg",
                },
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
}

function clearAll() {
    document.getElementById("inQuiver").value = "";
    document.getElementById("inRelation").value = "";
    document.getElementById("fixCyto").disabled = true;
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

/**
 *  Event handlers
 */

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
            dataReady(res.cy.elements, res.reln, true);
            // this will then display a text file
        },
        false
    );
    reader.readAsText(event.target.files[0]);
});

// document
//     .getElementById("testBtn")
// .addEventListener("click", () => initCyto(testdata));
document
    .getElementById("translateBtn")
    .addEventListener("click", () => translateQPA());
