<script>
    export let cl;

    function placeholder() {
        cl.send({cmd: "i'm testing hehe"});
    }
</script>

<h1>Meower Pro</h1>
<button on:click={placeholder}>Login</button>