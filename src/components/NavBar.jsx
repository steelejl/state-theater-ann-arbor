import { Link } from 'react-router-dom';

const imgWithHeadline = "/assets/logo.png";
const imgSearchIcon = "/assets/search.png";

function Logo() {
  return (
    <Link to="/">
      <img
        src={imgWithHeadline}
        alt="State Theatre Ann Arbor"
        style={{ height: '148px', width: 'auto' }} className="object-contain"
      />
    </Link>
  );
}

export default function NavBar() {
  return (
    <nav className="w-full bg-[#1d1818] flex items-center justify-between px-12" style={{ height: '148px' }}>
      <div className="flex items-center gap-20">
        <Logo />
        <div className="flex items-center gap-8 text-[#e6e4e4] font-extrabold text-xl tracking-wide whitespace-nowrap">
          <Link to="/" className="hover:text-[#ffd03d] transition-colors">Home</Link>
          <Link to="/" className="hover:text-[#ffd03d] transition-colors">Now playing</Link>
          <a href="#" className="hover:text-[#ffd03d] transition-colors">About</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button style={{ paddingLeft: '36px', paddingRight: '36px', paddingTop: '12px', paddingBottom: '12px' }} className="border-[3px] border-[#ffd968] text-[#ffd968] font-bold text-lg rounded-lg hover:bg-[#ffd968] hover:text-[#1d1818] transition-colors whitespace-nowrap">
          Log In
        </button>
        <button style={{ paddingLeft: '36px', paddingRight: '36px', paddingTop: '12px', paddingBottom: '12px' }} className="bg-[#ffd03d] text-[#030f10] font-bold text-lg rounded-2xl hover:bg-[#e6bb35] transition-colors whitespace-nowrap">
          Showtimes
        </button>
        <button style={{ padding: '8px' }} className="hover:opacity-70 transition-opacity">
          <img src={imgSearchIcon} alt="Search" style={{ width: '24px', height: '24px' }} />
        </button>
      </div>
    </nav>
  );
}
