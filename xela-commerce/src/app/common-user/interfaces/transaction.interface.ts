import { BaseResponse } from "../../shared/interfaces/base-response.interface";

export interface TransactionsResponse extends BaseResponse {
    transactions:   Transaction[]
}

export interface Transaction {
    id:             number;
    amount:         number;
    category:       CategoryTran;
    created_at:     string;
    publication:    PubTransaction;
    issuing_user:    UserTransaction;
    receiving_user:  UserTransaction;
}

interface PubTransaction {
    id:         number;
    code:       number;
    title:      string;
    image:      string;
}

interface UserTransaction {
    id:         number;
    full_name:  string;
}

interface CategoryTran {
    id:     number;
    name:   string;
}