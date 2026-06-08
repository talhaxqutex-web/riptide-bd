let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wish")) || [];
let filterType = "all";

fetch("products.json")
.then(r=>r.json())
.then(data=>{
products = data;
render(products);
updateCounts();
});

function render(list){

const box = document.getElementById("products");
box.innerHTML="";

list.forEach(p=>{

box.innerHTML += `
<div class="card">

<img src="${p.image}">

<h3 onclick="openProduct('${p.name}')">${p.name}</h3>

<p>৳${p.price}</p>

<button class="btn" onclick="addCart('${p.name}')">Add to Cart</button>

<button class="small" onclick="addWish('${p.name}')">❤️ Wishlist</button>

</div>
`;
});

}

// SEARCH (FAST 500+ optimized)
document.getElementById("search").addEventListener("input",e=>{
let t = e.target.value.toLowerCase();

let filtered = products.filter(p=>
p.name.toLowerCase().includes(t)
);

render(filtered);
});

// CATEGORY FILTER
function setFilter(type){
filterType = type;

if(type==="all") return render(products);

render(products.filter(p=>p.category===type));
}

// PRICE FILTER
function priceFilter(){
let min = +document.getElementById("minPrice").value || 0;
let max = +document.getElementById("maxPrice").value || 999999;

render(products.filter(p=>p.price>=min && p.price<=max));
}

// CART
function addCart(name){
cart.push(name);
localStorage.setItem("cart",JSON.stringify(cart));
updateCounts();
}

// WISHLIST
function addWish(name){
wishlist.push(name);
localStorage.setItem("wish",JSON.stringify(wishlist));
updateCounts();
}

function updateCounts(){
document.getElementById("cartCount").innerText = cart.length;
document.getElementById("wishCount").innerText = wishlist.length;
}

// PRODUCT DETAILS MODAL
function openProduct(name){
let p = products.find(x=>x.name===name);

document.getElementById("modalBody").innerHTML = `
<h2>${p.name}</h2>
<img src="${p.image}" style="width:100%">
<p>Price: ৳${p.price}</p>

<a href="https://your-payment-link.com" class="btn">Pay Now</a>

<a href="https://wa.me/8801XXXXXXXXX?text=Order ${p.name}" class="btn">Order via bKash/WhatsApp</a>
`;

document.getElementById("modal").style.display="block";
}

function closeModal(){
document.getElementById("modal").style.display="none";
}