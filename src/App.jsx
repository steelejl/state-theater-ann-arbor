import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import CartPage from './pages/CartPage';
import SeatSelectionPage from './pages/SeatSelectionPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/movie/:id/cart" element={<CartPage />} />
        <Route path="/movie/:id/seats" element={<SeatSelectionPage />} />
      </Routes>
    </BrowserRouter>
  );
}
