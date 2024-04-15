export const storeDataLocal = (key: string, data: any): void => {
    const values = JSON.stringify(data);
    localStorage.setItem(key, values);
}

export const getRecordsfromLocal = (key: string): any | null => {
    const data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    }
    return null;
}
