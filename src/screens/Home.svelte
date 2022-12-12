<script>
    export let cl;
    import loadForm from "../lib/miscutils";
    import { postList, postHistoryLoaded, lastPageLoaded, screenHeader, ulist, username, APIToken } from "../lib/stores";
    import DOMPurify from "dompurify";
    import snarkdown from "snarkdown";

    screenHeader.set("Home");
    let morePostsLoaded = true;

    // Load last page of home
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
         });

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
            })
    }
</script>

<p><strong>{$ulist.length} users online:</strong> 
{$ulist.join(", ").slice(0, -2)}
</p>
<p><i>Viewing the last {$lastPageLoaded} pages of home ({$postList.length} posts)</i></p>

<form on:submit|preventDefault={sendPost}>
    <input type="text" name="postContent" value="" placeholder="Once upon a time...">
    <input type="submit" value="Post">
</form>
{#if $postHistoryLoaded}
    {#each $postList.slice().reverse() as post}
        <p><strong>{post.u}:</strong> {@html snarkdown(DOMPurify.sanitize(post.p))} </p>
    {/each}
    {#if morePostsLoaded}
        <button on:click={loadMore}>Load more</button>
    {:else}
        <button disabled>Load more</button> <i>Loading posts...</i>
    {/if}
{:else}
    <p>Loading posts...</p>
{/if}