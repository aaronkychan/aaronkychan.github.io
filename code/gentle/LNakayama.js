class LNakayama {
    kupisch = [2, 1];
    rank = 2;
    isGentle = true;
    log = [];
    relations = [];
    constructor(kupisch) {
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
        this.log.push(
            `Loaded ${this.isGentle ? "" : "non-"}gentle LNakayama of rank ${
                this.rank
            }.`
        );
    }

    isValidKupisch(kup) {
        let test = true;
        let i = 0;
        while (test && i < kup.length - 1) {
            test = kup[i + 1] >= kup[i] - 1 && kup[i] - 1 >= 1;
            i++;
        }
        test = test ? kup[1] >= kup[kup.length - 1] - 1 : test;
        return test;
    }

    isLNakayama(kup) {
        if (this.isValidKupisch(kup)) {
            if (kup[kup.length - 1] != 1) {
                this.log.push("Not LNakayama");
            } else {
                return true;
            }
        } else {
            this.log.push("Not a valid Kupisch series");
        }
        return false;
    }

    isGentle() {
        this.isGentle = (
            this.relations ? this.relations : this.relations()
        ).reduce((prev, curr) => prev && curr[1] - curr[0] == 2, true);
        return this.isGentle;
    }

    // return format [[s,t],[s',t']] where each [s,t] means path s+1->..->t+1 is a reln
    // code is extracted and modified from QPA
    computeRelations() {
        let rels = [];
        let i = 0;
        while (this.kupisch[i] < this.rank - i) {
            if (this.kupisch[i] - 1 != this.kupisch[i + 1]) {
                rels.push([i, i + this.kupisch[i]]);
                i = i + this.kupisch[i] - 1;
            } else {
                i++;
            }
        }
        this.relations = rels;
        return rels;
    }

    // module M = [i,j] with i=top M, j=soc M
    isModule(M) {
        return M[1] - M[0] <= this.kupisch[M[0]];
    }

    syzygy(M) {
        let syzygyLen = this.kupisch[M[0] - 1] - (M[1] + 1 - M[0]);
        return syzygyLen > 0 ? [M[1] + 1, M[1] + syzygyLen] : 0;
    }

    projRes(M) {
        let sy = this.syzygy(M, this.kupisch);
        let projres = [M[0]];
        while (sy) {
            // console.log(sy);
            projres.push(sy[0]);
            sy = this.syzygy(sy, this.kupisch);
        }
        return projres;
    }
}
