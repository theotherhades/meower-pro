import { devmode } from "./stores.js";

let _devmode;
devmode.subscribe(value => {
    _devmode = value;
});

class DevOptions {
    constructor(cl) {
        this.cl = cl;
    }

    disabledWarning() {
        console.warn("devmode is not enabled! enable it with `devops.toggle()`");
    }

    devmode() {
        if (_devmode) {
            return true;
        } else {
            return false;
        }
    }

    toggle() {
        if (_devmode) {
            devmode.set(false);
            console.log("devmode has been disabled");
        } else {
            devmode.set(true);
            console.log("devmode has been enabled");
            console.warn("Only run commands here if you know what you're doing!!!");
        }
    }

    send(packet) {
        if (_devmode) {
            this.cl.send(packet);
        } else {
            this.disabledWarning();
        }
    }
}

export default DevOptions;