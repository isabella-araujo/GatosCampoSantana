import { regexEmail } from './regex';

export function validateEmail(email) {
  return regexEmail.test(email);
}
