import { applyMixins } from "./functions";
export function Mixin(mixins) {
    class Class {
    }
    ;
    applyMixins(Class, mixins);
    return Class;
}
