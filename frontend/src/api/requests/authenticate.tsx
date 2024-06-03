import axios from "axios";
import {LoginDto, RegisterDto} from "@/dto/AuthDto";
import {url} from "./url"

export const authenticate = async (request: LoginDto) => {
    return axios({
            method: 'post',
            url: url + '/api/auth/login',
            data: request
        }
    ).then((response) => {
            return response.data;
        })
}

export const signup = async (request : RegisterDto) => {
    return axios({
        method:'post',
        url: url + '/api/auth/signup',
        data:request
    }).then((response) => {
        return response.data;
    })
}