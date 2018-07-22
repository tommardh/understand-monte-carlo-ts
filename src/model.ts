import { State } from "./state";

export class Model {

    public data: IModel;
    public state: State;

    constructor(data: IModel, state: State) {
        this.data = data;
        this.state = state;
    }

    // public present(data: IModel, render: (o: IModel) => string): string {
    public present(data: IModel) {
        console.log(data);
        this.render(data);
    }

    public render(data: IModel) {
        this.state.render(data);
    }
}
