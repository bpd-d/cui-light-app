import { AnimatorError } from "../models/errors";
import { enumerateObject, getRangeValueOrDefault, is } from "../utils/functions";
import { ICuiPropertyAnimator, AnimatorPropertyValue, ComplexAnimatorProperty, ColorProperty, ColorAnimatorProperty } from "./interfaces";

/**
 * Changes the opacity of the element from 0 to 1
 */
export class OpacityAnimator implements ICuiPropertyAnimator<AnimatorPropertyValue> {
    prop: AnimatorPropertyValue

    constructor() {
        this.prop = { from: 0, to: 0 }
    }

    setProperty(prop: AnimatorPropertyValue): void {
        if (!prop || !is(prop.from) || !is(prop.to)) {
            throw new AnimatorError("[OpacityAnimator] Property has incorrect format");
        }
        this.prop = prop;

    }

    perform(element: any, progress: number, factor: number) {
        if (this.prop.to < 0) {
            return;
        }
        if (element["style"]) {
            element.style.opacity = calcUnitValue(this.prop, progress);
        }

    }
}

/**
 * Changes any style property of the element
 */
export class PropertyAnimator implements ICuiPropertyAnimator<AnimatorPropertyValue> {
    property: string;
    prop: AnimatorPropertyValue
    constructor(property: string) {
        if (!is(property)) {
            throw new AnimatorError("[PropertyAnimator] Valid property is required");
        }
        this.property = property;
        this.prop = {
            from: 0,
            to: 0
        }
    }

    setProperty(prop: AnimatorPropertyValue) {
        if (!prop || !is(prop.from) || !is(prop.to)) {
            throw new AnimatorError("[PropertyAnimator] Property has incorrect format");
        }
        this.prop = prop;
    }

    perform(element: any, progress: number, factor: number) {
        if (!this.property) {
            return;
        }
        if (element["style"]) {
            element.style[this.property] = calcUnitValue(this.prop, progress)
        }
    }
}

/**
 * Changes transform property of the element. Supports mulitple properties at the time
 */
export class TransformAnimator implements ICuiPropertyAnimator<ComplexAnimatorProperty> {
    prop: ComplexAnimatorProperty | undefined;
    constructor() {
        this.prop = undefined;
    }

    setProperty(prop: ComplexAnimatorProperty) {
        if (!prop) {
            throw new AnimatorError("[TransformAnimator] Property has incorrect format");
        }
        this.prop = prop;
    }

    build(progress: number) {
        let props: string[] = [];
        for (let name in this.prop) {
            let cur = this.prop[name];
            props.push(this.buildSingle(name, calcNewValue(cur.from, cur.to, progress), cur.unit))
        }
        return props.join(" ");
    }

    buildSingle(name: string, value: number, unit?: string) {
        return `${name}(${prepUnitValue(value, unit)})`;
    }

    perform(element: any, progress: number) {
        if (!this.prop) {
            return;
        }
        if (element["style"]) {
            element.style.transform = this.build(progress);
        }
    }
}

export class ColorAnimator implements ICuiPropertyAnimator<ColorAnimatorProperty> {
    #from: ColorProperty;
    #to: ColorProperty;
    id: string;
    constructor(id: string) {
        this.#from = { red: 0, green: 0, blue: 0, alpha: 0 };
        this.#to = { red: 0, green: 0, blue: 0, alpha: 0 };
        this.id = id;
    }

    perform(element: any, progress: number, factor: number): void {
        const newColor = {
            red: calcNewValue(this.#from.red, this.#to.red, progress),
            blue: calcNewValue(this.#from.blue, this.#to.blue, progress),
            green: calcNewValue(this.#from.green, this.#to.green, progress),
            alpha: calcNewValue(this.#from.alpha, this.#to.alpha, progress),
        }

        element.style[this.id] = `rgba(${newColor.red},${newColor.green},${newColor.blue},${newColor.alpha})`;
    }

    setProperty(prop: ColorAnimatorProperty): void {
        this.#from = adjustColor(prop.from);
        this.#to = adjustColor(prop.to);
    }
}

export class FilterAnimator implements ICuiPropertyAnimator<ComplexAnimatorProperty> {
    property: ComplexAnimatorProperty;
    constructor() {
        this.property = {};
    }
    perform(element: any, progress: number, factor: number): void {
        let filters: string[] = [];
        enumerateObject(this.property, (filterName, setup: AnimatorPropertyValue) => {
            filters.push(`${filterName}(${calcUnitValue(setup, progress)})`)
        })

        element.style['filter'] = filters.join(' ');
    }
    setProperty(prop: ComplexAnimatorProperty): void {
        this.property = prop;
    }
}

export class PositionAnimator implements ICuiPropertyAnimator<ComplexAnimatorProperty> {
    #x: AnimatorPropertyValue;
    #y: AnimatorPropertyValue;
    #id: string;
    constructor(id?: string) {
        this.#x = {
            from: 0,
            to: 0,
        }
        this.#y = {
            from: 0,
            to: 0,
        }
        this.#id = id ?? 'backgroundPosition';
    }

    perform(element: any, progress: number, factor: number): void {
        let newX = calcUnitValue(this.#x, progress);
        let newY = calcUnitValue(this.#y, progress);
        element.style[this.#id] = newX + " " + newY;
    }

    setProperty(prop: ComplexAnimatorProperty): void {
        const { x, y } = prop;
        if (x) {
            this.#x = x
        }
        if (y) {
            this.#y = y;
        }
    }

}

function adjustColor(color: ColorProperty): ColorProperty {
    return {
        red: getRangeValueOrDefault(color.red, 0, 255, 0),
        green: getRangeValueOrDefault(color.green, 0, 255, 0),
        blue: getRangeValueOrDefault(color.blue, 0, 255, 0),
        alpha: getRangeValueOrDefault(color.alpha, 0, 1, 1),
    }
}

function calcNewValue(from: number, to: number, progress: number) {
    return from + (to - from) * progress;
}

function prepUnitValue(value: number, unit?: string) {
    return value + (unit ?? "");
}

function calcUnitValue(prop: AnimatorPropertyValue, progress: number) {
    return prepUnitValue(calcNewValue(prop.from, prop.to, progress), prop.unit);
}