<script>
    import { screen, screenHeader, username, APIToken, userpage } from "../lib/stores.js";

    let pageLoaded = false;
    let targetUsername;
    let targetQuote;

    if ($userpage === "") userpage.set("theotherhades");
    screenHeader.set("HIDE");

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
            pageLoaded = true;
        });
</script>

<button class="buttonLink" on:click={() => { screen.set("home") }}>Back to Home</button><br>
{#if pageLoaded}
    <h2>{targetUsername}</h2>
    <p>{targetQuote}</p>
{:else}
    <i>Loading...</i>
{/if}