import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    SearchIcon,
    CloseIcon
} from './Icons';

const JellyBeanList = ({ baseUrl }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [totalPages, setTotalPages] = useState(0);
    const [beans, setBeans] = useState([]);
    const [filteredBeans, setFilteredBeans] = useState([]);
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
        return (parsedPage > 0) ? parsedPage : 1;
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
        // Avoid fetching for invalid pageIndex
        if (pageIndex < 1 || (totalPages > 0 && pageIndex > totalPages)) {
            return;
        }

        const fetchBeans = async () => {
            try {
                // When searching fetch all beans
                const requestUrl = submittedSearchTerm
                    ? `${baseUrl}/beans?pageIndex=1&pageSize=200`
                    : `${baseUrl}/beans?pageIndex=${pageIndex}&pageSize=21`;
                
                const response = await fetch(requestUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                // console.log(data);
                
                setBeans(data.items);

                if (submittedSearchTerm) {
                    const filtered = data.items.filter(bean =>
                        bean.flavorName.toLowerCase().includes(submittedSearchTerm.toLowerCase())
                    );

                    // Then paginate the filtered requests
                    const startIndex = (pageIndex - 1) * 21;
                    const endIndex = startIndex + 21;
                    setFilteredBeans(filtered.slice(startIndex, endIndex));

                    const adjustedTotalPages = Math.ceil(filtered.length / 21);
                    setTotalPages(adjustedTotalPages);
                    setIsNextHidden(pageIndex === adjustedTotalPages);
                } else {
                    setFilteredBeans(data.items);
                    setTotalPages(data.totalPages);
                    setIsNextHidden(pageIndex === data.totalPages);
                }

                setIsPaginatorHidden(false);
                setIsPrevHidden(pageIndex === 1);

                // Update the URL
                if (searchParams.get('page') !== pageIndex.toString()) {
                    setSearchParams({ 
                        page: pageIndex.toString(),
                        ...(submittedSearchTerm && { search: submittedSearchTerm })
                    });
                }
                window.scrollTo(0, 0);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        
        fetchBeans();
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

    const handleBeanClick = (beanId) => {
        navigate(`/bean/${beanId}`);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPageIndex(1);
        setSubmittedSearchTerm(searchTerm);
        setSearchParams({
            page: '1',
            ...(searchTerm && { search: searchTerm })
        });
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSubmittedSearchTerm('');
        setPageIndex(1);
        setSearchParams({ page: '1' });
        setFilteredBeans(beans);
    };

    return (
        <div className="container">
            {/* Search Bean */}
            <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                    className="search-input"
                    name="searchInput"
                    type="text"
                    placeholder="Search for a bean..."
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
            
            {/* Display Bean List */}
            <ul className="jelly-bean-list">
                {filteredBeans.length > 0 ? (
                    // List of Beans
                    filteredBeans.map((bean) => (
                        <li
                            key={bean.beanId}
                            onClick={() => handleBeanClick(bean.beanId)}
                            className="jelly-bean-item"
                            style={{ backgroundColor: bean.backgroundColor }}
                        >
                            <img src={bean.imageUrl} alt="bean image" />
                            <p>{bean.flavorName}</p>
                        </li>
                    ))
                ) : submittedSearchTerm ? (
                    <p>No beans found matching "{submittedSearchTerm}"</p>
                ) : (
                    // Skeleton screens
                    Array.from({ length: 15 }).map((_, index) => (
                        <li key={index} className="jelly-bean-item loading">
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
                    <p>{pageIndex} of {totalPages}</p>
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

export default JellyBeanList;