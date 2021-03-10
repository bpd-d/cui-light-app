import { ICuiDictionary } from "../../../core/models/interfaces";
import { CuiDictionary } from "../../../core/utils/dictionary";
import { ICuiHandlerModule } from "./interfaces";

export class CuiModulesHandler<T> {
    #dict: ICuiDictionary<ICuiHandlerModule<T>>;
    constructor() {
        this.#dict = new CuiDictionary();
    }

    add(module: ICuiHandlerModule<T>): void {
        this.#dict.add(module.type, module);
    }

    remove(type: string): void {
        this.#dict.remove(type);
    }

    async init(args: T): Promise<boolean> {
        let promises: Promise<boolean>[] = []
        this.#dict.forEach((name, module) => promises.push(module.init(args)))
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
        this.#dict.forEach((name, module) => promises.push(module.destroy()))
        await Promise.all(promises);
        return true
    }
}