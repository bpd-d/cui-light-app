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
var _element, _element_1, _element_2;
export class BasePositionCalculator {
    calculate(x, y, diffX, diffY) {
        return [x, y];
    }
}
export class OptionalPositionCalculator {
    constructor(element) {
        _element.set(this, void 0);
        __classPrivateFieldSet(this, _element, element);
    }
    calculate(x, y, diffX, diffY) {
        let newX = __classPrivateFieldGet(this, _element).offsetLeft + diffX;
        let newY = __classPrivateFieldGet(this, _element).offsetTop + diffY;
        return [newX, newY];
    }
}
_element = new WeakMap();
export class BaseResizeCalculator {
    constructor(element) {
        _element_1.set(this, void 0);
        __classPrivateFieldSet(this, _element_1, element);
    }
    calculate(x, y, diffX, diffY) {
        let width = x - __classPrivateFieldGet(this, _element_1).offsetLeft;
        let height = y - __classPrivateFieldGet(this, _element_1).offsetTop;
        return [width, height];
    }
}
_element_1 = new WeakMap();
export class OptionalResizeCalculator {
    constructor(element) {
        _element_2.set(this, void 0);
        __classPrivateFieldSet(this, _element_2, element);
    }
    calculate(x, y, diffX, diffY) {
        let width = __classPrivateFieldGet(this, _element_2).offsetWidth + diffX;
        let height = __classPrivateFieldGet(this, _element_2).offsetHeight + diffY;
        return [width, height];
    }
}
_element_2 = new WeakMap();
export function getMoveAction(type, calculator, element, interactions, styles) {
    const callback = floatCallbacks[type];
    if (!callback) {
        return undefined;
    }
    return floatActionBase(calculator, element, callback(interactions, styles));
}
function fitsWindow(top, left, width, height) {
    return (top + height < window.innerHeight - 10) &&
        (top > 10) && (left > 10) &&
        (left + width < window.innerWidth - 10);
}
const floatCallbacks = {
    'resize': onResizeSwipe,
    'move': onMoveSwipe
};
function floatActionBase(calculator, element, onMove) {
    return {
        init: (ev) => {
            ev.event.preventDefault();
        },
        move: (x, y, diffX, diffY) => {
            const [newX, newY] = calculator.calculate(x, y, diffX, diffY);
            if (fitsWindow(newY, newX, element.offsetWidth, element.offsetHeight)) {
                onMove(newX, newY, element);
            }
        }
    };
}
function onResizeSwipe(interactions, styles) {
    return (x, y, element) => {
        interactions.mutate(() => {
            styles.setStyle('width', x + "px", element);
            styles.setStyle('height', y + "px", element);
        });
    };
}
function onMoveSwipe(_interactions, styles) {
    return (x, y, element) => {
        _interactions.mutate(() => {
            styles.setStyle('left', x + "px", element);
            styles.setStyle('top', y + "px", element);
        });
    };
}
