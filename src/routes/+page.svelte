
<script>
import { onMount } from 'svelte';
import Papa from 'papaparse';
import { searchTerm, searchResults, setSearchResults } from '$lib/store';
import Card from '$lib/Card.svelte';


  let query = '';
  let results = [];

  onMount(() => {
    const csvUrl = 'https://gist.githubusercontent.com/simonlast/d5a86ba0c82e1b0d9f6e3d2581b95755/raw/f608b9b896dd3339df13dae317998d5f24c00a50/edu-scorecard.csv';
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: function(parsed) {
        setSearchResults(parsed.data);
      }
    });
  });

  $: results = $searchResults.filter(item => {
    const upperCaseQuery = query.toUpperCase();
    const lowerCaseQuery = query.toLowerCase();
    const queryLength = query.length > 2; // ensure that searching by 2-letter state works
    return (
      (item.UNITID.includes(upperCaseQuery) && queryLength) ||
      (item.INSTNM.toLowerCase().includes(lowerCaseQuery) && queryLength) ||
      (item.CITY.toLowerCase().includes(lowerCaseQuery) && queryLength) ||
      item.STABBR.includes(upperCaseQuery)
    )
  });

  function handleSearch() {
    searchTerm.set(query);
  }
</script>
<svelte:head>
	<link rel="stylesheet" media="screen" href="/styles/screen.css">
</svelte:head>
<header>
  <div class="logo">
    <h1>Your Uni</h1>
  </div>
  <nav>
    <ul>
      <li><a href="#" class="current">Product</a></li>
      <li><a href="#">Download</a></li>
      <li><a href="#">Pricing</a></li>
    </ul>
  </nav>
</header>
<main>
  <section class="hero">
    <div class="hero-copy">
      <h2>Find the university that’s right for you.</h2>
      <p>Tenetur ex explicabo et illo. Recusandae fugit eius voluptatem. Voluptas atque autem totam.</p>
    </div>
    <div class="ellipse-pic" style="--bg-image-props: url('/assets/figure1.webp') 50% 50%/cover no-repeat;">
    </div>

  </section>
  <section class="search-box">
    <input placeholder="Search..." type="text" id="search" bind:value={query} on:input={handleSearch}>
  </section>

  <section class="cards">
    {#each results as item}
      <Card
        unitid={item.UNITID}
        instnm={item.INSTNM}
        city={item.CITY}
        stabbr={item.STABBR}
        insturl={item.INSTURL}
      />
    {/each}
  </section>
</main>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3em 0 2em;
  }
  header > * {
    flex: 0 1 auto;
  }
  .logo h1 {
    font-size: var(--large-font-size);
    margin: 0;
  }
  header nav ul {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  header nav ul li:not(:last-child) {
    margin-right: 1.5em;
  }
  header nav ul li a {
    color: var(--body-copy-color);
    font-size: var(--nav-font-size);
    display: block;
    position: relative;
  }
  header nav ul li a.current::after {
    display: block;
    content: '';
    width: 100%;
    border-bottom: .125em solid hsla(4, 69%, 62%, 1);
    position: absolute;
    bottom: 0;
    left: 0;

  }
  .hero {
    display: flex;
    padding: 2em 0;
    align-items: center;
    justify-content: space-between;
  }
  .hero-copy {
    flex: 0 1 50%;
    margin-right: 1em;
  }
  .hero-copy h2 {
    font-size: var(--title-font-size);
    line-height: 1;
    margin: 0;
  }
  .hero-copy p {
    font-size: var(--med-font-size);
    margin-top: 1.2em;
  }
  .hero .ellipse-pic {
    width: 32%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background: linear-gradient(hsla(4, 69%, 62%, 1), hsla(4, 69%, 62%, 1)) 0 0/100% auto,var(--bg-image-props);
    background-blend-mode: screen, normal;

  }
  @media screen and (max-width: 648px) {
    .hero .ellipse-pic {
      width: 45%;
    }
  }

  @media screen and (max-width: 480px) {
    .hero {
      flex-direction: column;
    }
    .hero > * {
      flex: 0 1 auto;
      margin-right: 0;
      order: 1;
    }
    .hero .ellipse-pic {
      width: 75%;
      order: 0;
      margin-bottom: 2em;
    }
  }
  .search-box input {
    font-size: var(--x-small-font-size);
    color: hsla(0, 0%, 0%, .5);
    border: .125em solid hsla(0, 0%, 93%, 1);
    border-radius: .25em;
    padding: .75em 1em;
    max-width: 24em;
    width: 100%;
    margin: 3.125em 0;
    outline: none;
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(4, calc(25% - 1.5em));
    gap: 1.5em;
    justify-content: stretch;
    align-items: start;
  }
  @media screen and (max-width: 1024px) {
    .cards {
      grid-template-columns: repeat(3, calc(33% - 1.5em));
    }
  }
  @media screen and (max-width: 800px) {
    .cards {
      grid-template-columns: repeat(2, calc(50% - 1.5em));
    }
  }
  @media screen and (max-width: 648px) {
    .cards {
      grid-template-columns: 100%;
      column-gap: 0;
    }
  }
</style>

