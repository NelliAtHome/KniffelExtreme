export type Nullable<T> = T | null;

// Ein Feld
export interface Field {
    targetId: number;
    playerId: number;
    score: Nullable<number>;
    text: Nullable<string>;
}

// Eine Zeile auf dem Punktezettel
export interface Target {
    id: number;
    name: string;
    info: string;
    possibleScores: number[];
    type: string;
    fields: Field[];
}

// Ein Spieler
export interface Player {
    id: number;
    name: string;
    joker: number;
}

// Der Punktezettel
export interface Scoreboard {
    player: Player[];       // Die einzelnen Spieler
    targets: Target[];       // Die Zeilen
}