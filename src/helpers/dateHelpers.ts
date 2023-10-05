export function ageToDate(age: number) {
    const d = new Date();
    d.setFullYear(d.getFullYear() - age);
    return d;
}
