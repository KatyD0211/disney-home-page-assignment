import React from 'react';
import './LoadingSkeleton.css';

export const LoadingSkeleton = () => {
  return (
    <div className="collection-skeleton">
      <div className="skeleton-title shimmer" />
      <div className="skeleton-tiles">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="skeleton-tile shimmer" key={i} />
        ))}
      </div>
    </div>
  );
};
