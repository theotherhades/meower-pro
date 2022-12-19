<!-- totally didn't rip some of this straight out of https://www.w3schools.com/howto/howto_css_fixed_sidebar.asp -->

<div class="navbar">
    <button>Home</button>
    <button>Groupchats</button>
    <button>Notifications</button>
    <button>Settings</button>
</div>

<style>
    .navbar {
        height: 100%;
        width: 10%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        align-items: center;
        overflow-x: hidden;
        padding-top: 20px;

        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        gap: 0.5em;
        box-sizing: border-box;
    }

    .navbar > button {
        width: 75%;
    }
</style>