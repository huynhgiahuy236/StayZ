import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum AppLanguage { vi, en, ko, ja, th }

class StayzLocalizations {
  const StayzLocalizations(this.locale);

  final Locale locale;

  static const supportedLocales = <Locale>[
    Locale('vi'),
    Locale('en'),
    Locale('ko'),
    Locale('ja'),
    Locale('th'),
  ];

  static const LocalizationsDelegate<StayzLocalizations> delegate =
      _StayzLocalizationsDelegate();

  static StayzLocalizations of(BuildContext context) =>
      Localizations.of<StayzLocalizations>(context, StayzLocalizations) ??
      StayzLocalizations(AppLocale.instance.locale);

  bool get isVietnamese => locale.languageCode == 'vi';

  String text(
    String vi,
    String en, {
    String? ko,
    String? ja,
    String? th,
  }) {
    final code = locale.languageCode;
    String selected;
    switch (code) {
      case 'en':
        selected = en.isNotEmpty ? en : vi;
        break;
      case 'ko':
        selected = (ko != null && ko.isNotEmpty) ? ko : (en.isNotEmpty ? en : vi);
        break;
      case 'ja':
        selected = (ja != null && ja.isNotEmpty) ? ja : (en.isNotEmpty ? en : vi);
        break;
      case 'th':
        selected = (th != null && th.isNotEmpty) ? th : (en.isNotEmpty ? en : vi);
        break;
      default:
        selected = vi;
    }
    return repairMojibake(selected);
  }
}

class _StayzLocalizationsDelegate
    extends LocalizationsDelegate<StayzLocalizations> {
  const _StayzLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) =>
      StayzLocalizations.supportedLocales.any(
        (supported) => supported.languageCode == locale.languageCode,
      );

  @override
  Future<StayzLocalizations> load(Locale locale) =>
      SynchronousFuture<StayzLocalizations>(StayzLocalizations(locale));

  @override
  bool shouldReload(_StayzLocalizationsDelegate old) => false;
}

class AppLocale extends ChangeNotifier {
  AppLocale._();
  static final AppLocale instance = AppLocale._();

  static const _prefsKey = 'appLanguage';

  AppLanguage _language = AppLanguage.vi;
  AppLanguage get language => _language;
  String get code => _language.name;
  bool get isVietnamese => _language == AppLanguage.vi;
  Locale get locale => Locale(_language.name);

  String get label => labelFor(_language);
  String get flag => flagFor(_language);

  static String flagFor(AppLanguage language) => switch (language) {
        AppLanguage.vi => '🇻🇳',
        AppLanguage.en => '🇬🇧',
        AppLanguage.ko => '🇰🇷',
        AppLanguage.ja => '🇯🇵',
        AppLanguage.th => '🇹🇭',
      };

  static String labelFor(AppLanguage language) => switch (language) {
        AppLanguage.vi => 'Tiếng Việt',
        AppLanguage.en => 'English',
        AppLanguage.ko => '한국어',
        AppLanguage.ja => '日本語',
        AppLanguage.th => 'ไทย',
      };

  Future<void> load() async {
    final prefs = await SharedPreferences.getInstance();
    final savedCode = prefs.getString(_prefsKey) ?? 'vi';
    _language = AppLanguage.values.firstWhere(
      (l) => l.name == savedCode,
      orElse: () => AppLanguage.vi,
    );
    notifyListeners();
  }

  Future<void> setLanguage(AppLanguage language) async {
    if (_language == language) return;
    _language = language;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_prefsKey, language.name);
  }

  String t(
    String vi,
    String en, {
    String? ko,
    String? ja,
    String? th,
  }) =>
      StayzLocalizations(locale).text(
        vi,
        en,
        ko: ko,
        ja: ja,
        th: th,
      );
}

extension StayzLocalizationContext on BuildContext {
  StayzLocalizations get l10n => StayzLocalizations.of(this);
}

/// Repairs the common legacy case where UTF-8 Vietnamese was decoded as
/// Latin-1. Correct Vietnamese text is returned unchanged.
String repairMojibake(String value) {
  final looksBroken =
      value.contains('Ã') ||
      value.contains('Â') ||
      value.contains('áº') ||
      value.contains('á»');
  if (!looksBroken) return value;

  try {
    final repaired = utf8.decode(latin1.encode(value));
    return repaired.contains('\uFFFD') ? value : repaired;
  } catch (_) {
    return value;
  }
}

String tr(
  String vi,
  String en, {
  String? ko,
  String? ja,
  String? th,
}) =>
    AppLocale.instance.t(vi, en, ko: ko, ja: ja, th: th);
