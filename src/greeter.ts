export function greeter(person: string) {
    let output: string;
    if (person === '') {
        output = '';
    } else {
        output = "<h3>Typescript Header</h3>"
               + "<p>Hello, flytta på <b>" + person + "</b></p>";
    }
    return output;
}
