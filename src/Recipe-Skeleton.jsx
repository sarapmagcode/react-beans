
const RecipeSkeleton = () => {
  return (
    <>
      <header className="skeleton-header">
        <div className="skeleton skeleton-image" />
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-description" />
        <div className="skeleton skeleton-description" />

        <div className="cooking-details">
          {[1, 2, 3].map((i) => (
            <div key={i} className="detail-item">
              <div className="skeleton skeleton-icon" />
              <div className="skeleton skeleton-text" />
              <div className="skeleton skeleton-text sm" />
            </div>
          ))}
        </div>
      </header>

      <div className="content">
        <div className="skeleton section-title" />
        <div className="skeleton-list">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton skeleton-list-item" />
          ))}
        </div>

        {[1, 2, 3].map((section) => (
          <div key={section}>
            <hr className="skeleton-hr" />
            <div className="skeleton section-title" />
            <div className="skeleton-list">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton skeleton-list-item" />
              ))}
            </div>
          </div>
        ))}

        <hr className="skeleton-hr" />
        <div className="skeleton section-title" />
        <div className="skeleton-list">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton skeleton-list-item" />
          ))}
        </div>

        <hr className="skeleton-hr" />
        <div className="tips-header">
          <div className="skeleton skeleton-icon" />
          <div className="skeleton skeleton-text" />
        </div>
        <div className="skeleton-list">
          {[1, 2].map((i) => (
            <div key={i} className="skeleton skeleton-list-item" />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipeSkeleton;