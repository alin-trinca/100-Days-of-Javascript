fetch(
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctether%2Cmonero%2Cdogecoin&vs_currencies=eur&include_24hr_change=true"
)
  .then((res) => res.json())
  .then((json) => {
    const container = document.querySelector(".container");
    const coins = Object.getOwnPropertyNames(json);

    for (let coin of coins) {
      const coinInfo = json[`${coin}`];
      const price = coinInfo.eur;
      const change = coinInfo.eur_24h_change.toFixed(5);

      container.innerHTML += `
  <div class="coin ${change > 0 ? "coin--falling" : "coin--rising"}">
    <div class="coin__name">
      ${coin}
    </div>
    <div class="coin__price">
        <span class="coin__value">${price} €</span>
        <span class="coin__change">${change}</span>
    </div>
  </div>
  `;
    }
  });