// const { browser } ('$app/environment');
import { browser } from '$app/environment';

function browserGet (key) {
  if (browser) {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  }
  return null;
}

export function browserSet (key, value) {
  if (browser) {
    localStorage.setItem(key, value);
    console.log('🚀 ~ file: req_utils.js:18 ~ browserSet ~ localStorage:', localStorage);
  }
}

export async function post (fetch, url, body) {
  let customError = false;
  try {
    const headers = {};
    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json',
      body = JSON.stringify(body);
    }
    const token = browserGet('jwt');
    if (token) {
      headers.Authorization = 'Bearer ' + token;
    }
    const res = await fetch(url, {
      method: 'POST',
      body,
      headers
    });
    if (!res.ok) {
      try {
        const data = await res.json();
        const error = data.message[0].messages[0];
        customError = true;
        throw { id: error.id, message: error.message };
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    try {
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
      throw { id: '', message: 'Something went wrong' };
    }
  } catch (err) {
    console.log(err);
    throw customError ? err : { id: '', message: 'Something went wrong' };
  }
}
