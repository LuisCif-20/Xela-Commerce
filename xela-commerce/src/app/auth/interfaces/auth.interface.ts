import { BaseResponse } from "../../shared/interfaces/base-response.interface";

export interface AuthResponse extends BaseResponse {
    user:       User;
    token?:     string;
}

export interface TokenResponse extends BaseResponse {
    token:      string;
}

export interface User {
    id:                 number;
    user_name:          string;
    full_name:          string;
    birthdate:          string;
    profile_picture:    string;
    role:               Role;
    created_at?:        string;
    updated_at?:        string;
}

interface Role {
    id:     number;
    name:   string;
}