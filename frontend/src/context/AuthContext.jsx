import { createContext, useContext, useEffect, useReducer } from "react";
import React from "react";

const initialState = {
    user: localStorage.getItem("user") !== "undefined" && localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : null,
    role: localStorage.getItem("role") || null,
    token: localStorage.getItem("token") || null,
};

export const authContext = createContext(initialState);

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                role: null,
                token: null,
            };

        case "LOGIN_SUCCESS":
            return {
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
            };

        case "LOGOUT":
            return {
                user: null,
                role: null,
                token: null,
            };

        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        if (state.user) {
            localStorage.setItem("user", JSON.stringify(state.user));
        } else {
            localStorage.removeItem("user");
        }

        if (state.token) {
            localStorage.setItem("token", state.token);
        } else {
            localStorage.removeItem("token");
        }

        if (state.role) {
            localStorage.setItem("role", state.role);
        } else {
            localStorage.removeItem("role");
        }
    }, [state]);

    return (
        <authContext.Provider
            value={{
                user: state.user,
                token: state.token,
                role: state.role,
                dispatch,
            }}
        >
            {children}
        </authContext.Provider>
    );
};
