import { CuiInit } from './app/init';

export const CUI_LIGHT_VERSION = "0.3.4";

declare global {
    interface Window {
        cuiInit: CuiInit;
    }
}

export { CuiInstance } from './app/instance';
window.cuiInit = new CuiInit();