// Base URL
const baseUrl = 'https://orange-plate.onrender.com/';

// Authentication URLs (User)
const userBaseUrl = "${baseUrl}authentication/user/";
const loginUrl = "${userBaseUrl}login";
const signupUrl = "${userBaseUrl}signup";
const forgotPasswordUrl = "${userBaseUrl}forgot-password";
const resetPasswordUrl = "${userBaseUrl}reset-password";

// Buyer Endpoints
const buyerBaseUrl = "${baseUrl}user/";
const getNearbyRestaurantsMenuItemsUrl =
    "${buyerBaseUrl}home"; // Ensure this is correct
const getMenuItemsUrl = "${buyerBaseUrl}menu-item/";
const postAddToCartUrl = "${buyerBaseUrl}add-to-cart/";
const deleteCartItemUrl = "${buyerBaseUrl}delete-cart-item/";
const getCartItemsUrl = "${buyerBaseUrl}cart-items/";
const placeOrderUrl = "${buyerBaseUrl}place-order/";
const editCartItemUrl = "${buyerBaseUrl}edit-cart-Item/";
// const deleteCartItemUrl = "${buyerBaseUrl}delete-cart-item/";
