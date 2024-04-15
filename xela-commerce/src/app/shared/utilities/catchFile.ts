import { CatchFileResponse } from "../interfaces/catch-file-response.interface";

export const catchFile = (event: Event): CatchFileResponse => {
    const file: File = (event.target as HTMLInputElement).files![0];
    const url: string = URL.createObjectURL(file);
    return { url, file };
}