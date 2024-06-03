import {User} from "@/models/User";
import React, {createContext, useContext, useEffect, useState} from "react";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {authenticate, signup} from "@/api/requests/authenticate";
import axios from "axios";
import {LoginDto, RegisterDto} from "@/dto/AuthDto";
import {useProjects} from "@/hooks/useProjects";

type AuthContextType = {
    token: string
    login(dto: LoginDto): Promise<User>
    logout(): void
    register(dto: RegisterDto): Promise<User>
    authenticatedUser: User | null
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)


const getDataFromToken = (token: string) => {
    try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}
const getUserFromToken = (token: string) => {

    try {
        const data = getDataFromToken(token);

        return {
            id: data.userId,
            username: data.username,
            email: data.email,
        }
    } catch (e) {
        return null;
    }
}

const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [token, setToken, remove] = useLocalStorage('token', '');
    const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(getUserFromToken(token));

    const login = async (dto: LoginDto) => {
        return new Promise<User>((resolve, reject) => {
            authenticate(dto)
                .then((data: { token: string, user: User }) => {
                    setAuthenticatedUser(data.user)
                    setToken(data.token);
                    axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;
                    resolve(data.user);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    const logout = () => {
        delete axios.defaults.headers.common["Authorization"];
        setAuthenticatedUser(null)
        remove();
    };

    const register = async (dto: RegisterDto): Promise<User> => {
        return new Promise<User>((resolve, reject) => {
            signup(dto)
                .then((data: User) => {
                    login({
                        email: dto.email,
                        password: dto.password,
                    }).then((user: User) => {
                        resolve(user);
                    });
                })
        })


    }


    useEffect(() => {
        if(token) {
            const expireAt = getDataFromToken(token).exp;
            if (Date.now() >= expireAt * 1000) {
                logout();
            }
        }
    }, [token])

    return (
        <AuthContext.Provider value={{login, logout, token, register, authenticatedUser}}>
            {children}
        </AuthContext.Provider>
    )
}


export {AuthProvider, AuthContext};