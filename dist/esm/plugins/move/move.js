import { CuiPlugin } from "../base";
import { CuiMoveObserver } from "./observer";
export function CuiMoveObserverPluginFn(gestures) {
    return new CuiPlugin({
        name: 'move-observer-plugin',
        description: "CuiMoveObserverPlugin",
        setup: gestures === true,
        callback: (utils, gestures) => {
            const observer = new CuiMoveObserver(utils.bus, gestures);
            observer.attach();
            return [
                [],
                () => {
                    if (observer.isAttached()) {
                        observer.detach();
                    }
                }
            ];
        }
    });
}
