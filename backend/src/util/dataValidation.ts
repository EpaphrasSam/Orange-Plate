import CustomError from "./error";

interface UserSignUpData {
  name: string;
  email: string;
  password: string;
  phone: string;
}
//create category
export const createCategoryData = async (data: { name: string }[]) => {
  try {
    //check if data is an array
    if (!Array.isArray(data)) {
      throw new CustomError("Data must be an array", 422);
    }
    //check if data is not empty
    if (data.length === 0) {
      throw new CustomError("Category can not be empty", 422);
    }
    data.forEach((item) => {
      if (!item.name) {
        throw new CustomError("Name is required", 422);
      }
    });
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode);
  }
};

//create password dataValidation
export const validateCreatePasswordData = async (
  email: string,
  password: string
) => {
  try {
    const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    //check if email and password are not empty
    if (!email || !password) {
      throw new CustomError("Email and password are required", 422);
    }
    //check if email is valid
    if (!email.match(emailFormat)) {
      throw new CustomError("Invalid email address", 422);
    }
    //check if password is at least 8 characters long
    if (password.length < 8) {
      throw new CustomError("Password must be at least 8 characters long", 422);
    }
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode);
  }
};

//create restaurant dataValidation
export const validateCreateRestaurantData = async (data: {
  name: string;
  email: string;
  phone: string;
  latitude: number;
  longitude: number;
}) => {
  try {
    const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    const phoneFormat = /^(\+233|0)(20|23|24|26|27|28|50|54|55|59)\d{7}$/;
    const { name, email, phone, latitude, longitude } = data;
    //check if name,email,phone,latitude,longitude are not empty
    if (!name || !email || !phone || !latitude || !longitude) {
      throw new CustomError("All fields are required", 422);
    }
    //check if email is valid
    if (!email.match(emailFormat)) {
      throw new CustomError("Invalid email address", 422);
    }
    //check if phone number is valid
    if (!phone.match(phoneFormat)) {
      throw new CustomError("Invalid phone number", 422);
    }
    //check if name,email,phone are of type sring and latitude,longitude are of type number
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string" ||
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      throw new CustomError(
        "name,email,phone are of type sring must be of type string and latitude,longitude must be of type float",
        422
      );
    }
    //check if latitude is between -90 and 90
    if (latitude < -90 || latitude > 90) {
      throw new CustomError("Latitude must be between -90 and 90", 422);
    }
    //check if longitude is between -180 and 180
    if (longitude < -180 || longitude > 180) {
      throw new CustomError("Longitude must be between -180 and 180", 422);
    }
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode);
  }
};

//validating user signUp data
export const validateUserSignUpData = async (data: UserSignUpData) => {
  try {
    const { name, email, password, phone } = data;
    const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    const PhoneFormat = /^(\+233|0)(20|23|24|26|27|28|50|54|55|59)\d{7}$/;
    //check if name,email,password,phone are not empty
    if (!name || !email || !password || !phone) {
      throw new CustomError(
        "Name, email, password, and phone are required",
        422
      );
    }
    //check if name,email,password,phone are of type string
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof phone !== "string"
    ) {
      throw new CustomError(
        "Name, email, password, and phone must be of type string",
        422
      );
    }
    //check if email is valid
    if (!email.match(emailFormat)) {
      throw new CustomError("Invalid email address", 422);
    }
    //check if phone number is valid
    if (!phone.match(PhoneFormat)) {
      throw new CustomError("Invalid phone number", 422);
    }
    //check if password is at least 8 characters long
    if (password.length < 8) {
      throw new CustomError("Password must be at least 8 characters long", 422);
    }
    //check if phone is a valid phone number
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode);
  }
};

export const validateUserLoginData = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    //check if email and password are not empty
    if (!data.email || !data.password) {
      throw new CustomError("Email and password are required", 422);
    }
    //check if email and password are of type string
    if (typeof data.email !== "string" || typeof data.password !== "string") {
      throw new CustomError("Email and password must be of type string", 422);
    }
    //check if email is valid
    if (!data.email.match(emailFormat)) {
      throw new CustomError("Invalid email address", 422);
    }
    //check if password is at least 8 characters long
    if (data.password.length < 8) {
      throw new CustomError("Password must be at least 8 characters long", 422);
    }
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode);
  }
};

export const validateForgotPasswordData = async (user: { email: string }) => {
  try {
    const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    //check if email is not empty
    if (!user.email) {
      throw new CustomError("Email is required", 422);
    }
    //check if email is of type string
    if (typeof user.email !== "string") {
      throw new CustomError("Email must be of type string", 422);
    }
    //check if email is valid
    if (!user.email.match(emailFormat)) {
      throw new CustomError("Invalid email address", 422);
    }
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode);
  }
};

export const validateResetPasswordData = async (data: {
  newPassword: string;
  token: string | undefined;
}) => {
  try {
    //check if password is not empty
    if (!data.newPassword) {
      throw new CustomError("Password is required", 422);
    }
    //check if password is at least 8 characters long
    if (data.newPassword.length < 8) {
      throw new CustomError("Password must be at least 8 characters long", 422);
    }
    //check if token is not empty
    if (!data.token) {
      throw new CustomError("Token is required", 422);
    }
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode);
  }
};

//validate menu data
export const validateMenuData = async (
  data: {
    name: string;
    description: string;
    price: number;
    restaurantId: string;
    categoryId: string;
  }[]
) => {
  try {
    //if data is empty
    if (data.length === 0) {
      throw new CustomError("Menu Item(s) can not be empty", 422);
    }
    //if data is not an array
    if (!Array.isArray(data)) {
      throw new CustomError("Data must be an array", 422);
    }

    data.forEach((item: any) => {
      //check if name, description, price, available, restaurantId are not empty
      if (
        !item.name ||
        !item.description ||
        !item.price ||
        !item.restaurantId ||
        !item.categoryId ||
        !item.option
      ) {
        throw new CustomError(
          "name. description, price, option. restaurantId, categoryId are required for each menu item",
          422
        );
      }
      //check if name, description, price, available, restaurantId are of type string, price is number, available boolean
      if (
        typeof item.name !== "string" ||
        typeof item.description !== "string" ||
        typeof item.price !== "number" ||
        typeof item.restaurantId !== "string" ||
        typeof item.categoryId !== "string" ||
        typeof item.option !== "string"
      ) {
        throw new CustomError(
          "name, restaurantId and description must be of type string, price of type float, available of type boolean",
          422
        );
      }
      //check if price is a greater that 0
      if (item.price < 0) {
        throw new CustomError("Price must be more than 0", 422);
      }
    });
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode);
  }
};

//validate update menu item data
export const validateUpdateMenuItemData = async (
  data: {
    name: string;
    description: string;
    price: number;
  },
  id: string,
  restaurantId: string
) => {
  try {
    //check if name, description, price are not empty
    if (
      !data.name ||
      !data.description ||
      !data.price ||
      !id ||
      !restaurantId
    ) {
      throw new CustomError("All fields are required", 422);
    }
    if (
      typeof data.name !== "string" ||
      typeof data.description !== "string" ||
      typeof data.price !== "number" ||
      typeof id !== "string" ||
      typeof restaurantId !== "string"
    ) {
      throw new CustomError(
        "name, description must be of type string, price of type number",
        422
      );
    }
    //check if price is a greater that 0
    if (data.price < 0) {
      throw new CustomError("Price must be more than 0", 422);
    }
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode || 500);
  }
};

//user location data validation
export const validateUserLocationData = async (data: {
  latitude: number;
  longitude: number;
}) => {
  try {
    //check if latitude and longitude are not empty
    if (!data.latitude || !data.longitude) {
      throw new CustomError("Latitude and longitude are required", 422);
    }
    //check if latitude and longitude are of type number
    if (
      typeof data.latitude !== "number" ||
      typeof data.longitude !== "number"
    ) {
      throw new CustomError(
        "Latitude and longitude must be of type number",
        422
      );
    }
    //check if latitude is between -90 and 90
    if (data.latitude < -90 || data.latitude > 90) {
      throw new CustomError("Latitude must be between -90 and 90", 422);
    }
    //check if longitude is between -180 and 180
    if (data.longitude < -180 || data.longitude > 180) {
      throw new CustomError("Longitude must be between -180 and 180", 422);
    }
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode || 500);
  }
};

export const getById = async (id: string) => {
  try {
    if (!id) {
      throw new CustomError("Id is required:pass id as request parameter", 422);
    }
    if (typeof id !== "string") {
      throw new CustomError("Id must be of type string", 422);
    }
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode || 500);
  }
};

//validate add to cart data
export const validateAddToCartData = async (
  menuItemId: string,
  quantity: number
) => {
  try {
    //check if quantity is of type number
    if (typeof quantity !== "number") {
      throw new CustomError("quantity must be of type number", 422);
    }
    //check if quantity is not less than 1
    if (quantity <= 0) {
      throw new CustomError("quantity can not be less than 1", 422);
    }
    //check if menuItemId and quantity are not empty
    if (!menuItemId || !quantity) {
      throw new CustomError("menuItemId and quantity are required", 422);
    }
    //check if menuItemId is of type string
    if (typeof menuItemId !== "string") {
      throw new CustomError("menuItemId must be of type string", 422);
    }
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode || 500);
  }
};

//validate edit cart item data
export const validateEditCartItemData = async (quantity: number) => {
  try {
    //check if quantity is of type number
    if (typeof quantity !== "number") {
      throw new CustomError("quantity must be of type number", 422);
    }
    //check if quantity is not less than 1
    if (quantity <= 0) {
      throw new CustomError("quantity can not be less than 1", 422);
    }
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode || 500);
  }
};

// place order validation
export const validatePlaceOrderData = async (
  total: number,
  restaurantId: string,
  cartItems: string[]
) => {
  try {
    //check if cartItems is an array
    if (!Array.isArray(cartItems)) {
      throw new CustomError("Cart items must be an array", 422);
    }
    //check if cartItems is not empty
    if (cartItems.length === 0) {
      throw new CustomError("Cart items can not be empty", 422);
    }
    //check if cartItems is an array of strings
    cartItems.forEach((item) => {
      if (typeof item !== "string") {
        throw new CustomError("Cart items must be an array of strings", 422);
      }
    });
    //check if total is of type number
    if (typeof total !== "number") {
      throw new CustomError("Total must be of type number", 422);
    }
    //check if total is not less than 0
    if (total < 0) {
      throw new CustomError("Total can not be less than 0", 422);
    }
    //check if restaurantId is of type string
    if (typeof restaurantId !== "string") {
      throw new CustomError("Restaurant id must be of type string", 422);
    }
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode || 500);
  }
};
