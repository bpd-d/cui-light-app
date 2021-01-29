import { are, is } from "../../core/utils/functions";
export class CuiScrollSpyModeHandlerFactory {
    static get(mode) {
        if (mode === "multi") {
            return new CuiMultiModeHandler();
        }
        return new CuiSingleModeHandler();
    }
}
class CuiModeHandlerBase {
    constructor(init) {
        this.previous = init;
    }
    getMatching(ratio, items) {
        return items.reduce((result, item, index) => {
            if (item.verticalRatio > ratio) {
                result.push(index);
            }
            return result;
        }, []);
    }
    addActions(actions, ...elements) {
        this.forEachAction(actions, elements, (action, element) => {
            action.add(element);
        });
    }
    removeActions(actions, ...elements) {
        this.forEachAction(actions, elements, (action, element) => {
            action.remove(element);
        });
    }
    forEachAction(actions, elements, callback) {
        if (!are(actions, elements, callback)) {
            return;
        }
        actions.forEach(action => {
            elements.forEach(element => {
                if (is(element))
                    callback(action, element);
            });
        });
    }
}
export class CuiSingleModeHandler extends CuiModeHandlerBase {
    constructor() {
        super(-1);
    }
    update(items, ratio, actions, links, linksActions) {
        let matching = this.getMatching(ratio, items);
        let len = matching.length;
        let last = len > 0 ? matching[len - 1] : -1;
        let result = {
            changed: false
        };
        if (!this.matches(last)) {
            if (this.previous > -1)
                this.removeActions(actions, items[this.previous].element);
            if (last > -1) {
                let lastElement = items[last].element;
                result.intersecting = [lastElement];
                this.addActions(actions, lastElement);
            }
            if (are(links, linksActions)) {
                if (this.previous > -1)
                    this.removeActions(linksActions, links[this.previous]);
                if (last > -1)
                    this.addActions(linksActions, links[last]);
            }
            this.previous = last;
            result.changed = true;
            result.intersecting = [];
            return result;
        }
        return result;
    }
    matches(item) {
        return item === this.previous;
    }
}
export class CuiMultiModeHandler extends CuiModeHandlerBase {
    constructor() {
        super([]);
    }
    update(items, ratio, actions, links, linksActions) {
        let matching = this.getMatching(ratio, items);
        let result = {
            changed: false
        };
        if (!this.matches(matching)) {
            let intersecting = matching.map(idx => { return items[idx].element; });
            this.removeActions(actions, ...this.previous.map(idx => { return items[idx].element; }));
            this.addActions(actions, ...intersecting);
            result.intersecting = intersecting;
            if (are(links, linksActions)) {
                this.removeActions(linksActions, ...this.previous.map(idx => { return links[idx]; }));
                this.addActions(linksActions, ...matching.map(idx => { return links[idx]; }));
            }
            this.previous = matching;
            result.changed = true;
            return result;
        }
        return result;
    }
    matches(item) {
        let len = item.length;
        if (len !== this.previous.length) {
            return false;
        }
        let i = 0;
        for (i = 0; i < len; i++) {
            if (!this.previous.includes(item[i])) {
                return false;
            }
        }
        return true;
    }
}
