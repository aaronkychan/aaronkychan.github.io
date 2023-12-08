function coverArrayToCyto(poset, idModify = null) {
    let res = {
        nodes: poset.map((x, i) => {
            return { data: { id: idModify ? idModify(i) : `${i + 1}` } };
        }),
        edges: [],
    };
    poset.forEach((coverx, i) => {
        coverx.forEach((j) => {
            res.edges.push({
                data: {
                    id: idModify
                        ? `${idModify(i)}<-${idModify(j)}`
                        : `${i + 1}<-${j + 1}`,
                    source: idModify ? idModify(j) : `${j + 1}`,
                    target: idModify ? idModify(i) : `${i + 1}`,
                },
            });
        });
    });
    return res;
}

/**
 * @param  {} posets
 */
function convertGroupsOfPoset(posets) {
    //let newPosets = posetGroup.posets.map((p) => coverArrayToCyto(p));
    let res = coverArrayToCyto(posets.order);
    for (let [i, p] of Object.entries(posets.posets)) {
        let converted = coverArrayToCyto(
            p,
            (id) => `${parseInt(i) + 1}.${id + 1}`
        );
        converted.nodes.forEach((node) => {
            node.data.parent = `${parseInt(i) + 1}`;
            res.nodes.push(node);
        });
        converted.edges.forEach((edge) => res.edges.push(edge));
    }
    // console.log(res);
    return res;
}

/************************
 * Cytoscape part
 */

function initSVG(container, data, isPreset = false) {
    let layout = isPreset
        ? { name: "preset" }
        : {
              name: "elk",
              elk: {
                  algorithm: "layered",
                  "elk.direction": "DOWN",
              },
              fit: true,
              padding: 20,
              nodeDimensionsIncludeLabels: true,
          };
    // : {
    //       name: "dagre",
    //       fit: true,
    //       padding: 20,
    //       nodeDimensionsIncludeLabels: true,
    //       // name: "breadthfirst",
    //       // roots: "max",
    //       // ready:,
    //       // stop:,
    //   };
    return cytoscape({
        container: container,
        elements: data,
        style: [
            {
                selector: "node",
                css: {
                    width: 25,
                    height: 25,
                    "background-color": "#ffff00",
                    "border-width": "1px",
                    "border-color": "#999",
                    content: "data(id)",
                    "text-valign": "center",
                    "text-halign": "center",
                },
            },

            {
                selector: "node:selected",
                style: {
                    "background-color": "#fa5252",
                    "border-width": "3px",
                    "border-color": "#000",
                    width: 30,
                    height: 30,
                },
            },

            {
                selector: "node:parent",
                css: {
                    "text-valign": "top",
                    "text-halign": "center",
                    "background-color": "#222",
                    "background-opacity": 0.333,
                },
            },

            {
                selector: "node.inList",
                style: {
                    // "background-color": "#63b7f2",
                    shape: "rectangle",
                },
            },

            {
                selector: "edge",
                style: {
                    width: 2,
                    "line-color": "#999",
                    "target-arrow-color": "#999",
                    "target-arrow-shape": "triangle",
                    "curve-style": "bezier",
                },
            },
            {
                selector: "edge.btwnParents",
                style: {
                    width: 4,
                    "line-color": "#000",
                    "target-arrow-color": "#000",
                    "target-arrow-shape": "triangle",
                    "curve-style": "bezier",
                },
            },
        ],

        layout: layout,

        selectionType: "single",
        userZoomingEnabled: true,
        userPanningEnabled: true,
        wheelSensitivity: 0.3,
        pan: { x: 40, y: 40 },
    });
}
