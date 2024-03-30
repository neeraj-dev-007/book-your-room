import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/Signin";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        //to include any HTTP Cookie along with the request and set any cookie we get from server in our browser.
        credentials: "include",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(formData),
    });
    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message);
    }

}

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method:'POST',
        credentials:"include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    });
    const responseBody = await response.json();
    if(!response.ok) {
        throw new Error(responseBody.message);
    }
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        method: 'GET',
        credentials: "include",
    });

    if(!response.ok)
        throw new Error("Token Invalid!")

    return response.json();
}

export const logOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: "include",
    });

    if(!response.ok)
        throw new Error("Error during sign out!");
}