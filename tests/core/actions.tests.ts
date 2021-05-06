
import { CuiClassAction, ICuiComponentAction, CuiInboundAction, CuiActionsFactory } from '../../src/core/utils/actions';
import { CuiUtils } from '../../src/core/models/utils';
import { CuiSetupInit } from '../../src/core/models/setup';
import { sleep } from '../../src/core/utils/functions';

describe("Tests checking method [CuiActions]", function () {
    let element: Element;
    let utils: CuiUtils;
    let darkModeClass: string = 'cui-dark';
    let printModeClass: string = 'cui-print';
    beforeEach(() => {
        utils = new CuiUtils(new CuiSetupInit());
        element = document.createElement('div');
        document.body.appendChild(element);
        document.body.classList.remove(darkModeClass);
        document.body.classList.remove(printModeClass);

    })

    afterEach(() => {
        element.remove();
    })

    it("Checking class [CuiClassAction] - normal case ", function () {
        let action: ICuiComponentAction = new CuiClassAction("cls");
        let onAdd: boolean = false;
        let onRemove: boolean = false;
        action.add(element)
        onAdd = element.classList.contains('cls');
        action.remove(element)
        onRemove = element.classList.contains('cls');
        expect(onAdd).toBeTrue();
        expect(onRemove).toBeFalse();
    })

    it("Checking class [CuiClassAction] - null element case ", function () {
        let action: ICuiComponentAction = new CuiClassAction("cls");
        let onAdd: boolean = false;
        let onRemove: boolean = false;
        action.add(null)
        onAdd = element.classList.contains('cls');
        action.remove(element)
        onRemove = element.classList.contains('cls');
        expect(onAdd).toBeFalse();
        expect(onRemove).toBeFalse();
    })

    it("Checking class [CuiClassAction] - null element case ", function () {
        let action: ICuiComponentAction = new CuiClassAction("cls");
        let onAdd: boolean = false;
        let onRemove: boolean = false;
        action.add(element)
        onAdd = element.classList.contains('cls');
        action.remove(null)
        onRemove = element.classList.contains('cls');
        expect(onAdd).toBeTrue();
        expect(onRemove).toBeTrue();
    })

    it("Checking class [CuiClassAction] - null class case ", function () {
        let action: ICuiComponentAction = new CuiClassAction(null);
        let onAdd: boolean = false;
        let onRemove: boolean = false;
        action.add(element)
        onAdd = element.classList.contains('cls');
        action.remove(element)
        onRemove = element.classList.contains('cls');
        expect(onAdd).toBeFalse();
        expect(onRemove).toBeFalse();
    })


    it("Checking class [CuiInboundAction] - set dark mode", async function () {
        let action: ICuiComponentAction = new CuiInboundAction("dark-mode");
        let hasToggledAdd: boolean = false;
        let hasToggledRemove: boolean = false;

        action.add(null, utils)
        await sleep(100);
        hasToggledAdd = document.body.classList.contains(darkModeClass);
        action.remove(null, utils)
        await sleep(100);
        hasToggledRemove = document.body.classList.contains(darkModeClass);

        expect(hasToggledAdd).toBeTrue();
        expect(hasToggledRemove).toBeFalse();
    })

    it("Checking class [CuiInboundAction] - set light mode", async function () {
        let action: ICuiComponentAction = new CuiInboundAction("light-mode");
        //let action2: ICuiComponentAction = new CuiInboundAction("light-mode");
        let hasToggledAdd: boolean = false;
        let hasToggledRemove: boolean = false;

        action.add(null, utils)
        await sleep(100);
        hasToggledAdd = document.body.classList.contains(darkModeClass);
        action.remove(null, utils)
        await sleep(100);
        hasToggledRemove = document.body.classList.contains(darkModeClass);

        expect(hasToggledAdd).toBeFalse();
        expect(hasToggledRemove).toBeTrue();
    })

    it("Checking class [CuiInboundAction] - set dark mode toggle", async function () {
        let action: ICuiComponentAction = new CuiInboundAction("dark-mode");
        let hasToggledAdd: boolean = false;
        let hasToggledRemove: boolean = false;

        action.toggle(null, utils)
        await sleep(100);
        hasToggledAdd = document.body.classList.contains(darkModeClass);
        action.toggle(null, utils)
        await sleep(100);
        hasToggledRemove = document.body.classList.contains(darkModeClass);

        expect(hasToggledAdd).toBeTrue();
        expect(hasToggledRemove).toBeFalse();
    })

    it("Checking class [CuiActionsFatory] - inbound indicator", async function () {
        let action: ICuiComponentAction = CuiActionsFactory.get("~dark-mode");
        let hasToggledAdd: boolean = false;
        let hasToggledRemove: boolean = false;

        action.toggle(null, utils)
        await sleep(100);
        hasToggledAdd = document.body.classList.contains(darkModeClass);
        action.toggle(null, utils)
        await sleep(100);
        hasToggledRemove = document.body.classList.contains(darkModeClass);

        expect(hasToggledAdd).toBeTrue();
        expect(hasToggledRemove).toBeFalse();
    })

    it("Checking class [CuiActionsFatory] - class indicator ", function () {
        let action: ICuiComponentAction = CuiActionsFactory.get(".cls");
        let onAdd: boolean = false;
        let onRemove: boolean = false;
        action.add(element)
        onAdd = element.classList.contains('cls');
        action.remove(element)
        onRemove = element.classList.contains('cls');
        expect(onAdd).toBeTrue();
        expect(onRemove).toBeFalse();
    })

    it("Checking class [AttributeAction] - class indicator ", function () {
        let action: ICuiComponentAction = CuiActionsFactory.get("&src:http://www.goole.com");
        let onAdd: boolean = false;
        let value: string = null;
        let onRemove: boolean = false;
        action.add(element)
        onAdd = element.hasAttribute('src');
        value = element.getAttribute("src");
        action.remove(element)
        onRemove = element.hasAttribute('src');
        expect(onAdd).toBeTrue();
        expect(value).toEqual("http://www.goole.com");
        expect(onRemove).toBeFalse();
    })

    it("Checking class [StyleAction] - class indicator ", function () {
        let action: ICuiComponentAction = CuiActionsFactory.get("^fontSize:14px");
        let onAdd: string = undefined;
        let onRemove: string = undefined;
        let el = element as any;

        action.add(element)
        onAdd = el.style.fontSize;
        action.remove(element)
        onRemove = el.style.fontSize;
        expect(onAdd).toEqual("14px");
        expect(onRemove).toEqual("");
    })

})