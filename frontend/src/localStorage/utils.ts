import { USER_ID_KEY } from './consts';

export const writeUserIdToLocalStorage = (value: string): void => {
    localStorage.setItem(USER_ID_KEY, value);
};

export const getUserIdFromLocalStorage = (): string | null => {
    return localStorage.getItem(USER_ID_KEY);
};

export const deleteUserIdFromLocalStorage = (): void => {
    localStorage.removeItem(USER_ID_KEY);
};