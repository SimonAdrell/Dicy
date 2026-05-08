import {useMemo} from 'react';
import {View} from 'react-native';

const PIP_POSITIONS: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [
    [0, 0],
    [2, 2],
  ],
  3: [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  4: [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
  ],
  5: [
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2],
  ],
  6: [
    [0, 0],
    [0, 2],
    [1, 0],
    [1, 2],
    [2, 0],
    [2, 2],
  ],
};

type DieFaceProps = Readonly<{
  pips: number;
  size?: number;
  tone?: 'light' | 'dark';
}>;

export default function DieFace({
  pips,
  size = 48,
  tone = 'light',
}: DieFaceProps) {
  const bg = tone === 'light' ? '#fff' : '#005b4f';
  const dotColor = tone === 'light' ? '#005b4f' : '#fff8f1';
  const cell = size / 3;
  const pipRadius = size * 0.085;
  const dots = useMemo(() => PIP_POSITIONS[pips] ?? [], [pips]);

  const containerStyle = useMemo(
    () => ({
      position: 'relative' as const,
      width: size,
      height: size,
      borderRadius: size * 0.22,
      backgroundColor: bg,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: tone === 'light' ? 0.1 : 0.3,
      shadowRadius: 6,
      elevation: 3,
    }),
    [size, tone, bg],
  );

  const pipStyles = useMemo(
    () =>
      dots.map(([row, col]) => ({
        position: 'absolute' as const,
        top: row * cell + cell / 2 - pipRadius,
        left: col * cell + cell / 2 - pipRadius,
        width: pipRadius * 2,
        height: pipRadius * 2,
        borderRadius: pipRadius,
        backgroundColor: dotColor,
      })),
    [dots, cell, pipRadius, dotColor],
  );

  return (
    <View style={containerStyle}>
      {dots.map(([row, col], i) => (
        <View key={`${row}-${col}`} testID="pip" style={pipStyles[i]} />
      ))}
    </View>
  );
}
