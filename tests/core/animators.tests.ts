import { ColorAnimator, FilterAnimator, OpacityAnimator, PositionAnimator, PropertyAnimator, TransformAnimator } from "../../src/core/animation/animators";

describe("Tests checking class [OpacityAnimator]", function () {
    it("Normal case", function () {
        let failed = false;
        let animator = new OpacityAnimator();
        try {
            animator.setProperty({
                from: 0,
                to: 1
            })
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;
            console.log(e)
        }
        expect(failed).toBeFalse();
    })

    it("Incorrect property", function () {
        let failed = false;
        let animator = new OpacityAnimator();
        try {
            animator.setProperty(null)
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeTrue();
    })

    it("Missing property", function () {
        let failed = false;
        let animator = new OpacityAnimator();
        try {
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;

        }
        expect(failed).toBeFalse();
    })
})

describe("Tests checking class [PropertyAnimator]", function () {
    it("Normal case", function () {
        let failed = false;
        try {
            let animator = new PropertyAnimator("aaaa");
            animator.setProperty({
                from: 0,
                to: 1
            })
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeFalse();
    })

    it("Empty property case", function () {
        let failed = false;
        try {
            let animator = new PropertyAnimator("");
            animator.setProperty({
                from: 0,
                to: 1
            })
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeTrue();
    })


    it("Incorrect property", function () {
        let failed = false;
        try {
            let animator = new PropertyAnimator("aaaa");
            animator.setProperty(null)
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeTrue();
    })

    it("Missing property", function () {
        let failed = false;
        try {
            let animator = new PropertyAnimator("aaaa");
            animator.perform({}, 0, 1);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeFalse();
    })
})

describe("Tests checking class [TransformAnimator]", function () {
    it("Normal case", function () {
        let failed = false;
        try {
            let animator = new TransformAnimator();
            animator.setProperty({
                "rotateX": {
                    from: 0,
                    to: 90,
                    unit: "deg"
                }
            })
            animator.perform({}, 0,);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeFalse();
    })

    it("Incorrect property", function () {
        let failed = false;
        try {
            let animator = new TransformAnimator();
            animator.setProperty(null);
            animator.perform({}, 0,);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeTrue();
    })

    it("Missing property", function () {
        let failed = false;
        try {
            let animator = new TransformAnimator();
            animator.perform({}, 0,);
        } catch (e) {
            failed = true;
        }
        expect(failed).toBeFalse();
    })
})


describe("Tests checking class [ColorAnimator]", function () {
    let animator: ColorAnimator;
    let object: any;
    beforeAll(() => {
        animator = new ColorAnimator('color');
        object = {
            style: {}
        }
    })

    it("Normal case", function () {
        let failed = false;
        try {
            animator.setProperty({
                from: {
                    red: 100,
                    green: 100,
                    blue: 100,
                    alpha: 1
                },
                to: {
                    red: 120,
                    green: 120,
                    blue: 120,
                    alpha: 1
                }
            })
            animator.perform(object, 0.5, 1);

        } catch (e) {
            failed = true;
        }
        expect(failed).toBeFalse();
        expect(object.style['color']).toEqual('rgba(110,110,110,1)');
    })

    it("Normal case - from bigger than to", function () {
        let failed = false;
        try {
            animator.setProperty({
                from: {
                    red: 150,
                    green: 150,
                    blue: 150,
                    alpha: 1
                },
                to: {
                    red: 120,
                    green: 120,
                    blue: 120,
                    alpha: 1
                }
            })
            animator.perform(object, 0.5, 1);

        } catch (e) {
            console.error(e)
            failed = true;
        }
        expect(failed).toBeFalse();
        expect(object.style['color']).toEqual('rgba(135,135,135,1)');
    })

    it("Normal case - values outside of range will adjust to range", function () {
        let failed = false;
        try {
            animator.setProperty({
                from: {
                    red: 300,
                    green: 300,
                    blue: 300,
                    alpha: 1
                },
                to: {
                    red: -10,
                    green: -10,
                    blue: -10,
                    alpha: 2
                }
            })
            animator.perform(object, 0.5, 1);

        } catch (e) {
            console.error(e)
            failed = true;
        }
        expect(failed).toBeFalse();
        expect(object.style['color']).toEqual('rgba(127.5,127.5,127.5,1)');
    })

})

describe("Tests checking [FilterAnimator]", () => {
    let animator: FilterAnimator;
    let object: any;
    beforeAll(() => {
        animator = new FilterAnimator();
        object = {
            style: {}
        }
    })

    it("Normal case", () => {
        let failed = false;
        try {
            animator.setProperty({
                blur: {
                    from: 1,
                    to: 2,
                    unit: "px"
                },
                grayscale: {
                    from: 0,
                    to: 1
                }
            })
            animator.perform(object, 0.5, 1);
        } catch (e) {
            console.error(e);
            failed = true;
        }

        expect(failed).toBeFalse();
        expect(object.style["filter"]).toEqual('blur(1.5px) grayscale(0.5)')
    })
})

describe("Tests checking [PositionAnimator]", () => {
    let animator: PositionAnimator;
    let object: any;
    beforeAll(() => {
        animator = new PositionAnimator();
        object = {
            style: {}
        }
    })

    it("Normal case", () => {
        let failed = false;
        try {
            animator.setProperty({
                x: {
                    from: 1,
                    to: 3,
                    unit: "px"
                },
                y: {
                    from: 1,
                    to: 3,
                    unit: "px"
                }
            })
            animator.perform(object, 0.5, 1);
        } catch (e) {
            console.error(e);
            failed = true;
        }

        expect(failed).toBeFalse();
        expect(object.style["backgroundPosition"]).toEqual('2px 2px')
    })
})