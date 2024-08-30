<script>
  import { page } from "$app/stores";
  export let data;
</script>

<nav>
  <ul>
    <li class={$page.url.pathname == "/" ? "active" : ""}>
      <a href="/">homepage</a>
    </li>
    <li class={$page.url.pathname.startsWith("/private") ? "active" : ""}>
      <a href="/private">private</a>
    </li>

    {#if !data.user}
      <li class={$page.url.pathname.startsWith("/login") ? "active" : ""}>
        <a href="/login">login</a>
      </li>
      <li class={$page.url.pathname.startsWith("/register") ? "active" : ""}>
        <a href="/register">register</a>
      </li>
    {:else}
      <li>
        <a href="/logout">logout</a>
      </li>
    {/if}
  </ul>
</nav>

<main>
  <slot />
</main>

<a
  id="github"
  href="https://github.com/ricin9/sveltekit-passwordless-login"
  target="_blank">source code</a
>

<style>
  main {
    max-width: 700px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
  }
  nav {
    display: flex;
    justify-content: center;
    margin: 2rem;
  }
  #github {
    position: fixed;
    top: 10px;
    right: 10px;
  }
  ul {
    display: flex;
    list-style: none;
    padding: 0;
  }

  li {
    margin: 0 1rem;
  }

  a {
    text-decoration: none;
    color: blue;
  }

  .active a {
    text-decoration: underline;
  }
</style>
