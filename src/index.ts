import { Gpio } from "onoff"
import { GpioRelay, GpioRelayConfiguration, IRelay } from "./GpioRelay";

module.exports = function (homebridge: any) {
    homebridge.registerAccessory(
        "homebridge-gpio-switch",
        "GPIO-Switch",
        function (log: (msg: string) => void, config: Config) { return new GPIOSwitch(homebridge, log, config); });
};

export class GPIOSwitch {
    infoService: any;
    service: any;
    _switch: IRelay;
    log: (msg: string) => void;
    private readonly config: Config;

    constructor(homebridge: any, log: (msg: string) => void, config: Config) {
        this.log = log;

        this.config = {
            ...{
                activeValue: true,
                initialState: false,
                type: {
                    ...{
                        manufacturer: "Opensource Community",
                        model: "GPIO Switch",
                        serialNumber: "Version 2.0.0"
                    },
                    ...config.type
                }
            },
            ...config
        };

        this._switch = new GpioRelay("Relay", this.config, log);

        this.infoService = new homebridge.hap.Service.AccessoryInformation();
        this.infoService
            .setCharacteristic(homebridge.hap.Characteristic.Manufacturer, this.config.type.manufacturer)
            .setCharacteristic(homebridge.hap.Characteristic.Model, this.config.type.model)
            .setCharacteristic(homebridge.hap.Characteristic.SerialNumber, this.config.type.serialNumber);

        this.service = new homebridge.hap.Service.Switch(this.config.name, this.config.name);
        this.service
            .getCharacteristic(homebridge.hap.Characteristic.On)
            .on("set", (value: boolean, callback: setCallback) => {
                this.log("New value: " + value);
                this._switch.state = value;
                callback(null);
            });

        this.service
            .getCharacteristic(homebridge.hap.Characteristic.Indentify)
            .on("set", (value: boolean, callback: setCallback) => {
                this.log("New value: " + value);
                this._switch.toggle();
                setTimeout(() => this._switch.toggle(), 500);
                callback(null);
            });

    }

    getServices() {
        return [this.infoService, this.service];
    }
}

export interface Config extends GpioRelayConfiguration {
    name: string,
    type: {
        manufacturer: string,
        model: string,
        serialNumber: string
    }
}

type getCallback<T> = (err: any, newValue: T) => void;

type setCallback = (err: any) => void;
