<script>
    import { screen } from "../lib/stores";

    function toLogin() {
        screen.set("login");
    }

    function toCreateAccount() {
        screen.set("create-account");
    }

    function toTestingUserpage() {
        screen.set("user");
    }
</script>

<button on:click={toLogin}>Login</button>
<button on:click={toCreateAccount}>Create account</button>
<button on:click={toTestingUserpage}>test userpage</button>