import { ICuiDictionary } from "../../../core/models/interfaces";
import { CuiDictionary } from "../../../core/utils/dictionary";
import { ICuiHandlerExtension } from "./interfaces";

export class CuiExtensionsHandler<T> {
    #dict: ICuiDictionary<ICuiHandlerExtension<T>>;
    constructor() {
        this.#dict = new CuiDictionary();
    }

    add(module: ICuiHandlerExtension<T>): void {
        this.#dict.add(module.type, module);
    }

    remove(type: string): void {
        this.#dict.remove(type);
    }

    async init(args: T): Promise<boolean> {
        let promises: Promise<boolean>[] = []
        this.#dict.forEach((name, module) => {
            if (module.init)
                promises.push(module.init(args))
        })
        await Promise.all(promises);
        return true;
    }

    async update(args: T): Promise<boolean> {
        let promises: Promise<boolean>[] = []
        this.#dict.forEach((name, module) => {
            if (module.update) {
                promises.push(module.update(args));
            }
        })
        await Promise.all(promises);
        return true;
    }

    async destroy(): Promise<boolean> {
        let promises: Promise<boolean>[] = []
        this.#dict.forEach((name, module) => {
            if (module.destroy) {
                promises.push(module.destroy());
            }
        })
        await Promise.all(promises);
        return true
    }
}