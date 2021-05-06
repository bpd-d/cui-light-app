import { CuiPlugin } from "../base";
const DEFAULT_FOCUS_VISIBLE = "focus-visible";
const DEFAULT_FOCUS_PRECISE = "focus-precise";
export function CuiLightFocusPluginFn(setup) {
    return new CuiPlugin({
        name: "focus-plugin",
        description: "CuiLightFocusPlugin",
        setup: Object.assign({ keybordClass: DEFAULT_FOCUS_VISIBLE, mouseClass: DEFAULT_FOCUS_PRECISE, touchClass: DEFAULT_FOCUS_PRECISE }, setup),
        callback: (utils, setup) => {
            let _currentCls = undefined;
            let _inputType = 'none';
            function update(type) {
                let cls = getClass(type, setup);
                setClasses(cls, _currentCls, () => {
                    _currentCls = cls;
                    _inputType = type;
                });
            }
            function onMouseEvent(ev) {
                if (_inputType === 'mouse') {
                    return;
                }
                update('mouse');
            }
            function onKeyDownEvent(ev) {
                if (_inputType === 'keyboard') {
                    return;
                }
                update('keyboard');
            }
            function onTouchEvent(ev) {
                if (_inputType === 'touch') {
                    return;
                }
                update('touch');
            }
            function setClasses(cls, prevCls, callback) {
                if (!utils.interactions || cls === prevCls) {
                    return;
                }
                utils.interactions.fetch(() => {
                    let hasCls = cls && document.body.classList.contains(cls);
                    let hasPrevCls = prevCls && document.body.classList.contains(prevCls);
                    // @ts-ignore interactions is set
                    utils.interactions.mutate(() => {
                        if (!hasCls)
                            // @ts-ignore cls is set
                            document.body.classList.add(cls);
                        if (hasPrevCls) {
                            // @ts-ignore prevCls is set
                            document.body.classList.remove(prevCls);
                        }
                        callback();
                    }, null);
                }, null);
            }
            document.body.addEventListener('touchstart', onTouchEvent);
            document.body.addEventListener('mousedown', onMouseEvent);
            window.addEventListener('keydown', onKeyDownEvent);
            return [
                [],
                () => {
                    document.body.removeEventListener('touchstart', onTouchEvent);
                    document.body.removeEventListener('mousedown', onMouseEvent);
                    window.removeEventListener('keydown', onKeyDownEvent);
                }
            ];
        }
    });
}
function getClass(type, setup) {
    switch (type) {
        case "keyboard":
            return setup.keybordClass;
        case "mouse":
            return setup.mouseClass;
        case "touch":
            return setup.touchClass;
        default:
            return undefined;
    }
}
// export class CuiLightFocusPlugin implements ICuiPlugin {
//     description: string;
//     name: string;
//     setup: ICuiLightFocusPluginSetup;
//     #interactions: IUIInteractionProvider | undefined;
//     #inputType: FocusInputType;
//     #onMouseListener: any;
//     #onTouchListener: any;
//     #onKeyDownListener: any;
//     #currentCls: string | undefined;
//     constructor(setup: ICuiLightFocusPluginSetup) {
//         this.setup = {
//             keybordClass: DEFAULT_FOCUS_VISIBLE,
//             mouseClass: DEFAULT_FOCUS_PRECISE,
//             touchClass: DEFAULT_FOCUS_PRECISE,
//             ...setup
//         }
//         this.description = "CuiLightFocusPlugin";
//         this.name = "focus-plugin";
//         this.#interactions = undefined;
//         this.#onKeyDownListener = this.onKeyDownEvent.bind(this);
//         this.#onMouseListener = this.onMouseEvent.bind(this);
//         this.#onTouchListener = this.onTouchEvent.bind(this);
//         this.#inputType = 'none';
//         this.#currentCls = undefined;
//     }
//     init(utils: CuiUtils): void {
//         this.#interactions = utils.interactions;
//         document.body.addEventListener('touchstart', this.#onTouchListener);
//         document.body.addEventListener('mousedown', this.#onMouseListener);
//         window.addEventListener('keydown', this.#onKeyDownListener);
//     }
//     private onMouseEvent(ev: MouseEvent) {
//         if (this.#inputType === 'mouse') {
//             return;
//         }
//         this.update('mouse');
//     }
//     private onKeyDownEvent(ev: KeyboardEvent) {
//         if (this.#inputType === 'keyboard') {
//             return;
//         }
//         this.update('keyboard');
//     }
//     private onTouchEvent(ev: TouchEvent) {
//         if (this.#inputType === 'touch') {
//             return;
//         }
//         this.update('touch');
//     }
//     private update(type: FocusInputType) {
//         let cls = this.getClass(type);
//         this.setClasses(cls, this.#currentCls, () => {
//             this.#currentCls = cls
//             this.#inputType = type;
//         })
//     }
//     private getClass(type: FocusInputType): string | undefined {
//         switch (type) {
//             case "keyboard":
//                 return this.setup.keybordClass;
//             case "mouse":
//                 return this.setup.mouseClass;
//             case "touch":
//                 return this.setup.touchClass;
//             default:
//                 return undefined;
//         }
//     }
//     private setClasses(cls: string | undefined, prevCls: string | undefined, callback: () => void) {
//         if (!this.#interactions || cls === prevCls) {
//             return;
//         }
//         this.#interactions.fetch(() => {
//             let hasCls = cls && document.body.classList.contains(cls);
//             let hasPrevCls = prevCls && document.body.classList.contains(prevCls);
//             // @ts-ignore interactions is set
//             this.#interactions.mutate(() => {
//                 if (!hasCls)
//                     // @ts-ignore cls is set
//                     document.body.classList.add(cls);
//                 if (hasPrevCls) {
//                     // @ts-ignore prevCls is set
//                     document.body.classList.remove(prevCls);
//                 }
//                 callback();
//             }, null)
//         }, null)
//     }
//     destroy(): void {
//         document.body.removeEventListener('touchstart', this.#onTouchListener);
//         document.body.removeEventListener('mousedown', this.#onMouseListener);
//         window.removeEventListener('keydown', this.#onKeyDownListener);
//     }
// }
