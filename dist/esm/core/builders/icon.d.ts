export declare class IconBuilder {
    #private;
    constructor(svgString: string);
    setScale(scale: number): IconBuilder;
    build(): Element | null;
}
export declare class IconScaleAppender {
    append(element: Element, value: number): void;
}
