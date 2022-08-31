export type Nullable<T> = T | null;

export class Targets {
    public static t_Einser = 0;
    public static t_Zweier = 1;
    public static t_Dreier = 2;
    public static t_Vierer = 3;
    public static t_Fünfer = 4;
    public static t_Sechser = 5;
    public static t_Bonus = 6;
    public static t_Dreierpasch = 7;
    public static t_Viererpasch = 8;
    public static t_ZweiPaare = 9;
    public static t_DreiPaare = 10;
    public static t_ZweiDreier = 11;
    public static t_FullHouse = 12;
    public static t_GroßesFullHouse = 13;
    public static t_KleineStraße = 14;
    public static t_GroßeStraße = 15;
    public static t_Highway = 16;
    public static t_Kniffel = 17;
    public static t_KniffelExtreme = 18;
    public static t_10oderWeniger = 19;
    public static t_33oderMehr = 20;
    public static t_Chance = 21;
    public static t_SuperChance = 22;
    public static t_Summe = 23;
}

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
    finished?: Date;            // Wann das Spiel beendet wurde
    player: Player[];           // Die einzelnen Spieler
    targets: Target[];          // Die Zeilen
}

export interface ScoreboardHistory {
    entries: Scoreboard[];
}
