import { ICuiInteractionsFacade, ICuiStyleHelper } from "src/core/handlers/extensions/facades";
import { ICuiMoveData } from "src/core/listeners/move";

export interface ICuiFloatActionCalculator {
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number];
}


export interface ICuiFloatSwipingAction {
    init: (ev: ICuiMoveData) => void;
    move: (x: number, y: number, diffX: number, diffY: number) => void;
}

interface ICuiFloatActionCallbacks {
    [id: string]: (interactions: ICuiInteractionsFacade, styles: ICuiStyleHelper) => ((x: number, y: number, element: HTMLElement) => void);
}

export class BasePositionCalculator implements ICuiFloatActionCalculator {

    calculate(x: number, y: number, diffX: number, diffY: number): [number, number] {
        return [x, y];
    }

}

export class OptionalPositionCalculator implements ICuiFloatActionCalculator {
    #element: HTMLElement;
    constructor(element: HTMLElement) {
        this.#element = element;
    }
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number] {
        let newX = this.#element.offsetLeft + diffX;
        let newY = this.#element.offsetTop + diffY;
        return [newX, newY];
    }

}

export class BaseResizeCalculator implements ICuiFloatActionCalculator {
    #element: HTMLElement;
    constructor(element: HTMLElement) {
        this.#element = element;
    }
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number] {
        let width = x - this.#element.offsetLeft;
        let height = y - this.#element.offsetTop;
        return [width, height];
    }
}

export class OptionalResizeCalculator implements ICuiFloatActionCalculator {
    #element: HTMLElement;
    constructor(element: HTMLElement) {
        this.#element = element;
    }
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number] {
        let width = this.#element.offsetWidth + diffX;
        let height = this.#element.offsetHeight + diffY;
        return [width, height];
    }
}


export function getMoveAction(type: string, calculator: ICuiFloatActionCalculator, element: HTMLElement, interactions: ICuiInteractionsFacade, styles: ICuiStyleHelper): ICuiFloatSwipingAction | undefined {
    const callback = floatCallbacks[type];
    if (!callback) {
        return undefined;
    }
    return floatActionBase(calculator, element, callback(interactions, styles))

}

function fitsWindow(top: number, left: number, width: number, height: number) {
    return (top + height < window.innerHeight - 10) &&
        (top > 10) && (left > 10) &&
        (left + width < window.innerWidth - 10);
}

const floatCallbacks: ICuiFloatActionCallbacks = {
    'resize': onResizeSwipe,
    'move': onMoveSwipe
}

function floatActionBase(calculator: ICuiFloatActionCalculator, element: HTMLElement, onMove: (x: number, y: number, element: HTMLElement) => void): ICuiFloatSwipingAction {
    return {
        init: (ev: ICuiMoveData) => {
            ev.event.preventDefault();
        },
        move: (x: number, y: number, diffX: number, diffY: number) => {
            const [newX, newY] = calculator.calculate(x, y, diffX, diffY)
            if (fitsWindow(newY, newX, element.offsetWidth, element.offsetHeight)) {
                onMove(newX, newY, element);
            }
        }
    }
}



function onResizeSwipe(interactions: ICuiInteractionsFacade, styles: ICuiStyleHelper) {
    return (x: number, y: number, element: HTMLElement) => {
        interactions.mutate(() => {
            styles.setStyle('width', x + "px", element);
            styles.setStyle('height', y + "px", element);
        })
    }
}

function onMoveSwipe(_interactions: ICuiInteractionsFacade, styles: ICuiStyleHelper) {
    return (x: number, y: number, element: HTMLElement) => {
        _interactions.mutate(() => {
            styles.setStyle('left', x + "px", element);
            styles.setStyle('top', y + "px", element);
        })
    }
}