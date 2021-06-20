export interface IProposal {
    counter?: number;
    remainingStories?: number;
    activeField?: string;
    showDescriptions?: boolean;
    nextSimulation?: number[];
    historicalCapacity?: number[];
    simulations?: number[][];
    calculatedData?: number [][];
}
