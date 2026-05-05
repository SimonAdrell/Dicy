import { useState } from 'react';
import { Text, TextInput, useColorScheme, View, ViewProps } from 'react-native';
import { useTranslation } from 'react-i18next';
import { bonusScoreKey, bonusScoreStorage } from '@helpers/Storage/bonus/bonusScoreStorage';
import { gameType } from '@helpers/Game/gameType';
import { modalStyle } from '@styles/sharedStyle';
import styles from './languageSettings.styles';

const DEFAULT_BONUS_SCORE = 50;

interface bonusScoreSettingsProps extends ViewProps { }

type bonusInputProps = {
  label: string;
  storage: itemStorage<number>;
  isDarkMode: boolean;
};

function BonusInput({ label, storage, isDarkMode }: bonusInputProps) {
  const persisted = storage.get() ?? DEFAULT_BONUS_SCORE;
  const [text, setText] = useState(String(persisted));
  const mStyle = modalStyle(isDarkMode);

  const commit = () => {
    const parsed = parseInt(text, 10);
    if (Number.isFinite(parsed) && parsed >= 0) {
      storage.save(parsed);
      setText(String(parsed));
      return;
    }
    setText(String(storage.get() ?? DEFAULT_BONUS_SCORE));
  };

  return (
    <View style={[mStyle.playerRow, { alignItems: 'center' }]}>
      <View style={{ flex: 2, paddingLeft: 10 }}>
        <Text style={[styles.gameNameText, mStyle.modalText, { fontSize: 18, marginBottom: 0, textAlign: 'left' }]}>
          {label}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          style={[mStyle.textInput, { width: 80, marginBottom: 0, color: isDarkMode ? '#fff' : '#000' }]}
          keyboardType="number-pad"
          maxLength={4}
          value={text}
          onChangeText={setText}
          onEndEditing={commit}
          onSubmitEditing={commit}
        />
      </View>
    </View>
  );
}

export function BonusScoreSettings(options: bonusScoreSettingsProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const mStyle = modalStyle(isDarkMode);

  const maxiStorage: itemStorage<number> = bonusScoreStorage(bonusScoreKey(gameType.maxiYatzy));
  const yatzyStorage: itemStorage<number> = bonusScoreStorage(bonusScoreKey(gameType.yatzy));

  return (
    <View {...options}>
      <View style={mStyle.playerRow}>
        <Text style={[styles.gameNameText, { fontSize: 32, padding: 20 }, mStyle.modalText]}>
          {t('settings.bonusScoreSettings.header')}
        </Text>
      </View>
      <BonusInput
        label={t('settings.bonusScoreSettings.maxiYatzy')}
        storage={maxiStorage}
        isDarkMode={isDarkMode}
      />
      <BonusInput
        label={t('settings.bonusScoreSettings.yatzy')}
        storage={yatzyStorage}
        isDarkMode={isDarkMode}
      />
    </View>
  );
}
