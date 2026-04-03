import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { fetchMovieDetails, getCertification, formatRuntime, IMAGE_BASE } from '../api/tmdb';

const imgClock = "/assets/clock.png";

const SHOWTIMES = ['7:00pm', '8:00pm', '9:00pm'];
const TABS = ['Show Times', 'Overview', 'Trailer'];

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedTime, setSelectedTime] = useState('9:00pm');

  useEffect(() => {
    setLoading(true);
    fetchMovieDetails(id)
      .then((data) => { setMovie(data); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [id]);

  return (
    <div className="bg-[#1d1818] flex flex-col items-center min-h-screen font-['IBM_Plex_Sans',sans-serif]">
      <div className="w-full max-w-[1440px]">
        <NavBar />

        <main style={{ paddingBottom: '60px' }} className="px-12 pt-10 flex justify-center">
          {loading && (
            <div className="flex gap-8 w-full max-w-[1200px]">
              <div className="shrink-0 w-[454px] h-[636px] rounded-xl bg-[#2a2424] animate-pulse" />
              <div className="flex-1 flex flex-col gap-6 pt-4">
                <div className="h-10 bg-[#2a2424] animate-pulse rounded w-3/4" />
                <div className="h-5 bg-[#2a2424] animate-pulse rounded w-1/4" />
                <div className="h-32 bg-[#2a2424] animate-pulse rounded" />
              </div>
            </div>
          )}

          {!loading && !movie && (
            <div className="text-[#f3f2f2] text-2xl py-20">
              Movie not found.{' '}
              <Link to="/" className="text-[#ffd03d] underline">Go home</Link>
            </div>
          )}

          {!loading && movie && (
            <div className="flex gap-8 w-full max-w-[1200px]">
              {/* Poster */}
              <div style={{ width: '280px' }} className="shrink-0 rounded-2xl overflow-hidden self-stretch">
                {movie.poster_path ? (
                  <img
                    src={IMAGE_BASE + movie.poster_path}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#2a2424] flex items-center justify-center text-[#f3f2f2]">
                    No poster
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col gap-8 py-5">
                {/* Top section */}
                <div className="flex flex-col gap-7">
                  {/* Title row + tabs */}
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-4 flex-1">
                      {/* Title */}
                      <h1 className="text-[#e6e4e4] font-extrabold text-3xl leading-tight">
                        {movie.title}
                      </h1>
                      {/* Rating + runtime */}
                      <div className="flex items-center gap-2 text-[#f3f2f2] text-base">
                        <span>{getCertification(movie)}</span>
                        <img src={imgClock} alt="" className="w-4 h-4" />
                        <span>{formatRuntime(movie.runtime)}</span>
                      </div>
                    </div>
                    {/* Tabs */}
                    <div className="flex items-center gap-5 pt-2 pl-3 text-[#d0cece] text-base">
                      {TABS.map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`transition-colors hover:text-[#e6e4e4] ${
                            activeTab === tab ? 'font-bold text-[#e6e4e4]' : ''
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Overview */}
                  {activeTab === 'Overview' && (
                    <div className="flex flex-col gap-4">
                      <h2 className="text-[#e6e4e4] font-extrabold text-xl tracking-wide">
                        Overview
                      </h2>
                      <p className="text-[#d0cece] text-base leading-relaxed">
                        {movie.overview || 'No overview available.'}
                      </p>
                    </div>
                  )}

                  {activeTab === 'Show Times' && (
                    <div className="flex flex-col gap-4">
                      <h2 className="text-[#e6e4e4] font-extrabold text-xl tracking-wide">
                        Show Times
                      </h2>
                      <p className="text-[#d0cece] text-base">
                        Select a showtime below to purchase tickets.
                      </p>
                    </div>
                  )}

                  {activeTab === 'Trailer' && (
                    <div className="flex flex-col gap-4">
                      <h2 className="text-[#e6e4e4] font-extrabold text-xl tracking-wide">
                        Trailer
                      </h2>
                      <p className="text-[#d0cece] text-base">
                        Trailer coming soon.
                      </p>
                    </div>
                  )}
                </div>

                {/* CTA section */}
                <div className="flex flex-col gap-9">
                  {/* Showtime badges */}
                  <div className="flex flex-wrap gap-3 items-center">
                    {SHOWTIMES.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          style={{ paddingTop: '8px', paddingBottom: '8px', paddingLeft: '12px', paddingRight: '12px' }}
                          className={`rounded text-2xl font-bold text-center transition-colors ${
                            isSelected
                              ? 'bg-[#daf6f8] text-[#1d1818]'
                              : 'border border-[#f3f2f2] text-[#f3f2f2] hover:bg-white/10'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>

                  {/* Buy Tickets */}
                  <button onClick={() => navigate(`/movie/${id}/cart`)} style={{ paddingTop: '12px', paddingBottom: '12px', paddingLeft: '36px', paddingRight: '36px' }} className="w-full bg-[#ffd03d] text-[#030f10] font-bold text-2xl rounded-2xl hover:bg-[#e6bb35] transition-colors">
                    Buy Tickets
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
