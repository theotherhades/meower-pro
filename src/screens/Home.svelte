<script>
    export let cl;
    import loadForm from "../lib/miscutils";
    import { postList, postHistoryLoaded, screenHeader, ulist } from "../lib/stores";

    screenHeader.set("Home");

    // Load last page of home
    let homePageData;
    fetch("https://api.meower.org/home")
        .then((response) => response.text())
        .then((responseText) => { try {homePageData = JSON.parse(responseText) } catch (e) { console.log(responseText) } })
        .then(() => {
            let postUpdator = $postList;

            homePageData.autoget.reverse().forEach((item) => { postUpdator.push(item) });
            postList.set(postUpdator);
        })
        .then(() => { postHistoryLoaded.set(true) });

    function sendPost(postForm) {
        const post = loadForm(postForm);

        cl.send({ cmd: "direct", val: { cmd: "post_home", val: post.postContent } });
        postForm.target.reset();
    }
</script>

<p><strong>{$ulist.length} users online:</strong> 
{$ulist.join(", ").slice(0, -2)}
</p>

<form on:submit|preventDefault={sendPost}>
    <input type="text" name="postContent" value="" placeholder="Once upon a time...">
    <input type="submit" value="Post">
</form>
{#if $postHistoryLoaded}
    {#each $postList.slice().reverse() as post}
        <p><strong>{post.u}:</strong> {post.p}</p>
    {/each}
{:else}
    <p>Loading posts...</p>
{/if}