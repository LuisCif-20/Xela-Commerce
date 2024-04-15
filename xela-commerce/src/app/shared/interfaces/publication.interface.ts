import { BaseResponse } from "./base-response.interface";
import { States } from "../../common-user/interfaces/state.enum";

export interface PublicationsResponse extends BaseResponse{
    publications:   Publication[];
}

export interface PublicationResponse extends BaseResponse{
    publication:    Publication;
}

export interface Publication {
    id:             number;
    code:           number;
    user:           UserPub;
    title:          string;
    image:          string;
    state:          States;
    price?:         number;
    category:       Category;
    updated_at:     string;
    description:    string;
}

interface Category {
    id:     number;
    name:   string;
}

interface UserPub {
    id:                 number;
    user_name:          string;
    profile_picture:    string;
}