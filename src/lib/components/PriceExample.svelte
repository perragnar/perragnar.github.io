<script>
  // Props.
  export let title = null;
  export let width = null;
  export let height = null;
  export let imagePrice = null;
  export let developPrice = null;
  export let framePrice = null;
</script>

<div class="price-example">
  <h3>{title || 'Prisexempel'}</h3>
  <p>
    En {`${width} x ${height} cm`} print på matt eller glansigt fotopapper kostar
    i skrivande stund {developPrice} kr på Crimson. En standardram i vitt, svart
    eller ek kostar {framePrice} kr. Så totalt {developPrice +
      framePrice +
      imagePrice} kr för framkallning och ram och priset på fotot.
  </p>

  <p>Frakt tillkommer.</p>
</div>

<style type="scss">
  .price-example {
    margin: 5rem 0 2rem;
    font-size: 0.9em;
    background-color: $colorBorder;
    background-image: url(/images/pattern.svg);
    background-size: 10rem;
    padding: 2rem;
    border-radius: 3px;
  }
</style>
