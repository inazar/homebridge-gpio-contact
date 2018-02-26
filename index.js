"use strict";

var Service, Characteristic;
const Switch = require('./Switch.js');
const rpio = require('rpio');

module.exports = function(homebridge)
{
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory(
      "homebridge-gpio-switch", 
      "GPIO-Switch", 
      function(log, config){ return new GPIOSwitch(homebridge, log, config);});
};


class GPIOSwitch {

    constructor()
    {    
        this.log = log;
        
        this.config = Object.assign(
        {},
        {
            switch: Object.assign(
                {},
                {
                    activeValue: 1,
                },
                config.switch),
            rpioSettings: Object.assign(
                {},
                {
                    gpiomem: true,
                    mapping: "physical"
                },
                config.rpioSettings),
            initialFallbackState: false,
            type: Object.assign(
                {},
                {
                    manufacturer: "Opensource Community",
                    model: "GPIO Switch",
                    serialNumber: "Version 2.0.0"
                },
                config.type
            )
        }, config);
        
        if (process.geteuid() !== 0 && this.config.rpioSettings.gpiomem === false)
        {
            log("WARN! WARN! WARN! Using /dev/mem and not running as root");
        }
        rpio.init(this.config.rpioSettings);
        
        this.service = new Service.Switch(this.config.name, this.config.name);
        
        this.infoService = new Service.AccessoryInformation();
        this.infoService
            .setCharacteristic(Characteristic.Manufacturer, this.config.type.manufacturer)
            .setCharacteristic(Characteristic.Model, this.config.type.model)
            .setCharacteristic(Characteristic.SerialNumber, this.config.type.serialNumber);
        
        // Initialize the switch service
        
        this._switch = new Switch(this.log, this.config.switch.pin, this.config.switch.activeValue);
        
        this.service
            .getCharacteristic(Characteristic.On)
            .on("set", this.setState.bind(this));
    }

    getServices()
    {
        return [this.service];
    }

    setState(value, callback)
    {
        this.log("New value: " + value);
        this._switch.state = value;
        callback();
    }
}