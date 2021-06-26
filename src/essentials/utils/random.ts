import { shuffle } from "./utils";

export function randomInt(min: number, max: number) {
    return min + Math.floor((max - min) * Math.random());
}

export function randomFloat(min: number, max: number) {
    return min + (max - min) * Math.random();
}

export function randomChars(length: number) {
    const chars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", ",", ".", "/", "|", ":"]
    shuffle(chars)
    return chars.slice(0, length)
}
