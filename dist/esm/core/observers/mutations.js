var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _observer, _options, _element, _components, _attributes, _utils, _queryString, _isObserving, _observer_1, _element_1, _disabled, _options_1;
import { is, are, joinAttributesForQuery, parseAttribute } from "../utils/functions";
import { createCuiElement, destroyCuiElement, getMatchingComponents, updateComponent } from "../utils/api";
import { CuiDevtoolFactory } from "../development/factory";
export class CuiMutationObserver {
    constructor(element, utils) {
        _observer.set(this, void 0);
        _options.set(this, void 0);
        _element.set(this, void 0);
        _components.set(this, void 0);
        _attributes.set(this, void 0);
        _utils.set(this, void 0);
        _queryString.set(this, void 0);
        __classPrivateFieldSet(this, _observer, undefined);
        this.plugins = undefined;
        __classPrivateFieldSet(this, _options, undefined);
        __classPrivateFieldSet(this, _element, element);
        this._log = CuiDevtoolFactory.get('CuiMutationObserver');
        __classPrivateFieldSet(this, _components, []);
        __classPrivateFieldSet(this, _attributes, []);
        __classPrivateFieldSet(this, _utils, utils);
        __classPrivateFieldSet(this, _queryString, "");
    }
    setPlugins(plugins) {
        this.plugins = plugins;
        return this;
    }
    setComponents(components) {
        __classPrivateFieldSet(this, _components, components);
        return this;
    }
    setAttributes(attributes) {
        __classPrivateFieldSet(this, _options, {
            attributes: true,
            subtree: true,
            childList: true,
            attributeFilter: attributes
        });
        __classPrivateFieldSet(this, _attributes, attributes);
        __classPrivateFieldSet(this, _queryString, joinAttributesForQuery(attributes));
        return this;
    }
    start() {
        this._log.debug("Starting");
        if (!__classPrivateFieldGet(this, _options)) {
            this._log.error("Cannot start - options are not defined");
            return this;
        }
        __classPrivateFieldSet(this, _observer, new MutationObserver(this.mutationCallback.bind(this)));
        __classPrivateFieldGet(this, _observer).observe(__classPrivateFieldGet(this, _element), __classPrivateFieldGet(this, _options));
        this._log.debug("Started");
        return this;
    }
    stop() {
        this._log.debug("Stopping");
        if (!__classPrivateFieldGet(this, _observer)) {
            this._log.debug("Observer not available");
            return this;
        }
        __classPrivateFieldGet(this, _observer).disconnect();
        __classPrivateFieldSet(this, _observer, undefined);
        this._log.debug("Stopped");
        return this;
    }
    mutationCallback(mutations, observer) {
        mutations.forEach((mutation) => {
            switch (mutation.type) {
                case 'attributes':
                    const item = mutation.target;
                    if (!are(mutation.attributeName, item)) {
                        this._log.error("Mutation attribute doesn't not exisist");
                        break;
                    }
                    // @ts-ignore attribute is defined
                    this.handeComponentUpdate(mutation.attributeName, item);
                    break;
                case 'childList':
                    this.handleChildListMutation(mutation);
                    break;
            }
            if (is(this.plugins)) {
                // @ts-ignore plugins is defined here
                this.plugins.onMutation(mutation).then(() => {
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
        const addedLen = mutation.addedNodes.length;
        const removedLen = mutation.removedNodes.length;
        if (addedLen > 0) {
            this._log.debug("Registering added nodes: " + addedLen);
            this.handleAddedNodes(mutation.addedNodes).then((result) => {
                this._log.debug("Added nodes: " + addedLen + " with status: " + result);
            }).catch((e) => {
                this._log.exception(e);
            });
        }
        else if (removedLen > 0) {
            this._log.debug("Removing nodes: " + removedLen);
            this.handleRemovedNodes(mutation.removedNodes).then((result) => {
                this._log.debug("Removed nodes: " + removedLen + " with status: " + result);
            }).catch((e) => {
                this._log.exception(e);
            });
        }
    }
    handleAddedNodes(nodes) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let node of nodes) {
                yield this.handleAddedNode(node);
                let element = node;
                let children = element.hasChildNodes() ? element.querySelectorAll(__classPrivateFieldGet(this, _queryString)) : null;
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
            let matchingComponents = [];
            matchingComponents = getMatchingComponents(node, __classPrivateFieldGet(this, _components));
            return createCuiElement(node, matchingComponents, __classPrivateFieldGet(this, _utils));
        });
    }
    handleRemovedNodes(nodes) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let node of nodes) {
                yield destroyCuiElement(node);
                let element = node;
                let children = node.hasChildNodes() ? element.querySelectorAll(__classPrivateFieldGet(this, _queryString)) : null;
                if (is(children)) {
                    // @ts-ignore children is defined
                    this._log.debug("Additional nodes to remove: " + children.length);
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
_observer = new WeakMap(), _options = new WeakMap(), _element = new WeakMap(), _components = new WeakMap(), _attributes = new WeakMap(), _utils = new WeakMap(), _queryString = new WeakMap();
export class CuiComponentMutationHandler {
    constructor(target) {
        _isObserving.set(this, void 0);
        _observer_1.set(this, void 0);
        _element_1.set(this, void 0);
        _disabled.set(this, void 0);
        _options_1.set(this, {
            childList: true,
            subtree: true
        });
        __classPrivateFieldSet(this, _observer_1, undefined);
        __classPrivateFieldSet(this, _disabled, false);
        __classPrivateFieldSet(this, _isObserving, false);
        __classPrivateFieldSet(this, _element_1, target);
    }
    observe() {
        if (!__classPrivateFieldGet(this, _isObserving) && !__classPrivateFieldGet(this, _disabled) && __classPrivateFieldGet(this, _observer_1)) {
            __classPrivateFieldGet(this, _observer_1).observe(__classPrivateFieldGet(this, _element_1), __classPrivateFieldGet(this, _options_1));
            __classPrivateFieldSet(this, _isObserving, true);
        }
    }
    unobserve() {
        if (__classPrivateFieldGet(this, _isObserving) && __classPrivateFieldGet(this, _observer_1)) {
            __classPrivateFieldGet(this, _observer_1).disconnect();
            __classPrivateFieldSet(this, _isObserving, false);
        }
    }
    isObserving() {
        return __classPrivateFieldGet(this, _isObserving);
    }
    disable(flag) {
        __classPrivateFieldSet(this, _disabled, flag);
        if (__classPrivateFieldGet(this, _disabled)) {
            this.unobserve();
        }
    }
    onMutation(callback) {
        if (__classPrivateFieldGet(this, _isObserving))
            this.unobserve();
        __classPrivateFieldSet(this, _observer_1, new MutationObserver(callback));
    }
}
_isObserving = new WeakMap(), _observer_1 = new WeakMap(), _element_1 = new WeakMap(), _disabled = new WeakMap(), _options_1 = new WeakMap();
