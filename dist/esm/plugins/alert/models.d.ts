export interface CuiAlertEvent {
    id: string;
    type: CuiAlertType;
    options: CuiAlertOptions;
}
export declare type CuiAlertType = "Info" | "OkCancel" | "YesNoCancel";
export interface CuiAlertOptions {
    title: string;
    message: string;
    reverse?: boolean;
    onCancel?: () => void;
    onOk?: () => void;
    onYes?: () => void;
    onNo?: () => void;
}
