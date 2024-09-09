export interface PlayerDto {
    name: string;
    imageUrl: string;
    playerId: number;
    plusImage: boolean;
    currentScore: number;
    order: number | undefined;
  };