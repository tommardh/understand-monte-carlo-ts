import { Action } from "./action";
import { View } from "./view";

export class State {

    public view: View;
    public action!: Action;

    constructor(view: View) { // } action: Action) {
        this.view = view;
        // this.action =
    }

    public render(data: IModel) {
        this.representation(data);
        this.nextAction(data);
    }

    private ready(data: IModel) {
        return true;
    }

    private representation(data: IModel) {
        let representation = "oops... something went wrong, the system is in an invalid state";

        if (this.ready(data)) {
            representation = this.view.ready(data);
        }
        // console.log(representation);

        this.view.display(representation) ;
    }

    private nextAction(data: IModel) {
        if (data.counter === 10) {
            if (data.nextSimulation.reduce((a, b) => (a + b), 0) === 0 ) {
                this.action.generate(1);
                this.action.addManualSimulation();
            }
        }
    }

}
