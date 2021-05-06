import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiPlugin } from "../base";
import { CuiMoveObserver } from "./observer";

export function CuiMoveObserverPluginFn(gestures?: boolean): ICuiPlugin {
    return new CuiPlugin({
        name: 'move-observer-plugin',
        description: "CuiMoveObserverPlugin",
        setup: gestures === true,
        callback: (utils: CuiCore, gestures: boolean) => {
            const observer = new CuiMoveObserver(utils.bus, gestures);
            observer.attach();
            return [
                [],
                () => {
                    if (observer.isAttached()) {
                        observer.detach();
                    }
                }
            ]
        }
    })
}