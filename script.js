/**
 * ========================================
 * TIMER WEBSEITE - BOMBEN-ENTSCHÄRFUNG STIL
 * JavaScript Countdown & Uptime Logic
 * ========================================
 */

// Timer-Zieldaten definieren
const TARGET_DATES = {
    timer1: new Date('2025-09-27T23:59:59'),  // 27.09.2025
    timer2: new Date('2025-10-11T23:59:59'),  // 11.10.2025
    timer3: new Date('2026-01-01T23:59:59'),  // 01.01.2026
    timer4: new Date('2026-01-28T23:59:59')   // 28.01.2026
};

// Uptime-Start-Zeit (aus LocalStorage oder aktuell)
let UPTIME_START = null;

/**
 * Initialisierung der Uptime
 */
function initializeUptime() {
    const storedStart = localStorage.getItem('uptimeStart');
    if (storedStart) {
        UPTIME_START = new Date(storedStart);
    } else {
        UPTIME_START = new Date();
        localStorage.setItem('uptimeStart', UPTIME_START.toISOString());
    }
}

/**
 * Berechnet Zeitdifferenz zwischen zwei Daten
 * @param {Date} targetDate - Zieldatum
 * @param {Date} currentDate - Aktuelles Datum
 * @returns {Object} - Zeitdifferenz-Objekt
 */
function calculateTimeDifference(targetDate, currentDate = new Date()) {
    const timeDiff = targetDate - currentDate;
    
    if (timeDiff <= 0) {
        return {
            months: 0,
            weeks: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            expired: true
        };
    }

    // Berechnung der Zeiteinheiten
    const totalSeconds = Math.floor(timeDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    // Monate und Wochen berechnen
    const months = Math.floor(totalDays / 30); // Approximation
    const remainingDaysAfterMonths = totalDays % 30;
    const weeks = Math.floor(remainingDaysAfterMonths / 7);
    const days = remainingDaysAfterMonths % 7;

    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    return {
        months,
        weeks,
        days,
        hours,
        minutes,
        seconds,
        expired: false
    };
}

/**
 * Berechnet vergangene Zeit seit Start
 * @param {Date} startDate - Startdatum
 * @param {Date} currentDate - Aktuelles Datum
 * @returns {Object} - Vergangene Zeit-Objekt
 */
function calculateElapsedTime(startDate, currentDate = new Date()) {
    const timeDiff = currentDate - startDate;
    
    if (timeDiff <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }

    const totalSeconds = Math.floor(timeDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    return {
        days: totalDays,
        hours,
        minutes,
        seconds
    };
}

/**
 * Aktualisiert die Anzeige einer Zahl (zwei Stellen) mit authentischer 7-Segment-Anzeige
 * @param {string} elementPrefix - Element-Präfix
 * @param {number} value - Wert
 */
function updateDigitDisplay(elementPrefix, value) {
    const paddedValue = value.toString().padStart(2, '0');
    
    const tensElement = document.getElementById(`${elementPrefix}-tens`);
    const onesElement = document.getElementById(`${elementPrefix}-ones`);
    
    updateDigitContent(tensElement, paddedValue[0]);
    updateDigitContent(onesElement, paddedValue[1]);
}

/**
 * Aktualisiert den Inhalt eines einzelnen Digits mit Hintergrund-Segmenten
 * @param {Element} digitElement - Das Digit-Element
 * @param {string} digit - Die anzuzeigende Ziffer
 */
function updateDigitContent(digitElement, digit) {
    if (!digitElement) return;
    
    // Schaue nach vorhandenem span oder erstelle neues
    let contentSpan = digitElement.querySelector('.digit-content');
    if (!contentSpan) {
        contentSpan = document.createElement('span');
        contentSpan.className = 'digit-content';
        digitElement.appendChild(contentSpan);
    }
    
    contentSpan.textContent = digit;
}

/**
 * Aktualisiert die Anzeige einer Zahl (drei Stellen) mit authentischer 7-Segment-Anzeige
 * @param {string} elementPrefix - Element-Präfix
 * @param {number} value - Wert
 */
function updateDigitDisplayThree(elementPrefix, value) {
    const paddedValue = value.toString().padStart(3, '0');
    
    const hundredsElement = document.getElementById(`${elementPrefix}-hundreds`);
    const tensElement = document.getElementById(`${elementPrefix}-tens`);
    const onesElement = document.getElementById(`${elementPrefix}-ones`);
    
    updateDigitContent(hundredsElement, paddedValue[0]);
    updateDigitContent(tensElement, paddedValue[1]);
    updateDigitContent(onesElement, paddedValue[2]);
}

/**
 * Aktualisiert einen Countdown-Timer (synchronisiert)
 * @param {string} timerPrefix - Timer-Präfix
 * @param {Date} targetDate - Zieldatum
 * @param {Date} currentTime - Aktuelle Zeit für Synchronisation
 */
function updateCountdownTimerSync(timerPrefix, targetDate, currentTime) {
    const timeDiff = calculateTimeDifference(targetDate, currentTime);
    
    if (timeDiff.expired) {
        // Timer ist abgelaufen - alle Werte auf 00 setzen
        updateDigitDisplay(`${timerPrefix}-months`, 0);
        updateDigitDisplay(`${timerPrefix}-weeks`, 0);
        updateDigitDisplay(`${timerPrefix}-days`, 0);
        updateDigitDisplay(`${timerPrefix}-hours`, 0);
        updateDigitDisplay(`${timerPrefix}-minutes`, 0);
        updateDigitDisplay(`${timerPrefix}-seconds`, 0);
    } else {
        // Timer läuft - Werte aktualisieren
        updateDigitDisplay(`${timerPrefix}-months`, timeDiff.months);
        updateDigitDisplay(`${timerPrefix}-weeks`, timeDiff.weeks);
        updateDigitDisplay(`${timerPrefix}-days`, timeDiff.days);
        updateDigitDisplay(`${timerPrefix}-hours`, timeDiff.hours);
        updateDigitDisplay(`${timerPrefix}-minutes`, timeDiff.minutes);
        updateDigitDisplay(`${timerPrefix}-seconds`, timeDiff.seconds);
    }
}

/**
 * Legacy-Funktion für Kompatibilität
 */
function updateCountdownTimer(timerPrefix, targetDate) {
    updateCountdownTimerSync(timerPrefix, targetDate, new Date());
}

/**
 * Aktualisiert den Uptime-Counter (synchronisiert)
 * @param {Date} currentTime - Aktuelle Zeit für Synchronisation
 */
function updateUptimeCounterSync(currentTime) {
    const elapsedTime = calculateElapsedTime(UPTIME_START, currentTime);
    
    // Uptime verwendet jetzt auch 6 Zeiteinheiten wie die anderen Timer
    updateDigitDisplay('uptime-months', Math.floor(elapsedTime.days / 30));
    updateDigitDisplay('uptime-weeks', Math.floor((elapsedTime.days % 30) / 7));
    updateDigitDisplay('uptime-days', elapsedTime.days % 7);
    updateDigitDisplay('uptime-hours', elapsedTime.hours);
    updateDigitDisplay('uptime-minutes', elapsedTime.minutes);
    updateDigitDisplay('uptime-seconds', elapsedTime.seconds);
}

/**
 * Optimierte Timer-Display-Funktion
 * @param {string} timerPrefix - Timer-Präfix
 * @param {Object} timeDiff - Zeit-Differenz-Objekt
 */
function updateTimerDisplay(timerPrefix, timeDiff) {
    if (timeDiff.expired) {
        // Timer ist abgelaufen - alle Werte auf 00 setzen
        updateDigitDisplay(`${timerPrefix}-months`, 0);
        updateDigitDisplay(`${timerPrefix}-weeks`, 0);
        updateDigitDisplay(`${timerPrefix}-days`, 0);
        updateDigitDisplay(`${timerPrefix}-hours`, 0);
        updateDigitDisplay(`${timerPrefix}-minutes`, 0);
        updateDigitDisplay(`${timerPrefix}-seconds`, 0);
    } else {
        // Timer läuft - Werte aktualisieren
        updateDigitDisplay(`${timerPrefix}-months`, timeDiff.months);
        updateDigitDisplay(`${timerPrefix}-weeks`, timeDiff.weeks);
        updateDigitDisplay(`${timerPrefix}-days`, timeDiff.days);
        updateDigitDisplay(`${timerPrefix}-hours`, timeDiff.hours);
        updateDigitDisplay(`${timerPrefix}-minutes`, timeDiff.minutes);
        updateDigitDisplay(`${timerPrefix}-seconds`, timeDiff.seconds);
    }
}

/**
 * Optimierte Uptime-Display-Funktion
 * @param {Object} elapsedTime - Vergangene Zeit-Objekt
 */
function updateUptimeDisplay(elapsedTime) {
    updateDigitDisplay('uptime-months', Math.floor(elapsedTime.days / 30));
    updateDigitDisplay('uptime-weeks', Math.floor((elapsedTime.days % 30) / 7));
    updateDigitDisplay('uptime-days', elapsedTime.days % 7);
    updateDigitDisplay('uptime-hours', elapsedTime.hours);
    updateDigitDisplay('uptime-minutes', elapsedTime.minutes);
    updateDigitDisplay('uptime-seconds', elapsedTime.seconds);
}

/**
 * Legacy-Funktion für Kompatibilität
 */
function updateUptimeCounter() {
    updateUptimeCounterSync(new Date());
}

/**
 * Hauptupdate-Funktion für alle Timer
 */
function updateAllTimers() {
    // Aktuelle Zeit einmal für alle Timer berechnen (Synchronisation)
    const currentTime = new Date();
    
    // Alle Timer-Berechnungen gleichzeitig durchführen
    const timer1Data = calculateTimeDifference(TARGET_DATES.timer1, currentTime);
    const timer2Data = calculateTimeDifference(TARGET_DATES.timer2, currentTime);
    const timer3Data = calculateTimeDifference(TARGET_DATES.timer3, currentTime);
    const timer4Data = calculateTimeDifference(TARGET_DATES.timer4, currentTime);
    const uptimeData = calculateElapsedTime(UPTIME_START, currentTime);
    
    // Alle Timer gleichzeitig aktualisieren
    updateTimerDisplay('timer1', timer1Data);
    updateTimerDisplay('timer2', timer2Data);
    updateTimerDisplay('timer3', timer3Data);
    updateTimerDisplay('timer4', timer4Data);
    updateUptimeDisplay(uptimeData);
}

/**
 * Digit-Update-Animation (ohne Glow-Effekt)
 * @param {Element} element - Element
 */
function animateDigitUpdate(element) {
    if (!element) return;
    
    // Nur noch scale-Animation, kein text-shadow mehr
    element.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

/**
 * Enhanced Update mit Animation
 */
function updateAllTimersWithAnimation() {
    // Standard-Update
    updateAllTimers();
    
    // Animation nur jede Sekunde
    const now = new Date();
    if (now.getMilliseconds() < 100) {
        // Zufällige Digit-Animation alle paar Sekunden
        if (Math.random() < 0.1) {
            const allDigits = document.querySelectorAll('.digit');
            const randomDigit = allDigits[Math.floor(Math.random() * allDigits.length)];
            animateDigitUpdate(randomDigit);
        }
    }
}

/**
 * Konsolen-Output für Debug-Zwecke
 */
function logTimerStatus() {
    console.log('🕐 Timer Status Update:');
    console.log('⏰ Timer 1 (Ernst genommen werden):', calculateTimeDifference(TARGET_DATES.timer1));
    console.log('🎂 Timer 2 (Geburtstag):', calculateTimeDifference(TARGET_DATES.timer2));
    console.log('📅 Timer 3 (2016 - 10 Jahre):', calculateTimeDifference(TARGET_DATES.timer3));
    console.log('🎯 Timer 4 (Bessere Perspektive):', calculateTimeDifference(TARGET_DATES.timer4));
    console.log('⏱️ Uptime:', calculateElapsedTime(UPTIME_START));
    console.log('───────────────────────');
}

/**
 * Initialisierung der Anwendung
 */
function initializeApp() {
    console.log('🚀 Timer-Webseite wird initialisiert...');
    console.log('💣 Bomben-Entschärfung Modus aktiviert!');
    
    // Uptime initialisieren
    initializeUptime();
    
    // Erste Aktualisierung
    updateAllTimers();
    
    // Timer perfekt auf volle Sekunden synchronisieren
    const now = new Date();
    const msUntilNextSecond = 1000 - now.getMilliseconds();
    
    setTimeout(() => {
        // Erste Aktualisierung auf der vollen Sekunde
        updateAllTimersWithAnimation();
        
        // Dann jede Sekunde exakt weiter
        setInterval(updateAllTimersWithAnimation, 1000);
    }, msUntilNextSecond);
    
    // Debug-Log alle 10 Sekunden
    setInterval(logTimerStatus, 10000);
    
    // Sichtbarkeits-API für Performance-Optimierung
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('⏸️ Tab versteckt - Timer läuft weiter');
        } else {
            console.log('▶️ Tab sichtbar - Timer-Update');
            updateAllTimers();
        }
    });
    
    console.log('✅ Initialisierung abgeschlossen!');
}

/**
 * Fehlerbehandlung
 */
window.addEventListener('error', (event) => {
    console.error('❌ JavaScript Fehler:', event.error);
});

/**
 * Performance-Monitoring
 */
function monitorPerformance() {
    const startTime = performance.now();
    updateAllTimers();
    const endTime = performance.now();
    
    if (endTime - startTime > 10) {
        console.warn('⚠️ Timer-Update dauert zu lange:', endTime - startTime, 'ms');
    }
}

// App starten, sobald DOM geladen ist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Initialisiere alle digit-Elemente für authentische 7-Segment-Anzeige
        const allDigits = document.querySelectorAll('.digit');
        allDigits.forEach(digit => {
            updateDigitContent(digit, '8'); // Starte mit "8" als Initialisierung
        });
        initializeApp();
    });
} else {
    // Initialisiere alle digit-Elemente für authentische 7-Segment-Anzeige
    const allDigits = document.querySelectorAll('.digit');
    allDigits.forEach(digit => {
        updateDigitContent(digit, '8'); // Starte mit "8" als Initialisierung
    });
    initializeApp();
}

// Performance-Check alle 30 Sekunden
setInterval(monitorPerformance, 30000);

/**
 * Zusätzliche Utility-Funktionen für zukünftige Erweiterungen
 */
window.TimerApp = {
    getTimerStatus: () => ({
        timer1: calculateTimeDifference(TARGET_DATES.timer1),
        timer2: calculateTimeDifference(TARGET_DATES.timer2),
        timer3: calculateTimeDifference(TARGET_DATES.timer3),
        timer4: calculateTimeDifference(TARGET_DATES.timer4),
        uptime: calculateElapsedTime(UPTIME_START)
    }),
    resetUptime: () => {
        UPTIME_START = new Date();
        localStorage.setItem('uptimeStart', UPTIME_START.toISOString());
        console.log('🔄 Uptime zurückgesetzt');
    },
    forceUpdate: () => {
        updateAllTimers();
        console.log('🔄 Timer manuell aktualisiert');
    }
};