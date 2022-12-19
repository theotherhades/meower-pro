<script>
    export let cl;
    import loadForm from "../lib/miscutils";
    import { screen, postList, postHistoryLoaded, lastPageLoaded, screenHeader, ulist, username, APIToken, userpage, homeLoaded } from "../lib/stores";
    import DOMPurify from "dompurify";
    import snarkdown from "snarkdown";

    screenHeader.set("Home");
    let morePostsLoaded = true;

    // Load last page of home
    if (!$homeLoaded) {
        fetch("https://api.meower.org/home")
            .then((response) => response.text())
            .then((responseText) => JSON.parse(responseText))
            .then((homePageData) => {
                let postUpdator = $postList;

                homePageData.autoget.reverse().forEach((item) => { postUpdator.push(item) });
                postList.set(postUpdator);
            })
            .then(() => { 
                postHistoryLoaded.set(true);
                lastPageLoaded.set(1);
                homeLoaded.set(true);
            });
    }

    function sendPost(postForm) {
        const post = loadForm(postForm);

        cl.send({ cmd: "direct", val: { cmd: "post_home", val: post.postContent } });
        postForm.target.reset();
    }

    function loadMore() {
        morePostsLoaded = false;
        fetch(`https://api.meower.org/home?page=${$lastPageLoaded + 1}`, {
            headers: {
                Username: $username,
                Token: $APIToken
            }
        })
            .then((response) => response.text())
            .then((responseText) => JSON.parse(responseText))
            .then((homePageData) => {
                let postUpdator = $postList;
                postUpdator.reverse()

                homePageData.autoget.forEach((item) => { postUpdator.push(item) });
                postUpdator.reverse()
                postList.set(postUpdator);
            })
            .then(() => {
                morePostsLoaded = true;
                lastPageLoaded.set($lastPageLoaded + 1);
            });
    }

    function profile(user) {
        userpage.set(user);
        screen.set("user");
    }
</script>

<p><strong>{$ulist.length} users online:</strong> 
{$ulist.join(", ").slice(0, -2)}
</p>
{#if $lastPageLoaded > 1}
    <p><i>Viewing the last {$lastPageLoaded} pages of home ({$postList.length} posts)</i></p>
{:else}
    <p><i>Viewing the last page of home ({$postList.length} posts)</i></p>
{/if}

<form on:submit|preventDefault={sendPost}>
    <input type="text" name="postContent" value="" placeholder="Once upon a time...">
    <input type="submit" value="Post">
</form>
{#if $postHistoryLoaded}
    {#each $postList.slice().reverse() as post}
        <p><a href="#" on:click|preventDefault={() => { profile(post.u) }}>{post.u}</a>: {@html snarkdown(DOMPurify.sanitize(post.p.replaceAll("\n", "\\n"))).replaceAll("\\n", "<br>")} </p>
    {/each}
    {#if morePostsLoaded}
        <button on:click={loadMore}>Load more</button>
    {:else}
        <button disabled>Load more</button> <i>Loading posts...</i>
    {/if}
{:else}
    <p>Loading posts...</p>
{/if}