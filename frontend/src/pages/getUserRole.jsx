import { jwtDecode } from "jwt-decode";


export const getUserRole = () => {
  const token = localStorage.getItem("jwtToken");
  console.log('test')
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log(decoded.role);
    return decoded.role; // Ensure the backend includes 'role' in the token
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

