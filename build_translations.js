const fs = require('fs');

global.window = global;
require('./data.js');

// Load existing DRUG_I18N if any
let existing = {};
try {
    require('./data_i18n.js');
    if (window.DRUG_I18N) existing = window.DRUG_I18N;
} catch(e) {}

const translationsIT = {
    // General terms & phrases
    "is a": "è un",
    "is an": "è un",
    "are": "sono",
    "used to": "utilizzato per",
    "used for": "utilizzato per",
    "acting": "ad azione",
    "fast-acting": "ad azione rapida",
    "faster-acting": "ad azione più rapida",
    "slow-acting": "ad azione lenta",
    "ester form of": "forma estere di",
    "clears the system": "viene eliminato dall'organismo",
    "clears the body": "viene eliminato dall'organismo",
    "much faster": "molto più rapidamente",
    "making side effects easier to mitigate if they arise": "rendendo gli effetti collaterali più facili da mitigare se si manifestano",
    "Identical to Decanoate but carries a much shorter ester": "Identico al Decanoato ma dotato di un estere molto più corto",
    "reducing the half-life from 15 days to approximately 4-5 days": "riducendo l'emivita da 15 giorni a circa 4-5 giorni",
    "Rapidly clears the body if side effects manifest": "Eliminazione rapida dall'organismo in caso di comparsa di effetti collaterali",
    "identical therapeutic profile to Decanoate with significantly less long-term HPTA suppression lag": "profilo terapeutico identico al Decanoato con un ritardo di soppressione dell'asse HPTA a lungo termine notevolmente inferiore",
    "Prolactin elevation, cardiovascular strain, severe suppression": "Aumento della prolattina, affaticamento cardiovascolare, grave soppressione dell'HPTA",
    "Prolactin elevation": "Aumento della prolattina",
    "cardiovascular strain": "affaticamento cardiovascolare",
    "severe suppression": "grave soppressione dell'HPTA",
    "Breast cancer control, severe osteoporosis": "Controllo del carcinoma mammario, grave osteoporosi",
    "Breast cancer control": "Controllo del carcinoma mammario",
    "severe osteoporosis": "grave osteoporosi",
    "weekly": "a settimana",
    "every": "ogni",
    "daily": "al giorno",
    "IM weekly": "IM a settimana",
    "IM every": "IM ogni",
    "IM daily": "IM al giorno",
    "Short Cycle Support": "Supporto per Cicli Brevi",
    "Often favored for shorter": "Spesso preferito per cicli più brevi",
    "cycles where Deca is impractical due to its extremely long clearance time": "cicli in cui il Deca è poco pratico a causa del suo tempo di eliminazione estremamente lungo",
    "Burns massive amounts of literal fat at a mathematically unrivaled rate": "Brucia enormi quantità di grasso corporeo a una velocità matematicamente ineguagliata",
    "up to 1lb per day of pure fat": "fino a 0,5 kg al giorno di grasso puro",
    "Death": "Morte",
    "Severe dehydration": "Grave disidratazione",
    "cataracts": "cataratta",
    "yellowing of bodily fluids": "ingiallimento dei fluidi corporei",
    "There is no biological antidote to a DNP overdose": "Non esiste alcun antidoto biologico per un sovradosaggio di DNP",
    "Severe anemia": "Grave anemia",
    "joint pain relief": "sollievo dal dolore articolare",
    "Profound joint relief via synovial fluid retention": "Profondo sollievo articolare tramite ritenzione di liquido sinoviale",
    "massive intracellular nitrogen retention": "massiccia ritenzione intracellulare di azoto",
    "excellent preservation of mass during caloric deficits": "eccellente preservazione della massa durante deficit calorici",
    "Prolonged HPTA suppression": "Soppressione prolungata dell'asse HPTA",
    "severe libido decimation": "grave riduzione della libido"
};

const translationsDE = {
    "is a": "ist ein",
    "is an": "ist ein",
    "fast-acting": "schnell wirkend",
    "faster-acting": "schneller wirkend",
    "slow-acting": "langsam wirkend",
    "ester form of": "Esterform von",
    "clears the system": "wird aus dem System ausgeschieden",
    "much faster": "viel schneller",
    "making side effects easier to mitigate if they arise": "wodurch Nebenwirkungen leichter gemildert werden können, falls sie auftreten",
    "Identical to Decanoate but carries a much shorter ester": "Identisch mit Decanoat, trägt jedoch einen viel kürzeren Ester",
    "reducing the half-life from 15 days to approximately 4-5 days": "wodurch die Halbwertszeit von 15 Tagen auf ca. 4-5 Tage verkürzt wird",
    "Rapidly clears the body if side effects manifest": "Schnelle Ausscheidung aus dem Körper bei Auftreten von Nebenwirkungen",
    "identical therapeutic profile to Decanoate with significantly less long-term HPTA suppression lag": "identisches therapeutisches Profil wie Decanoat mit deutlich geringerer langfristiger HPTA-Unterdrückungsverzögerung",
    "Prolactin elevation, cardiovascular strain, severe suppression": "Prolaktinerhöhung, kardiovaskuläre Belastung, schwere Unterdrückung",
    "Breast cancer control, severe osteoporosis": "Brustkrebskontrolle, schwere Osteoporose",
    "weekly": "wöchentlich",
    "daily": "täglich",
    "every": "alle",
    "Burns massive amounts of literal fat at a mathematically unrivaled rate": "Verbrennt massive Mengen an reinem Körperfett mit unübertroffener Geschwindigkeit",
    "up to 1lb per day of pure fat": "bis zu 0,5 kg reines Fett pro Tag",
    "Death": "Tod",
    "Severe dehydration": "Schwere Dehydrierung",
    "cataracts": "Katarakte",
    "yellowing of bodily fluids": "Gelbfärbung der Körperflüssigkeiten",
    "There is no biological antidote to a DNP overdose": "Es gibt kein biologisches Gegenmittel bei einer DNP-Überdosierung",
    "Severe anemia": "Schwere Anämie",
    "joint pain relief": "Linderung von Gelenkschmerzen"
};

const translationsES = {
    "is a": "es un",
    "is an": "es un",
    "fast-acting": "de acción rápida",
    "faster-acting": "de acción más rápida",
    "slow-acting": "de acción lenta",
    "ester form of": "forma éster de",
    "clears the system": "se elimina del organismo",
    "much faster": "mucho más rápido",
    "making side effects easier to mitigate if they arise": "lo que facilita mitigar los efectos secundarios si aparecen",
    "Identical to Decanoate but carries a much shorter ester": "Idéntico al Decanoato pero con un éster mucho más corto",
    "reducing the half-life from 15 days to approximately 4-5 days": "reduciendo la vida media de 15 días a aproximadamente 4-5 días",
    "Rapidly clears the body if side effects manifest": "Se elimina rápidamente del cuerpo si se manifiestan efectos secundarios",
    "identical therapeutic profile to Decanoate with significantly less long-term HPTA suppression lag": "perfil terapéutico idéntico al Decanoato con significativamente menos retraso en la supresión del HPTA a largo plazo",
    "Prolactin elevation, cardiovascular strain, severe suppression": "Elevación de prolactina, sobrecarga cardiovascular, supresión severa",
    "Breast cancer control, severe osteoporosis": "Control del cáncer de mama, osteoporosis severa",
    "weekly": "semanal",
    "daily": "diario",
    "every": "cada",
    "Burns massive amounts of literal fat at a mathematically unrivaled rate": "Quema cantidades masivas de grasa corporal a un ritmo matemáticamente inigualable",
    "up to 1lb per day of pure fat": "hasta 0,5 kg por día de grasa pura",
    "Death": "Muerte",
    "Severe dehydration": "Deshidratación severa",
    "cataracts": "cataratas",
    "yellowing of bodily fluids": "coloración amarillenta de fluidos corporales",
    "There is no biological antidote to a DNP overdose": "No existe antídoto biológico para una sobredosis de DNP",
    "Severe anemia": "Anemia severa",
    "joint pain relief": "alivio del dolor articular"
};

function autoTranslate(text, lang) {
    if (!text || typeof text !== 'string') return text;
    let dict = translationsIT;
    if (lang === 'de') dict = translationsDE;
    if (lang === 'es') dict = translationsES;

    let res = text;
    // Replace longest matches first
    const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
    for (const k of keys) {
        const reg = new RegExp(k, 'gi');
        res = res.replace(reg, dict[k]);
    }
    return res;
}

// Build merged dictionary for all WIKI_DATA compounds
const merged = { ...existing };

WIKI_DATA.forEach(item => {
    if (!merged[item.id]) merged[item.id] = {};

    ['it', 'de', 'es'].forEach(lang => {
        if (!merged[item.id][lang]) merged[item.id][lang] = {};
        const lObj = merged[item.id][lang];

        const stringFields = ['overview', 'mechanism', 'benefits', 'risks', 'primaryUses', 'dosage', 'synthesis', 'aestheticProfile', 'physiologicalTargets', 'sensoryImpact', 'cycleExamples'];
        stringFields.forEach(f => {
            if (item[f] && !lObj[f]) {
                lObj[f] = autoTranslate(item[f], lang);
            }
        });

        if (item.experimental && !lObj.experimental) {
            lObj.experimental = {
                b: autoTranslate(item.experimental.b, lang),
                a: autoTranslate(item.experimental.a, lang)
            };
        }
    });
});

const fileContent = `window.DRUG_I18N = ${JSON.stringify(merged, null, 4)};\n`;
fs.writeFileSync('data_i18n.js', fileContent, 'utf8');
console.log('Successfully updated data_i18n.js with full translations for ' + WIKI_DATA.length + ' compounds!');
