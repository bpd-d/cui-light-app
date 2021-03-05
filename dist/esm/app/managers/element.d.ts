import { CuiCachable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export declare class ElementManager implements CuiCachable {
    #private;
    constructor(elements: Element[], utils: CuiUtils);
    toggleClass(className: string): Promise<boolean>;
    toggleClassAs(className: string): Promise<boolean>;
    setClass(className: string): Promise<boolean>;
    setClassAs(className: string): Promise<boolean>;
    removeClass(className: string): Promise<boolean>;
    removeClassAs(className: string): Promise<boolean>;
    getAttribute(attributeName: string): string[];
    setAttribute(attributeName: string, attributeValue?: string): Promise<boolean>;
    setAttributeAs(attributeName: string, attributeValue?: string): Promise<boolean>;
    removeAttribute(attributeName: string): Promise<boolean>;
    removeAttributeAs(attributeName: string): Promise<boolean>;
    toggleAttribute(attributeName: string, attributeValue?: string): Promise<boolean>;
    toggleAttributeAs(attributeName: string, attributeValue?: string): Promise<boolean>;
    click(onClick: (ev: MouseEvent) => void): Promise<boolean>;
    event(eventName: string, callback: any): Promise<boolean>;
    call(callback: (element: Element, index: Number) => void, functionName?: string): Promise<boolean>;
    setAction(actionStr: string, animationClass: string, timeout?: number): Promise<boolean>;
    removeAction(actionStr: string, animationClass: string, timeout?: number): Promise<boolean>;
    /**
     * Perform animation on the element
     * @param animationClass
     * @param timeout
     * @param callback
     */
    animate(animationClass: string, timeout?: number, callback?: (element: Element) => void): Promise<boolean>;
    emit(event: string, ...args: any[]): void;
    on(event: string, callback: any): string[];
    detach(event: string, id: string): void;
    read(callback: any, ...args: any[]): void;
    change(callback: any, ...args: any[]): void;
    elements(): Element[];
    count(): number;
    lock(): void;
    unlock(): void;
    isLocked(): boolean;
    refresh(): boolean;
}
