export declare type CuiNotificationType = 'accent' | 'secondary' | 'error' | 'warning' | 'success';
export interface ICuiNotification {
    id: string;
    title: string;
    message?: string;
    actions?: ICuiNotificationAction[];
    type?: CuiNotificationType;
    auto?: boolean;
}
export interface ICuiNotifiedEventData extends ICuiNotification {
    dissmissed: boolean;
}
export interface ICuiNotificationAction {
    name: string;
    callback: () => void;
}
export interface ElementHolderData {
    element: HTMLElement;
    timeoutId: any;
}
export interface ElementsHolder {
    [id: string]: ElementHolderData;
}
export interface ICuiNotificationPluginSetup {
    timeout?: number;
}
