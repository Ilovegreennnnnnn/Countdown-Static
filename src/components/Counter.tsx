import { useEffect, useState } from "react";
import { diffFromNow, splitTimeParts, formatNumber, TimeUnit, TimeParts, UNIT_LABELS } from "../lib/time";

type CounterProps = {
  referenceDate: Date;
  activeUnit: TimeUnit;
};

const FRACTION_DIGITS: Record<TimeUnit, number> = {
  seconds: 0,
  minutes: 2,
  hours: 2,
  days: 2,
  weeks: 3,
  years: 4,
  centuries: 6
};

const initialState = (referenceDate: Date): TimeParts =>
  splitTimeParts(diffFromNow(referenceDate));

export const Counter = ({ referenceDate, activeUnit }: CounterProps) => {
  const [parts, setParts] = useState<TimeParts>(() => initialState(referenceDate));

  useEffect(() => {
    const update = () => setParts(splitTimeParts(diffFromNow(referenceDate)));
    update();

    const interval = window.setInterval(update, 200);
    return () => window.clearInterval(interval);
  }, [referenceDate]);

  const activeValue = parts[activeUnit];

  return (
    <section className="counter">
      <div className="counter__current" role="status" aria-live="polite">
        <span className="counter__current-value">
          {formatNumber(activeValue, FRACTION_DIGITS[activeUnit])}
        </span>
        <span className="counter__current-label">{UNIT_LABELS[activeUnit]}</span>
      </div>
    </section>
  );
};
