export abstract class Relay implements IRelay {

    private readonly log: (msg: string) => void;

    constructor(name: string, log: (msg: string) => void) {
        this.log = (msg: string) => log(`${name}: ${msg}`);
    }

    /** Switches relay on */
    public abstract on(): void;

    /** Switches relay off */
    public abstract off(): void;

    /** Toggles relay */
    public abstract toggle(): void;

    /** Gets the current state of the relay */
    public abstract get state(): boolean;

    /** Sets the current state of the relay */
    public abstract set state(value: boolean);
}

export interface IRelay {

    on(): void;
    off(): void;
    toggle(): void;
    state: boolean;
}