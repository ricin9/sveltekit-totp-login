<script lang="ts">
  export let form: { error: string; success: boolean };
</script>

<h1>Login</h1>

<p>login using email and totp from your app</p>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}

<form method="post">
  <label for="email">email </label><input type="email" name="email" /><br />
  <label for="totp">totp</label><input type="number" name="totp" /><br />
  <button type="submit">login</button>
</form>

<style>
  .error {
    color: red;
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
