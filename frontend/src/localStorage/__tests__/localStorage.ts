import { getUserIdFromLocalStorage, writeUserIdToLocalStorage, deleteUserIdFromLocalStorage } from '../utils';
import { USER_ID_KEY } from '../consts'

const key = USER_ID_KEY;
const value = "1"

describe('localStorage utils', () => {
    beforeEach(() => {
        if (!global.localStorage) {
            const localStorageMock = (function () {
              let store = {};
              return {
                getItem(key) {
                  return store[key] || null;
                },
                setItem(key, value) {
                  store[key] = value.toString();
                },
                clear() {
                  store = {};
                },
                removeItem(key) {
                  delete store[key];
                },
              };
            })();
      
        Object.defineProperty(global, 'localStorage', {
          value: localStorageMock,
        });
      }});

    test('should save userId to localStorage', () => {
        writeUserIdToLocalStorage(value);
        expect(localStorage.getItem(key)).toBe(value);
    });

    test('should get data from localStorage', () => {
        writeUserIdToLocalStorage(value);

        const result = getUserIdFromLocalStorage();
        expect(result).toBe(value);
    });

    test('should remove data from localStorage', () => {
        writeUserIdToLocalStorage(value);

        deleteUserIdFromLocalStorage();
        expect(localStorage.getItem(key)).toBeNull();
    });

    test('should return null if key does not exist in localStorage', () => {
        const result = getUserIdFromLocalStorage();
        expect(result).toBeNull();
    });
});