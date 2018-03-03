import { Gpio, GpioOptions } from "onoff";
import { Relay, IRelay } from "./Relay";

export { IRelay, GpioRelay, GpioRelayConfiguration };

class GpioRelay extends Relay {
    private pin: Gpio;
    constructor(name: string, protected readonly config: GpioRelayConfiguration, log: (msg: string) => void) {
        super(name, log);
        this.pin = new Gpio(this.config.pin, 'out');
        this.state = this.config.initialState;
        process.on('SIGINT', () => this.pin.unexport());
    }

    public on(): void {
        this.pin.writeSync(this.config.activeValue ? 1 : 0);
    }

    public off(): void {
        this.pin.writeSync(!this.config.activeValue ? 1 : 0);
    }

    public toggle(): void {
        if (this.state) {
            this.off();
        } else {
            this.on();
        }
    }

    public get state(): boolean {
        return this.pin.readSync() === (this.config.activeValue ? 1 : 0);
    }

    public set state(value: boolean) {
        this.pin.writeSync(value === this.config.activeValue ? 1 : 0);
    }
}

interface GpioRelayConfiguration {
    pin: number,
    activeValue: boolean,
    initialState: boolean
}
