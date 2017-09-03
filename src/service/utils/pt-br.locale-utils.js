const WEEKDAYS_LONG = ['Domingo', 'Segunda-Feira', 'Terça-Feira',
  'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];

const WEEKDAYS_SHORT = ['D', 'S', 'T',
  'Q', 'Q', 'S', 'S'];

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export function formatDay(day) {
  return day.toDateString();
}

export function formatMonthTitle(d) {
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatWeekdayShort(i) {
  return WEEKDAYS_SHORT[i];
}

export function formatWeekdayLong(i) {
  return WEEKDAYS_LONG[i];
}

export function getFirstDayOfWeek() {
  return 0;
}

export function getMonths() {
  return MONTHS;
}

export default {
  formatDay,
  formatMonthTitle,
  formatWeekdayShort,
  formatWeekdayLong,
  getFirstDayOfWeek,
  getMonths,
};