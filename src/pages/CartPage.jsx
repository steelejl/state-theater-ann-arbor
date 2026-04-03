import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { fetchMovieDetails, getCertification, IMAGE_BASE } from '../api/tmdb';

const imgCalendar = "/assets/calendar.png";

const SHOWTIMES = ['7:00pm', '8:00pm', '9:00pm'];

export default function CartPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState('7:00pm');

  useEffect(() => {
    fetchMovieDetails(id)
      .then(setMovie)
      .catch(console.error);
  }, [id]);

  return (
    <div className="bg-[#1d1818] flex flex-col items-center min-h-screen font-['IBM_Plex_Sans',sans-serif]">
      <div className="w-full max-w-[1440px]">
        <NavBar />

        <main style={{ padding: '20px 50px 60px' }}>
          {/* Add to Cart header + movie summary */}
          <div className="flex flex-col gap-6" style={{ marginBottom: '50px' }}>
            <h1 className="text-[#e6e4e4] font-extrabold text-3xl tracking-wide">Add to Cart</h1>

            {movie && (
              <div className="border border-[#003f41] rounded flex items-center gap-3" style={{ height: '120px', width: 'fit-content', minWidth: '340px', paddingTop: '15px', paddingBottom: '15px', paddingLeft: '10px', paddingRight: '10px' }}>
                {/* Poster thumbnail */}
                <div className="shrink-0 rounded overflow-hidden" style={{ height: '100%', aspectRatio: '2/3' }}>
                  {movie.poster_path && (
                    <img
                      src={IMAGE_BASE + movie.poster_path}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Movie info */}
                <div className="flex flex-col gap-2 px-5" style={{ width: '295px' }}>
                  <p className="text-[#e6e4e4] font-extrabold text-lg leading-tight">{movie.title}</p>
                  <div className="flex items-center gap-3 text-[#e6e4e4] text-sm">
                    <span>{getCertification(movie)}</span>
                    <span>|</span>
                    <span>{movie.runtime ? `${Math.floor(movie.runtime / 60)}hr ${movie.runtime % 60}min` : ''}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src={imgCalendar} alt="" className="w-4 h-4" />
                    <span className="text-[#e6e4e4] text-sm">Mar 10</span>
                    <span
                      style={{ paddingLeft: '10px', paddingRight: '10px', paddingTop: '4px', paddingBottom: '4px' }}
                      className="border border-[#f3f2f2] text-[#f3f2f2] rounded text-sm font-bold"
                    >
                      {selectedTime}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Member sign-in form */}
          <div className="bg-[#f3f2f2] border border-[#b9b3b2] rounded-lg w-full" style={{ padding: '48px' }}>
            <p style={{ marginBottom: '48px' }} className="text-[#393333] font-extrabold text-2xl tracking-wide">Are you a member?</p>

            <div className="flex flex-col gap-6">
              {/* Name */}
              <div className="flex flex-col gap-4">
                <label className="text-[#393333] text-lg">Name</label>
                <input
                  type="text"
                  className="w-full border border-[#b9b3b2] rounded bg-white text-[#393333]"
                  style={{ height: '46px', padding: '0 16px' }}
                />
              </div>

              {/* Email + Phone */}
              <div className="flex gap-4">
                <div className="flex flex-col gap-4 flex-1">
                  <label className="text-[#393333] text-lg">Email Address</label>
                  <input
                    type="email"
                    className="w-full border border-[#b9b3b2] rounded bg-white text-[#393333]"
                    style={{ height: '46px', padding: '0 16px' }}
                  />
                </div>
                <div className="flex flex-col gap-4 flex-1">
                  <label className="text-[#393333] text-lg">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="123"
                    className="w-full border border-[#b9b3b2] rounded bg-white text-[#8b7f7f]"
                    style={{ height: '46px', padding: '0 16px' }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-8 justify-end">
                <button
                  onClick={() => navigate(`/movie/${id}/seats`)}
                  style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '8px', paddingBottom: '8px' }}
                  className="bg-[#ffd03d] text-[#030f10] font-bold text-lg rounded-lg hover:bg-[#e6bb35] transition-colors"
                >
                  Sign-In
                </button>
                <span className="text-[#393333] text-lg">or</span>
                <button
                  onClick={() => navigate(`/movie/${id}/seats`)}
                  style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '8px', paddingBottom: '8px' }}
                  className="bg-[#e6e4e4] border border-[#b9b3b2] text-[#8b7f7f] font-bold text-lg rounded-lg hover:bg-[#d4d2d2] transition-colors"
                >
                  Continue as Guest
                </button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
