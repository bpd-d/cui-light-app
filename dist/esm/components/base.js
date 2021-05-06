export function CuiComponentBaseHook(setup) {
    var _a;
    const _prefix = (_a = setup.prefix) !== null && _a !== void 0 ? _a : 'cui';
    const _attribute = _prefix + "-" + setup.name;
    return {
        attribute: _attribute,
        get: (element, utils) => setup.create(element, utils, _prefix, _attribute),
        style: setup.style
    };
}
