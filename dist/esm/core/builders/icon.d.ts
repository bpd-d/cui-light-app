export declare class IconBuilder {
    _element: string;
    _scale: number;
    _appender: IconScaleAppender;
    constructor(svgString: string);
    setScale(scale: number): IconBuilder;
    build(): Element | null;
}
export declare class IconScaleAppender {
    append(element: Element, value: number): void;
}
