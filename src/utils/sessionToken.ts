import { createId } from '@paralleldrive/cuid2';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'session-token';

export function getSessionToken() {
  const token = Cookies.get(COOKIE_NAME);

  if (token) {
    return token
  }

  Cookies.set(COOKIE_NAME, createId(), { expires: 365 });

  return Cookies.get(COOKIE_NAME);
}