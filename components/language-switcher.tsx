import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const LANGUAGES = ['en', 'fr', 'ja', 'vi', 'ko'] as const;
type Language = (typeof LANGUAGES)[number];

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? 'light'].tint;

  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold" style={styles.label}>
        {t('languageSwitcher.label')}
      </ThemedText>
      <View style={styles.row}>
        {LANGUAGES.map((lang) => {
          const isActive = i18n.language === lang;
          return (
            <TouchableOpacity
              key={lang}
              onPress={() => i18n.changeLanguage(lang)}
              style={[
                styles.button,
                { borderColor: tint },
                isActive && { backgroundColor: tint },
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={t(`languageSwitcher.${lang}` as Language)}>
              <ThemedText
                style={[styles.buttonText, isActive && styles.buttonTextActive]}>
                {t(`languageSwitcher.${lang}` as Language)}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  buttonText: {
    fontSize: 13,
  },
  buttonTextActive: {
    color: '#fff',
  },
});
