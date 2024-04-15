import { BaseResponse } from "../../shared/interfaces/base-response.interface";

export interface CurrencyResponse extends BaseResponse {
    currency: Currency;
}

export interface Currency {
    id:             number;
    ceibas:         number;
    quetzals:       number;
    penalization:   number;
}

export interface Coin {
    name:   string;
    value:  number;
}