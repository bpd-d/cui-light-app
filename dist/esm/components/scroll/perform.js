export const ScrollSwitchPerformers = [
    getPercentPerformer(),
    getToIndexPerform(),
    getToFirstPerform(),
    getToLastPerform(),
    getToNextPerform(),
    getToPrevPerform(),
    getTargetPerformer()
];
export function getTargetPerformer() {
    return {
        name: "target",
        check: (arg) => {
            return true;
        },
        perform: (arg, helper, options) => {
            return helper.toSelector(arg);
        }
    };
}
export function getToLastPerform() {
    return getStringBasedPerformer('last', (helper) => {
        helper.toLast();
        return true;
    });
}
export function getToFirstPerform() {
    return getStringBasedPerformer('first', (helper) => {
        helper.scrollTo(0);
        return true;
    });
}
export function getToIndexPerform() {
    let num = 0;
    return {
        name: 'index',
        check: (arg) => {
            num = parseInt(arg);
            return !isNaN(num);
        },
        perform: (arg, helper, options) => {
            helper.toIndex(num > 0 ? num - 1 : num);
            return true;
        }
    };
}
export function getToNextPerform() {
    return getStringBasedPerformer('next', (helper, options) => {
        const count = helper.getPagesCount();
        const current = helper.getCurrentPage();
        if (current >= count - 1) {
            if (!options.loop) {
                return false;
            }
            helper.scrollTo(0);
        }
        helper.toIndex(current + 1);
        return true;
    });
}
export function getToPrevPerform() {
    return getStringBasedPerformer('prev', (helper, options) => {
        const current = helper.getCurrentPage();
        if (current === 0) {
            if (!options.loop) {
                return false;
            }
            helper.toLast();
        }
        helper.toIndex(current - 1);
        return true;
    });
}
export function getPercentPerformer() {
    let num = -1;
    return {
        name: 'percent',
        check: (arg) => {
            if (!arg.match('%')) {
                return false;
            }
            const strValue = arg.substring(0, arg.length - 1);
            num = parseInt(strValue);
            return !isNaN(num);
        },
        perform: (arg, helper, options) => {
            helper.toPercent(num);
            return true;
        }
    };
}
function getStringBasedPerformer(name, callback) {
    return {
        name: name,
        check: (arg) => {
            return arg === name;
        },
        perform: (arg, helper, options) => {
            return callback(helper, options);
        }
    };
}
