import { ICuiComponent } from "../core/models/interfaces";
import { CuiAccordionComponent } from "./accordion/accordion";
import { CuiBannerComponent } from "./banner/banner";
import { CuiCircleComponent } from "./circle/circle";
import { CuiCloseComponent } from "./close/close";
import { CuiCoverComponent } from "./cover/cover";
import { CuiDialogComponent } from "./dialog/dialog";
import { CuiDropComponent } from "./drop/drop";
import { CuiFloatComponent } from "./float/float";
import { CuiIconComponent } from "./icon/icon";
//import { CuiIntersectionComponent } from "./intersection/intersection";
import { CuiOffCanvasComponent } from "./offcanvas/offcanvas";
import { CuiOffsetComponent } from "./offset/offset";
import { CuiOpenComponent } from "./open/open";
import { CuiParallaxComponent } from "./parallax/parallax";
import { CuiResizeComponent } from "./resize/resize";
import { CuiScrollComponent } from "./scroll/scroll";
import { CuiScrollSwitchComponent } from "./scroll/switch";
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
        CuiIconComponent(prefix),
        CuiTooltipComponent(prefix),
        CuiCircleComponent(prefix),
        CuiSpinnerComponent(prefix),
        CuiScrollComponent(prefix),
        CuiScrollspyComponent(prefix),
        CuiOpenComponent(prefix),
        CuiCloseComponent(prefix),
        CuiToggleComponent(prefix),
        CuiDialogComponent(prefix),
        CuiOffCanvasComponent(prefix),
        CuiAccordionComponent(prefix),
        CuiDropComponent(prefix),
        CuiOffsetComponent(prefix),
        CuiSwitchComponent(prefix),
        CuiSwitcherComponent(prefix),
        CuiFloatComponent(prefix),
        CuiSliderComponent(prefix),
        CuiBannerComponent(prefix),
        CuiCoverComponent(prefix),
        CuiSortableComponent(prefix),
        CuiResizeComponent(prefix),
        CuiParallaxComponent(prefix),
        CuiScrollSwitchComponent(prefix)
    ]
}