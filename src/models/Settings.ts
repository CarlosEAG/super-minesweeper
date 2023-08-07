import { BoardDimensions } from "./BoardDimensions";
export type difficulty = 'Beginner' | 'Intermediate' | 'Expert' | 'Custom';
export interface DifficultyConfiguration {size: BoardDimensions, mines: number}
export interface Settings {
        configuration: DifficultyConfiguration;
        difficulty: difficulty;
}