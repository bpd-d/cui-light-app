export interface ICuiParser<V, T> {
    parse(value: V): T;
}

export interface ICuiParserItem<V, T> {
    handle(result: V, value: T): ICuiParserItemResult<V>;
}

export interface ICuiParserItemResult<V> {
    value: V;
    done: boolean;
}

export interface ICuiParserCallbacks<V, T> {
    [id: string]: (result: V, item: T) => V;
}