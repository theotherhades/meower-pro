<script>
    export let cl;
    import loadForm from "../lib/miscutils";
    import { postList } from "../lib/stores";

    function sendPost(postForm) {
        const post = loadForm(postForm);

        cl.send({ cmd: "direct", val: { cmd: "post_home", val: post.postContent } });
        postForm.target.reset()
    }
</script>

<form on:submit|preventDefault={sendPost}>
    <input type="text" name="postContent" value="" placeholder="Once upon a time...">
    <input type="submit" value="Post">
</form>

{#each $postList.reverse() as post}
    <p><strong>{post.u}:</strong> {post.p}</p>
{/each}