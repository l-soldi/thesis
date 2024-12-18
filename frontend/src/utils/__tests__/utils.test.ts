import { formatDate } from '../index';

describe('formatDate', () => {
    it('should format date correctly', () => {
        const date = new Date('2023-10-05T14:48:00.000Z');
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe('2023-10-05');
    });

    it('should handle different dates correctly', () => {
        const date = new Date('2022-01-01T00:00:00.000Z');
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe('2022-01-01');
    });

    it('should handle leap year dates correctly', () => {
        const date = new Date('2020-02-29T12:00:00.000Z');
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe('2020-02-29');
    });

    it('should handle end of year dates correctly', () => {
        const date = new Date('2021-12-31T23:59:59.999Z');
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe('2021-12-31');
    });
});
