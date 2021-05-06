export function getScrollFreezeHelper(style) {
    let _scrollY = 0;
    return {
        getScroll: () => {
            _scrollY = window.pageYOffset;
        },
        freeze: () => {
            style.setStyle('top', `-${_scrollY}px`, document.body);
        },
        release: () => {
            style.removeStyle('top', document.body);
            window.scrollTo(0, (_scrollY || 0) * -1);
            _scrollY = 0;
        }
    };
}
export function getKeyCloseCombos(parser, escClose, ...combos) {
    const comboList = [];
    if (escClose) {
        comboList.push({ key: "close", value: parser.parse("Escape") });
    }
    if (combos) {
        combos.forEach(c => {
            if (c) {
                comboList.push({ key: "close", value: parser.parse(c) });
            }
        });
    }
    return comboList;
}
export function getDefaultSwitchKeyCombo(key) {
    return {
        isAlt: true,
        isCtrl: true,
        isShift: false,
        key: key
    };
}
