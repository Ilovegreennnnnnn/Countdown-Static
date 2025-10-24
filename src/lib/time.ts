export type TimeUnit =
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "weeks"
  | "years"
  | "centuries";

export type Language = "fr" | "es";

export const TIME_UNITS: TimeUnit[] = [
  "seconds",
  "minutes",
  "hours",
  "days",
  "weeks",
  "years",
  "centuries"
] as const;

export const UNIT_LABELS: Record<Language, Record<TimeUnit, string>> = {
  fr: {
    seconds: "Secondes",
    minutes: "Minutes",
    hours: "Heures",
    days: "Jours",
    weeks: "Semaines",
    years: "Années",
    centuries: "Siècles"
  },
  es: {
    seconds: "Segundos",
    minutes: "Minutos",
    hours: "Horas",
    days: "Días",
    weeks: "Semanas",
    years: "Años",
    centuries: "Siglos"
  }
};

const MILLIS = {
  second: 1_000,
  minute: 60_000,
  hour: 3_600_000,
  day: 86_400_000,
  week: 604_800_000,
  year: 365.2425 * 86_400_000,
  century: 100 * 365.2425 * 86_400_000
} as const;

export interface TimeParts {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  years: number;
  centuries: number;
}

/**
 * Returns the positive time difference (now - reference).
 */
export const diffFromNow = (reference: Date): number => {
  const now = Date.now();
  return Math.max(0, now - reference.getTime());
};

export const splitTimeParts = (diffMs: number): TimeParts => ({
  seconds: diffMs / MILLIS.second,
  minutes: diffMs / MILLIS.minute,
  hours: diffMs / MILLIS.hour,
  days: diffMs / MILLIS.day,
  weeks: diffMs / MILLIS.week,
  years: diffMs / MILLIS.year,
  centuries: diffMs / MILLIS.century
});

export interface FormatNumberOptions {
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  locale?: string;
}

export const formatNumber = (
  value: number,
  { maximumFractionDigits = 2, minimumFractionDigits, locale = "fr-FR" }: FormatNumberOptions = {}
): string => {
  const resolvedMinimum =
    minimumFractionDigits !== undefined
      ? minimumFractionDigits
      : value < 10
      ? Math.min(2, maximumFractionDigits)
      : 0;

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits,
    minimumFractionDigits: resolvedMinimum
  }).format(value);
};
