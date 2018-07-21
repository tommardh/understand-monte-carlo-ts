export class View {

    constructor() {}

    public display(representation: string) {
        const stateRepresentation = document.getElementById("view");
        if (stateRepresentation) {
            stateRepresentation.innerHTML = representation;
        }
    }

    public init(model: IModel) {
        return this.ready(model);
    }

    public ready(model: IModel) {
        return "<h1>Counter Test</h1>\n" +
               "<p>counter: " + model.counter + "</p>\n" +
               "<button type=\"button\" onClick=\"increase()\">Increase</button>";
    }
}
