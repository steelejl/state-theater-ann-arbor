import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { fetchNowPlaying, fetchUpcoming, IMAGE_BASE } from '../api/tmdb';

const imgHero = "/assets/hero.jpg";
const imgArrow = "/assets/arrow.png";

function HeroSection() {
  return (
    <div className="relative w-full h-[666px] flex items-center justify-center overflow-hidden">
      <img
        src={imgHero}
        alt="State theater concession stand"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[rgba(29,24,24,0.74)]" aria-hidden="true" />
      <div className="relative z-10 flex flex-col items-center gap-6 px-12 text-center">
        <h1 className="text-[#e6e4e4] font-extrabold text-7xl leading-tight tracking-wide">
          STATE THEATER
        </h1>
        <p className="text-[#e6e4e4] font-extrabold text-4xl tracking-wide">
          Loved by film enthusiasts since 1942
        </p>
        <button style={{ paddingLeft: '0px', paddingRight: '0px', paddingTop: '12px', paddingBottom: '12px' }} className="bg-[#ffd03d] text-[#030f10] font-bold text-4xl rounded-2xl w-[608px] hover:bg-[#e6bb35] transition-colors">
          Showtimes
        </button>
      </div>
    </div>
  );
}

function PosterCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="shrink-0 rounded-lg overflow-hidden block group"
      style={{ width: 374, height: 561 }}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </Link>
  );
}

function PosterCarousel({ title, movies }) {
  const [offset, setOffset] = useState(0);
  const cardWidth = 374;
  const gap = 32;
  const maxOffset = Math.max(0, movies.length - 4);

  return (
    <section style={{ paddingLeft: '24px', paddingRight: '12px', paddingTop: '30px' }} className="w-full bg-[#1d1818] pb-6">
      <h2 style={{ marginBottom: '24px' }} className="text-[#e6e4e4] font-extrabold text-4xl tracking-wide">{title}</h2>
      <div className="flex items-center gap-3">
        <div className="flex-1 overflow-hidden py-3">
          {movies.length === 0 ? (
            <div className="flex gap-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 rounded-lg bg-[#2a2424] animate-pulse"
                  style={{ width: cardWidth, height: 561 }}
                />
              ))}
            </div>
          ) : (
            <div
              className="flex gap-8 transition-transform duration-300"
              style={{ transform: `translateX(-${offset * (cardWidth + gap)}px)` }}
            >
              {movies.map((movie) => (
                <PosterCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => setOffset((o) => Math.min(o + 1, maxOffset))}
          disabled={offset >= maxOffset || movies.length === 0}
          className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors disabled:opacity-30"
          aria-label="Next"
        >
          <img src={imgArrow} alt="" className="w-full h-full" />
        </button>
      </div>
    </section>
  );
}

function toMovieList(results) {
  return results
    .filter((m) => m.poster_path)
    .map((m) => ({ id: m.id, title: m.title, posterUrl: IMAGE_BASE + m.poster_path }));
}

export default function HomePage() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    fetchNowPlaying().then((res) => setNowPlaying(toMovieList(res))).catch(console.error);
    fetchUpcoming().then((res) => setUpcoming(toMovieList(res))).catch(console.error);
  }, []);

  return (
    <div className="bg-[#1d1818] flex flex-col items-center min-h-screen font-['IBM_Plex_Sans',sans-serif]">
      <div className="w-full max-w-[1440px]">
        <NavBar />
        <HeroSection />
        <PosterCarousel title="Now playing" movies={nowPlaying} />
        <div style={{ height: '30px' }} />
        <PosterCarousel title="Upcoming films" movies={upcoming} />
        <div style={{ height: '30px' }} />
        <Footer />
      </div>
    </div>
  );
}
