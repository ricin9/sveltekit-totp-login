<script>
  export let data;
</script>

<h1>Private Page</h1>

<p>Only logged in users can see this page</p>

<p>hello {data.user?.name}</p>
