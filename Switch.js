const rpio = require("rpio");

class Switch
{

    constructor(log, pin, activeValue, initialState)
    {
        this._log = log;
        this._activeValue = activeValue;
        this._state = (initialState || false) === this._activeValue;
        this._pin = pin;
        rpio.open(this._pin, rpio.OUTPUT, 1 - this._activeValue);
        this.state = this._state;
    }

    get state()
    {
        return this._state;
    }

    set state( value )
    {
        this._state = value;
        this._log("Turning switch " + ( this._state ? "on" : "off" ) + ", pin " + this._pin + " = " + this._activeValue);
        rpio.write(this._pin, this._state ? this._activeValue : (1 - this._activeValue));
    }

}

module.exports = Switch;