import { CuiScrollPerformerOptions, ScrollPerformerHelper, ICuiScrollSwitchPerformer } from "./interfaces";

export const ScrollSwitchPerformers: ICuiScrollSwitchPerformer[] = [
    getPercentPerformer(),
    getToIndexPerform(),
    getToFirstPerform(),
    getToLastPerform(),
    getToNextPerform(),
    getToPrevPerform(),
    getTargetPerformer()
]

export function getTargetPerformer(): ICuiScrollSwitchPerformer {
    return {
        name: "target",
        check: (arg: any) => {
            return true;
        },
        perform: (arg: any, helper: ScrollPerformerHelper, options: CuiScrollPerformerOptions): boolean => {
            return helper.toSelector(arg);
        }
    }
}

export function getToLastPerform(): ICuiScrollSwitchPerformer {
    return getStringBasedPerformer('last', (helper: ScrollPerformerHelper) => {
        helper.toLast();
        return true;
    })
}

export function getToFirstPerform(): ICuiScrollSwitchPerformer {
    return getStringBasedPerformer('first', (helper: ScrollPerformerHelper) => {
        helper.scrollTo(0);
        return true;
    })
}

export function getToIndexPerform(): ICuiScrollSwitchPerformer {
    let num: number = 0;
    return {
        name: 'index',
        check: (arg: any) => {
            num = parseInt(arg);
            return !isNaN(num);
        },
        perform: (arg: any, helper: ScrollPerformerHelper, options: CuiScrollPerformerOptions) => {
            helper.toIndex(num > 0 ? num - 1 : num);
            return true;
        }
    }
}

export function getToNextPerform(): ICuiScrollSwitchPerformer {
    return getStringBasedPerformer('next', (helper: ScrollPerformerHelper, options: CuiScrollPerformerOptions) => {
        const count = helper.getPagesCount();
        const current = helper.getCurrentPage();
        if (current >= count - 1) {
            if (!options.loop) {
                return false;
            }
            helper.scrollTo(0);
        }

        helper.toIndex(current + 1)
        return true;
    })
}

export function getToPrevPerform(): ICuiScrollSwitchPerformer {
    return getStringBasedPerformer('prev',
        (helper: ScrollPerformerHelper, options: CuiScrollPerformerOptions) => {
            const current = helper.getCurrentPage();
            if (current === 0) {
                if (!options.loop) {
                    return false;
                }
                helper.toLast();
            }

            helper.toIndex(current - 1);
            return true;
        }
    )
}

export function getPercentPerformer(): ICuiScrollSwitchPerformer {
    let num: number = -1;
    return {
        name: 'percent',
        check: (arg: any) => {
            if (!arg.match('%')) {
                return false;
            }
            const strValue = arg.substring(0, arg.length - 1);
            num = parseInt(strValue);
            return !isNaN(num);
        },
        perform: (arg: any, helper: ScrollPerformerHelper, options: CuiScrollPerformerOptions) => {
            helper.toPercent(num);
            return true;
        }
    }
}

function getStringBasedPerformer(name: string, callback: (helper: ScrollPerformerHelper, options: CuiScrollPerformerOptions) => boolean): ICuiScrollSwitchPerformer {
    return {
        name: name,
        check: (arg: any) => {
            return arg === name;
        },
        perform: (arg: any, helper: ScrollPerformerHelper, options: CuiScrollPerformerOptions) => {
            return callback(helper, options)
        }
    }
}