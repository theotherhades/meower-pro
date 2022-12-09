<script>
    import { screen } from "../lib/stores";

    function toLogin() {
        screen.set("login");
    }

    function toCreateAccount() {
        screen.set("create-account");
    }
</script>

<button on:click={toLogin}>Login</button>
<button on:click={toCreateAccount}>Create account</button>