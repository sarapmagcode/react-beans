import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TimeIcon, BowlIcon, GroupIcon, BulbIcon } from './Icons';

const RecipeDetails = ({ baseUrl }) => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}/recipes/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchRecipeDetails();
  }, []);

  return (
    <div className="recipe-details">
      {recipe !== null ? (
        <>
          <header>
            <img className="recipe-image" src={recipe.imageUrl} alt="recipe image" />
            <h1>{recipe.name}</h1>
            <p className="description">{recipe.description}</p>

            <div className="cooking-details">
              <div>
                <TimeIcon />
                <p>Prep Time</p>
                <p className="actual-values">{recipe.prepTime || 'Not provided'}</p>
              </div>

              <div>
                <BowlIcon />
                <p>Cook Time</p>
                <p className="actual-values">{recipe.cookTime || 'Not provided'}</p>
              </div>

              <div>
                <GroupIcon />
                <p>Yield</p>
                <p className="actual-values">{recipe.makingAmount || 'Not provided'}</p>
              </div>
            </div>
          </header>

          <div className="content">
            <h3>Ingredients</h3>
            <ol className="ingredient-list">
              {recipe.ingredients.map((ingredient) => (
                <li>{ingredient}</li>
              ))}
            </ol>

            {recipe.additions1.length > 0 && (
              <>
                <hr />
                <h3>Additions 1</h3>
                <div className="additions-list">
                  <ul>
                    {recipe.additions1.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {recipe.additions2.length > 0 && (
              <>
                <hr />
                <h3>Additions 2</h3>
                <div className="additions-list">
                  <ul>
                    {recipe.additions2.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            
            {recipe.additions3.length > 0 && (
              <>
                <hr />
                <h3>Additions 3</h3>
                <div className="additions-list">
                  <ul>
                    {recipe.additions3.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            <div className="directions">
              <hr />
              <h3>Directions</h3>
              <p>{recipe.directions.join(" ")}</p>
            </div>

            {recipe.tips.length > 0 && (
              <div className="tips">
                <hr />
                <h3><BulbIcon /><span>Tips</span></h3>
                <p className="content"><span>{recipe.tips.join(" ")}</span></p>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Failed to load recipe</p>
      )}
    </div>
  );
};

RecipeDetails.propTypes = {
  baseUrl: PropTypes.string
};

export default RecipeDetails;