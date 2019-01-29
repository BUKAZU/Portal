/**
 * Booking cost calculations in JavaScript. latest update 13-07-2018
 */
/* eslint-disable */
export function none(price, quantity, totalPersons, nrOfNights) {
  return 0.0;
}

export function total(price, quantity, totalPersons, nrOfNights) {
  return price;
}

export function per_person(price, quantity, totalPersons, nrOfNights) {
  return price * totalPersons;
}

export function per_night(price, quantity, totalPersons, nrOfNights) {
  return price * nrOfNights;
}

export function per_day(price, quantity, totalPersons, nrOfNights) {
  return price * (nrOfNights + 1);
}

export function per_person_per_night(
  price,
  quantity,
  totalPersons,
  nrOfNights
) {
  return price * totalPersons * nrOfNights;
}

export function per_animal_per_night(
  price,
  quantity,
  totalPersons,
  nrOfNights
) {
  return price * quantity * nrOfNights;
}

export function per_animal_per_stay(price, quantity, totalPersons, nrOfNights) {
  return price * quantity;
}

export function per_packet(price, quantity, totalPersons, nrOfNights) {
  return price * quantity;
}

export function per_packet_per_change(
  price,
  quantity,
  totalPersons,
  nrOfNights
) {
  return price * quantity;
}

export function per_packet_per_night(
  price,
  quantity,
  totalPersons,
  nrOfNights
) {
  return price * quantity * nrOfNights;
}

export function per_m3(price, quantity, totalPersons, nrOfNights) {
  return price * quantity;
}

export function per_kWh(price, quantity, totalPersons, nrOfNights) {
  return price * quantity;
}

export function per_liter(price, quantity, totalPersons, nrOfNights) {
  return price * quantity;
}

export function per_piece_per_night(price, quantity, totalPersons, nrOfNights) {
  return price * quantity * nrOfNights;
}

export function per_piece_per_stay(price, quantity, totalPersons, nrOfNights) {
  return price * quantity;
}

export function per_stay(price, quantity, totalPersons, nrOfNights) {
  return price;
}

export function per_week(price, quantity, totalPersons, nrOfNights) {
  var weeks = Math.ceil(nrOfNights / 7);
  return price * weeks;
}
export function per_person_per_week(price, quantity, totalPersons, nrOfNights) {
  var weeks = Math.ceil(nrOfNights / 7);
  return price * totalPersons * weeks;
}
export function per_piece_per_week(price, quantity, totalPersons, nrOfNights) {
  var weeks = Math.ceil(nrOfNights / 7);
  return price * quantity * weeks;
}
/* eslint-enable */
