import { TFunction } from "i18next";

export type GameScore = {
    name: string;
    topScore: number;
    setScore?: number;
};
export function middleNamesMaxiYatzy(t: TFunction<"translation", undefined>): GameScore[] {
    return [
        { name: t("yatzyScreen.yatzy.pair"), topScore: 12 },
        { name: t("yatzyScreen.yatzy.twoPair"), topScore: 22 },
        { name: t("yatzyScreen.yatzy.threePair"), topScore: 30 },
        { name: t("yatzyScreen.yatzy.threeOfAKind"), topScore: 18 },
        { name: t("yatzyScreen.yatzy.fourOfAKind"), topScore: 24 },
        { name: t("yatzyScreen.yatzy.fiveOfAKind"), topScore: 30 },
        { name: t("yatzyScreen.yatzy.smStraight"), topScore: 15, setScore: 15 },
        { name: t("yatzyScreen.yatzy.bgStraight"), topScore: 20, setScore: 20 },
        { name: t("yatzyScreen.yatzy.fullHouse"), topScore: 28 },
        { name: t("yatzyScreen.yatzy.flStraight"), topScore: 21, setScore: 21 },
        { name: t("yatzyScreen.yatzy.castle"), topScore: 33 },
        { name: t("yatzyScreen.yatzy.tower"), topScore: 34 },
        { name: t("yatzyScreen.yatzy.chance"), topScore: 36 },
    ]
};
export function middleNamesYatzy(t: TFunction<"translation", undefined>): GameScore[] {
    return [
        { name: t("yatzyScreen.yatzy.pair"), topScore: 12 },
        { name: t("yatzyScreen.yatzy.twoPair"), topScore: 22 },
        { name: t("yatzyScreen.yatzy.threeOfAKind"), topScore: 18 },
        { name: t("yatzyScreen.yatzy.fourOfAKind"), topScore: 24 },
        { name: t("yatzyScreen.yatzy.smStraight"), topScore: 15 },
        { name: t("yatzyScreen.yatzy.bgStraight"), topScore: 20 },
        { name: t("yatzyScreen.yatzy.flStraight"), topScore: 20 },
        { name: t("yatzyScreen.yatzy.chance"), topScore: 20 },
    ]
};
export function lowerNames(t: TFunction<"translation", undefined>): GameScore[] {
    return [
        { name: t("yatzyScreen.yatzy.yatzy"), topScore: 100, setScore: 100 }
    ]
};
export function upperNames(t: TFunction<"translation", undefined>): GameScore[] {
    return [
        { name: t("yatzyScreen.yatzy.ones"), topScore: 6 },
        { name: t("yatzyScreen.yatzy.twos"), topScore: 12 },
        { name: t("yatzyScreen.yatzy.threes"), topScore: 18 },
        { name: t("yatzyScreen.yatzy.fours"), topScore: 24 },
        { name: t("yatzyScreen.yatzy.fives"), topScore: 30 },
        { name: t("yatzyScreen.yatzy.sixes"), topScore: 36 },
    ]
};
