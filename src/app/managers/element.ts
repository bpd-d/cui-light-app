import { is, are } from "../../core/utils/functions";
import { CuiCachable, CuiElement } from "../../core/models/interfaces";
import { CuiCore } from "../../core/models/core";
import { CuiActionsHelper } from "../../core/helpers/helpers";
import { CuiActionsFactory, CuiClassAction } from "../../core/utils/actions";
import { ICuiDevelopmentTool } from "../../core/development/interfaces";
import { CuiDevtoolFactory } from "../../core/development/factory";

export class ElementManager implements CuiCachable {
    private _elements: Element[];
    private _isLocked: boolean;
    private _logger: ICuiDevelopmentTool;
    private _cDt: number;
    private _core: CuiCore;
    private _actionsHelper: CuiActionsHelper;
    constructor(elements: Element[], utils: CuiCore) {
        this._elements = elements;
        this._isLocked = false;
        this._logger = CuiDevtoolFactory.get("ElementManager");
        this._core = utils;
        this._cDt = Date.now();
        this._actionsHelper = new CuiActionsHelper(utils.interactions);
    }

    async toggleClass(className: string): Promise<boolean> {
        if (!is(className)) {
            return false;
        }
        return this.call((element) => {
            if (!element.classList.contains(className)) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }
        }, 'toggleClass');
    }

    async toggleClassAs(className: string): Promise<boolean> {
        if (!is(className)) {
            return false;
        }
        return this.call((element) => {
            let classes = element.classList;
            this._core.interactions.fetch(() => {
                if (!classes.contains(className)) {
                    this._core.interactions.mutate(classes.add, classes, className);
                } else {
                    this._core.interactions.mutate(classes.remove, classes, className);
                }
            }, this)

        }, 'toggleClassAs');
    }

    async setClass(className: string): Promise<boolean> {
        if (!is(className)) {
            return false;
        }
        return this.call((element) => {
            if (!element.classList.contains(className)) {
                element.classList.add(className)
            }
        }, 'setClass');
    }

    async setClassAs(className: string): Promise<boolean> {
        if (!is(className)) {
            return false;
        }

        return this.call((element) => {
            let classes = element.classList;
            this._core.interactions.fetch(() => {
                if (!classes.contains(className)) {
                    this._core.interactions.mutate(classes.add, classes, className);
                }
            }, this)

        }, 'setClassAs');
    }

    async removeClass(className: string): Promise<boolean> {
        if (!is(className)) {
            return false;
        }
        return this.call((element) => {
            if (element.classList.contains(className)) {
                element.classList.remove(className)
            }
        }, 'removeClass');
    }

    async removeClassAs(className: string): Promise<boolean> {
        if (!is(className)) {
            return false;
        }
        return this.call((element) => {
            let classes = element.classList;
            this._core.interactions.fetch(() => {
                if (classes.contains(className)) {
                    this._core.interactions.mutate(classes.remove, classes, className);
                }
            }, this)
        }, 'removeClass');
    }

    getAttribute(attributeName: string): string[] {
        if (!is(attributeName)) {
            return [];
        }
        return this._elements.reduce<string[]>((val: string[], current: Element) => {
            let attr = current.getAttribute(attributeName);
            if (attr != null) {
                val.push(attr)
            }
            return val;
        }, []);
    }

    async setAttribute(attributeName: string, attributeValue?: string): Promise<boolean> {
        if (!is(attributeName)) {
            return false;
        }
        return this.call((element) => {
            element.setAttribute(attributeName, attributeValue ?? "")
        }, 'setAttribute');
    }

    async setAttributeAs(attributeName: string, attributeValue?: string): Promise<boolean> {
        if (!is(attributeName)) {
            return false;
        }
        return this.call((element) => {
            this._core.interactions.mutate(element.setAttribute, element, attributeName, attributeValue ?? "")
        }, 'setAttributeAs');
    }

    async removeAttribute(attributeName: string): Promise<boolean> {
        if (!is(attributeName)) {
            return false;
        }
        return this.call((element) => {
            element.removeAttribute(attributeName)
        }, 'removeAttribute');
    }

    async removeAttributeAs(attributeName: string): Promise<boolean> {
        if (!is(attributeName)) {
            return false;
        }
        return this.call((element) => {
            this._core.interactions.mutate(element.removeAttribute, element, attributeName);
        }, 'removeAttributeAs');
    }

    async toggleAttribute(attributeName: string, attributeValue?: string): Promise<boolean> {
        if (!is(attributeName)) {
            return false;
        }
        return this.call((element) => {
            if (element.hasAttribute(attributeName)) {
                element.removeAttribute(attributeName)
            } else {
                element.setAttribute(attributeName, attributeValue ?? "")
            }
        }, 'toggleAttribute');
    }

    async toggleAttributeAs(attributeName: string, attributeValue?: string): Promise<boolean> {
        if (!is(attributeName)) {
            return false;
        }
        return this.call((element) => {
            this._core.interactions.fetch(() => {
                if (element.hasAttribute(attributeName)) {
                    this._core.interactions.mutate(element.removeAttribute, element, attributeName);
                } else {
                    this._core.interactions.mutate(element.setAttribute, element, attributeName, attributeValue ?? "")
                }
            }, this)

        }, 'toggleAttributeAs');
    }

    async click(onClick: (ev: MouseEvent) => void): Promise<boolean> {
        if (!is(onClick)) {
            return false;
        }
        return this.call((element) => {
            //@ts-ignore
            element.addEventListener('click', onClick);
        }, 'click');
    }

    async event(eventName: string, callback: any): Promise<boolean> {
        if (!is(eventName) || !is(callback)) {
            return false;
        }
        return this.call((element) => {
            element.addEventListener(eventName, callback);
        }, 'event');
    }

    async call(callback: (element: Element, index: Number) => void, functionName?: string): Promise<boolean> {
        if (this._isLocked) {
            this._logger.error("Element is locked", functionName)
        }
        this.lock();
        this._elements.forEach((element, index) => {
            callback(element, index)
        })
        this.unlock();
        return true;
    }

    async setAction(actionStr: string, animationClass: string, timeout?: number): Promise<boolean> {
        if (!is(actionStr)) {
            return false
        }
        let act = CuiActionsFactory.get(actionStr);
        return this.animate(animationClass, timeout, (element: Element) => {
            act.add(element);
        })
    }

    async removeAction(actionStr: string, animationClass: string, timeout?: number): Promise<boolean> {
        if (!is(actionStr)) {
            return false
        }
        let act = CuiActionsFactory.get(actionStr);
        return this.animate(animationClass, timeout, (element: Element) => {
            act.remove(element);
        })
    }
    /**
     * Perform animation on the element
     * @param animationClass 
     * @param timeout 
     * @param callback 
     */
    async animate(animationClass: string, timeout?: number, callback?: (element: Element) => void) {
        if (!is(animationClass)) {
            return false
        }
        const delay = timeout ?? this._core.setup.animationTime ?? 0;
        const action = new CuiClassAction(animationClass);
        return this.call((element) => {
            return this._actionsHelper.performAction(element, action, delay, () => {
                if (callback)
                    callback(element);
            });
        });
    }

    emit(event: string, ...args: any[]): void {
        if (!is(event)) {
            this._logger.warning("Not enough data to emit event", "emit")
            return;
        }
        this.call((element: Element) => {
            let cuid = (<CuiElement>(element as any)).$cuid;
            if (is(cuid)) {
                this._logger.debug(`Emitting event ${event} to ${cuid}`)
                this._core.bus.emit(event, cuid, ...args);
            }
        }, "emit")
    }

    on(event: string, callback: any): string[] {
        let ids: string[] = []
        if (!are(event, callback)) {
            this._logger.error("Incorrect arguments", "on")
            return ids;
        }

        this.call((element: Element) => {
            let cuiElement = (<CuiElement>(element as any));
            if (is(cuiElement)) {
                let disposeId = this._core.bus.on(event, callback, cuiElement);
                if (disposeId != null)
                    ids.push(disposeId);
            }
        }, "on")
        return ids;
    }

    detach(event: string, id: string): void {
        if (!are(event, id)) {
            this._logger.error("Incorrect arguments", "detach")
        }
        this.call((element: Element) => {
            let cuiElement = (<CuiElement>(element as any));
            if (is(cuiElement)) {
                this._core.bus.detach(event, id, cuiElement);
            }
        }, "detach")
    }

    read(callback: any, ...args: any[]): void {
        this._core.interactions.fetch(callback, this, ...args)
    }

    change(callback: any, ...args: any[]): void {
        this._core.interactions.mutate(callback, this, ...args)
    }

    elements(): Element[] {
        return this._elements;
    }

    count() {
        return this._elements.length;
    }

    lock() {
        this._isLocked = true;
    }

    unlock() {
        this._isLocked = false;
    }

    isLocked(): boolean {
        return this._isLocked;
    }

    refresh(): boolean {
        return (Date.now() - this._cDt) < 360000;
    }
}