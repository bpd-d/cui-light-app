import { CuiAutoParseArgs } from '../../src/core/utils/arguments';
import { getRangeValue } from '../../src/core/utils/functions';

class ExampleArgs extends CuiAutoParseArgs {
    out: string;
    in: string;
    timeout: number;
    range: number;
    isOk: boolean;

    constructor() {
        super({
            props: {
                'range': { corrector: (value: number) => { return getRangeValue(value, 0, 10); } },
                'out': { corrector: (value: string) => { return value + '-xx'; } }
            }
        })
        this.in = "in";
        this.out = "out";
        this.range = 2;
        this.timeout = 300;
        this.isOk = false;
    }
}

describe("Tests for class [CuiAutoParseArgs]", function () {

    let exampleArgs: ExampleArgs;

    beforeEach(() => {
        exampleArgs = new ExampleArgs();
    })

    it("Case for method [parse] - no value", function () {
        exampleArgs.parse(undefined);

        expect(exampleArgs.in).toEqual("in");
        expect(exampleArgs.out).toEqual("out");
        expect(exampleArgs.range).toEqual(2);
        expect(exampleArgs.timeout).toEqual(300);
        expect(exampleArgs.isOk).toEqual(false);
    })

    it("Case for method [parse] - null value", function () {
        exampleArgs.parse(null);

        expect(exampleArgs.in).toEqual("in");
        expect(exampleArgs.out).toEqual("out");
        expect(exampleArgs.range).toEqual(2);
        expect(exampleArgs.timeout).toEqual(300);
        expect(exampleArgs.isOk).toEqual(false);
    })

    it("Case for method [parse] - empty object", function () {
        exampleArgs.parse({});

        expect(exampleArgs.in).toEqual("in");
        expect(exampleArgs.out).toEqual("out");
        expect(exampleArgs.range).toEqual(2);
        expect(exampleArgs.timeout).toEqual(300);
        expect(exampleArgs.isOk).toEqual(false);
    })

    it("Case for method [parse] - string values and string corrector", function () {
        exampleArgs.parse({ in: "XX", out: "YY" });

        expect(exampleArgs.in).toEqual("xx");
        expect(exampleArgs.out).toEqual("yy-xx");
        expect(exampleArgs.range).toEqual(2);
        expect(exampleArgs.timeout).toEqual(300);
        expect(exampleArgs.isOk).toEqual(false);
    })

    it("Case for method [parse] - number values and number corrector", function () {
        exampleArgs.parse({ timeout: "200", range: "20" });

        expect(exampleArgs.in).toEqual("in");
        expect(exampleArgs.out).toEqual("out");
        expect(exampleArgs.range).toEqual(10);
        expect(exampleArgs.timeout).toEqual(200);
        expect(exampleArgs.isOk).toEqual(false);
    })

    it("Case for method [parse] - number values and number corrector, inproper number value", function () {
        exampleArgs.parse({ timeout: "XX", range: "XX" });

        expect(exampleArgs.in).toEqual("in");
        expect(exampleArgs.out).toEqual("out");
        expect(exampleArgs.range).toEqual(2);
        expect(exampleArgs.timeout).toEqual(300);
        expect(exampleArgs.isOk).toEqual(false);
    })

    it("Case for method [parse] - boolean values", function () {
        exampleArgs.parse({ isOk: "Y" });

        expect(exampleArgs.in).toEqual("in");
        expect(exampleArgs.out).toEqual("out");
        expect(exampleArgs.range).toEqual(2);
        expect(exampleArgs.timeout).toEqual(300);
        expect(exampleArgs.isOk).toEqual(true);
    })

    it("Case for method [parse] - boolean values, not positive value", function () {
        exampleArgs.parse({ isOk: "XXXX" });

        expect(exampleArgs.in).toEqual("in");
        expect(exampleArgs.out).toEqual("out");
        expect(exampleArgs.range).toEqual(2);
        expect(exampleArgs.timeout).toEqual(300);
        expect(exampleArgs.isOk).toEqual(false);
    })

    it("Case for method [parse] - float value", function () {
        exampleArgs.parse({ timeout: "0.1" });

        expect(exampleArgs.in).toEqual("in");
        expect(exampleArgs.out).toEqual("out");
        expect(exampleArgs.range).toEqual(2);
        expect(exampleArgs.timeout).toEqual(0.1);
        expect(exampleArgs.isOk).toEqual(false);
    })



})