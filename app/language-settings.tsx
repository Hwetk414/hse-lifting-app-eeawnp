
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import { useLanguage, Language } from '../contexts/LanguageContext';
import Icon from '../components/Icon';

export default function LanguageSettingsScreen() {
  const router = useRouter();
  const { language, setLanguage, t, isRTL } = useLanguage();

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    console.log('Language changed to:', lang);
  };

  return (
    <SafeAreaView style={[commonStyles.container, isRTL && { direction: 'rtl' }]}>
      <View style={[
        commonStyles.row, 
        { 
          paddingHorizontal: 20, 
          paddingVertical: 16, 
          borderBottomWidth: 1, 
          borderBottomColor: colors.border,
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }
      ]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: isRTL ? 0 : 16, marginLeft: isRTL ? 16 : 0 }}>
          <Icon name={isRTL ? "arrow-forward-outline" : "arrow-back-outline"} size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1, textAlign: isRTL ? 'right' : 'left' }]}>
          {t('language.settings')}
        </Text>
      </View>

      <View style={commonStyles.content}>
        <Text style={[commonStyles.textLight, { marginBottom: 24, fontSize: 16, textAlign: isRTL ? 'right' : 'left' }]}>
          {t('select.language')}
        </Text>

        <View style={commonStyles.section}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                commonStyles.card,
                {
                  borderWidth: 2,
                  borderColor: language === lang.code ? colors.primary : colors.border,
                  backgroundColor: language === lang.code ? `${colors.primary}10` : colors.card,
                }
              ]}
              onPress={() => handleLanguageChange(lang.code)}
              activeOpacity={0.7}
            >
              <View style={[
                commonStyles.row,
                { flexDirection: isRTL ? 'row-reverse' : 'row' }
              ]}>
                <View style={{ flex: 1 }}>
                  <Text style={[
                    commonStyles.subtitle, 
                    { 
                      marginBottom: 4, 
                      fontSize: 18,
                      color: language === lang.code ? colors.primary : colors.text,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    {lang.nativeName}
                  </Text>
                  <Text style={[
                    commonStyles.textLight, 
                    { 
                      fontSize: 14,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    {lang.name}
                  </Text>
                </View>
                {language === lang.code && (
                  <Icon 
                    name="checkmark-circle" 
                    size={24} 
                    color={colors.primary} 
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[
          commonStyles.card, 
          { 
            backgroundColor: colors.accent, 
            marginTop: 20 
          }
        ]}>
          <View style={[
            commonStyles.row, 
            { 
              marginBottom: 8,
              flexDirection: isRTL ? 'row-reverse' : 'row'
            }
          ]}>
            <Icon 
              name="information-circle-outline" 
              size={24} 
              color="white" 
              style={{ 
                marginRight: isRTL ? 0 : 12,
                marginLeft: isRTL ? 12 : 0
              }} 
            />
            <Text style={[
              commonStyles.subtitle, 
              { 
                color: 'white', 
                marginBottom: 0,
                textAlign: isRTL ? 'right' : 'left'
              }
            ]}>
              {language === 'ar' ? 'معلومات' : 'Information'}
            </Text>
          </View>
          <Text style={[
            commonStyles.text, 
            { 
              color: 'white', 
              opacity: 0.9,
              textAlign: isRTL ? 'right' : 'left'
            }
          ]}>
            {language === 'ar' 
              ? 'سيتم تطبيق تغيير اللغة على جميع أجزاء التطبيق. قد تحتاج إلى إعادة تشغيل التطبيق لرؤية جميع التغييرات.'
              : 'Language changes will be applied throughout the app. You may need to restart the app to see all changes.'
            }
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
