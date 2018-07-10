"use strict";
console.log("Testing");
function greeter(person) {
    return "<p>Hello, kallades <b>" + person + "</b></p>";
}
var user = "Tompa User";
var element = document.getElementById("content");
if (element) {
    element.innerHTML = greeter(user);
}
//document.body.innerHTML = greeter(user);
