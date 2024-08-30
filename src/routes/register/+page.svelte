<script lang="ts">
  import QRCode from "qrcode";
  import { onMount } from "svelte";

  export let form: { error: string; totpUri: string };
  let qrCanvasElement: HTMLCanvasElement;

  onMount(() => {
    if (form?.totpUri) {
      QRCode.toCanvas(qrCanvasElement, form.totpUri);
    }
  });
</script>

<h1>Register</h1>
<p>register using name and email</p>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}

{#if form?.totpUri}
  <p class="success">
    congrats you have successfully created an account, now time to link TOTP
    authentication using your favorite totp app like google authenticator,
    authy, ... etc, just scan this qr code
  </p>
  <p class="info">
    if you fail to link your account to a TOTP provider in this step your
    account will become inaccessible
  </p>

  <canvas bind:this={qrCanvasElement}></canvas>

  <p>after scanning the qr code you can now <a href="/login">login</a></p>
{:else}
  <form method="post">
    <label for="email">email </label>
    <input type="email" name="email" required /><br />

    <label for="name">name </label>
    <input type="text" name="name" required /><br />

    <button type="submit">register</button>
  </form>
{/if}

<style>
  .error {
    color: red;
  }

  .success {
    color: green;
  }
  .info {
    color: darkorange;
  }

  form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
  }

  /* Style the labels and inputs */
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: calc(100% - 22px);
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  /* Style the submit button */
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>
