<script>
    export let cl;
    import loadForm from "../lib/miscutils";
    import { screen, screenHeader } from "../lib/stores";

    screenHeader.set("Login to Meower");

    function login(credentialsForm) {
        const credentials = loadForm(credentialsForm);

        if (credentials.username === "" || credentials.password === "") {
            alert("You need to put a username and password!");
        } else {
            cl.send({ cmd: "direct", val: { cmd: "authpswd", val: { username: credentials.username, pswd: credentials.password } } });
            screen.set("home");
        }
    }
</script>

<form on:submit|preventDefault={login}>
    <input type="text" name="username" value="" placeholder="Username">
    <input type="password" name="password" value="" placeholder="Password">
    <input type="submit" value="Login">
</form>