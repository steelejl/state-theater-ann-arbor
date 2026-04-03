import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { fetchMovieDetails, getCertification, IMAGE_BASE } from '../api/tmdb';

const imgCalendar = "/assets/calendar.png";
const imgMinus = "/assets/minus.png";
const imgPlus = "/assets/plus.png";
const imgRotateCcw = "/assets/rotate-ccw.png";
const imgX = "/assets/x.png";
const imgAccessibility = "/assets/accessibility.png";

// A = Available, U = Unavailable, AC = Accessible
const SEAT_LAYOUT = [
  { row: 'A', left: ['A','A','A','A','U','U'], right: ['A','A','A','A','A','A'] },
  { row: 'B', left: ['A','A','U','A','A','A'], right: ['A','A','A','A','A','A'] },
  { row: 'C', left: ['A','A','A','A','A','A'], right: ['A','U','A','A','A','A'] },
  { row: 'D', left: ['U','A','A','A','A','A'], right: ['A','A','A','A','A','A'] },
  { row: 'E', left: ['U','A','A','A','A','A'], right: ['A','A','A','A','U','AC'] },
  { row: 'F', left: ['AC','A','A','A','A','A'], right: ['A','A','A','A','A','U'] },
];

const TICKET_TYPES = [
  { id: 'adults', label: 'Adults', price: 11.75 },
  { id: 'student', label: 'Student (w/Valid ID)', price: 9.75 },
  { id: 'senior', label: 'Senior (65 +)', price: 9.75 },
  { id: 'veterans', label: 'Veterans/Active Duty', price: 9.75 },
  { id: 'children', label: 'Children (under 12)', price: 9.75 },
];

function SeatCell({ type, seatNum, seatId, selected, onToggle }) {
  if (type === 'U') {
    return (
      <div
        className="bg-[#2a2424] border-2 border-[#3a3434] rounded-lg flex items-center justify-center"
        style={{ width: '32px', height: '32px' }}
      >
        <img src={imgX} alt="Unavailable" style={{ width: '16px', height: '16px' }} />
      </div>
    );
  }

  return (
    <button
      onClick={() => onToggle(seatId)}
      className={`border-2 rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${
        selected
          ? 'bg-[#ffd03d] border-[#ffd968] text-[#1d1818]'
          : 'bg-[#1d1818] border-[#d0cece] text-[#e6e4e4] hover:bg-[#2a2424]'
      }`}
      style={{ width: '32px', height: '32px' }}
    >
      {type === 'AC' ? (
        <img src={imgAccessibility} alt="Accessible" style={{ width: '16px', height: '16px' }} />
      ) : seatNum}
    </button>
  );
}

export default function SeatSelectionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [quantities, setQuantities] = useState(
    Object.fromEntries(TICKET_TYPES.map(t => [t.id, 0]))
  );

  useEffect(() => {
    fetchMovieDetails(id).then(setMovie).catch(console.error);
  }, [id]);

  function toggleSeat(seatId) {
    setSelectedSeats(prev => {
      const next = new Set(prev);
      if (next.has(seatId)) next.delete(seatId);
      else next.add(seatId);
      return next;
    });
  }

  function changeQty(typeId, delta) {
    setQuantities(prev => ({
      ...prev,
      [typeId]: Math.max(0, prev[typeId] + delta),
    }));
  }

  return (
    <div className="bg-[#1d1818] flex flex-col items-center min-h-screen font-['IBM_Plex_Sans',sans-serif]">
      <div className="w-full max-w-[1440px]">
        <NavBar />

        <main style={{ padding: '20px 50px 60px' }}>
          {/* Cart header + movie summary */}
          <div className="flex flex-col gap-4" style={{ marginBottom: '32px' }}>
            <h1 className="text-[#e6e4e4] font-extrabold text-3xl tracking-wide">Cart</h1>

            {movie && (
              <div className="border border-[#003f41] rounded flex items-center gap-3" style={{ height: '120px', width: 'fit-content', minWidth: '340px', paddingTop: '15px', paddingBottom: '15px', paddingLeft: '10px', paddingRight: '10px' }}>
                <div className="shrink-0 rounded overflow-hidden" style={{ height: '100%', aspectRatio: '2/3' }}>
                  {movie.poster_path && (
                    <img
                      src={IMAGE_BASE + movie.poster_path}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
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
                      7:00pm
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Seat selection */}
          <div className="flex flex-col gap-2" style={{ marginBottom: '32px' }}>
            <h2 className="text-[#e6e4e4] font-extrabold text-2xl">Select Your Seats</h2>
            <p className="text-[#e6e4e4] text-base">Select your seat(s) below.</p>

            <div className="border-2 border-[#d0cece] rounded-2xl overflow-hidden" style={{ marginTop: '8px' }}>
              {/* Zoom controls */}
              <div
                className="border-b-2 border-[#d0cece] flex items-center justify-end"
                style={{ padding: '16px', height: '74px' }}
              >
                <div className="flex items-center gap-2">
                  <button
                    className="bg-[#1d1818] border-2 border-[#d0cece] rounded-xl flex items-center justify-center hover:bg-[#2a2424] transition-colors"
                    style={{ width: '40px', height: '40px' }}
                  >
                    <img src={imgMinus} alt="Zoom out" style={{ width: '20px', height: '20px' }} />
                  </button>
                  <button
                    className="bg-[#1d1818] border-2 border-[#d0cece] rounded-xl flex items-center justify-center gap-2 hover:bg-[#2a2424] transition-colors"
                    style={{ height: '40px', paddingLeft: '12px', paddingRight: '12px' }}
                  >
                    <img src={imgRotateCcw} alt="" style={{ width: '16px', height: '16px' }} />
                    <span className="text-[#e6e4e4] text-sm">Reset</span>
                  </button>
                  <button
                    className="bg-[#1d1818] border-2 border-[#d0cece] rounded-xl flex items-center justify-center hover:bg-[#2a2424] transition-colors"
                    style={{ width: '40px', height: '40px' }}
                  >
                    <img src={imgPlus} alt="Zoom in" style={{ width: '20px', height: '20px' }} />
                  </button>
                </div>
              </div>

              {/* Seat grid */}
              <div style={{ padding: '24px 24px 0' }}>
                {/* Screen */}
                <div className="flex flex-col items-center" style={{ marginBottom: '48px' }}>
                  <div
                    className="w-full rounded-full"
                    style={{ height: '8px', background: 'linear-gradient(to right, transparent, #d0cece, transparent)' }}
                  />
                  <p className="text-[#d0cece] text-sm tracking-widest" style={{ marginTop: '4px' }}>SCREEN</p>
                </div>

                {/* Rows */}
                <div className="flex flex-col items-center gap-4">
                  {SEAT_LAYOUT.map(({ row, left, right }) => (
                    <div key={row} className="flex items-center gap-4">
                      <span className="text-[#e6e4e4] text-lg" style={{ width: '24px', textAlign: 'center' }}>{row}</span>
                      <div className="flex gap-2">
                        {left.map((type, i) => (
                          <SeatCell
                            key={i}
                            type={type}
                            seatNum={i + 1}
                            seatId={`${row}-${i + 1}`}
                            selected={selectedSeats.has(`${row}-${i + 1}`)}
                            onToggle={toggleSeat}
                          />
                        ))}
                      </div>
                      <div style={{ width: '32px' }} />
                      <div className="flex gap-2">
                        {right.map((type, i) => (
                          <SeatCell
                            key={i}
                            type={type}
                            seatNum={i + 7}
                            seatId={`${row}-${i + 7}`}
                            selected={selectedSeats.has(`${row}-${i + 7}`)}
                            onToggle={toggleSeat}
                          />
                        ))}
                      </div>
                      <span className="text-[#e6e4e4] text-lg" style={{ width: '24px', textAlign: 'center' }}>{row}</span>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div
                  className="border-t-2 border-[#d0cece] flex flex-wrap gap-6 justify-center"
                  style={{ marginTop: '24px', paddingTop: '24px', paddingBottom: '24px' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-[#1d1818] border-2 border-[#d0cece] rounded-lg" style={{ width: '24px', height: '24px' }} />
                    <span className="text-[#e6e4e4] text-sm">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-[#ffd03d] border-2 border-[#ffd968] rounded-lg" style={{ width: '24px', height: '24px' }} />
                    <span className="text-[#e6e4e4] text-sm">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="bg-[#2a2424] border-2 border-[#3a3434] rounded-lg flex items-center justify-center"
                      style={{ width: '24px', height: '24px' }}
                    >
                      <img src={imgX} alt="" style={{ width: '12px', height: '12px' }} />
                    </div>
                    <span className="text-[#e6e4e4] text-sm">Unavailable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="bg-[#1d1818] border-2 border-[#d0cece] rounded-lg flex items-center justify-center"
                      style={{ width: '24px', height: '24px' }}
                    >
                      <img src={imgAccessibility} alt="" style={{ width: '16px', height: '16px' }} />
                    </div>
                    <span className="text-[#e6e4e4] text-sm">Accessible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket quantity */}
          <div
            className="bg-[#f3f2f2] border border-[#b9b3b2] rounded-lg w-full"
            style={{ padding: '32px', marginBottom: '32px' }}
          >
            <p className="text-[#393333] font-extrabold text-2xl" style={{ marginBottom: '24px' }}>
              Select Ticket Quantity
            </p>
            <div className="flex flex-col divide-y divide-[#b9b3b2]">
              {TICKET_TYPES.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between"
                  style={{ paddingTop: '20px', paddingBottom: '20px' }}
                >
                  <span className="text-[#393333] font-bold text-lg">{ticket.label}</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => changeQty(ticket.id, -1)}
                      className="text-[#393333] font-bold text-xl hover:opacity-60 transition-opacity"
                    >
                      −
                    </button>
                    <span
                      className="text-[#393333] font-bold text-lg"
                      style={{ width: '24px', textAlign: 'center' }}
                    >
                      {quantities[ticket.id]}
                    </span>
                    <button
                      onClick={() => changeQty(ticket.id, 1)}
                      className="text-[#393333] font-bold text-xl hover:opacity-60 transition-opacity"
                    >
                      +
                    </button>
                    <span
                      className="text-[#393333] text-lg"
                      style={{ width: '60px', textAlign: 'right' }}
                    >
                      ${ticket.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 bg-[#1d1818] border border-[#d0cece] text-[#e6e4e4] font-bold text-xl rounded-2xl hover:bg-[#2a2424] transition-colors"
              style={{ paddingTop: '16px', paddingBottom: '16px' }}
            >
              Cancel
            </button>
            <button
              className="flex-1 bg-[#ffd03d] text-[#030f10] font-bold text-xl rounded-2xl hover:bg-[#e6bb35] transition-colors"
              style={{ paddingTop: '16px', paddingBottom: '16px' }}
            >
              Proceed to Checkout
            </button>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
