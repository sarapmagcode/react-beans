import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Header.module.css';

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

  const goToRecipeList = () => {
    navigate('/recipes');
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle} onClick={goBackHome}>
        🍬 ReactBeans
      </h1>

      <ul className={styles.topNav}>
        <li className={styles.topNavItem} onClick={goBackHome}>
          Beans
        </li>
        <li className={styles.topNavItem} onClick={goToRecipeList}>
          Recipes
        </li>
      </ul>
    </div>
  );
};

export default Header;
