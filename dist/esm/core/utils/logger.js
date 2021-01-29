export class CuiLogger {
    constructor(name, level) {
        this.level = level;
        this.component = name;
        this.id = "-";
    }
    setLevel(level) {
        this.level = level;
    }
    setId(id) {
        this.id = id;
    }
    debug(message, functionName) {
        if (this.level === 'debug') {
            console.log(this.prepString(message, "debug", functionName));
        }
    }
    error(message, functionName) {
        if (this.level === 'error' || this.level === 'debug' || this.level === 'warning')
            console.error(this.prepString(message, "error", functionName));
    }
    warning(message, functionName) {
        if (this.level === 'warning' || this.level === 'debug')
            console.warn(this.prepString(message, "warning", functionName));
    }
    exception(e, functionName) {
        console.error(this.prepString(`An exception occured: ${e.name}: ${e.message}`, "exception", functionName));
        if (this.level === 'debug')
            console.error(e.stack);
    }
    performance(callback, functionName) {
        if (this.level !== 'debug') {
            return;
        }
        let start = Date.now();
        callback();
        console.log(this.prepString(`Performance measure: ${Date.now() - start}ms`, "performance", functionName));
    }
    prepString(message, level, functionName) {
        return `[${new Date().toLocaleString()}][${level}][${this.component}][${functionName !== null && functionName !== void 0 ? functionName : '-'}][${this.id}][${message}]`;
    }
}
