export declare type ScrollDirection = "x" | "y";
export interface ICuiScrollSwitchPerformer {
    name: string;
    check(arg: any): boolean;
    perform(arg: any, helper: ScrollPerformerHelper, options: CuiScrollPerformerOptions): boolean;
}
export interface CuiScrollPerformerOptions {
    behavior: ScrollBehavior;
    loop: boolean;
}
export interface ScrollPerformerHelper {
    scrollTo(position: number): void;
    toIndex(index: number): void;
    getPagesCount(): number;
    getCurrentPage(): number;
    toLast(): void;
    toPercent(percent: number): void;
    toSelector(selector: string): boolean;
}
