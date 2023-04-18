class Logger {
    log;
    lastGet;
    constructor() {
        this.log = [];
        this.lastGet = -1;
    }

    add(str) {
        this.log.push(str);
    }

    get length() {
        return this.log.length;
    }

    get log() {
        this.lastGet = this.log.length - 1;
        return this.log;
    }

    get last() {
        this.lastGet = this.log.length - 1;
        return this.log[this.log.length - 1];
    }

    get allFromLastGet() {
        let res = [];
        if (this.lastGet < this.log.length - 1) {
            res = this.log.slice(this.lastGet + 1);
            this.lastGet = this.log.length - 1;
        }
        return res;
    }

    record(from = 0, to = null) {
        this.lastGet = to != null && this.lastGet > to ? to : this.lastGet;
        return to == null ? this.log.slice(from) : this.log.slice(from, to);
    }
}
