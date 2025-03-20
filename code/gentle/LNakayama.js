class LNakayama {
    kupisch = [2, 1];
    rank = 2;
    isGentle = true;
    log;
    relations = [];
    projs = [];
    injs = [];
    qhsPoset = [];
    qhsPosetPartitioned = [];
    indecs = [];
    gldim = 0;
    constructor(
        { kupisch = [], logger = null, data = null } = { kupisch: [] }
    ) {
        if (data !== null) {
            Object.assign(this, data);
            this.log = logger == null ? new Logger() : logger;
        } else {
            this.log = logger == null ? new Logger() : logger;
            if (!this.isLNakayama(kupisch)) {
                return this.log;
            }
            this.kupisch = kupisch;
            this.rank = kupisch.length;
            this.relations = this.computeRelations();
            this.isGentle = this.relations.reduce(
                (prev, curr) => prev && curr[1] - curr[0] == 2,
                true
            );
            this.log.add(
                `Loaded ${
                    this.isGentle ? "" : "non-"
                }gentle LNakayama of rank ${this.rank}.`
            );
            this.projs = kupisch.map((l, i) => [i + 1, i + l]);
            this.injs = Array.from(Array(this.rank).keys()).map((i) => {
                let j = i;
                while (j >= 0) {
                    let top = this.relations.filter((r) => r[1] == j);
                    if (top.length > 0) {
                        //there is relation from top[0][0]+1 to j<=i
                        return [top[0][0] + 2, i + 1];
                    } else {
                        j--;
                    }
                }
                return [1, i + 1];
            });
            this.gldim = Math.max(
                ...this.projs.map((P) => this.pdim([P[0], P[0]]))
            );
            this.log.add(`gldim(A)=${this.gldim}`);
            this.indecs = this.projs
                .map((_, i) =>
                    [...Array(kupisch[i]).keys()].map((j) => [i + 1, i + 1 + j])
                )
                .flat();
            console.table(this.indecs);
            this.log.add(`| indec(A) | = ${this.indecs.length}`);
            // this.modules = Array(this.rank);
            // for (let i = 0; i < this.rank; i++) {
            //     this.modules[i] = Array(this.projs[i]);
            //     this.modules[i][this.projs[i] - 1] = {
            //         top: i + 1,
            //         soc: this.projs[i][1],
            //         len: this.kupisch[i],
            //         proj: true,
            //         inj: this.isInjective(projs[i]),
            //         projres: [this.projs],
            //         pdim: 0,
            //         injres: [],
            //         idim: null,
            //         syzygy: 0,
            //         cosyzygy: null,
            //     };
            // }
        }
    }

    isValidKupisch(kup) {
        let test = kup.length > 1;
        let i = 0;
        while (test && i < kup.length - 1) {
            test = kup[i + 1] >= kup[i] - 1 && kup[i] - 1 >= 1;
            i++;
        }
        test = test ? kup[1] >= kup[kup.length - 1] - 1 : test;
        return test;
    }

    static kupischFromZComposition(zcomp) {
        let res = zcomp.map((a) => {
            return new Array(a).fill(0).map((_, j) => a + 1 - j);
        });
        res.push(1);
        return res.flat();
    }

    resetLog() {
        this.log = new Logger();
    }

    isLNakayama(kup) {
        if (this.isValidKupisch(kup)) {
            if (kup[kup.length - 1] != 1) {
                this.log.add("Not LNakayama");
            } else {
                return true;
            }
        } else {
            this.log.add("Not a valid Kupisch series");
        }
        return false;
    }

    isGentle() {
        this.isGentle = (
            this.relations ? this.relations : this.computeRelations()
        ).reduce((prev, curr) => prev && curr[1] - curr[0] == 2, true);
        return this.isGentle;
    }

    gentleZComposition() {
        if (this.isGentle) {
            let res = ArraySplit(this.kupisch, 2)
                .slice(0, -1)
                .map((x) => (x.length > 0 ? x[0] - 1 : 1));
            this.log.add(
                `Integer composition corresponding to gentle structure: [${res}]`
            );
            return res;
        } else {
            this.log.add(`Not gentle => no integer composition.`);
            return false;
        }
    }

    // return format [[s,t],[s',t']] where each [s,t] means path s+1->..->t+1 is a reln
    // code is extracted and modified from QPA
    computeRelations() {
        let rels = [];
        // let i = 0;
        for (let i = 0; i < this.rank - 2; i++) {
            if (this.kupisch[i] - 1 != this.kupisch[i + 1]) {
                rels.push([i, i + this.kupisch[i]]);
            }
        }
        // while (this.kupisch[i] < this.rank - i) {
        //         // i = i + this.kupisch[i] - 1;
        //     // } else {
        //         // i++;
        //     }
        // }
        this.relations = rels;
        if (this.relations.length > 0)
            this.log.add(`Relations [src vx,tgt vx]: ${JSON.stringify(rels)}`);
        else this.log.add("Quiver algebra with no relation");
        return rels;
    }

    // module M = [i,j] with i=top M, j=soc M
    isModule(M) {
        return (
            M[0] <= M[1] &&
            M[0] >= 1 &&
            M[1] <= this.rank &&
            M[1] - M[0] < this.kupisch[M[0] - 1]
        );
    }

    syzygy(M) {
        let syzygyLen = this.kupisch[M[0] - 1] - (M[1] + 1 - M[0]);
        return syzygyLen > 0 ? [M[1] + 1, M[1] + syzygyLen] : 0;
    }

    cosyzygy(M) {
        let injenv = this.injs[M[1]];
        return this.isInjective(M) ? 0 : [injenv[0], M[0] - 1];
    }

    isIsom(M, N) {
        return M[0] == N[0] && M[1] == N[1];
    }

    isZero(M) {
        return this.isIsom(M, [0, 0]);
    }

    isProjective(M) {
        return this.isIsom(M, this.projs[M[0] - 1]);
    }

    isInjective(M) {
        return this.isIsom(M, this.injs[M[1] - 1]);
    }

    isNoHom(M, N) {
        return (
            this.isZero(M) ||
            this.isZero(N) ||
            M[0] > N[1] ||
            M[0] < N[0] ||
            M[1] < N[1]
        );
    }

    Ker(M, N) {
        let b = this.isNoHom(M, N);
        let K = b ? M : [N[1] + 1, M[1]];
        // this.log.add(
        //     b ? `💭 No non-zero hom [${M}]->[${N}] => Ker=[${M}]`
        //       : `💭 Ker( [${M}]->[${N}] ) = [${K}]`
        // );
        return K;
    }

    Image(M, N) {
        let b = this.isNoHom(M, N);
        let I = b ? [0, 0] : [M[0], N[1]];
        // this.log.add(
        //     b ? `💭 No non-zero hom [${M}]->[${N}] => Image=0`
        //       : `💭 Image( [${M}]->[${N}] ) = [${I}]`
        // );
        return I;
    }

    Coker(M, N) {
        let b = this.isNoHom(M, N);
        let C = b ? N : [N[0], M[0] - 1];
        // this.log.add(
        //     b   ? `💭 No hom [${M}]->[${N}] => Coker=0`
        //         : `💭 Coker( [${M}]->[${N}] ) = [${C}]`
        // );
        return C[0] > C[1] ? [0, 0] : C;
    }

    composedImage(L, M, N) {
        return this.isNoHom(M, N) ? [0, 0] : this.Image(this.Image(L, M), N);
    }

    isFactorThrough(L, M, N) {
        return this.isNoHom(M, N)
            ? false
            : this.isIsom(this.Image(L, N), this.composedImage(L, M, N));
    }

    projRes(M) {
        let sy = this.syzygy(M, this.kupisch);
        let projres = [M[0]];
        while (sy) {
            projres.push(sy[0]);
            sy = this.syzygy(sy, this.kupisch);
        }
        return projres;
    }

    ExtNonVanishingDegree(M, N) {
        const res = this.projRes(M).map((i) => this.projs[i - 1]);
        for (let i = 1; i < res.length; i++) {
            // no hom at deg k
            // console.log(`Hom([${res[i]}],[${N}])=${this.Image(res[i], N)}`);
            if (this.isNoHom(res[i], N)) continue;
            else {
                if (res[i - 1][0] <= N[0]) {
                    // there is map from P_{i-1} to N
                    // if (this.isZero(this.composedImage(res[i], res[i - 1], N))) return i; // doesn't factor thru
                    if (
                        i < res.length - 1
                            ? this.isZero(
                                  this.composedImage(res[i + 1], res[i], N)
                              )
                            : true
                    ) {
                        // has cocycle
                        // console.log(`Z${i} Hom( P_[${M}],[${N}] ) nonzero`);
                        // console.log(
                        //     `res[${i}]=${res[i]} -> res[${i - 1}]=${
                        //         res[i - 1]
                        //     } -> N=${N}`
                        // );
                        if (!this.isFactorThrough(res[i], res[i - 1], N)) {
                            return i;
                        }
                    }
                }
            }
        }
        return -1;
    }

    isSelfOrthogonal(M) {
        return this.ExtNonVanishingDegree(M, M) < 0;
    }

    // if deg = -1, then take ortho at all degree
    LeftOrthoCat(Ms, deg = -1) {
        let d = deg >= 0 ? deg : this.gldim + 1;
        return this.indecs.filter((X) =>
            Ms.reduce((out, M) => {
                let x = this.ExtNonVanishingDegree(X, M);
                return out && (x > d || x == -1);
            }, true)
        );
    }

    RightOrthoCat(Ms, deg = -1) {
        let d = deg >= 0 ? deg : this.gldim;
        return this.indecs.filter((X) =>
            Ms.reduce((out, M) => {
                let x = this.ExtNonVanishingDegree(M, X);
                return out && (x > d || x == -1);
            }, true)
        );
    }

    isTilting(Ms) {
        if (Ms.length < this.rank) return false;
        for (let M of Ms) {
            for (let N of Ms) {
                if (this.ExtNonVanishingDegree(M, N) > 0) return false;
            }
        }
        return true;
    }

    tiltingModIrredLeftMutation(T, atX) {
        let idx = Array.isArray(atX)
            ? atX.findIndex((y) => y[0] == atX[0] && y[1] == atX[1])
            : atX;
        // let TquotX = idx[...T.slice(0, idx), ...T.slice(idx + 1)];
        // sort by first top, then by Loewy length
        let TquotX = this.orderDirectSummandsByTopThenLL(
            T.filter((_, i) => i != idx)
        );
        console.log("tiltingModIrredLeftMutation: TquotX = ", TquotX);
        let flag = false;
        // find minimal left add(T/X)-approximation
        let images = TquotX.map((M) => this.Image(T[idx], M));
        let nonZeroMapIdx = images
            .map((Imf, i) => (this.isZero(Imf) ? -1 : i))
            .filter((j) => j != -1);
        let approxAt = [];
        for (let i = 0; i < nonZeroMapIdx; i++) {
            let notApprox = false;
            for (let j = 0; j < i; j++) {
                notApprox =
                    notApprox ||
                    this.isFactorThrough(
                        T[idx],
                        TquotX[nonZeroMapIdx[j]],
                        TquotX[nonZeroMapIdx[i]]
                    );
            }
            if (!notApprox) approxAt.push(i);
        }

        if (approxAt.length == 0) return T;
        if (approxAt.length == 1)
            return this.isSub(T[idx], TquotX[approx[0]])
                ? TquotX.concat([this.Coker(T[idx], TquotX[approxAt[0]])])
                : T;
        // two indec modules in min. left approx
        let U = TquotX[approxAt[0]],
            V = TquotX[approxAt[1]];
        return TquotX.concat([U[1] < V[1] ? [V[0], U[1]] : [U[0], V[1]]]);
    }

    orderDirectSummandsByTopThenLL(M) {
        // X < Y if top X > top Y
        //          or  top X = top Y and LL(Y)<LL(X)
        // i.e. X < Y if X is (roughly) on the left of Y on the AR quiver
        return M.toSorted((a, b) => b[0] - a[0] || a[1] - a[0] - b[1] + b[0]);
    }

    pdim(M) {
        let d = 0,
            X = M;
        while (!this.isProjective(X)) {
            X = this.syzygy(X);
            d++;
        }
        return d;
    }

    idim(M) {
        let d = 0,
            X = M;
        while (!this.isInjective(X)) {
            X = this.cosyzygy(X);
            d++;
        }
        return d;
    }

    // gldim() {
    //     let pdimS = Array.from(Array(this.rank).keys()).map((x) =>
    //         this.pdim([x, x])
    //     );
    //     return Math.max(pdimS);
    // }

    computeForModule(M) {
        let res = { top: M[0], soc: M[1], len: M[1] - M[0] + 1 };
        res["proj"] = this.isProjective(M);
        res["inj"] = this.isInjective(M);
        res["projres"] = this.projRes(M);
        res["pdim"] = res["projres"].length - 1;
        res["syzygy"] = this.syzygy(M);
        return res;
        // this.modules = Array(this.rank);
        // for (let i = 0; i < this.rank; i++) {
        //     this.modules[i] = Array(this.projs[i]);
        //     this.modules[i][this.projs[i] - 1] = {
        //         top: i + 1,
        //         soc: this.projs[i][1],
        //         len: this.kupisch[i],
        //         proj: true,
        //         inj: this.isInjective(projs[i]),
        //         projres: [this.projs],
        //         pdim: 0,
        //         injres: [],
        //         idim: null,
        //         syzygy: 0,
        //         cosyzygy: null,
        //     };
        // }
    }

    /***** Quasi-hereditary structure related *****/

    Trace(Ms, N) {
        let hasHom = Ms.filter((M) => !this.isNoHom(M, N)).map((M) => M[0]); //only need the top
        return hasHom.length == 0 ? [0, 0] : [Math.min(...hasHom), N[1]];
    }

    Rej(M, Ns) {
        let hasHom = Ns.filter((N) => !this.isNoHom(M, N)).map((N) => N[1]); //only need the soc
        return hasHom.length == 0 ? M : [Math.max(...hasHom) + 1, M[1]];
    }

    inductiveConstructModsFromPermutation(perm, base, op) {
        if (perm.length != this.rank) {
            return [[0, 0]];
        }
        let rev = [...perm].reverse();
        let mods = Array(perm.length).fill([0, 0]);
        let largers = [];
        let i = 1;
        mods[rev[0] - 1] = base[rev[0] - 1];
        while (i < rev.length) {
            largers.push(base[rev[i - 1] - 1]);
            mods[rev[i] - 1] = op(largers, base[rev[i] - 1]);
            i++;
        }
        return mods;
    }

    standardMods(perm) {
        return this.inductiveConstructModsFromPermutation(
            perm,
            this.projs,
            (largers, M) => this.Coker(this.Trace(largers, M), M)
        );
    }

    costandardMods(perm) {
        return this.inductiveConstructModsFromPermutation(
            perm,
            this.injs,
            (largers, M) => this.Rej(M, largers)
        );
    }

    charTilting(std, costd) {
        return std.map((M, i) => [costd[i][0], std[i][1]]);
    }

    minAdaptedOrder(std, costd) {
        let dec = std.map((s, i) =>
            this.projs.reduce(
                (prev, pj, j) =>
                    i != j && !this.isNoHom(pj, s) ? [...prev, j] : prev,
                []
            )
        );
        //dec[i] = {j1, j2,...} s.t. j_k < i
        let inc = costd.map((c, i) =>
            this.projs.reduce(
                (prev, pj, j) =>
                    i != j && !this.isNoHom(pj, c) ? [...prev, j] : prev,
                dec[i]
            )
        );
        return CoveringRelation(TransitiveClosure(BinRelToAdjMx(inc, true)));
        // result[i] = everything covered by i.
    }

    minAdaptedOrderByPermutation(perm) {
        return this.minAdaptedOrder(
            this.standardMods(perm),
            this.costandardMods(perm)
        );
    }

    isSub(L, M) {
        return L[1] == M[1] && L[0] <= M[0];
    }

    isQuot(M, N) {
        return M[0] == N[0] && M[1] >= N[1];
    }

    isIndecDirectSummand(M, arrN) {
        return this.isZero(M)
            ? arrN
            : arrN.reduce((prev, N) => prev || this.isIsom(M, N), false);
    }

    isDirectSummand(arrM, arrN) {
        let b = true;
        for (let M of arrM) {
            b = b && this.isIndecDirectSummand(M, arrN);
            if (!b) {
                // this.log.add(
                //     `[${M}] is not a direct summand of ${JSON.stringify(arrN)}`
                // );
                return false;
            }
        }
        return b;
    }

    partitionQHS() {
        if (this.qhsPoset.length == 0) {
            this.findAllMAOs();
        }

        if (!this.isGentle) {
            this.qhsPosetPartitioned = [this.qhsPoset];
            return this.qhsPosetPartitioned;
        }

        let parts;
        // no relation across vertex i:=lastNoRel+1 <= this.rank-2
        let lastNoRel = this.kupisch.findLastIndex((x) => x > 2);
        let hasRelAtEnd = this.rank > 2 && this.kupisch[this.rank - 3] == 2;
        if (lastNoRel < this.rank - 1 && !hasRelAtEnd) {
            // no relation across vertex n-1
            let lastRel = this.kupisch
                .slice(0, -2)
                .findLastIndex((x) => x == 2);
            // no relation across vertices lastRel+2
            let n = this.rank - 1 - lastRel;
            this.log.add(
                `Catalan-type partition: relationless tail of length ${n}`
            );
            parts = this.projs
                .slice(-n)
                .reverse()
                .map((P, i) => {
                    let Q = this.Coker([this.rank, this.rank], P);
                    // TRICK! use flatMap to get indices of filtered elements
                    let re = this.qhsPoset.qhs.flatMap(({ charTilt }, j) =>
                        this.isDirectSummand([P, Q], charTilt) ? [j] : []
                    );
                    this.log.add(
                        `(Group ${i}) reduction at [${P}]+[${Q}] : ${re.length} modules`
                    );
                    return re;
                });
        } else {
            // has relation across vertex n-1
            // num tailing vertices with full relation = this.rank-lastNoRel-2
            let n = this.rank - 1 - lastNoRel;
            parts = Array.from({ length: n }, () => []);
            for (let j = 0; j < this.qhsPoset.qhs.length; j++) {
                let tilt = this.qhsPoset.qhs[j].charTilt;
                let done = false;
                for (let i = 0; i < n - 1; i++) {
                    let S = [this.rank - i, this.rank - i];
                    if (this.isIndecDirectSummand(S, tilt)) {
                        parts[i].push(j);
                        done = true;
                        break;
                    }
                }
                if (!done) parts[n - 1].push(j);
            }
            parts.slice(0, -1).map((p, i) => {
                this.log.add(
                    `(Group ${i}) reduction at S(${this.rank - i}): ${
                        p.length
                    } modules`
                );
            });
            this.log.add(
                `(Group ${n}) all others: ${parts[n - 1].length} modules`
            );
        }
        this.qhsPosetPartitioned = parts;
        // console.log("qhs partition:", parts);
        return parts;
    }

    twistQHS(i, j, covers, std, costd) {
        let struc = {
            coverRel: [...covers],
            std: structuredClone(std),
            costd: structuredClone(costd),
        };
        let res = { compare: 0, struc: struc, twist: [0, 1] };
        if (covers[i].indexOf(j) == -1) {
            return res;
        }

        if (this.isNoHom(costd[j], costd[i])) {
            if (this.isSub(std[i], std[j])) {
                struc.std[j] = [j + 1, i];
                struc.costd[i] = [costd[j][0], i + 1];
                //twistable, original > twisted
                res.compare = -1;
                res.twist = [i, j];
            } else {
                return res;
            }
        } else {
            if (
                this.isNoHom(std[i], std[j]) &&
                this.isQuot(costd[j], costd[i])
            ) {
                //twistable, original < twisted
                struc.std[i] = [i + 1, std[j][1]];
                struc.costd[j] = [i + 2, j + 1];
                res.compare = 1;
                res.twist = [i, j];
            } else {
                return res;
            }
        }
        struc.coverRel = this.minAdaptedOrder(struc.std, struc.costd);
        struc.charTilt = this.charTilting(struc.std, struc.costd);
        return res;
    }

    neighbourMAOs(std, costd, mao = null) {
        let poset = mao == null ? this.minAdaptedOrder(std, costd) : mao;
        let foundList = []; //list of triple [poset,std,costd]

        for (let i = 0; i < std.length; i++) {
            for (let j = 0; j < poset[i].length; j++) {
                let twist = this.twistQHS(i, poset[i][j], poset, std, costd);
                if (twist.compare != 0) {
                    foundList.push(twist);
                }
            }
        }
        return foundList;
    }

    findAllMAOs(startingOrder = null) {
        let perm =
            startingOrder == null
                ? Array.from(Array(this.rank).keys(), (x) => x + 1)
                : startingOrder;
        this.log.add(
            startingOrder == null
                ? `💭 computing all qhs (start with canonical initial)`
                : `💭 computing all qhs (start with permutation [${startingOrder}])`
        );
        let std = this.standardMods(perm);
        let costd = this.costandardMods(perm);
        let poset = this.minAdaptedOrder(std, costd);
        let foundList = [
            {
                coverRel: poset,
                std: std,
                costd: costd,
                charTilt: this.charTilting(std, costd),
            },
        ];
        let qhsPoset = []; // each entry is of the from [i,j], meaning foundList[i] < foundList[j]
        let i = 0;
        let currLen = foundList.length;

        while (i < currLen) {
            let curr = foundList[i];
            let nbhd = this.neighbourMAOs(curr.std, curr.costd);
            let k = 0;
            for (let j = 0; j < nbhd.length; j++) {
                let pos = foundList.findIndex((x) =>
                    matchingCoverRel(x.coverRel, nbhd[j].struc.coverRel)
                );
                if (pos == -1) {
                    foundList.push(nbhd[j].struc);
                    pos = currLen + k;
                    k++;
                }
                qhsPoset.push(nbhd[j].compare > 0 ? [i, pos] : [pos, i]);
            }
            currLen = foundList.length;
            i++;
        }
        // console.table(qhsPoset);
        this.qhsPoset = {
            qhs: foundList,
            coverRel: CoveringRelation(
                TransitiveClosure(TuplesToAdjMx(qhsPoset))
            ),
        };
        this.log.add(`✔ Found all qhs, total: ${foundList.length}`);
        return this.qhsPoset;
    }
}

/***********************
 *
 * Misc functions
 *
 */

function sameAsSet(arr1, arr2) {
    // ! only works when we know arr1 and arr2 has no duplicate elt's
    // o/w, use Set(...) is faster
    let sorted1 = arr1.sort();
    let sorted2 = arr2.sort();
    return sorted1.reduce((prev, x, i) => prev && x == sorted2[i], true);
}

// check if two covering relations are the same
function matchingCoverRel(cover1, cover2) {
    //assume cover1.length=cover2.length
    return cover1.reduce((prev, x, i) => prev && sameAsSet(x, cover2[i]), true);
}

function transpose(mx) {
    return mx[0].map((col, i) => mx.map((row) => row[i]));
}

/**
 * @param  {number[][]} rel have elts of rel[i]>i
 * @param  {} transpose=false, set to ture if elts of rel[i] < i
 */
function BinRelToAdjMx(rel, transposeMx = false) {
    let adjMx = rel.map((x) => {
        let row = Array(rel.length).fill(0);
        for (let j = 0; j < x.length; j++) {
            row[x[j]] = 1;
        }
        return row;
    });
    return transposeMx ? transpose(adjMx) : adjMx;
}

/**
 * @param  {number[][]} arr each entry is a tuple [i,j]
 * @return {number[][]} adjacency matrix A_{i,j}=1 if [i,j] in arr, 0 otherwise
 */
function TuplesToAdjMx(arr) {
    let n = Math.max(...arr.flat()) + 1;
    let adjMx = new Array(n);
    let row = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        adjMx[i] = row.slice(0); // need to deep copy each row
    }
    for (let k = 0; k < arr.length; k++) {
        adjMx[arr[k][0]][arr[k][1]] = 1;
    }
    return adjMx;
}

function TransitiveClosure(adjMx) {
    // create relation matrrix
    for (let k = 0; k < adjMx.length; k++) {
        for (let i = 0; i < adjMx.length; i++) {
            for (let j = 0; j < adjMx.length; j++) {
                adjMx[i][j] = adjMx[i][j] || (adjMx[i][k] && adjMx[k][j]);
            }
        }
    }
    return adjMx;
}

// rel is a transitively closed relation in matrix form
function CoveringRelation(rel) {
    let res = [];
    let baseSet = Array.from(Array(rel.length).keys());
    for (let i = 0; i < rel.length; i++) {
        let coveredBy = [];
        let fromi = baseSet.filter((j) => rel[i][j] != 0);
        for (let j = 0; j < fromi.length; j++) {
            let btwn = baseSet.filter(
                (k) => k != i && rel[k][fromi[j]] && rel[i][k]
            );
            if (btwn.length == 0) {
                coveredBy.push(fromi[j]);
            }
        }
        res.push(coveredBy);
    }
    return res;
}

function isMinimalInPoset(i, coverRel) {
    return (
        coverRel.findIndex((coveredBy) => {
            return coveredBy.indexOf(i) > -1;
        }) == -1
    );
}

function ArraySplit(arr, separator) {
    let res = [],
        curr = [];
    for (let x of arr) {
        if (x === separator) {
            res.push(curr);
            curr = [];
        } else {
            curr.push(x);
        }
    }
    if (curr.length > 0) {
        res.push(curr);
    }
    return res;
}
