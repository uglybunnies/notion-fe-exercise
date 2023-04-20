<script>
  export let unitid;
  export let instnm;
  export let city;
  export let stabbr;
  export let insturl
</script>

<a href="{insturl}">
  <div class="card" id="{unitid}">
    <p class="loc">{city}, {stabbr}</p>
    <h3>{instnm}</h3>
    <p class="inst">{insturl}</p>
  </div>
</a>

<style>
  .card {
    background-color: #fff;
    padding: .75em 1em;
    border-radius: .25em;
    box-shadow: 0 .175em 0.4375em rgba(0, 0, 0, .2);
  }
  .card .loc {
    color: hsla(0, 0%, 0%, 0.6);
    font-size: var(--x-small-font-size);

  }
  .card h3 {
    font-size: var(--h3-font-size);
    color: var(--body-copy-color);
  }
  .card .inst {
    color: var(--orange-color);
    font-size: var(--small-font-size);
    overflow-wrap: break-word;
  }
</style>
