const story = (path: string) => `https://node-hnapi.herokuapp.com/${path}`;
const user = (path: string) =>
  `https://hacker-news.firebaseio.com/v0/${path}.json`;

const cache = new Map();

export default function fetchAPI(path: string) {
  const url = path.startsWith("user") ? user(path) : story(path);
  const headers = { "User-Agent": "chrome" };

  const cached = cache.get(url);
  if (cached) {
    return cached;
  }

  const promise = fetch(url, { headers }).then((r) => r.json());
  cache.set(url, promise);

  return promise;
}
