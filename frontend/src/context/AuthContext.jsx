import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const saved = localStorage.getItem("user");

        if (saved) {

            setUser(JSON.parse(saved));

        }

    }, []);

    function login(userData, token) {

        localStorage.setItem("user", JSON.stringify(userData));

        localStorage.setItem("token", token);

        setUser(userData);

    }

    function logout() {

        localStorage.removeItem("user");

        localStorage.removeItem("token");

        setUser(null);

    }

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isLoggedIn: !!user,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}