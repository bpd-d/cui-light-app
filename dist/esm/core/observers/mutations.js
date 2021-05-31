var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { is, are, joinAttributesForQuery, parseAttribute, } from "../utils/functions";
import { CuiDevtoolFactory } from "../development/factory";
import { createCuiElement, destroyCuiElement, getMatchingComponents, updateComponent, } from "../api/functions";
export class CuiMutationObserver {
    constructor(element, core) {
        this._observer = undefined;
        this._plugins = undefined;
        this._options = undefined;
        this._element = element;
        this._log = CuiDevtoolFactory.get("CuiMutationObserver");
        this._components = [];
        this._core = core;
        this._queryString = "";
    }
    setPlugins(plugins) {
        this._plugins = plugins;
        return this;
    }
    setComponents(components) {
        this._components = components;
        return this;
    }
    setAttributes(attributes) {
        this._options = {
            attributes: true,
            subtree: true,
            childList: true,
            attributeFilter: attributes,
        };
        this._queryString = joinAttributesForQuery(attributes);
        return this;
    }
    start() {
        this._log.debug("Starting");
        if (!this._options) {
            this._log.error("Cannot start - options are not defined");
            return this;
        }
        this._observer = new MutationObserver(this.mutationCallback.bind(this));
        this._observer.observe(this._element, this._options);
        this._log.debug("Started");
        return this;
    }
    stop() {
        this._log.debug("Stopping");
        if (!this._observer) {
            this._log.debug("Observer not available");
            return this;
        }
        this._observer.disconnect();
        this._observer = undefined;
        this._log.debug("Stopped");
        return this;
    }
    mutationCallback(mutations, observer) {
        mutations.forEach((mutation) => {
            switch (mutation.type) {
                case "attributes":
                    const item = mutation.target;
                    if (!are(mutation.attributeName, item)) {
                        this._log.error("Mutation attribute doesn't not exisist");
                        break;
                    }
                    // @ts-ignore attribute is defined
                    this.handeComponentUpdate(mutation.attributeName, item);
                    break;
                case "childList":
                    this.handleChildListMutation(mutation);
                    break;
            }
            if (is(this._plugins)) {
                // @ts-ignore plugins is defined here
                this._plugins.onMutation(mutation).then(() => {
                    //
                });
            }
        });
    }
    handeComponentUpdate(attributeName, item) {
        let args = parseAttribute(item, attributeName);
        updateComponent(item, attributeName, args)
            .then((result) => {
            this._log.debug("Component: " + attributeName + " updated with: " + result, "handeComponentUpdate");
        })
            .catch((e) => {
            this._log.exception(e);
        });
    }
    handleChildListMutation(mutation) {
        return __awaiter(this, void 0, void 0, function* () {
            const addedLen = mutation.addedNodes.length;
            const removedLen = mutation.removedNodes.length;
            if (addedLen > 0) {
                this._log.debug("Registering added nodes: " + addedLen);
                try {
                    yield this.handleAddedNodes(mutation.addedNodes);
                }
                catch (e) {
                    this._log.exception(e);
                }
            }
            else if (removedLen > 0) {
                this._log.debug("Removing nodes: " + removedLen);
                try {
                    yield this.handleRemovedNodes(mutation.removedNodes);
                }
                catch (e) {
                    this._log.exception(e);
                }
            }
        });
    }
    handleAddedNodes(nodes) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let node of nodes) {
                yield this.handleAddedNode(node);
                let element = node;
                let children = element.hasChildNodes()
                    ? element.querySelectorAll(this._queryString)
                    : null;
                if (is(children)) {
                    // @ts-ignore children is defined
                    this._log.debug("Additional nodes to add: " + children.length);
                    // @ts-ignore children is defined
                    yield this.handleAddedChildren(children);
                }
            }
            return true;
        });
    }
    handleAddedChildren(nodes) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            for (let node of nodes) {
                result.push(yield this.handleAddedNode(node));
            }
            return result;
        });
    }
    handleAddedNode(node) {
        return __awaiter(this, void 0, void 0, function* () {
            let matchingComponents = getMatchingComponents(node, this._components);
            return createCuiElement(node, matchingComponents, this._core);
        });
    }
    handleRemovedNodes(nodes) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let node of nodes) {
                yield destroyCuiElement(node);
                let element = node;
                let children = node.hasChildNodes()
                    ? element.querySelectorAll(this._queryString)
                    : null;
                if (is(children)) {
                    this._log.debug(
                    // @ts-ignore children is defined
                    "Additional nodes to remove: " + children.length);
                    // @ts-ignore children is defined
                    yield this.handleDestroyChildren(children);
                }
            }
            return true;
        });
    }
    handleDestroyChildren(nodes) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            for (let child of nodes) {
                result.push(yield destroyCuiElement(child));
            }
            return result;
        });
    }
}
export class CuiComponentMutationHandler {
    constructor(target, selector) {
        this._options = {
            childList: true,
            subtree: true,
        };
        this._disabled = false;
        this._isObserving = false;
        this._element = target;
        this._selector = selector;
        this._callback = undefined;
        this._observer = new MutationObserver(this.mutationCallback.bind(this));
    }
    observe() {
        if (!this._isObserving && !this._disabled) {
            this._observer.observe(this._element, this._options);
            this._isObserving = true;
        }
    }
    unobserve() {
        if (this._isObserving) {
            this._observer.disconnect();
            this._isObserving = false;
        }
    }
    setSelector(selector) {
        this._selector = selector;
    }
    setAttributes(attributes) {
        if (attributes && attributes.length > 0) {
            this._options = Object.assign(Object.assign({}, this._options), { attributes: true, attributeFilter: attributes });
        }
        this._options = {
            childList: true,
            subtree: true,
        };
        this.unobserve();
    }
    isObserving() {
        return this._isObserving;
    }
    disable(flag) {
        this._disabled = flag;
        if (this._disabled) {
            this.unobserve();
        }
    }
    onMutation(callback) {
        this._callback = callback;
    }
    mutationCallback(record) {
        let records = record.reduce((result, record) => {
            if (this._selector && record.type === "childList") {
                if (this.matchesSelector(record)) {
                    result.push(record);
                }
            }
            else {
                result.push(record);
            }
            return result;
        }, []);
        if (this._callback) {
            this._callback(records);
        }
    }
    matchesSelector(record) {
        if (record.addedNodes.length > 0) {
            return this.isAnyItemMatching([
                ...record.addedNodes,
            ]);
        }
        if (record.removedNodes.length > 0) {
            return this.isAnyItemMatching([
                ...record.removedNodes,
            ]);
        }
        return false;
    }
    isAnyItemMatching(array) {
        return (array.find((node) => 
        //@ts-ignore
        node.matches(this._selector)) !== null);
    }
}
