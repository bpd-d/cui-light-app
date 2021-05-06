export interface ICuiExtensionPerformer<T> {
    perform(arg: T): void;
}

export interface ICuiPerformerCallback<T> {
    setCallback(callback: (t: T) => void): void;
}