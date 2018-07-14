export class Model {
    public data: IModel;

    constructor(data: IModel) {
        this.data = data;
    }

    public present(data: IModel, render: (o: IModel) => string): string {
        return render(data);
    }
}
