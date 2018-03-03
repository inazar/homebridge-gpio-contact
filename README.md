# homebridge-gpio-switch

Simple switch for homebridge using a single GPIO pin.

Sample config:
```javascript
{
    "bridge":{
        "name":"My RPi Bridge",
        "username":"00:00:00:00:00:00",
        "pin":"000-00-000"
    },
    "accessories":[
        {
            "accessory":"GPIO-Switch",
            "name":"My switch",
            "pin": 5,
            "activeValue":false
            "initialState": false
        }
    ]
}
```
* set the `pin` to use (GPIO number)
* `initialState` set the switch on or off on load (as no state is kept inbetween reboots)
* `activeValue` value to apply when switching on (true => HIGH, false => LOW)