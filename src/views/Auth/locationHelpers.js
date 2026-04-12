/**
 * Thin helpers around country-state-city so Register stays readable.
 * Data comes from the library (ISO codes internally; we store display names in form state).
 * - Sumit Sahu
 */
import { Country, State, City } from 'country-state-city';

export function getCountryOptions() {
  return Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
  }));
}

export function getIsoCodeForCountryName(name) {
  if (!name) return null;
  const c = Country.getAllCountries().find(
    (x) => x.name.toLowerCase() === name.trim().toLowerCase()
  );
  return c?.isoCode ?? null;
}

export function getStateOptions(countryIsoCode) {
  if (!countryIsoCode) return [];
  return State.getStatesOfCountry(countryIsoCode).map((s) => ({
    value: s.isoCode,
    label: s.name,
  }));
}

export function getIsoCodeForStateName(countryIsoCode, stateName) {
  if (!countryIsoCode || !stateName) return null;
  const s = State.getStatesOfCountry(countryIsoCode).find(
    (x) => x.name.toLowerCase() === stateName.trim().toLowerCase()
  );
  return s?.isoCode ?? null;
}

export function getCityOptions(countryIsoCode, stateIsoCode) {
  if (!countryIsoCode || !stateIsoCode) return [];
  return City.getCitiesOfState(countryIsoCode, stateIsoCode).map((c) => ({
    value: c.name,
    label: c.name,
  }));
}
