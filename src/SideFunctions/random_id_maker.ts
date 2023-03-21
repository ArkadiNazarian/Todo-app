export const random = (): string => {

    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let str = '';
    for (let index = 0; index < 20; index++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;

};