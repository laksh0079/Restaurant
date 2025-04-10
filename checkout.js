import { cart, generateHTML, calculatePrice, updateCartItemsNumber } from '../cart/cart.js'
import {} from '../functions/functions.js';
console.log(cart)
generateHTML(cart);
calculatePrice();
updateCartItemsNumber();
document.querySelector('.back-svg').addEventListener('click', () => {
	window.location.href = "/menu/indian-menu.html";
});