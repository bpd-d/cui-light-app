import { CuiKeysComboParser, KeyComboParsers } from '../../src/core/utils/parsers/keys';

describe("Test checking class [CuiKeysComboParser]", () => {
    it("Creates proper keys combo object from string", () => {
        let parser = new CuiKeysComboParser(KeyComboParsers);
        let text = "Ctrl+k";

        let result = parser.parse(text);

        expect(result).toBeDefined();
        expect(result.isCtrl).toBeTrue();
        expect(result.isAlt).toBeFalse();
        expect(result.isShift).toBeFalse();
        expect(result.key).toEqual('k');
    })

    it("Creates proper keys combo object from string - lowercased modifier keys", () => {
        let parser = new CuiKeysComboParser(KeyComboParsers);
        let text = "ctrl+alt+k";

        let result = parser.parse(text);

        expect(result).toBeDefined();
        expect(result.isCtrl).toBeTrue();
        expect(result.isAlt).toBeTrue();
        expect(result.isShift).toBeFalse();
        expect(result.key).toEqual('k');
    })

    it("Creates proper keys combo object from string - no modifier", () => {
        let parser = new CuiKeysComboParser(KeyComboParsers);
        let text = "Escape";

        let result = parser.parse(text);

        expect(result).toBeDefined();
        expect(result.isCtrl).toBeFalse();
        expect(result.isAlt).toBeFalse();
        expect(result.isShift).toBeFalse();
        expect(result.key).toEqual('Escape');
    })
})