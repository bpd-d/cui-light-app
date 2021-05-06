import { CuiPlugin } from "../base";
import { CuiKeysObserver } from "./observer";
export function CuiKeysObserverPluginFn(setup) {
    return new CuiPlugin({
        name: 'keys-plugin',
        description: "CuiKeysObserverPlugin",
        setup: setup,
        callback: (utils, setup) => {
            const observer = new CuiKeysObserver(utils.bus);
            observer.connect();
            return [
                [],
                () => { observer.disconnect(); }
            ];
        }
    });
}
// export class CuiKeysObserverPlugin implements ICuiPlugin {
//     description: string;
//     name: string = 'keys-plugin';
//     setup: CuiKeysObserverPluginSetup;
//     #keysObserver: ICuiKeysObserver | undefined;
//     constructor(keySetup: CuiKeysObserverPluginSetup) {
//         this.description = "CuiKeysObserverPlugin";
//         this.setup = keySetup;
//         this.#keysObserver = undefined;
//     }
//     init(utils: CuiUtils): void {
//         this.#keysObserver = new CuiKeysObserver(utils.bus);
//         this.#keysObserver.connect();
//     }
//     destroy(): void {
//         if (this.#keysObserver)
//             this.#keysObserver.disconnect();
//     }
// }
