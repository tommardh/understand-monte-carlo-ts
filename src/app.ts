import { greeter } from './greeter.js'; // https://stackoverflow.com/questions/44979976/typescript-compiler-is-forgetting-to-add-file-extensions-to-es6-module-imports

// console.log(greeter);


// function greeter(person: string) {
//     return "<h3>Typescript Header</h3><p>Hello, flytta på <b>" + person + "</b></p>";
// }

let user = "Tom";

let element = document.getElementById("content");

if (element) {
 element.innerHTML = greeter(user);
}
//document.body.innerHTML = greeter(user);

