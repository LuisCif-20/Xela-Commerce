
export const redirectTo = (role: string) => {
    if (role === 'Admin') {
        return '/admin';
    } else {
        return '/common';
    }
}