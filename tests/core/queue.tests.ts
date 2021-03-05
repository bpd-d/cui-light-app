import { CuiQueueAdapterType, ICuiQueueAdapter } from "../../src/core/queue/interfaces";
import { CuiQueue } from "../../src/core/queue/queue";
import { sleep } from "../../src/core/utils/functions";

class SimpleAdapter implements ICuiQueueAdapter<string> {
    type?: CuiQueueAdapterType;
    callback: (text: string[]) => void;
    sleep?: number;
    constructor(type: CuiQueueAdapterType, callback: (texts: string[]) => void, sleep?: number) {
        this.callback = callback;
        this.type = type;
        this.sleep = sleep;
    }

    async onFlush(items: string[]): Promise<boolean> {
        if (this.sleep) {
            await sleep(this.sleep);
        }
        this.callback(items);
        return true;
    }
}

describe("Tests checking method [CuiQueue]", function () {
    it("Base case - one item", async function () {
        const result: string[] = [];
        const queue = new CuiQueue<string>(new SimpleAdapter('single', (items: string[]) => {
            result.push(...items);
        }))
        queue.add("XXX");
        await sleep(50);

        expect(queue).toBeDefined();
        expect(result).toContain("XXX")
    })

    it("Base case - mulitple items", async function () {
        const result: string[] = [];
        const queue = new CuiQueue<string>(new SimpleAdapter('single', (items: string[]) => {
            result.push(...items);
        }))
        queue.add("XXX");
        queue.add("YYY");
        queue.add("ZZZ");
        await sleep(50);
        if (queue.isLocked()) {
            await sleep(50);
        }

        expect(queue).toBeDefined();
        expect(result).toContain("XXX")
        expect(result).toContain("YYY")
        expect(result).toContain("ZZZ")
    })

    it("Delete item from queue", async function () {
        const result: string[] = [];
        let deleted: string = "";
        const queue = new CuiQueue<string>(new SimpleAdapter('single', (items: string[]) => {
            result.push(...items);
        }, 30))

        queue.add("XXX");
        queue.add("YYY");
        queue.add("ZZZ");
        deleted = queue.delete('ZZZ')
        await sleep(100);

        expect(queue).toBeDefined();
        expect(deleted).toContain("ZZZ")
        expect(result).toContain("YYY")
        expect(result).toContain("XXX")
    })

    it("Error case - mulitple items", async function () {
        const result: string[] = [];
        const errors: string[] = [];
        const queue = new CuiQueue<string>(new SimpleAdapter('single', (items: string[]) => {
            if (items[0] === 'XXX') {
                throw new Error("XXX");
            }
            result.push(...items);
        }))
        queue.onError((e: unknown, items: string[]) => {
            errors.push(...items)
        })

        queue.add("XXX");
        queue.add("YYY");
        queue.add("ZZZ");

        await sleep(50);
        if (queue.isLocked()) {
            await sleep(50);
        }

        expect(queue).toBeDefined();
        expect(errors).toContain("XXX")
        expect(result).toContain("YYY")
        expect(result).toContain("ZZZ")
    })
})