function identicalNumArray(a, b) {
    return a.reduce((prev, curr, i) => prev && curr == b[i], true);
}

function indexOfNumArray(fromArray, findArray) {
    return fromArray.findIndex((x) => identicalNumArray(x, findArray));
}

function cyclicOrder(m, from, end = -1, direction = "cw") {
    let arr = Array.from(Array(m).keys(), (i) => i + 1);
    arr = [...arr.slice(from - 1), ...arr.slice(0, from - 1)];
    if (end != -1) {
        arr = arr.slice(0, arr.indexOf(end));
    }
    return direction == "cw" ? arr : arr.reverse();
}

function cyclicCompare(a, b, order) {
    //let arr = cyclicOrder(m, from, direction);
    return order.indexOf(a) - order.indexOf(b);
}

// chain is assumed to be less than 1 revolution
function isCyclicChain(chain, m, order = null) {
    if (order != null) {
        m = order.length;
    } else {
        order = cyclicOrder(m, chain[0]);
    }
    let diff = chain.map((x) => order.indexOf(x));
    return diff.reduce(
        (isInc, current, i, diff) =>
            i == 0 ? true : isInc && current >= diff[i - 1],
        true
    );
}

function isCyclicIntervalsNonCrossing(a, b, m) {
    let order = cyclicOrder(m, a[0]);
    return !(
        isCyclicChain([a[0], b[0], a[1], b[1]], m, order) ||
        isCyclicChain([a[0], b[1], a[1], b[0]], m, order)
    );
}

class DiskModel {
    log = [];
    algebra;
    valencies;
    dualVals;
    arcsys;
    dissection;
    constructor(kupisch = null) {
        // this.m = m; // number of (single-coloured) marked points
        // this.valencies = Array(m).fill(0);
        // this.dualValencies = Array(m).fill(0);
        this.log = [];
        if (kupisch) {
            this.arcSysFromKupisch(kupisch);
        }
    }

    static valenciesFromKupisch(kup, dual = false) {
        if (kup.length < 2) return [1, 1];

        var changes = [1];
        var i = 1;
        while (i < kup.length) {
            if (dual) {
                if (kup[i - 1] > kup[i]) {
                    changes.push(i + 1);
                }
            } else {
                if (!(kup[i - 1] > kup[i])) {
                    changes.push(i + 1);
                }
            }
            i++;
        }
        if (!dual) {
            changes.push(kup.length);
        }
        var diff = [];
        var valencies = [];
        for (i = 1; i < changes.length; i++) {
            let d = changes[i] + 1 - changes[i - 1];
            valencies.push(d);
            diff.push(d - 2);
        }
        diff[0]++;
        diff[diff.length - 1]++; // special treatment...
        for (i = diff.length - 1; i >= 0; i--) {
            valencies = valencies.concat(Array(diff[i]).fill(1));
        }
        if (!dual) {
            valencies.reverse();
        }
        return valencies;
    }
    //let kup = [3,2,3,2,2,1];
    //let val = valenciesFromKupisch([3,2,3,2,2,1]);
    //return [1,1,1,1,2,3,3] (valency from clockwise direction)
    // (with first entry corresponds to the valency 1 marked point attached to arc<->P1)
    //let val = valenciesFromKupisch([3,2,4,3,2,1],true);
    // return [ 2, 3, 2, 2, 1, 1, 1 ] (valency from clockwise direction)

    static valenciesToArcs(vals) {
        let j = vals.length - 1;
        let i = 1;
        let arcs = [];

        arcs.push([1, vals.length]);
        while (vals[j] > 1) {
            for (let k = i; k - i < vals[j] - 2; k++) {
                arcs.push([k + 1, j + 1]);
            }
            arcs.push([j, j + 1]);
            i += vals[j] - 2;
            j--;
        }

        return arcs;
    }
    // let val = [1,1,1,1,2,3,3];
    // let arcs = valenciesToArcs(val);
    // return arcs=[ [ 1, 7 ], [ 2, 7 ], [ 6, 7 ], [ 3, 6 ], [ 5, 6 ], [ 4, 5 ] ]

    static valenciesToDualArcs(vals) {
        let revVals = [...vals].reverse();
        let arcs = this.valenciesToArcs(revVals);
        let n = vals.length;
        return arcs.map((a) => [n + 1 - a[1], n + 1 - a[0]]);
    }
    // let val = [2,3,2,2,1,1,1];
    // let arcs = valenciesToDualArcs(val);
    // return arcs=[ [ 1, 7 ], [ 1,2 ], [ 2,6 ], [ 2,3 ], [ 3, 4 ], [ 4, 5 ] ]

    //let d = arcSysOfKupisch([3,2,4,3,2,1]);
    // d = [ [ 1, 7 ], [ 1, 2 ], [ 2, 6 ], [ 2, 3 ], [ 3, 4 ], [ 4, 5 ] ]
    arcSysFromKupisch(kup) {
        this.algebra = new LNakayama(kup);
        if (this.algebra.isGentle) {
            // dissection
            this.log.push("✔ Dissection and dual arc system.");
        } else {
            this.log.push("❌ Input algebra is not gentle LNakayama.");
        }

        this.dualVals = this.constructor.valenciesFromKupisch(kup, true);
        this.m = this.dualVals.length;
        this.log.push(`✔ Valencies of red pts: [ ${this.dualVals} ]`);
        let unordArcSys = this.constructor.valenciesToDualArcs(this.dualVals);
        let arcsys = [unordArcSys[0]];
        unordArcSys = unordArcSys.slice(1);

        // organise arcs in arc system to match with Kupisch series
        let endpt = 1;
        while (unordArcSys.length > 0) {
            let t = [],
                sameEndpt = [];
            for (let x of unordArcSys) {
                // separate arcs that ends with endpt
                //only need to check the samller valued endpt
                (x[0] == endpt ? sameEndpt : t).push(x);
            }
            sameEndpt = sameEndpt.sort(([, x1], [, y1]) => y1 - x1);
            for (let y of sameEndpt) {
                arcsys.push(y);
            }
            unordArcSys = t;
            endpt = arcsys[arcsys.length - 1][1];
        }
        this.arcsys = arcsys;
        this.log.push(`✔ Dual arc system: [ ${arcsys} ]`);

        // organise laminates in dissection to match with (ordered) arc system
        this.valencies = this.constructor.valenciesFromKupisch(kup);
        this.log.push(`✔ Valencies of green pts: [ ${this.valencies} ]`);
        let unordLams = this.constructor.valenciesToArcs(this.valencies);
        let lams = [[1, this.m]];
        for (let i = 1; i < arcsys.length; i++) {
            let lam;
            if (this.dualVals[arcsys[i][0] - 1] == 1) {
                lam = [arcsys[i][0], arcsys[i][0] + 1];
            } else if (this.dualVals[arcsys[i][1] - 1] == 1) {
                lam = [arcsys[i][1], arcsys[i][1] + 1];
            } else {
                // arcsys[i] = [j-1,j]
                // corresp. lam is unique in unordLams with endpt j
                lam = unordLams.filter(
                    (l) => l[0] == arcsys[i][1] || l[1] == arcsys[i][1]
                )[0];
            }
            lams.push(lam);
        }
        this.dissection = lams;
        this.log.push(`✔ Dissection: [ ${lams} ]`);

        return arcsys;
    }

    // find the arc in a given set of arcs after the given arc at given endpoint in given direction
    static nextArc(arcIdx, arcs, direction = "ccw") {
        let arc = arcs[arcIdx];
        let otherEnd = arc[0] == endpt ? arc[1] : arc[0];
        let nextpt =
            direction == "ccw"
                ? otherEnd - 1 >= 1
                    ? otherEnd - 1
                    : m
                : otherEnd + 1 <= m
                ? otherEnd + 1
                : 1;
        let nextarc = endpt < nextpt ? [endpt, nextpt] : [nextpt, endpt];
        let idx = indexOfNumArray(arcs, nextarc);
        while (idx == -1 && nextpt != endpt) {
            nextpt =
                direction == "ccw"
                    ? nextpt - 1 >= 1
                        ? nextpt - 1
                        : m
                    : nextpt + 1 <= m
                    ? nextpt + 1
                    : 1;
            nextarc = endpt < nextpt ? [endpt, nextpt] : [nextpt, endpt];
            idx = indexOfNumArray(arcs, nextarc);
        }
        return nextpt != endpt ? arcs[idx] : -1;
    }

    moduleToLaminate(M) {
        let dualarcs = this.arcsys ? this.arcsys : this.dualArcSys();
        let projres = this.algebra.projRes(M);
        // let arc0 = dualarcs[projres[0] - 1];
        // let arc1 = dualarcs[projres[projres.length - 1] - 1];
        this.log.push(
            `Module [${M}] has proj.res: 0 <- P${projres.join(" <- P")} <- 0.`
        );
        if (projres.length == 1) {
            this.log.push(` -> laminate [${this.dissection[projres[0]]}]`);
            return this.dissection[projres[0]];
        } else {
            let idx1 = projres[0],
                idx2 = projres[projres.length - 1];
            let lams = [this.dissection[idx1 - 1], this.dissection[idx2 - 1]];
            let orders = []; // boundary subintervals cut out by the two lam's
            // !! this code only works when P(1) = arc [1,m]
            let [x1, x2] = dualarcs[idx1 - 1];
            let [y1, y2] = dualarcs[idx2 - 1];
            if (isCyclicChain([x1, x2, y1, y2], this.m)) {
                orders = [
                    [x1, x2],
                    [y1, y2],
                ];
            } else if (isCyclicChain([x2, x1, y1, y2], this.m)) {
                orders = [
                    [x2, x1],
                    [y1, y2],
                ];
            } else {
                this.log.push(
                    "❌ Something wrong in the ordering of arcs' endpoints."
                );
            }
            // determine green mkpt in the bdry subint.s
            let endpts = orders.map((o, i) =>
                isCyclicChain([o[0], lams[i][0], o[1]], this.m)
                    ? lams[i][0]
                    : lams[i][1]
            );
            this.log.push(` -> laminate [${endpts}]`);
            return endpts[0] < endpts[1] ? endpts : [endpts[1], endpts[0]];
        }
    }
}

// function dissectionFromArcSys(arcSys, m, dualVals) {
//     // for simplicity, assume [1,m] is the first arc in arcSys
//     // TODO: handle the other cases
//     let res = [[1, m]];
//     console.log(dualVals);
//     for (let i = 1; i < arcSys.length; i++) {
//         if (dualVals[arcSys[i][0] - 1] == 1) {
//             res.push([arcSys[i][0], arcSys[i][0] + 1]);
//         } else if (dualVals[arcSys[i][1] - 1] == 1) {
//             res.push([arcSys[i][1], arcSys[i][1] + 1]);
//         } else {
//             // one of the point is arcSys[i][1]
//             let nextarc = nextRedArc(arcSys[i], arcSys[i][1], m, arcSys);
//             let pt = nextarc[1] + 1;
//             while (nextarc != -1) {
//                 pt = nextarc[1] + 1;
//                 nextarc = nextRedArc(nextarc, nextarc[1], m, arcSys);
//             }
//             res.push([arcSys[i][1], pt]);
//         }
//     }
//     return res;
// }

function oppositeGreenMkpt(
    arcIdx,
    vsArcIdx,
    arcSys,
    m,
    dualVals,
    greenMkpts = null
) {
    if (arcSys[arcIdx] == [1, m]) {
        return 1;
    }
    if (arcSys[arcIdx][1] - arcSys[arcIdx][0] == 1) {
        return arcSys[arcIdx][1];
    }

    if (!greenMkpts) {
        greenMkpts = dissectionFromArcSys(arcSys, m, dualVals);
    }
    let pair = greenMkpts[arcIdx];
    let order = cyclicOrder(m, arcSys[arcIdx][0]);
    order = order.slice(0, order.indexOf(arcSys[arcIdx][1]) + 1);
    pair = order.indexOf(pair[0]) == -1 ? [pair[1], pair[0]] : pair;
    if (
        arcSys[arcIdx][0] < arcSys[vsArcIdx][0] &&
        arcSys[vsArcIdx][1] < arcSys[arcIdx][1]
    ) {
        return pair[1];
    } else {
        return pair[0];
    }
}
