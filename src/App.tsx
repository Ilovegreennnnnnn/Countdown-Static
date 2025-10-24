import { useState } from "react";
import { Counter } from "./components/Counter";
import { TIME_UNITS, UNIT_LABELS, TimeUnit } from "./lib/time";

const REFERENCE_DATE = new Date("2024-10-10T14:00:00");

const formatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "full",
  timeStyle: "short"
});

function App() {
  const [activeUnitIndex, setActiveUnitIndex] = useState(0);
  const activeUnit: TimeUnit = TIME_UNITS[activeUnitIndex];

  const cycleUnit = () => {
    setActiveUnitIndex((index) => (index + 1) % TIME_UNITS.length);
  };

  return (
    <main className="app">
      <section className="hero">
        <h1 className="hero__title">Tiempo contigo...</h1>
      </section>

      <div className="controls">
        <button
          type="button"
          className="unit-switch"
          onClick={cycleUnit}
          aria-label="Changer l'unité affichée"
        >
          <span className="unit-switch__label">Unité affichée</span>
          <span className="unit-switch__value">{UNIT_LABELS[activeUnit]}</span>
        </button>
      </div>

      <Counter referenceDate={REFERENCE_DATE} activeUnit={activeUnit} />

      <footer className="footer">
        <p>
          Hébergé statiquement sur Vercel – aucun serveur n&apos;est nécessaire pour ce
          décompte.
        </p>
      </footer>
    </main>
  );
}

export default App;
