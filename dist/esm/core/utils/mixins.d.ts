import { Constructor } from "./types";
export declare function Mixin<T1>(mixins: [Constructor<T1>]): Constructor<T1>;
export declare function Mixin<T1, T2>(mixins: [Constructor<T1>, Constructor<T2>]): Constructor<T1 & T2>;
export declare function Mixin<T1, T2>(mixins: [Constructor<T1>, Constructor<T2>]): Constructor<T1 & T2>;
export declare function Mixin<T1, T2, T3>(mixins: [Constructor<T1>, Constructor<T2>, Constructor<T3>]): Constructor<T1 & T2 & T3>;
export declare function Mixin<T1, T2, T3, T4>(mixins: [Constructor<T1>, Constructor<T2>, Constructor<T3>, Constructor<T4>]): Constructor<T1 & T2 & T3 & T4>;
export declare function Mixin<T1, T2, T3, T4, T5>(mixins: [Constructor<T1>, Constructor<T2>, Constructor<T3>, Constructor<T4>, Constructor<T5>]): Constructor<T1 & T2 & T3 & T4 & T5>;
export declare function Mixin<T1, T2, T3, T4, T5, T6>(mixins: [Constructor<T1>, Constructor<T2>, Constructor<T3>, Constructor<T4>, Constructor<T5>, Constructor<T6>]): Constructor<T1 & T2 & T3 & T4 & T5 & T6>;
