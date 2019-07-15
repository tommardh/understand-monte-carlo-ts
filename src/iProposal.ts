interface IProposal {
    counter?: number;
    remainingStories?: number;
    activeField?: string;
    showDescriptions?: boolean;
    simulations?: number[][];
    nextSimulation?: number[];
    text?: string;
}
