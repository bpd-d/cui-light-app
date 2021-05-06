import { ICuiElementBox } from "../../core/models/elements";
import { ScrollDirection, ScrollPerformerHelper } from "./interfaces";
export declare function getScrollHelper(direction: ScrollDirection, box: ICuiElementBox, behavior: ScrollBehavior): ScrollPerformerHelper;
export declare function ScrollYHelper(box: ICuiElementBox, behavior: ScrollBehavior): ScrollPerformerHelper;
export declare function ScrollXHelper(box: ICuiElementBox, behavior: ScrollBehavior): ScrollPerformerHelper;
