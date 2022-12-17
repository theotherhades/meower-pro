<script>
    import Cloudlink from "./lib/cloudlink.js";
    import { screen, screenHeader, postList, postHistoryLoaded, ulist, username, APIToken } from "./lib/stores.js";
    import Login from "./screens/Login.svelte";
    import Home from "./screens/Home.svelte";
    import Start from "./screens/Start.svelte";
    import Userpage from "./screens/Userpage.svelte";

    function onConnect() {
        setInterval(() => { cl.send({ cmd: "ping", val: "" }) }, 10000);
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

        if (Object.hasOwn(cmd.val, "post_origin")) {
            if (cmd.val.post_origin === "home" && $screen === "home") {
                if (postHistoryLoaded) {
                    let postUpdator = $postList;

                    postUpdator.push(cmd.val);
                    postList.set(postUpdator);
                }
            }
        } else if (Object.hasOwn(cmd.val, "mode")) {
            if (cmd.val.mode === "auth") {
                username.set(cmd.val.payload.username);
                APIToken.set(cmd.val.payload.token);
                console.log(`Logged in as ${$username}`);
            }
        }
    }

    // Initialize cloudlink and assign callbacks
    export const cl = new Cloudlink("wss://server.meower.org/");
    cl.on("connected", onConnect);
    cl.on("disconnected", onDisconnect);
    cl.on("error", onError);
    cl.on("direct", onDirect);
    cl.on("ulist", (packet) => { ulist.set(packet.val.split(";")) });
</script>

<h1>{$screenHeader}</h1>
{#if $screen === "start"}
    <Start />
{:else if $screen === "login"}
    <Login {cl} />
{:else if $screen === "home"}
    <Home {cl} />
{:else if $screen === "user"}
    <Userpage />
{:else}
    <center>
        <h1>4040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040</h1>
        <p>Error code <code>4040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040404040</code>: you are an idiot</p>
    </center>
{/if}