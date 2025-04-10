import {centsToDollar} from '../functions/functions.js';

document.addEventListener("DOMContentLoaded", () => {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add(
					'show');
			} else {
				entry.target.classList.remove(
					'show');
			}
		});
	}, {
		threshold: 0.1, // Trigger when 10% of the element is visible
		rootMargin: "100px" // Trigger 100px before the element enters view
	});
	
	document.querySelectorAll('.hidden').forEach((el) =>
		observer.observe(el));
});

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

// jump to menu & know more 
const jumpBtn = document.getElementById('btn1');
jumpBtn.addEventListener('click', () => {
	window.location.href = '/menu/indian-menu.html';
});
document.getElementById('btn2').addEventListener('click', ()=>{
	window.location.href = '/about-page/index.html';
})
let cardHTML = '';

foodItems.forEach((food) => {
	cardHTML += `
			<div class="food-card">
				<div class="food-image"><img
						src="${food.image}"
						alt="" /></div>
				<div class="food-description">
					<div class="food-name-container">
						<h4 class="food-name">${food.name}</h4>
					</div>
					<div class="food-info"> ${food.description}</div>
					<div class="food-price-button-div">
						<div class="food-price-div">
							<p class="food-price">$ ${centsToDollar(food.price)}</p>
						</div>
						<div class="order-button-container">
							<img src="/images/cart.png" alt=""
								class="cart-image" />
							<button class="order-button">Order
								Now!</button>
						</div>
					</div>
				</div>
			</div>`
});

document.getElementById('card-div').innerHTML = cardHTML;