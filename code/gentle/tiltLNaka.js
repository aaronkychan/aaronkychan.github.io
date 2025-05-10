var s = Snap("#svg");
var cx = 230,
    cy = 250; //center of graph
var g = 0.35; // gravity towards center of graph
var r = 180,
    vxR = 6; // r=radius of big disk, vxR=radius of mk pts
var greenPos = [],
    redPos = [],
    labelPos = []; // store positions of green/red mk pts
var modules = [],
    arcs = [];
var qhs, partition;
var A, QR, ARquiver;
var cyto, posetCyto;
var arrowhead = s.select("#arrowhead");
var logArea = document.getElementById("log");

// function polarToCartesian(radius, degree, cx, cy) {
//     // Convert degree to radians
//     var radians = (degree - 90) * Math.PI / 180;

//     // Calculate x and y coordinates
//     var x = radius * Math.cos(radians);
//     var y = radius * Math.sin(radians);

//     // Return x,y tuple
//     return [cx + x, cy + y];
// }

const moduleToCSSValidString = (M) => `ind${M[0]}_${M[1]}`;

/**
 * @param  {string} str
 * @return {number} -1 if not a string or not valid array; otherwise the dimension of array
 */
function detectStringifiedArrayDim(str) {
    if (typeof str != "string") {
        console.log("detectStringifiedArrayDim: require input is a string.");
        return -1;
    }
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === "[") {
            count++;
        } else {
            break;
        }
    }
    // dim = 0 if no brackets
    return count == 0 ? -1 : count;
}
function SplitArrayOfArrayString(str) {
    return str.split("],[").join("]||[").split("||");
}

//#region SVG / Cyto
/* Snap drag  functions */
var move = function (dx, dy) {
    this.attr({
        transform:
            this.data("origTransform") +
            (this.data("origTransform") ? "T" : "t") +
            [dx, dy],
    });
};

var start = function () {
    this.data("origTransform", this.transform().local);
};
var stop = function () {
    // console.log('finished dragging');
};

function clearHighlight() {
    const gps = document.querySelectorAll(
        "#partitionGroup > option:not(:first-child)"
    );
    for (let g of gps) {
        g.remove();
    }
    for (let n of cyto.elements("node")) {
        n.unselect();
        n.removeClass("inList");
        n.style("background-color", "#ffff00");
    }
}

function createPartitionSelection(partition, labels = []) {
    const selElt = document.getElementById("partitionGroup");
    for (let i = 0; i < partition.length; i++) {
        const item = document.createElement("option");
        item.appendChild(
            document.createTextNode(
                labels.length > 0 ? labels[i] : `Group ${i + 1}`
            )
        );
        item.setAttribute("value", i);
        selElt.appendChild(item);
    }
    selElt.addEventListener("change", (e) => {
        if (e.target.value == "") {
            for (let n of cyto.elements("node")) {
                n.unselect();
                n.removeClass("inList");
            }
        } else {
            selectTilts(partition[parseInt(e.target.value)]);
        }
    });
}

//#region Drawing
function drawARquiver(xsep = 40, ysep = 40) {
    let ox = 25,
        oy = 50; //relative origin
    let xpos = Array(A.rank)
        .fill(0)
        .map((x, i) => ox + i * xsep * 2);
    let ARq = s.g();
    let LL = Math.max(...A.kupisch);
    // add rect background for dragging
    let rect = s
        .rect(ox, oy, ox + A.rank * xsep * 2, oy + ysep * (LL + 1))
        .attr({ fill: "white" });
    ARq.add(rect);

    for (let l = 0; l < LL; l++) {
        for (let i = 1; i <= A.rank; i++) {
            let M = [A.rank + 1 - i, A.rank + 1 - i + l];
            if (A.isModule(M)) {
                let x = xpos[i - 1] - xsep * l;
                let y = oy + (LL - l) * ysep;
                // let [t, r] = drawLoewyDiagram(x, y, LoewyDiagram(...M), { id: JSON.stringify(M) });
                // ARq.add(r);
                // ARq.add(t);
                let node = drawLoewyDiagram(x, y, LoewyDiagram(...M));
                node.attr({ id: moduleToCSSValidString(M) });
                ARq.add(node);
                // if (node.getBBox().cx != x || node.getBBox().cy != y) {
                //  they are always different, but only by very little
                //     console.log(`Our (x,y)=( ${x} , ${y} )`, " svg data: ", node.getBBox());
                // }

                // draw arrow going out from M
                let nextM = [
                    [M[0], M[0] + l - 1],
                    [M[0] - 1, M[0] + l],
                ];
                for (let [j, N] of Object.entries(nextM)) {
                    if (A.isModule(N)) {
                        // console.log("arrow from M=", M, " to ", N);
                        let sign = j == 0 ? 1 : -1;
                        let arrow = s.line(
                            x + 10,
                            y + sign * 10,
                            x + xsep - 10,
                            y + sign * (ysep - 10)
                        );
                        arrow.attr({
                            stroke: "#000",
                            strokeWidth: 2,
                            markerEnd: arrowhead,
                        });
                        ARq.add(arrow);
                    }
                }
            }
        }
    }
    ARq.drag(move, start, stop);
    return ARq;
}

function drawQuiverAndRelations() {
    let ox = 25,
        oy = 30; //relative origin
    let sep = 60; // how far apart consecutive vertices are
    let xpos = Array(A.rank)
        .fill(0)
        .map((x, i) => ox + i * sep);
    QR = s.g();
    //quiver
    for (let i = 0; i < A.rank; i++) {
        let txt = s.text(xpos[i], oy, `${i + 1}`);
        txt.attr({
            "text-anchor": "middle",
            "dominant-baseline": "central",
            "font-size": "12pt",
        });
        QR.add(txt);
        if (i > 0) {
            let arrow = s.line(xpos[i - 1] + 10, oy, xpos[i] - 15, oy);
            arrow.attr({
                stroke: "#000",
                strokeWidth: 2,
                markerEnd: arrowhead,
            });
            QR.add(arrow);
        }
    }
    //relations
    let rels = A.relations;
    for (let r of rels) {
        let l = r[1] - r[0];
        let x0 = ox + r[0] * sep + sep / 2;
        let x1 = ox + (r[1] - 1) * sep + sep / 2;
        let dash = s.path(
            `M${x0 + 2},${oy - 3} C${x0 + 20},${oy - 23} ${x1 - 20},${
                oy - 23
            } ${x1 - 2},${oy - 3}`
        );
        dash.attr({
            stroke: "#000",
            strokeDasharray: "10,5",
            strokeWidth: 1,
            fill: "none",
        });
        QR.add(dash);
    }
    //scale if needed
    (A.rank - 1) * sep > 420
        ? QR.attr({
              transform: `scale(${420 / ((A.rank - 1) * sep)})`,
          })
        : null;
}

function LoewyDiagram(top, soc) {
    return Array.from(
        Array(parseInt(soc) + 1 - parseInt(top)).keys(),
        (i) => `${parseInt(top) + i}`
    );
}

function drawLoewyDiagram(x, y, Loewy, txtAttr = {}) {
    let node = s.g();
    let txt = s.text(x, y, Loewy);
    let attr = Object.assign(
        {},
        {
            "font-family": "monospace",
            "font-size": "9pt",
            "text-anchor": "middle",
            "dominant-baseline": "central",
        },
        txtAttr
    );
    txt.attr(attr);
    if (Loewy.length > 1) {
        let dy = (Loewy.length * 10) / 2;
        txt.selectAll("tspan").forEach(function (tspan, i) {
            tspan.attr({ x: x, y: y - dy + 10 * i });
        });
    }
    let bbox = txt.getBBox();
    let rect = s.rect(bbox.x - 2, bbox.y - 2, bbox.width + 4, bbox.height + 4);
    rect.attr({
        fill: "#ddd",
        "fill-opacity": 0.8,
        stroke: "#000",
        strokeWidth: 1,
    });
    // rect.insertBefore(txt);
    // return [txt, rect];
    node.add(rect);
    node.add(txt);
    return node;
}

function selectTilts(list, overrideText = "") {
    // console.log(Ms);
    let matchingID = [];
    for (let n of cyto.elements("node")) {
        n.unselect();
        n.removeClass("inList");
    }
    // console.log(qhs.qhs);
    for (let i of list) {
        let node = cyto.getElementById(`${parseInt(i) + 1}`);
        node.addClass("inList");
        node.select();
        matchingID.push(i);
    }
    updateLog(
        overrideText === ""
            ? `-> Selecting ${matchingID.length} char.tiltings`
            : overrideText
    );
}

//#region generation
function generate(kupisch = [], data = null) {
    // document.getElementById("btnSelectModule").disabled = true;
    document.getElementById("btnPathQuotient").disabled = true;
    const gps = document.querySelectorAll(
        "#partitionGroup > option:not(:first-child)"
    );
    for (let g of gps) {
        g.remove();
    }
    s.selectAll("svg > *:not(defs)").remove(); //s.clear() will remove everything under <defs> too
    if (kupisch == [] && data == null) {
        updateLog("Need data to generate algebra and disk model.");
    }
    A = new LNakayama({ kupisch: kupisch, data: data ? data.algebra : null });
    document.getElementById("filenameInput").value = `[${A.kupisch}]`;
    document.getElementById("kupisch").value = `[${A.kupisch}]`;
    genQHS(data);

    ARquiver = drawARquiver();
    // addModules(A.LeftOrthoCat([[1, 2]]));
    drawQuiverAndRelations();
}

function generateFromZComp() {
    let zcomp = JSON.parse(document.getElementById("zcomp").value);
    generate({ kupisch: LNakayama.kupischFromZComposition(zcomp) });
}

//
// function addModulesFromInput() {
//     let strMs = document.getElementById("modulesInput").value;
//     let dim = detectStringifiedArrayDim(strMs);
//     let Ms = dim == 2 ? JSON.parse(strMs) : [JSON.parse(strMs)];
//     addModules(Ms);
// }

let markNodeInARQuiver = (vid, markFn) => markFn(ARquiver.select(`#${vid}`));

let nodeHilight = (color) => {
    return (node) => {
        let bb = node.getBBox();
        let cloud = s.circle(bb.cx, bb.cy, 30);
        cloud.attr({
            // fill: "#FFDC2E",
            fill: color,
            opacity: 0.5,
        });
        cloud.insertBefore(node);
        return cloud;
    };
};

function addModules(...MsCollect) {
    s.selectAll("svg > *:not(defs)").remove();
    let palette = chroma
        .scale("Set1")
        .colors(Math.max(MsCollect.length, 5))
        .map((c) => chroma(c).hex());
    // console.log(palette);

    ARquiver = drawARquiver();
    for (const [i, Ms] of Object.entries(MsCollect)) {
        modules = [];
        for (const M of Ms) {
            A.isModule(M)
                ? modules.push({ topsoc: M, Loewy: LoewyDiagram(...M) })
                : null;
        }

        // let ox = 30, oy = 100;
        // for (let [i, M] of Object.entries(modules)) {
        //     drawLoewyDiagram(ox + i * 25, oy, M.Loewy);
        // }
        for (let M of Ms) {
            markNodeInARQuiver(
                moduleToCSSValidString(M),
                nodeHilight(palette[i])
            );
        }
    }
    drawQuiverAndRelations();
    // updateLog();
}

let stdMark = (node) => {
    let bb = node.getBBox();
    let y = bb.cy,
        x = bb.x - 12;
    let mark = s.polygon(x, y, x + 10, y, x + 5, y - 10);
    mark.attr({ fill: "#F00" });
    mark.insertAfter(node);
    return mark;
};

let costdMark = (node) => {
    let bb = node.getBBox();
    let y = bb.cy,
        x = bb.x - 12;
    let mark = s.polygon(x, y, x + 10, y, x + 5, y + 10);
    mark.attr({ fill: "#00F" });
    mark.insertAfter(node);
    return mark;
};

function markStdCostdModInARQuiver(std, costd) {
    for (let s of std) {
        markNodeInARQuiver(moduleToCSSValidString(s), stdMark);
    }
    for (let c of costd) {
        markNodeInARQuiver(moduleToCSSValidString(c), costdMark);
    }
}

function reductionAtMod() {
    let strMs = document.getElementById("selectModule").value;
    let dim = detectStringifiedArrayDim(strMs);
    let Ms = dim == 2 ? JSON.parse(strMs) : [JSON.parse(strMs)];
    // console.log(Ms);
    let matchingID = [];
    for (let n of cyto.elements("node")) {
        n.unselect();
        n.removeClass("inList");
    }
    // console.log(qhs.qhs);
    for (let [i, T] of Object.entries(qhs.qhs.map((q) => q.charTilt))) {
        // console.log(`i=${i}, T=[${T}]`);
        if (A.isDirectSummand(Ms, T)) {
            let node = cyto.getElementById(`${parseInt(i) + 1}`);
            node.addClass("inList");
            node.select();
            matchingID.push(i);
        }
    }
    updateLog(
        `Found ${
            matchingID.length
        } char.tilting containing direct sumnand ${JSON.stringify(Ms)}.`
    );
}

function genQHS(data = null) {
    if (data === null) {
        qhs = A.findAllMAOs();
        let poset = coverArrayToCyto(qhs.coverRel);
        updateLog();
        copyToClipboard(JSON.stringify(qhs.coverRel));
        // This string can be directly copied into sage for further investigation using:
        // from sage.combinat.posets.posets import FinitePoset
        // P = FinitePoset(DiGraph(dict([[i,uc[i]] for i in range(len(uc))])), facade=False);
        updateLog("*** Cover relation of qhs copied to clipboard ***");
        cyto = initSVG(document.getElementById("cyQHS"), poset);
    } else {
        qhs = data.qhs;
        // console.log("Inherited qhs: ", qhs);
        // console.log(A.qhsPoset);
        cyto = initSVG(document.getElementById("cyQHS"), data.cytoElts, true);
    }

    cyto.on("tap", "node", (e) => showTilting(e.target));
    document.getElementById("btnPathQuotient").disabled = false;
    document.getElementById("saveJSON-trigger").disabled = false;
}

function showTilting(node) {
    let struc = qhs.qhs[parseInt(node.id()) - 1];
    posetCyto = initSVG(
        document.getElementById("cyPoset"),
        coverArrayToCyto(struc.coverRel)
    );
    // console.log(`tilting module (id=${node.id()}) = `, A.charTilting(struc.std, struc.costd));

    // let hilite = document.querySelector('input[name="hilite"][type="radio"]:checked').value;
    let T = A.charTilting(struc.std, struc.costd);
    let FStd = A.LeftOrthoCat(T),
        FCostd = A.RightOrthoCat(T);
    // let M = hilite == "FStd" ? A.LeftOrthoCat(T) : hilite == "FCostd" ? A.RightOrthoCat(T) : T;
    // addModules(M, true);
    addModules(FStd, FCostd, T);
    markStdCostdModInARQuiver(struc.std, struc.costd);
}

function partitionQHS() {
    partition = A.partitionQHS();
    updateLog();
    //slow method, but practically enough
    let palette = chroma
        .scale("RdYlBu")
        .colors(Math.max(partition.length, 3))
        .map((c) => chroma(c).brighten(1).hex());

    // const selElt = document.getElementById("partitionGroup");
    for (let i = 0; i < partition.length; i++) {
        // console.log(`color ${palette[i]} (type: ${typeof palette[i]})`);
        let ii = (i * (partition.length - 1)) % partition.length;
        // const style = document.createElement('style');
        // style.type = 'text/css';
        // style.innerHTML = `.vxGp${i} { background-color: #fff; }`;
        // document.getElementsByTagName('head')[0].appendChild(style);

        for (let elt of partition[i]) {
            let node = cyto.getElementById(`${parseInt(elt) + 1}`);
            // node.addClass(`vxGp${i}`); // addClass doesn't really apply style
            node.style("background-color", palette[ii]);

            // bad behaviour with white color
            // arrow tip doesn't change color....
            // let edges = node.edgesWith(`.vxGp${i}`);
            // for (let e of edges) {
            //     e.style("line-color", palette[ii])
            // }
        }
        // TODO: add displacement of node group
        // const item = document.createElement("option");
        // item.appendChild(document.createTextNode(`Group ${i + 1}`));
        // item.setAttribute("value", i);
        // selElt.appendChild(item);
    }
    createPartitionSelection(partition);
}

function quotientQHS() {
    let [x, y] = document
        .getElementById("pathQuotient")
        .value.trim()
        .split(",")
        .map((x) => parseInt(x));
    let partition = [[], []];
    // console.log(A);
    // console.log(A.qhsPoset);
    for (let i = 0; i < A.qhsPoset.qhs.length; i++) {
        let r = A.qhsPoset.qhs[i].relationMx;
        let conditionG = true;
        let j = x - 1;
        while (j++ < y - 1 && conditionG) {
            conditionG = r[y - 1][j] == 1 ? r[j][x - 1] == 1 : conditionG;
        }
        if (!conditionG) {
            // failed condition G => color vertex as grey
            let node = cyto.getElementById(`${parseInt(i) + 1}`);
            node.style("background-color", "#777");
            partition[1].push(i);
        } else {
            // console.log("succeed: ", r);
            partition[0].push(i);
        }
    }
    createPartitionSelection(partition);
    updateLog(`${partition[0].length} qhs' satisfy (G)\n`);
}

//#region log
function resetLog() {
    logArea.innerHTML = "";
}
function updateLog(str = "") {
    let s = `\n${str}\n` + A.log.allFromLastGet.join("\n");
    console.log(s);
    logArea.innerHTML += s;
    logArea.scrollTop = logArea.scrollHeight;
}

/***********************
 *  File IO
 *
 */
document.getElementById("genByKupisch").addEventListener("click", (e) => {
    generate(JSON.parse(document.getElementById("kupisch").value));
});
document.getElementById("saveJSON").addEventListener("click", (e) => {
    // if (!A.isGentle) {
    //     updateLog("Cannot save data when algebra is not gentle");
    //     return;
    // }
    let templog = A.log.record();
    A.resetLog();
    let obj = { algebra: A, qhs: qhs, cytoElts: cyto.json().elements };
    let blob = new Blob([JSON.stringify(obj)], {
        type: "application/json;charset=utf-8",
    });
    saveAs(blob, document.getElementById("filenameInput").value + ".json");
    A.log.load(templog);
});

document.getElementById("loadJsonBtn").addEventListener("change", (event) => {
    let reader = new FileReader();
    reader.addEventListener(
        "load",
        () => {
            let res = JSON.parse(reader.result);
            resetLog();
            generate(res.algebra.kupisch, res);
        },
        false
    );
    reader.readAsText(event.target.files[0]);
});

/***********************
 *  SVG div zooming
 *
 */
// var svgScale = 1;
// document.getElementById("svg").addEventListener("wheel", (e) => {
//     e.preventDefault();
//     svgScale += event.deltaY * -0.001;
//     svgScale = Math.min(Math.max(0.125, svgScale), 1);
//     // Apply scale transform
//     document.getElementById("svg").style.transform = `scale(${svgScale})`;
// });

//#region accordion handling
/***********************
 *  accordion handling (Kevin Powell style)
 */
const accordion = document.querySelector(".accordion");
accordion.addEventListener("click", (e) => {
    if (e.target.matches(".accordion-trigger")) {
        const activePanel = e.target.closest(".accordion-panel");
        if (!activePanel) return;
        toggleAccordion(activePanel);
    }
});

function toggleAccordion(panel) {
    const activeButton = panel.querySelector("button");
    // const activePanel = panel.querySelector(".accordion-content");

    if (activeButton.getAttribute("aria-expanded") === "true") {
        panel.querySelector("button").setAttribute("aria-expanded", false);

        panel
            .querySelector(".accordion-content")
            .setAttribute("aria-hidden", true);
    } else {
        panel.querySelector("button").setAttribute("aria-expanded", true);

        panel
            .querySelector(".accordion-content")
            .setAttribute("aria-hidden", false);
    }
}

async function copyToClipboard(txt) {
    /**
     * c.f. https://stackoverflow.com/questions/71873824/copy-text-to-clipboard-cannot-read-properties-of-undefined-reading-writetext
     * Copies the text passed as param to the system clipboard
     * Check if using HTTPS and navigator.clipboard is available
     * Then uses standard clipboard API, otherwise uses fallback
     */
    if (window.isSecureContext && navigator.clipboard) {
        navigator.clipboard.writeText(txt);
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = txt;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand("copy");
        } catch (err) {
            console.error(
                "Unable to copy text to clipboard with execCommand",
                err
            );
        }
        document.body.removeChild(textArea);
    }
}
