import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { fetchMovieDetails, getCertification, IMAGE_BASE } from '../api/tmdb';

const imgCalendar = "/assets/calendar.svg";
const imgDivider = "/assets/divider.svg";
const imgRadioSelected = "/assets/radio-selected.svg";
const imgRadioUnselected = "/assets/radio-unselected.svg";

const SHOWTIMES = ['7:00pm', '8:00pm', '9:00pm'];

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedTime] = useState('7:00pm');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [promoCode, setPromoCode] = useState('');

  const subtotal = 11.75;
  const tax = 0.71;
  const total = (subtotal + tax).toFixed(2);

  useEffect(() => {
    fetchMovieDetails(id)
      .then((data) => setMovie(data))
      .catch(console.error);
  }, [id]);

  const certification = movie ? getCertification(movie) : '';
  const posterUrl = movie && movie.poster_path ? IMAGE_BASE + movie.poster_path : null;
  const title = movie ? movie.title : '';
  const runtime = movie && movie.runtime ? `${Math.floor(movie.runtime / 60)}hr ${movie.runtime % 60}min` : '';

  return (
    <div className="bg-[#1d1818] flex flex-col min-h-screen font-['IBM_Plex_Sans',sans-serif]">
      <div className="w-full max-w-[1440px] mx-auto">
        <NavBar />
        <div className="px-12 py-8 flex flex-col gap-8">
          <h1 className="text-white font-extrabold" style={{ fontSize: '52px' }}>Order Summary</h1>
          <div className="flex gap-10 items-start">

            {/* Left column: Guest Info + Payment */}
            <div className="flex-1 flex flex-col gap-8">

              {/* Guest Information */}
              <div className="bg-[#f3f2f2] border border-[#b9b3b2] rounded-lg" style={{ padding: '30px' }}>
                <h2 className="font-extrabold text-[#393333] mb-4" style={{ fontSize: '43px' }}>Guest Information</h2>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <label className="text-[#534c4c]" style={{ fontSize: '19px' }}>Name</label>
                    <div className="bg-[#d0cece] rounded" style={{ height: '60px' }} />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 flex flex-col gap-3">
                      <label className="text-[#534c4c] whitespace-nowrap" style={{ fontSize: '19px' }}>Email Address</label>
                      <div className="bg-[#d0cece] rounded" style={{ height: '55px' }} />
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <label className="text-[#534c4c]" style={{ fontSize: '19px' }}>Phone Number</label>
                      <div className="bg-[#d0cece] rounded flex items-start" style={{ height: '55px', padding: '12px 16px' }}>
                        <span className="text-[#8b7f7f]" style={{ fontSize: '16px' }}>123</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-[#f3f2f2] border border-[#b9b3b2] rounded-lg" style={{ padding: '40px' }}>
                <div className="flex flex-col gap-2 mb-6">
                  <h2 className="font-extrabold text-[#393333]" style={{ fontSize: '43px' }}>Payment</h2>
                  <img src={imgDivider} alt="" className="w-full" />
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    <p className="font-extrabold text-[#706565]" style={{ fontSize: '30px' }}>Pay With:</p>
                    <div className="flex gap-5">
                      <button
                        onClick={() => setPaymentMethod('credit')}
                        className="flex items-center gap-2"
                      >
                        <img src={paymentMethod === 'credit' ? imgRadioSelected : imgRadioUnselected} alt="" style={{ width: '15px', height: '15px' }} />
                        <span className="text-[#1d1818]" style={{ fontSize: '25px' }}>Credit Card</span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod('debit')}
                        className="flex items-center gap-2"
                      >
                        <img src={paymentMethod === 'debit' ? imgRadioSelected : imgRadioUnselected} alt="" style={{ width: '15px', height: '15px' }} />
                        <span className="text-[#b9b3b2]" style={{ fontSize: '25px' }}>Debit Card</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                      <label className="text-[#706565]" style={{ fontSize: '19px' }}>Card Number</label>
                      <div className="border border-[#b9b3b2] rounded flex items-center" style={{ padding: '12px 16px' }}>
                        <span className="text-[#8b7f7f]" style={{ fontSize: '25px' }}>1234  5678  9101  1121</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1 flex flex-col gap-4">
                        <label className="text-[#706565] whitespace-nowrap" style={{ fontSize: '19px' }}>Expiration Date</label>
                        <div className="border border-[#b9b3b2] rounded flex items-center" style={{ padding: '12px 16px' }}>
                          <span className="text-[#8b7f7f]" style={{ fontSize: '16px' }}>MM/YY</span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-4">
                        <label className="text-[#706565]" style={{ fontSize: '19px' }}>CVV</label>
                        <div className="border border-[#b9b3b2] rounded flex items-center" style={{ padding: '12px 16px' }}>
                          <span className="text-[#8b7f7f]" style={{ fontSize: '16px' }}>123</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#8b7f7f]" style={{ fontSize: '14px' }}>
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                  </p>
                </div>
              </div>
            </div>

            {/* Right column: Order summary card */}
            <div className="bg-[#f3f2f2] border border-[#b9efef] rounded-lg flex flex-col gap-6" style={{ width: '647px', padding: '30px' }}>
              {/* Movie info */}
              <div className="flex gap-5 items-center">
                <div className="shrink-0 rounded overflow-hidden" style={{ width: '184px', height: '276px' }}>
                  {posterUrl ? (
                    <img
                      src={posterUrl}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#d0cece] animate-pulse" />
                  )}
                </div>
                <div className="flex flex-col gap-5 flex-1">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-extrabold text-[#393333]" style={{ fontSize: '36px' }}>{title}</h3>
                    <div className="flex items-center gap-2 text-[#534c4c]" style={{ fontSize: '25px' }}>
                      <span>{certification}</span>
                      <span>|</span>
                      <span>{runtime}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-4">
                      <img src={imgCalendar} alt="" style={{ width: '16px', height: '16px' }} />
                      <span className="text-[#534c4c]" style={{ fontSize: '19px' }}>Mar 10</span>
                      <span className="border border-[#1d1818] rounded text-[#1d1818] font-bold" style={{ padding: '4px 10px', fontSize: '16px' }}>{selectedTime}</span>
                    </div>
                    <p className="text-[#8b7f7f]" style={{ fontSize: '19px' }}>Seats: B7</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="bg-[#e6e4e4]" style={{ height: '2px' }} />

              {/* Promo code */}
              <div className="flex gap-4 items-end">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[#393333]" style={{ fontSize: '25px' }}>Promo/Pre-Sale Code</label>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="border border-[#d0cece] rounded-lg w-full"
                    style={{ height: '48px', padding: '0 12px' }}
                  />
                </div>
                <button className="bg-[#e6e4e4] text-[#8b7f7f] font-bold rounded-lg whitespace-nowrap" style={{ padding: '8px 24px', fontSize: '25px' }}>
                  Submit
                </button>
              </div>

              {/* Price breakdown */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between text-[#8b7f7f]" style={{ fontSize: '25px' }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#8b7f7f]" style={{ fontSize: '25px' }}>
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-extrabold text-[#1d1818]" style={{ fontSize: '30px' }}>
                  <span>1x Adult</span>
                  <span>Total  ${total}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="bg-[#e6e4e4] text-[#8b7f7f] font-bold rounded-xl"
                  style={{ padding: '10px 30px', fontSize: '30px' }}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 bg-[#ffd03d] text-[#030f10] font-bold rounded-xl hover:bg-[#e6bb35] transition-colors"
                  style={{ padding: '10px 30px', fontSize: '30px' }}
                >
                  Purchase
                </button>
              </div>
            </div>

          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
