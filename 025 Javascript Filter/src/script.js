const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress"
  },
  {
    id: 11,
    name: "Invicta Men's Pro Diver 2",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress"
  },
  {
    id: 2,
    name: "Timex Men's Expedition Scout",
    img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
    price: 40,
    cat: "Sport"
  },
  {
    id: 3,
    name: "Breitling Superocean Heritage",
    img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
    price: 200,
    cat: "Luxury"
  },
  {
    id: 4,
    name: "Casio Classic Resin Strap",
    img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
    price: 16,
    cat: "Sport"
  },
  {
    id: 5,
    name: "Timex Easy Reader",
    img: "https://m.media-amazon.com/images/I/913pwFQn3sL._AC_UY741_.jpg",
    price: 74,
    cat: "Casual"
  }
];

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".categories");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const filterAndDisplayProducts = (filterFunc) => {
  const filteredProducts = data.filter(filterFunc);
  displayProducts(filteredProducts);
};

const displayProducts = (filteredProducts) => {
  productsContainer.innerHTML = filteredProducts
    .map(
      (product) =>
        `
       <div class="product">
          <img src=${product.img} alt="" />
          <span class="name">${product.name}</span>
          <span class="priceText">$${product.price}</span>
        </div>
    `
    )
    .join("");
};

filterAndDisplayProducts(() => true);

searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();
  filterAndDisplayProducts((item) => item.name.toLowerCase().includes(value));
});

const setCategories = () => {
  const categories = ["All", ...new Set(data.map((item) => item.cat))];

  categories.forEach((cat) => {
    const span = document.createElement("span");
    span.className = "cat";
    span.textContent = cat;
    span.addEventListener("click", () =>
      filterAndDisplayProducts((item) => cat === "All" || item.cat === cat)
    );
    categoriesContainer.appendChild(span);
  });
};

const setPrices = () => {
  const priceList = data.map((item) => item.price);
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);

  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;
  priceValue.textContent = "Max price: $" + maxPrice;
};

const setPriceFilter = () => {
  priceRange.addEventListener("input", (e) => {
    priceValue.textContent = "$" + e.target.value;
    filterAndDisplayProducts((item) => item.price <= e.target.value);
  });
};

setCategories();
setPrices();
setPriceFilter();
