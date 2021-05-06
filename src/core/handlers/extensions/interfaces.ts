import { CuiCore } from "src/core/models/core";

export interface ICuiHandlerExtension<T> {
    type: string;
    description?: string;
    init?(args: T): Promise<boolean>;
    update?(args: T): Promise<boolean>;
    destroy?(): Promise<boolean>;
}

export interface CuiHandlerExtensionProps {
    element: HTMLElement;
    cuid: string;
    core: CuiCore;
}