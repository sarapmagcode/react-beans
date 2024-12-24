const BeanSkeleton = () => {
    return (
        <div className="bean-skeleton">
            <div className="skeleton bean-image-skeleton"></div>
            <div className="skeleton description-skeleton"></div>

            <table className="bean-info-table">
                <tbody>
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <tr key={idx}>
                            <td>
                                <div className="skeleton table-label-skeleton"></div>
                            </td>
                            <td>
                                <div className="skeleton table-value-skeleton"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="ingredients">
                <h4 className="skeleton ingredients-title-skeleton"></h4>
                <div className="skeleton ingredients-content-skeleton"></div>
            </div>
        </div>
    );
};

export default BeanSkeleton;