const {
    characters,
    cities,
    countries,
    firstNames,
    genders,
    lastNames,
    streets,
    words,
} = require("./constants.js");

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomFloat(min, max) {
    return Math.random() * (max - min + 1) + min;
}

export function randomString(length) {
    return Array.from({ length }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
}

export function pickArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function randomWord() {
    return pickArray(words);
}

export function randomFirstName() {
    return pickArray(firstNames);
}

export function randomLastName() {
    return pickArray(lastNames);
}

export function randomCountry() {
    return pickArray(countries);
}

export function randomCity() {
    return pickArray(cities);
}

export function randomStreet() {
    return pickArray(streets);
}

export function randomGender() {
    return pickArray(genders);
}

export function generateUUID() {
    let d = new Date().getTime(),
        d2 = (performance && performance.now && performance.now() * 1000) || 0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        let r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
    });
}

export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const zeroPad = (num, places) => String(num).padStart(places, "0");

export function evaluate(...args) {
    const res = args.map((arg) => {
        if (typeof arg === "function") return arg();
        return arg;
    });

    return res.length === 1 ? res[0] : res;
}
