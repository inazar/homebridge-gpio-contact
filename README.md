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
            "switch":{
                "pin":32,
                "activeValue":0
            },
            "initialFallbackState": false,
            "rpioSettings":{
                "gpiomem":true,
                "mapping":"physical"
            }
        }
    ]
}
```
* `rpioSettings` is being passed to rpio when initializing
* `switch` set the pin to use (see ```rpioSettings``` to chose mapping)
* `initialFallbackState` set the switch on or off on load (as no state is kept inbetween reboots)
