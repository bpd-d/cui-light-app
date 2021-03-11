import { ICuiComponent } from "../core/models/interfaces";
import { CuiAccordionComponent } from "./accordion/accordion";
import { CuiBanerComponent } from "./banner/banner";
import { CuiCircleComponent } from "./circle/circle";
import { CuiCloseComponent } from "./close/close";
import { CuiCoverComponent } from "./cover/cover";
import { CuiDialogComponent } from "./dialog/dialog";
import { CuiDropComponenet } from "./drop/drop";
import { CuiFloatComponent } from "./float/float";
import { CuiIconComponent } from "./icon/icon";
//import { CuiIntersectionComponent } from "./intersection/intersection";
import { CuiOffCanvasComponent } from "./offcanvas/offcanvas";
import { CuiOffsetComponent } from "./offset/offset";
import { CuiOpenComponent } from "./open/open";
import { CuiParallaxComponent } from "./parallax/parallax";
import { CuiResizeComponent } from "./resize/resize";
import { CuiScrollComponent } from "./scroll/scroll";
import { CuiScrollspyComponent } from "./scrollspy/scrollspy";
import { CuiSortableComponent } from "./sortable/sortable";
import { CuiSpinnerComponent } from "./spinner/spinner";
import { CuiSliderComponent } from "./switch/slider";
import { CuiSwitchComponent } from "./switch/switch";
import { CuiSwitcherComponent } from "./switch/switcher";
import { CuiToggleComponent } from "./toggle/toggle";
import { CuiTooltipComponent } from "./tooltip/tooltip";

export interface ComponentsModuleAttributes {
    prefix?: string;
}


/**
 * Function that initializes and returns all components available in package
 * @param attributes - object holding data needed for components initialization
 */
export function GetComponents(attributes: ComponentsModuleAttributes): ICuiComponent[] {
    let prefix = attributes?.prefix;
    return [
        new CuiIconComponent(prefix),
        new CuiTooltipComponent(prefix),
        new CuiCircleComponent(prefix),
        new CuiSpinnerComponent(prefix),
        new CuiScrollComponent(prefix),
        new CuiScrollspyComponent(prefix),
        //new CuiIntersectionComponent(prefix),
        new CuiOpenComponent(prefix),
        new CuiCloseComponent(prefix),
        new CuiToggleComponent(prefix),
        new CuiDialogComponent(prefix),
        new CuiOffCanvasComponent(prefix),
        new CuiAccordionComponent(prefix),
        new CuiDropComponenet(prefix),
        new CuiOffsetComponent(prefix),
        new CuiSwitchComponent(prefix),
        new CuiSwitcherComponent(prefix),
        new CuiFloatComponent(prefix),
        new CuiSliderComponent(prefix),
        new CuiBanerComponent(prefix),
        new CuiCoverComponent(prefix),
        new CuiSortableComponent(prefix),
        new CuiResizeComponent(prefix),
        new CuiParallaxComponent(prefix)
    ]
}