export type GameScore = {
    name: string;
    topScore: number;
    setScore?: number;
};
export const middleNamesMaxiYatzy: GameScore[] = [
    { name: '1 par', topScore: 12 },
    { name: '2 par', topScore: 22 },
    { name: '3 par', topScore: 30 },
    { name: 'Tretal', topScore: 18 },
    { name: 'Fyrtal', topScore: 24 },
    { name: 'Femtal', topScore: 30 },
    { name: 'Liten stege', topScore: 15, setScore: 15 },
    { name: 'Stor stege', topScore: 20, setScore: 20 },
    { name: 'Full stege', topScore: 21, setScore: 21 },
    { name: 'Kåk', topScore: 28 },
    { name: 'Hus', topScore: 33 },
    { name: 'Torn', topScore: 34 },
    { name: 'Chans', topScore: 36 },
];
export const middleNamesYatzy: GameScore[] = [
    { name: '1 Par', topScore: 12 },
    { name: '2 Par', topScore: 22 },
    { name: 'Tretal', topScore: 18 },
    { name: 'Fyrtal', topScore: 24 },
    { name: 'Liten Stege', topScore: 15 },
    { name: 'Stor Stege', topScore: 20 },
    { name: 'Kåk', topScore: 20 },
    { name: 'Chans', topScore: 20 },
];
export const lowerNames: GameScore[] = [
    { name: 'Yatzy', topScore: 100, setScore: 100 }
];
export const upperNames: GameScore[] = [
    { name: 'Ettor', topScore: 6 },
    { name: 'Tvåor', topScore: 12 },
    { name: 'Treor', topScore: 18 },
    { name: 'Fyror', topScore: 24 },
    { name: 'Femmor', topScore: 30 },
    { name: 'Sexor', topScore: 36 },
];
