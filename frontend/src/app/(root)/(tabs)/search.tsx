import { View } from "react-native";
import { Link } from "expo-router";
export default function Search() {
  return (
    <View>
      <Link href="/cuisine">Search</Link>
      <Link href="/signup"> Sign Up</Link>
      <Link href="/login"> Log In</Link>
      <Link href="/register">Register</Link>
      <Link href="/signin">Sign In</Link>
      <Link href="/option">option</Link>
    </View>
  );
}
