import { createElementFromString, getIntOrDefault, is } from "../utils/functions";

export class IconBuilder {
    _element: string;
    _scale: number;
    _appender: IconScaleAppender;

    constructor(svgString: string) {
        this._element = svgString;
        this._scale = 1;
        this._appender = new IconScaleAppender();
    }

    setScale(scale: number): IconBuilder {
        this._scale = scale
        return this
    }

    build(): Element | null {
        let created = createElementFromString(this._element)
        if (is(created) && this._scale) {
            // @ts-ignore created is checked already
            this._appender.append(created, this._scale)
        }
        return created
    }
}

export class IconScaleAppender {
    append(element: Element, value: number): void {
        let width = getIntOrDefault(element.getAttribute("width"), 20)
        let height = getIntOrDefault(element.getAttribute("height"), 20);
        element.setAttribute("width", (width * value).toString())
        element.setAttribute("height", (height * value).toString())
    }
}