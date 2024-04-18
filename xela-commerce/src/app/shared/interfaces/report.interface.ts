import { BaseResponse } from './base-response.interface';
export interface ReasonsResponse extends BaseResponse {
    reasons: Reason[];
}

export interface Reason {
    id:             number;
    user:           UserReport;
    reason:         string;
    updated_at:     string;
    publication_id: number;
}

interface UserReport {
    id:                 number;
    user_name:          string;
    profile_picture:    string;
}

export interface DataReport {
    reason:     string;
    user_id:    number;
}