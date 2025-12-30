import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        <img src="/shared/logo.png" alt="Logo" />
      </Link>
    </header>
  );
}
