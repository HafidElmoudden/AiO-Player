<script>
  export let height = "48";
  export let width = "48";
  export let onClick = () => {};
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  {height}
  viewBox="0 -960 960 960"
  {width}
  on:click={onClick}
>
  <path
    d="M320-203v-560l440 280-440 280Zm60-280Zm0 171 269-171-269-171v342Z"
  /></svg
>
