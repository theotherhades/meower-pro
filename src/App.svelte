<script>
    import Cloudlink from "./lib/cloudlink.js";
    import Login from "./Login.svelte";

    function onConnect() {
        setInterval(() => { cl.send({ cmd: "ping", val: "" }); }, 10000);
        cl.send({ cmd: "direct", val: "meower", listener: "trust" });
        console.log("Connected!");
    }

    function onDisconnect() {
        console.log("Disconnected"); // change to reconnect later
    }

    function onError(error) {
        console.error(`CloudLink ERROR: ${JSON.stringify(error)}`);
    }

    function onDirect(cmd) {
        console.log(`%cINCOMING: ${JSON.stringify(cmd)}`, "color: gray; font-style: italic");
    }

    // Initialize cloudlink and assign callbacks
    export const cl = new Cloudlink("wss://server.meower.org/");
    cl.on("connected", onConnect);
    cl.on("disconnected", onDisconnect);
    cl.on("error", onError);
    cl.on("direct", onDirect);
</script>

<Login {cl} />