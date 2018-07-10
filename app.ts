console.log("Testing");

function greeter(person: string) {
    return "<p>Hello, kallades <b>" + person + "</b></p>";
}

let user = "Tompa User";

let element = document.getElementById("content");

if (element) {
 element.innerHTML = greeter(user);
}
//document.body.innerHTML = greeter(user);
