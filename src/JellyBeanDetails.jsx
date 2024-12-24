import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BeanSkeleton from './BeanSkeleton.jsx';

const JellyBeanDetails = ({ baseUrl }) => {
    const { id } = useParams();

    const [bean, setBean] = useState(null);
    const [ingredients, setIngredients] = useState('');

    useEffect(() => {
        const fetchBeanDetails = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/beans/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                // console.log(data);

                setBean(data);
                
                const formattedIngredients = data.ingredients.join(', ').replace(':,', ':');
                setIngredients(formattedIngredients);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchBeanDetails();
    }, []);

    return (
        <div className="jelly-bean-details">
            {bean !== null ? (
                <>
                    <div className="bean-image" style={{ backgroundColor: bean.backgroundColor }}>
                        <img src={bean.imageUrl} alt="Bean image" />
                        <p className="flavor-name">{bean.flavorName}</p>
                    </div>
                    <p className="description">{bean.description}</p>

                    <table className="bean-info-table">
                        <tbody>
                            <tr>
                                <td>Seasonal</td>
                                <td>{bean.seasonal ? 'Yes' : 'No'}</td>
                            </tr>
                            <tr>
                                <td>Kosher</td>
                                <td>{bean.kosher ? 'Yes' : 'No'}</td>
                            </tr>
                            <tr>
                                <td>Gluten Free</td>
                                <td>{bean.glutenFree ? 'Yes' : 'No'}</td>
                            </tr>
                            <tr>
                                <td>Sugar Free</td>
                                <td>{bean.sugarFree ? 'Yes' : 'No'}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="ingredients">
                        <h4>Ingredients</h4>
                        <p>{ingredients.length > 0 ? ingredients : 'No ingredients found.'}</p>
                    </div>
                </>
            ) : (
                <BeanSkeleton />
            )}
        </div>
    )
};

export default JellyBeanDetails;