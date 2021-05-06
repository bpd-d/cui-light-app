import { EVENTS } from "../../core/utils/statics";
import { CuiPlugin } from "../base";
export function CuiWindowClickPluginFn() {
    return new CuiPlugin({
        name: 'click-plugin',
        description: "CuiWindowClickPlugin",
        setup: undefined,
        callback: (utils) => {
            function onWindowClick(ev) {
                utils.bus.emit(EVENTS.WINDOW_CLICK, null, {
                    ev: ev,
                    source: "CuiWindowClickPlugin",
                    timestamp: Date.now(),
                    name: EVENTS.WINDOW_CLICK
                });
            }
            window.addEventListener('click', onWindowClick);
            return [
                [],
                () => {
                    window.removeEventListener('click', onWindowClick);
                }
            ];
        }
    });
}
// export class CuiWindowClickPlugin implements ICuiPlugin {
//     description: string;
//     name: string = 'click-plugin';
//     setup: any;
//     #bus: ICuiEventBus | undefined;
//     #boundClick: (ev: MouseEvent) => void;
//     constructor() {
//         this.description = "CuiWindowClickPlugin";
//         this.#bus = undefined;
//         this.#boundClick = this.onWindowClick.bind(this);
//     }
//     init(utils: CuiUtils): void {
//         this.#bus = utils.bus;
//         window.addEventListener('click', this.#boundClick)
//     }
//     destroy(): void {
//         window.removeEventListener('click', this.#boundClick);
//     }
//     onWindowClick(ev: MouseEvent) {
//         if (this.#bus)
//             this.#bus.emit<GlobalClickEvent>(EVENTS.WINDOW_CLICK, null, {
//                 ev: ev,
//                 source: "CuiWindowClickPlugin",
//                 timestamp: Date.now(),
//                 name: EVENTS.WINDOW_CLICK
//             })
//     }
// }
