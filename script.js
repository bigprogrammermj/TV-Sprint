/**
 * ========================================
 * TIMER WEBSEITE - BOMBEN-ENTSCHÄRFUNG STIL
 * JavaScript Countdown & Uptime Logic mit Persistierung
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

// App-Start-Zeit für Persistierung
let APP_START_TIME = null;

/**
 * Initialisierung der App mit Persistierung
 */
function initializeApp() {
    console.log('🚀 App wird initialisiert...');
    
    // Lade oder erstelle App-Start-Zeit
    const storedAppStart = localStorage.getItem('appStartTime');
    if (storedAppStart) {
        APP_START_TIME = new Date(storedAppStart);
        console.log('📱 App-Start-Zeit aus localStorage geladen:', APP_START_TIME);
    } else {
        APP_START_TIME = new Date();
        localStorage.setItem('appStartTime', APP_START_TIME.toISOString());
        console.log('📱 Neue App-Start-Zeit gesetzt:', APP_START_TIME);
    }
    
    // Uptime initialisieren
    initializeUptime();
    
    // Erste Timer-Aktualisierung
    updateAllTimers();
    
    // Synchronisiere auf die nächste volle Sekunde für präzise Updates
    const now = new Date();
    const msUntilNextSecond = 1000 - now.getMilliseconds();
    
    console.log('⏰ Timer-Intervall wird in', msUntilNextSecond, 'ms gestartet');
    setTimeout(() => {
        updateAllTimersWithAnimation();
        setInterval(updateAllTimersWithAnimation, 1000);
        console.log('✅ Timer-Intervall gestartet');
    }, msUntilNextSecond);
}

/**
 * Initialisierung der Uptime mit Persistierung
 */
function initializeUptime() {
    const storedStart = localStorage.getItem('uptimeStart');
    if (storedStart) {
        UPTIME_START = new Date(storedStart);
        console.log('⏱️ Uptime-Start aus localStorage geladen:', UPTIME_START);
    } else {
        UPTIME_START = new Date();
        localStorage.setItem('uptimeStart', UPTIME_START.toISOString());
        console.log('⏱️ Neue Uptime-Start-Zeit gesetzt:', UPTIME_START);
    }
}

/**
 * Speichere aktuellen Timer-Zustand für Persistierung
 */
function saveTimerState() {
    try {
        const currentState = {
            appStartTime: APP_START_TIME.toISOString(),
            uptimeStart: UPTIME_START.toISOString(),
            lastUpdate: new Date().toISOString(),
            targetDates: {
                timer1: TARGET_DATES.timer1.toISOString(),
                timer2: TARGET_DATES.timer2.toISOString(),
                timer3: TARGET_DATES.timer3.toISOString(),
                timer4: TARGET_DATES.timer4.toISOString()
            }
        };
        
        localStorage.setItem('timerState', JSON.stringify(currentState));
        // console.log('💾 Timer-Zustand gespeichert');
    } catch (error) {
        console.error('❌ Fehler beim Speichern des Timer-Zustands:', error);
    }
}

/**
 * Lade Timer-Zustand bei Reload/Refresh
 */
function loadTimerState() {
    const storedState = localStorage.getItem('timerState');
    if (storedState) {
        try {
            const state = JSON.parse(storedState);
            console.log('📂 Timer-Zustand geladen:', state);
            return true;
        } catch (error) {
            console.error('❌ Fehler beim Laden des Timer-Zustands:', error);
            return false;
        }
    }
    return false;
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
    const months = Math.floor(totalDays / 30);
    const remainingDaysAfterMonths = totalDays % 30;
    const weeks = Math.floor(remainingDaysAfterMonths / 7);
    const days = remainingDaysAfterMonths % 7;
    
    return {
        months: Math.max(0, months),
        weeks: Math.max(0, weeks),
        days: Math.max(0, days),
        hours: Math.max(0, totalHours % 24),
        minutes: Math.max(0, totalMinutes % 60),
        seconds: Math.max(0, totalSeconds % 60),
        expired: false
    };
}

/**
 * Berechnet verstrichene Zeit seit einem Startdatum
 * @param {Date} startDate - Startdatum
 * @param {Date} currentDate - Aktuelles Datum
 * @returns {Object} - Verstrichene Zeit-Objekt
 */
function calculateElapsedTime(startDate, currentDate = new Date()) {
    const timeDiff = currentDate - startDate;
    
    if (timeDiff <= 0) {
        return {
            months: 0,
            weeks: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }
    
    // Berechnung der Zeiteinheiten
    const totalSeconds = Math.floor(timeDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    
    // Monate und Wochen berechnen
    const months = Math.floor(totalDays / 30);
    const remainingDaysAfterMonths = totalDays % 30;
    const weeks = Math.floor(remainingDaysAfterMonths / 7);
    const days = remainingDaysAfterMonths % 7;
    
    return {
        months: Math.max(0, months),
        weeks: Math.max(0, weeks),
        days: Math.max(0, days),
        hours: Math.max(0, totalHours % 24),
        minutes: Math.max(0, totalMinutes % 60),
        seconds: Math.max(0, totalSeconds % 60)
    };
}

/**
 * Aktualisiert die Anzeige einer zweistelligen Zahl (VEREINFACHT)
 * @param {string} prefix - Präfix für die Element-IDs
 * @param {number} value - Anzuzeigender Wert
 */
function updateDigitDisplay(prefix, value) {
    const tens = Math.floor(value / 10);
    const ones = value % 10;
    
    const tensElement = document.getElementById(`${prefix}-tens`);
    const onesElement = document.getElementById(`${prefix}-ones`);
    
    if (tensElement && onesElement) {
        // Direkte Textinhalt-Aktualisierung (einfacher)
        tensElement.textContent = tens;
        onesElement.textContent = ones;
        
        // Füge digit-content Wrapper hinzu falls nicht vorhanden
        if (!tensElement.querySelector('.digit-content')) {
            tensElement.innerHTML = `<span class="digit-content">${tens}</span>`;
        } else {
            tensElement.querySelector('.digit-content').textContent = tens;
        }
        
        if (!onesElement.querySelector('.digit-content')) {
            onesElement.innerHTML = `<span class="digit-content">${ones}</span>`;
        } else {
            onesElement.querySelector('.digit-content').textContent = ones;
        }
    } else {
        console.warn(`⚠️ Elemente für ${prefix} nicht gefunden`);
    }
}

/**
 * Aktualisiert einen Countdown-Timer mit synchroner Zeit
 * @param {string} timerPrefix - Präfix für die Timer-IDs
 * @param {Date} targetDate - Zieldatum des Timers
 * @param {Date} currentTime - Aktuelle Zeit (für Synchronisation)
 */
function updateCountdownTimerSync(timerPrefix, targetDate, currentTime) {
    const timeDiff = calculateTimeDifference(targetDate, currentTime);
    
    updateDigitDisplay(`${timerPrefix}-months`, timeDiff.months);
    updateDigitDisplay(`${timerPrefix}-weeks`, timeDiff.weeks);
    updateDigitDisplay(`${timerPrefix}-days`, timeDiff.days);
    updateDigitDisplay(`${timerPrefix}-hours`, timeDiff.hours);
    updateDigitDisplay(`${timerPrefix}-minutes`, timeDiff.minutes);
    updateDigitDisplay(`${timerPrefix}-seconds`, timeDiff.seconds);
}

/**
 * Aktualisiert den Uptime-Counter
 * @param {Object} elapsedTime - Verstrichene Zeit-Objekt
 */
function updateUptimeDisplay(elapsedTime) {
    updateDigitDisplay('uptime-months', elapsedTime.months);
    updateDigitDisplay('uptime-weeks', elapsedTime.weeks);
    updateDigitDisplay('uptime-days', elapsedTime.days);
    updateDigitDisplay('uptime-hours', elapsedTime.hours);
    updateDigitDisplay('uptime-minutes', elapsedTime.minutes);
    updateDigitDisplay('uptime-seconds', elapsedTime.seconds);
}

/**
 * Aktualisiert alle Timer synchron
 */
function updateAllTimers() {
    if (!UPTIME_START) {
        console.warn('⚠️ UPTIME_START nicht initialisiert');
        return;
    }
    
    // Eine einzige currentTime für alle Timer (perfekte Synchronisation)
    const currentTime = new Date();
    
    // Countdown-Timer mit synchroner Zeit aktualisieren
    updateCountdownTimerSync('timer1', TARGET_DATES.timer1, currentTime);
    updateCountdownTimerSync('timer2', TARGET_DATES.timer2, currentTime);
    updateCountdownTimerSync('timer3', TARGET_DATES.timer3, currentTime);
    updateCountdownTimerSync('timer4', TARGET_DATES.timer4, currentTime);
    
    // Uptime-Counter aktualisieren
    const elapsedTime = calculateElapsedTime(UPTIME_START, currentTime);
    updateUptimeDisplay(elapsedTime);
    
    // Zustand speichern für Persistierung (weniger häufig)
    if (Math.floor(currentTime.getTime() / 1000) % 10 === 0) {
        saveTimerState();
    }
}

/**
 * Timer-Update mit Animation (wird alle Sekunde aufgerufen)
 */
function updateAllTimersWithAnimation() {
    updateAllTimers();
    // console.log('🕰️ Timer aktualisiert:', new Date().toLocaleTimeString());
}

/**
 * Initialisiert die DOM-Elemente
 */
function initializeDOM() {
    console.log('🏗️ DOM wird initialisiert...');
    
    // Lade Timer-Zustand falls vorhanden
    loadTimerState();
    
    // Starte die App immer
    initializeApp();
    
    console.log('✅ DOM-Initialisierung abgeschlossen');
}

// Warte auf DOM-Ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDOM);
} else {
    initializeDOM();
}

// Debug-Funktionen für die Browser-Konsole
window.timerDebug = {
    getState: () => ({
        appStartTime: APP_START_TIME,
        uptimeStart: UPTIME_START,
        targetDates: TARGET_DATES,
        currentCalculations: UPTIME_START ? {
            timer1: calculateTimeDifference(TARGET_DATES.timer1),
            timer2: calculateTimeDifference(TARGET_DATES.timer2),
            timer3: calculateTimeDifference(TARGET_DATES.timer3),
            timer4: calculateTimeDifference(TARGET_DATES.timer4),
            uptime: calculateElapsedTime(UPTIME_START)
        } : 'UPTIME_START nicht initialisiert'
    }),
    resetUptime: () => {
        UPTIME_START = new Date();
        localStorage.setItem('uptimeStart', UPTIME_START.toISOString());
        saveTimerState();
        updateAllTimers();
        console.log('🔄 Uptime zurückgesetzt');
    },
    resetApp: () => {
        APP_START_TIME = new Date();
        UPTIME_START = new Date();
        localStorage.setItem('appStartTime', APP_START_TIME.toISOString());
        localStorage.setItem('uptimeStart', UPTIME_START.toISOString());
        saveTimerState();
        updateAllTimers();
        console.log('🔄 App komplett zurückgesetzt');
    },
    clearStorage: () => {
        localStorage.removeItem('appStartTime');
        localStorage.removeItem('uptimeStart');
        localStorage.removeItem('timerState');
        console.log('🗑️ Alle gespeicherten Timer-Daten gelöscht');
    },
    forceUpdate: () => {
        updateAllTimers();
        console.log('🔄 Timer manuell aktualisiert');
    }
};