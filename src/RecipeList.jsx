import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ArrowLeftIcon, ArrowRightIcon, SearchIcon, CloseIcon } from './Icons';

const RecipeList = ({ baseUrl }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [totalPages, setTotalPages] = useState(0);
  const [recipeList, setRecipeList] = useState([]);
  const [filteredRecipeList, setFilteredRecipeList] = useState([]);
  const [isPaginatorHidden, setIsPaginatorHidden] = useState(true);
  const [isPrevHidden, setIsPrevHidden] = useState(false);
  const [isNextHidden, setIsNextHidden] = useState(false);

  const [searchTerm, setSearchTerm] = useState(() => {
    return searchParams.get('search') || '';
  });

  const [submittedSearchTerm, setSubmittedSearchTerm] = useState(() => {
    return searchParams.get('search') || '';
  });

  const [pageIndex, setPageIndex] = useState(() => {
    const page = searchParams.get('page');
    const parsedPage = page ? parseInt(page) : 1;
    return parsedPage > 0 ? parsedPage : 1;
  });

  useEffect(() => {
    const page = searchParams.get('page');
    const parsedPage = page ? parseInt(page) : 1;

    if (parsedPage < 1 || (totalPages > 0 && parsedPage > totalPages)) {
      const correctedPage = Math.min(Math.max(parsedPage, 1), totalPages || 1);
      if (parsedPage !== correctedPage) {
        setSearchParams({ page: correctedPage.toString() });
      }
    } else if (parsedPage !== pageIndex) {
      setPageIndex(parsedPage);
    }
  }, [searchParams, totalPages]);

  useEffect(() => {
    if (pageIndex < 1 || (totalPages > 0 && pageIndex > totalPages)) {
      return;
    }

    const fetchRecipeList = async () => {
      try {
        const requestUrl = submittedSearchTerm
          ? `${baseUrl}/recipes?pageIndex=1&pageSize=30`
          : `${baseUrl}/recipes?pageIndex=${pageIndex}`;

        const response = await fetch(requestUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setRecipeList(data.items);

        if (submittedSearchTerm) {
          const filtered = data.items.filter((recipe) =>
            recipe.name
              .toLowerCase()
              .includes(submittedSearchTerm.toLowerCase()),
          );

          const startIndex = (pageIndex - 1) * 10;
          const endIndex = startIndex + 10;
          setFilteredRecipeList(filtered.slice(startIndex, endIndex));

          const adjustedTotalPages = Math.max(Math.ceil(filtered.length / 10), 1);
          setTotalPages(adjustedTotalPages);
          setIsNextHidden(pageIndex === adjustedTotalPages || filtered.length === 0);
          setIsPaginatorHidden(filtered.length === 0);
        } else {
          setFilteredRecipeList(data.items);
          setTotalPages(data.totalPages);
          setIsNextHidden(pageIndex === data.totalPages);
          setIsPaginatorHidden(false);
        }

        setIsPrevHidden(pageIndex === 1);

        if (searchParams.get('page') !== pageIndex.toString()) {
          setSearchParams({
            page: pageIndex.toString(),
            ...(submittedSearchTerm && { search: submittedSearchTerm }),
          });
        }
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Fetch error', error);
      }
    };

    fetchRecipeList();
  }, [pageIndex, submittedSearchTerm]);

  useEffect(() => {
    if (searchParams.get('search') === null) {
      clearSearch();
    }
  }, [searchParams.get('search')]);

  // Paginator Actions
  const incrementPageIndex = () => {
    if (pageIndex < totalPages) {
      setPageIndex((prevPageIndex) => prevPageIndex + 1);
    }
  };

  const decrementPageIndex = () => {
    if (pageIndex > 1) {
      setPageIndex((prevPageIndex) => prevPageIndex - 1);
    }
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPageIndex(1);
    setSubmittedSearchTerm(searchTerm);
    setSearchParams({
      page: '1',
      ...(searchTerm && { search: searchTerm }),
    });
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSubmittedSearchTerm('');
    setPageIndex(1);
    setSearchParams({ page: '1' });
    setFilteredRecipeList(recipeList);
  };

  return (
    <div className="container">
      {/* Search Recipe */}
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          className="search-input"
          name="searchInput"
          type="text"
          placeholder="Search for a recipe..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {submittedSearchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="clear-search-btn"
          >
            <CloseIcon />
          </button>
        )}

        <button className="submit-search-btn" type="submit">
          <SearchIcon />
        </button>
      </form>

      {/* Display Recipe List */}
      <ul className="recipe-list">
        {filteredRecipeList.length > 0 ? (
          filteredRecipeList.map((recipe) => (
            <li
              key={recipe.recipeId}
              onClick={() => handleRecipeClick(recipe.recipeId)}
              className="recipe-item"
            >
              <img src={recipe.imageUrl} alt={`${recipe.name} image`} />
              <p>{recipe.name}</p>
            </li>
          ))
        ) : submittedSearchTerm ? (
          <p>No recipe found matching "{submittedSearchTerm}"</p>
        ) : (
          Array.from({ length: 10 }).map((_, index) => (
            <li key={index} className="recipe-item loading">
              <div className="loading-image"></div>
              <div className="loading-text"></div>
            </li>
          ))
        )}
      </ul>

      {/* Paginator */}
      {!isPaginatorHidden && (
        <div className="paginator-actions">
          {!isPrevHidden && (
            <button onClick={decrementPageIndex} className="prev-btn">
              <ArrowLeftIcon /> Prev
            </button>
          )}
          <p>
            {pageIndex} of {totalPages}
          </p>
          {!isNextHidden && (
            <button onClick={incrementPageIndex} className="next-btn">
              Next <ArrowRightIcon />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

RecipeList.propTypes = {
  baseUrl: PropTypes.string
};

export default RecipeList;
