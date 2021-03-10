import { CuiCloseArgs } from "src/components/close/close";
import { CuiHandlerModuleProps, ICuiHandlerModule } from "src/core/handlers/modules/interfaces";
import { CuiHandlerBusMixin } from "src/core/handlers/modules/mixins";
import { CuiKeyCloseArgs } from "src/core/models/arguments";
import { KeyDownEvent } from "src/core/models/events";
import { is } from "src/core/utils/functions";
import { Mixin } from "src/core/utils/mixins";
import { EVENTS } from "src/core/utils/statics";


export class CuiKeysHandlerModule extends Mixin([CuiHandlerBusMixin]) implements ICuiHandlerModule<CuiKeyCloseArgs> {
    props: CuiHandlerModuleProps;
    type: string;
    description: string;
    args: CuiKeyCloseArgs;
    #onKey: (ev: KeyDownEvent) => void;
    #eventId: string | null;
    constructor(props: CuiHandlerModuleProps, args: CuiKeyCloseArgs, onKey: (ev: KeyDownEvent) => void) {
        super();
        this.props = props;
        this.args = args;
        this.#onKey = onKey;
        this.#eventId = null;
        this.emittedEvents = [];
        this.type = "key-close";
        this.description = ""
    }

    async init(args: CuiKeyCloseArgs): Promise<boolean> {
        this.#eventId = this.on<KeyDownEvent>(EVENTS.KEYDOWN, this.onKeyDown.bind(this));
        return true;
    }

    async update(args: CuiKeyCloseArgs) {
        this.args = args;
        return true;
    }

    async destroy(): Promise<boolean> {
        if (this.#eventId)
            this.detach(EVENTS.KEYDOWN, this.#eventId)
        return true;
    }

    onKeyDown(ev: KeyDownEvent) {
        if (this.args.escClose && ev.event.key === "Escape" || is(this.args.keyClose) && ev.event.key === this.args.keyClose) {
            this.#onKey(ev);
        }
    }

}