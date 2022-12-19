import { devmode } from "./stores.js";

let _devmode;
devmode.subscribe(value => {
    _devmode = value;
});

class DevOptions {
    disabledWarning() {
        console.warn("devmode is not enabled! enable it with `devops.toggle()`");
    }

    test() {
        if (_devmode) {
            console.log("OK!");
        } else {
            this.disabledWarning();
        }
    }

    toggle() {
        if (_devmode) {
            devmode.set(false);
        } else {
            devmode.set(true);
        }
    }
}

export default DevOptions;