const TMDB_BASE = 'https://api.themoviedb.org/3';
export const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

function apiKey() {
  return import.meta.env.VITE_TMDB_API_KEY;
}

async function get(path) {
  const res = await fetch(`${TMDB_BASE}${path}&api_key=${apiKey()}&language=en-US`);
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

export async function fetchNowPlaying() {
  const data = await get('/movie/now_playing?page=1');
  return data.results;
}

export async function fetchUpcoming() {
  const data = await get('/movie/upcoming?page=1');
  return data.results;
}

export async function fetchMovieDetails(id) {
  return get(`/movie/${id}?append_to_response=release_dates`);
}

export function getCertification(movie) {
  try {
    const us = movie.release_dates?.results?.find((r) => r.iso_3166_1 === 'US');
    const cert = us?.release_dates?.find((d) => d.certification)?.certification;
    return cert || 'NR';
  } catch {
    return 'NR';
  }
}

export function formatRuntime(minutes) {
  if (!minutes) return '';
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}
