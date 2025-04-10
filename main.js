import {
	indianFoods,
	italianFoods,
	frenchFoods,
	mexicanFoods,
	chineseFoods
} from '../menu/foods.js'
import { cart, saveToStorage } from '../cart/cart.js'
import { centsToDollar } from '../functions/functions.js';
// responsive hamburger menu code
const ham = document.getElementById('ham');
const sidebar = document.getElementById('sidebar');
const close = document.getElementById('close');

ham.addEventListener('click', () => {
	sidebar.classList.add('show');
});

close.addEventListener('click', () => {
	sidebar.classList.remove('show');
});

// cart link 

document.querySelector('.shopping-cart').addEventListener('click',
() => {
		window.location.href = "/cart/checkout.html";
	})

// link home page with restaurant name

document.querySelector('.restaurant-name').addEventListener('click',
() => {
	window.location.href = "/home/index.html";
})

// food menu toggle 

const icon = document.getElementById('food-menu');
const icon2 = document.getElementById('food-menu2');
const menu = document.getElementById('menu');
const menuClose = document.getElementById('sb-close');

icon.addEventListener('click', () => {
	menu.classList.add('show');
});

icon2.addEventListener('click', () => {
	menu.classList.add('show');
});

menuClose.addEventListener('click', () => {
	menu.classList.remove('show');
});

// dynamically adding each card 

 const foodMenu = {
	indian: indianFoods,
	italian: italianFoods,
	french: frenchFoods,
	mexican: mexicanFoods,
	chinese: chineseFoods,
};

let cardHTML = '';
Object.keys(foodMenu).forEach((name) => {
	
	foodMenu[name].forEach((food) => {
		cardHTML += `<div class="card">
			<div class="img-cont">
				<img src="${food.image}"
					alt="" class="food-img" loading="lazy"/>
			</div>
			<div class="info-cont">
				<div class="name-cont">
					<h2 class="food-name">${food.name}</h2>
				</div>
				<div class="price-desc-cont">
					<div class="price-cont">
						<p class="price">$ ${centsToDollar(food.price)}</p>
						<img src="/images/rating-50.png"
							class="rating" alt="" />
					</div>
					<div class="decs-cont">
						<p class="desc">${food.desc}</p>
					</div>
				</div>
				<div class="order-cont">
					<button class="order js-order" data-food-id="${food.id}">Click to Order!</button>
				</div>
			</div>
		</div>`;
	});
	document.getElementById(`${name}-menu`).innerHTML =
		cardHTML;
	cardHTML = '';
});

function limitModalToggle() {
	let body = document.querySelector('.show-before');
	body.classList.add('show-after');
	setTimeout(() => {
		body.classList.remove('show-after');
	}, 1000)
}

function addedToCartModal() {
	let body = document.querySelector('.show-before');
	body.classList.add('addedToCart');
	setTimeout(() => {
		body.classList.remove('addedToCart');
	}, 1000)
}

const buttons = document.querySelectorAll('.js-order');
buttons.forEach((button) => {
	button.addEventListener('click', () => {
		let foodId = button.dataset.foodId;
		Object.keys(foodMenu).forEach(name => {
			foodMenu[name].forEach((food) => {
				let matchingItem;
				if (foodId === food.id) {
					cart.forEach((orderedFood) => {
						if (orderedFood.id === foodId) {
							matchingItem = orderedFood;
							if (matchingItem.quantity >= 5) {
								limitModalToggle();
							} else {
								orderedFood.quantity += 1;
								addedToCartModal();
							}
						}
					});
					if (!matchingItem) {
						food.quantity = 1;
						cart.push(food);
						addedToCartModal();
					}
					saveToStorage(cart);
				}
			});
		});
	});
});



// fav icon toggle 

// const favs = document.querySelectorAll('.fav-svg');

// favs.forEach((fav) => {
// 	fav.addEventListener('click', () => {
// 		let foodId = fav.dataset.foodId;
// 		addToFavCart(foodId);
// 		if (fav.style.fill === 'white' || fav.style
// 			.fill === '') {
// 			fav.style.fill = 'red';
// 			fav.style.transition =
// 				"all 0.5s ease-in-out";
// 			fav.style.transform = "scale(1.3)";
// 		} else {
// 			fav.style.fill = 'white';
// 			fav.style.transform = "scale(1)"
// 		}
// 	});
// });