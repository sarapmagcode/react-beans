import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [_, setSearchParams] = useSearchParams();
    const location = useLocation();

    const goBackHome = () => {
        if (location.pathname === '/') {
            setSearchParams({ page: '1' });
        } else {
            navigate('/');
        }
    };
    
    return (
        <div className="header">
            <h1 onClick={goBackHome}>🍬 ReactBeans</h1>
        </div>
    );
};

export default Header;