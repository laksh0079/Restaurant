import {centsToDollar} from '../functions/functions.js';
export let cart = JSON.parse(localStorage.getItem('cart')) || [];
export function saveToStorage(updatedCart) {
	cart = updatedCart;
	localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculatePrice() {
	const itemsTotalElem = document.querySelector('.items-total');
	const discountElem = document.querySelector(".discount");
	const totalBeforeTaxElem = document.querySelector(
		'.total-before-tax');
	const taxElem = document.querySelector('.tax');
	const totalAfterTaxElem = document.querySelector(
		'.total-after-tax');
	let total = 0;
	cart.forEach(food => {
		
		let foodTotal = food.quantity * food.price;
		total += foodTotal;
	});
	let discount = total * 0.05;
	let totalBeforeTax = total - discount;
	let tax = totalBeforeTax * 0.07;
	let totalAfterTax = totalBeforeTax + tax;
	itemsTotalElem.innerText = '$ ' + centsToDollar(total);
	discountElem.innerText = '$ ' + centsToDollar(discount)
	totalBeforeTaxElem.innerText = '$ ' + centsToDollar(
		totalBeforeTax);
	taxElem.innerText = '$ ' + centsToDollar(tax);
	totalAfterTaxElem.innerText = '$ ' + centsToDollar(totalAfterTax);
}


//removing from the cart

export function removeFromCart(foodId) {
	const newCart = [];
	cart.forEach(food => {
		if (food.id !== foodId) {
			newCart.push(food);
		}
	});
	cart = newCart;
	saveToStorage(cart);
	generateHTML(cart);
	calculatePrice();
	if (cart.length === 0) {
		document.querySelector('.js-order-summary-container')
			.innerHTML = '<h1>The cart is empty</h1>';
	}
}

// displaying maximum limit message 

export function limitModalToggle() {
	let body = document.querySelector('.show-before');
	body.classList.add('show-after');
	setTimeout(() => {
		body.classList.remove('show-after');
	}, 1000)
}

//generating html of summary items

export function generateHTML(foodCart) {
	let length = foodCart.length;
	let checkoutHTML = '';
	if (length >= 1) {
		foodCart.forEach((food) => {
			checkoutHTML += `<div class="order-summary">
			<div class="img-cont" >
				<img src="${food.image}" alt="" />
			</div>
			<div class="desc-cont">
				<div class="name-cont">
					<h3>${food.name}</h3>
				</div>
				
				<div class="desc">
					<div class="info-cont">
						<p class="info">${food.origin}</p>
					</div>
					<div class="add-cont">
						<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#F3F3F3"><path d="M200-440v-80h560v80H200Z" data-food-id="${food.id}" class="minus-quantity-svg"/></svg>
						<span class="quantity" data-food-id="${food.id}">${food.quantity}</span>
						<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"data-food-id="${food.id}" fill="#F3F3F3" class="plus-quantity-svg"><path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z" /></svg>
					</div>
					<div class="price-cont">
						<p class="price">$${food.price / 100}</p>
					</div>
				</div>
			</div>
		</div>`;
		});
		const div = document.querySelector(
			'.js-order-summary-container');
		div.innerHTML = checkoutHTML;
		cartQuantityUpdate();
	}
	else {
		document.querySelector('.js-order-summary-container')
			.innerHTML = `<h1>The cart is empty</h1>`
	}
}

//increasing - decreasing quantity 

export function cartQuantityUpdate() {
	const quantities = document.querySelectorAll('.quantity');
	const minusSvg = document.querySelectorAll('.minus-quantity-svg');
	const plusSvg = document.querySelectorAll('.plus-quantity-svg');
	minusSvg.forEach(icon => {
		icon.addEventListener('click', () => {
			const foodId = icon.dataset.foodId;
			const quantityElem = document
				.querySelector(
					`.quantity[data-food-id="${foodId}"]`
				);
			cart.forEach(food => {
				if (food.id === foodId) {
					if (food.quantity > 1) {
						food.quantity -= 1;
						quantityElem
							.innerHTML =
							food.quantity;
					} else {
						removeFromCart(
							foodId);
					}
					saveToStorage(cart);
					calculatePrice();
				}
			});
		});
	});
	
	plusSvg.forEach(icon => {
		icon.addEventListener('click', () => {
			const foodId = icon.dataset.foodId;
			const quantityElem = document
				.querySelector(
					`.quantity[data-food-id="${foodId}"]`
				);
			cart.forEach(food => {
				if (foodId === food.id) {
					if (food.quantity >= 5) {
						limitModalToggle();
					} else {
						food.quantity += 1;
						quantityElem
							.innerText = food
							.quantity;
					}
					saveToStorage(cart);
					calculatePrice();
				}
			});
		});
	});
}

export function updateCartItemsNumber(){
	let quantity = cart.length;
	document.getElementById('heading').innerText = `Cart  (${quantity})`
}