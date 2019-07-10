import { Action } from "./action";

export class MessageBroker {

    private action: Action;

    constructor(action: Action) {
        this.action = action;
    }

    public send(message: IMessage) {
        console.table(message);
        if (message.subject) {
            if (message.subject === "reset") {
                if (message.action === "click") {
                    if (message.data) {
                        this.action.reset(message.data);
                    }
                }
            } else if (message.subject === "generate") {
                if (message.action === "click") {
                    if (message.data) {
                        this.action.generate(message.data, 1);
                    }
                }
            } else if (message.subject === "generate100") {
                if (message.action === "click") {
                    if (message.data) {
                        this.action.generate(message.data, 100);
                    }
                }
            } else if (message.subject === "add") {
                if (message.action === "click") {
                    if (message.data) {
                        this.action.addManualSimulation(message.data);
                    }
                }
            } else if (message.subject.startsWith("field")) {
                if (message.action === "edit") {
                    if (message.data) {
                        this.action.editSimulation(message.subject, message.data);
                    }
                }
            } else if (message.subject === "stories") {
                if (message.action === "edit") {
                    if (message.data) {
                        this.action.editStories(message.data);
                    }
                }
            }
        }
    }
}
