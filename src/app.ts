console.log("Testing");

function greeter(person: string) {
    return "<h3>Typescript Header</h3><p>Hello, flytta på <b>" + person + "</b></p>";
}

let user = "Tompa";

let element = document.getElementById("content");

if (element) {
 element.innerHTML = greeter(user);
}
//document.body.innerHTML = greeter(user);
