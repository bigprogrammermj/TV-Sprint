# Timer-Webseite Projekt - 60 Minuten Sprint

## 1. Projektbeschreibung

Eine responsive HTML-Webseite mit digitalen 7-Segment-Anzeigen, die verschiedene Countdown-Timer und einen Uptime-Counter anzeigt.

## 2. Anforderungen

### Funktionale Anforderungen:
- 4 Countdown-Timer mit spezifischen Zieldaten
- 1 Uptime-Counter (zeigt Zeit seit Website-Start)
- Digitale 7-Segment-Anzeige im Stil des Referenzbildes
- Live-Aktualisierung aller Timer (Monate, Wochen, Tage, Stunden, Minuten, Sekunden)
- Responsive Design für verschiedene Bildschirmgrößen

### Timer-Spezifikationen:

#### Timer 1: "Willst du ernst genommen werden und neue Kontakte knüpfen die dich weiterbringen oder einfach nur belächelt?"
- Zieldatum: 27.09.2025
- Format: Monate | Wochen | Tage | Stunden | Minuten | Sekunden

#### Timer 2: "Willst du deinen nächsten Geburtstag endlich nochmal seit langem aus ganzer Seele glücklich feiern?"
- Zieldatum: 11.10.2025
- Format: Monate | Wochen | Tage | Stunden | Minuten | Sekunden

#### Timer 3: "2016 wird 10 Jahre her sein"
- Zieldatum: 01.01.2026
- Format: Monate | Wochen | Tage | Stunden | Minuten | Sekunden

#### Timer 4: "Sorg dafür das es diesmal klappt, sorg für eine bessere Perspektive"
- Zieldatum: 28.01.2026
- Format: Monate | Wochen | Tage | Stunden | Minuten | Sekunden

#### Uptime Counter: "Zeit vergangen seit Website-Start"
- Läuft aufwärts seit dem ersten Laden der Seite
- Format: Tage | Stunden | Minuten | Sekunden

### Design-Anforderungen:
- Rote digitale 7-Segment-Anzeige (wie im Referenzbild)
- Dunkler Hintergrund für Kontrast
- Zentrale Anordnung untereinander
- Gleichmäßige Abstände zwischen den Timern
- Labels über/unter jeder Anzeige
- Responsive Design

## 3. Technische Umsetzung

### Technologie-Stack:
- **HTML5**: Grundstruktur
- **CSS3**: Styling, 7-Segment-Display, Responsive Design
- **Vanilla JavaScript**: Timer-Logik, DOM-Manipulation

### Ausgewählte Bibliothek:
- Basis: Custom CSS 7-Segment-Display (inspiriert von gefundenen Bibliotheken)
- Alternative: `seven-segment-timer` oder `digital-display` Bibliotheken als Referenz

### Dateistruktur:
```
/
├── index.html          # Haupt-HTML-Datei
├── styles.css          # CSS-Styling und 7-Segment-Display
├── script.js           # Timer-Logik und DOM-Updates
└── PROJECT_DOCUMENTATION.md
```

## 4. Implementierungsdetails

### CSS 7-Segment-Display:
- Verwendung von CSS-Pseudo-Elementen oder SVG
- Rote Farbe (#ff0000 oder ähnlich)
- Skalierbar und responsive
- Animationen für smooth Transitions

### JavaScript Timer-Logik:
- `setInterval()` für regelmäßige Updates (1000ms)
- Berechnung von Zeitdifferenzen
- Formatierung in Monate/Wochen/Tage/Stunden/Minuten/Sekunden
- LocalStorage für Uptime-Persistierung

### Responsive Design:
- CSS Grid oder Flexbox Layout
- Media Queries für verschiedene Bildschirmgrößen
- Skalierung der 7-Segment-Displays
- Touch-friendly für mobile Geräte

## 5. Entwicklungsplan (60 Minuten)

### Phase 1: Setup und Grundstruktur (10 Min) [FERTIG]
- [FERTIG] Projektdokumentation erstellen
- [FERTIG] Verständnisfragen klären
- [FERTIG] HTML-Grundstruktur aufsetzen

### Phase 2: 7-Segment-Display Implementierung (15 Min) [FERTIG]
- [FERTIG] CSS für digitale Anzeige erstellen
- [FERTIG] Test-Darstellung der Zahlen

### Phase 3: Timer-Logik (20 Min) [FERTIG]
- [FERTIG] Countdown-JavaScript implementieren
- [FERTIG] Alle 4 Timer einrichten
- [FERTIG] Uptime-Counter implementieren

### Phase 4: Responsive Design & Styling (10 Min) [FERTIG]
- [FERTIG] CSS-Responsive-Design
- [FERTIG] Feintuning der Layouts

### Phase 5: Testing & Optimierung (5 Min) [FERTIG]
- [FERTIG] Cross-Browser-Testing
- [FERTIG] Performance-Optimierung
- [FERTIG] Finale Anpassungen

## 5.1. Finale Design-Spezifikationen

### Layout & Abstände:
- **Container**: `gap: 40px` zwischen Timer-Einheiten, vertikal zentriert
- **Timer-Titel**: `margin-bottom: -32px` (sehr kompakt)
- **Labels**: `margin-top: -32px` (sehr kompakt an Zahlen)
- **Timer-Display**: `gap: 8px` zwischen Zeiteinheiten

### 7-Segment-Display Größen:
- **Digit-Größe**: `clamp(5rem, 12vw, 9rem)` 
- **Digit-Dimensionen**: `80px-140px` breit, `120px-200px` hoch
- **Digit-Overlap**: `-40px` margin für kompakte Ziffern-Paare
- **Separator**: `clamp(3rem, 6vw, 5rem)`, Position `top: -5px`

### Farben & Effekte:
- **Rote Timer**: `#ff1a1a` mit Glow-Effekt (text-shadow)
- **Grüner Uptime**: `#00ff00` ohne Glow-Effekt
- **Inaktive Segmente**: `rgba(255,0,0,0.15)` für rote, `rgba(0,255,0,0.1)` für grüne

## 6. Erfolgsmetriken

- ✅ Alle 5 Timer funktionieren korrekt
- ✅ 7-Segment-Display sieht authentisch aus
- ✅ Responsive auf Desktop, Tablet, Mobile
- ✅ Keine Performance-Probleme
- ✅ Code ist sauber und kommentiert

## 7. Risiken & Mitigationen

### Risiko: Zeit für 7-Segment-CSS zu knapp
**Mitigation**: Fallback auf simple monospace-Font mit roter Farbe

### Risiko: Komplexe Zeitberechnungen
**Mitigation**: Verwendung von Date-Objekten und bewährten Formeln

### Risiko: Browser-Kompatibilität
**Mitigation**: Moderne JavaScript-Features mit Fallbacks

## 8. Post-Sprint Verbesserungen (Optional)

- Sound-Effekte bei Timer-Updates
- Konfigurierbare Timer-Ziele
- Speicherung in LocalStorage
- Animations-Effekte
- Weitere Themes/Farben

---

**Projektstatus**: In Vorbereitung
**Geschätzte Entwicklungszeit**: 60 Minuten
**Zielgruppe**: Persönliche Motivation/Tracking-Webseite