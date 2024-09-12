// Base URL
const baseUrl = 'https://orange-plate.onrender.com/';

// Authentication URLs (User)
const userBaseUrl = "${baseUrl}authentication/user/";
const loginUrl = "${userBaseUrl}login";
const signupUrl = "${userBaseUrl}signup";
const forgotPasswordUrl = "${userBaseUrl}forgot-password{";
const resetPasswordUrl = "${userBaseUrl}reset-password";
const getUserUserProfileUrl = "${userBaseUrl}profile/";
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
const getCuisinesUrl = "${buyerBaseUrl}cuisines/";
const getCategoriesAndMenuUrl = "${baseUrl}restaurant/categories/";
const getAllRestaurantsWithMenuItemsUrl = "${buyerBaseUrl}all-restaurants";
const getRestaurantMenuItemsUrl = '${baseUrl}restaurant/';
const getUserOrdersUrl = '${baseUrl}user/orders/';
// Rider Endpoints
const riderBaseUrl = "${baseUrl}rider/";
const getRiderHomeUrl = "${riderBaseUrl}home/";
const acceptOrderUrl = "${riderBaseUrl}accept-order";
const getRiderOrdersUrl = "${riderBaseUrl}orders/";
const endTripUrl = "${riderBaseUrl}end-trip/";
