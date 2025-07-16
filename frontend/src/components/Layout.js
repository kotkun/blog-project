import { Link } from 'react-router-dom';

export default function Layout({ children }) {
    return (
        <div className="layout">
            <header>
                <Link to="/">Мой блог</Link>
            </header>
            <main>{children}</main>
            <footer>© 2024</footer>
        </div>
    );
}