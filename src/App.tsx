import { useState } from "react";
import { Counter } from "./components/Counter";
import { TIME_UNITS, UNIT_LABELS, TimeUnit, Language } from "./lib/time";

const REFERENCE_DATE = new Date("2024-10-10T14:00:00");

const HERO_TITLE: Record<Language, string> = {
  fr: "Temps avec toi...",
  es: "Tiempo contigo..."
};

const LOCALE_BY_LANGUAGE: Record<Language, string> = {
  fr: "fr-FR",
  es: "es-ES"
};

function App() {
  const [activeUnitIndex, setActiveUnitIndex] = useState(0);
  const [language, setLanguage] = useState<Language>("es");
  const activeUnit: TimeUnit = TIME_UNITS[activeUnitIndex];
  const locale = LOCALE_BY_LANGUAGE[language];
  const labels = UNIT_LABELS[language];

  const cycleUnit = () => {
    setActiveUnitIndex((index) => (index + 1) % TIME_UNITS.length);
  };

  return (
    <main className="app">
      <section className="hero">
        <h1 className="hero__title">{HERO_TITLE[language]}</h1>
      </section>

      <div className="controls">
        <button
          type="button"
          className="unit-switch"
          onClick={cycleUnit}
          aria-label={
            language === "fr"
              ? "Changer l'unité affichée"
              : "Cambiar la unidad mostrada"
          }
        >
          {labels[activeUnit]}
        </button>
      </div>

      <Counter
        referenceDate={REFERENCE_DATE}
        activeUnit={activeUnit}
        language={language}
        locale={locale}
      />

      <div
        className="language-switch"
        role="group"
        aria-label={language === "fr" ? "Choisir la langue" : "Cambiar el idioma"}
      >
        <button
          type="button"
          className="language-switch__btn"
          onClick={() => setLanguage("fr")}
          aria-pressed={language === "fr"}
          aria-label="Passer en français"
        >
          🇫🇷
        </button>
        <button
          type="button"
          className="language-switch__btn"
          onClick={() => setLanguage("es")}
          aria-pressed={language === "es"}
          aria-label="Cambiar a español"
        >
          🇲🇽
        </button>
      </div>
    </main>
  );
}

export default App;
