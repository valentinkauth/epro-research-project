# Research Project (Readme für Client und Sercer)

Dies ist eine Anleitung für die Installation und Inbetriebnahme von Server- und Client-Anwendung für das Forschungsprojekt von Valentin Kauth.

## Voraussetzungen

Für das Builden und Starten der Client-Anwendung ist die Installation von [NodeJS](https://nodejs.org/de/download/) sowie [Expo](https://expo.io/learn) (enthält ReactNative) vorausgesetzt 

Für das lokale Testen werden zudem entweder der iOS Simulator oder der Android Emulator benötigt

Die Server-Anwendung setzt die Installation von [Java](https://www.java.com/de/download/) Version 8 voraus


## Starten der Server-Anwendung

1.) Navigieren Sie mit der Kommandozeile in den Installationsornder des Servers

2.) Führen Sie folgendes Kommando aus, um den Server zu starten
```bash
./wlp/bin/server start fhir-server
```

3.) Um den Server zu beenden, führen Sie folgendes Kommando aus:
```bash
./wlp/bin/server stop fhir-server
```

## Starten der Client-Anwendung

1.) Navigieren Sie mit der Kommandozeile in den Hauptordner der Client-Anwendung

2.) Nutzen Sie zunächst den Paket-Installer [yarn](https://yarnpkg.com/) um die benötigten Pakete/Bibliotheken zu installieren.

```bash
yarn install
```

3.) Da der Android Simulator nicht mit der Konfiguration von localhost funktioniert, tragen Sie bitte in der Datei helpers/constants.js ihre lokale IP-Adresse ein. 

```bash
export const IP_ADRESS = "192.168.178.20 (put your ip adress here)"
```

4.) Starten Sie die Anwendung
```bash
expo start
```

5.) Im sich nun öffnenden Browser-Fenster wählen Sie entweder den Start im iOS Simulator oder dem Android Emulator aus


## Bekannte Probleme
- App kann Abstürzen wenn Fragebogen zu schnell bearbeitet wird insbesondere bei Tastatureingabe (scheint ein Problem mit den Callbacks in Kombination mit der setState Methode zu sein)
- Die Skala der X-Achse des LineGraph zeigt zweimal den Wert Mäßig an, da react-native-chart-kit selbstständig die Skalierung der Achsenbeschriftung festlegt und somit manche Labels mehrfach vorkommen können.
- Fehlerhafte Serveranfragen werden nicht vom System kommuniziert (lediglich über Log-Nachrichten in der Konsole)
- Da der Android Simulator nicht mit Localhost umgehen kann, muss zunächst die IP-Adresse des lokalen Rechners in constants.js eingetragen werden. 
