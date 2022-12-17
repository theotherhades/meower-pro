<script>
    import { screen, screenHeader, username, APIToken, userpage } from "../lib/stores.js";

    let pageLoaded = false;
    let targetUsername;
    let targetQuote;

    if ($userpage === "") userpage.set("theotherhades");

    fetch(`https://api.meower.org/users/${$userpage}`, {
        headers: {
            Username: $username,
            Token: $APIToken
        }
    })
        .then((response) => response.text())
        .then((responseText) => JSON.parse(responseText))
        .then((userdata) => {
            targetUsername = userdata._id;
            targetQuote = userdata.quote;
            screenHeader.set(targetUsername);
            pageLoaded = true;
        });
</script>

<button on:click={() => { screen.set("home") }}>Back to Home</button><br>
{#if pageLoaded}
    <p>{targetQuote}</p>
{:else}
    <i>Loading...</i>
{/if}