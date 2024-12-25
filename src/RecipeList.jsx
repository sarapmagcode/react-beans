import { useEffect, useState } from 'react';

const RecipeList = ({ baseUrl }) => {

    const [recipeList, setRecipeList] = useState([]);

    useEffect(() => {
        const fetchRecipeList = async () => {
            try {
                const response = await fetch(`${baseUrl}/recipes`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                setRecipeList(data.items);
            } catch (error) {
                console.error('Fetch error', error);
            }
        };

        fetchRecipeList();
    }, []);

    // TODO: Pagination

    return (
        <div className="container">

            {/* Display Recipe List */}
            <ul className="recipe-list">
                {recipeList.length > 0 ? (
                    recipeList.map((recipe) => (
                        <li
                            key={recipe.recipeId}
                            className="recipe-item"
                        >   
                            <img src={recipe.imageUrl} alt="recipe" />
                            <p>{recipe.name}</p>
                        </li>
                    ))
                ) : (
                    Array.from({ length: 10 }).map((_, index) => (
                        <li key={index} className="recipe-item loading">
                            <div className="loading-image"></div>
                            <div className="loading-text"></div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default RecipeList;