import React, { useState, useEffect } from 'react';
import { CollectionItem } from '../../api/CollectionsApi';
import './Tile.css';

export const Tile = (item: CollectionItem & { isSelectedTile?: boolean, isSelectedCollection?: boolean }) => {
    const [isImageValid, setIsImageValid] = useState(true);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Small delay to ensure smooth transition
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`tile ${item.isSelectedTile && item.isSelectedCollection ? 'selected' : ''}`}>
            <div className={`tile-image-container ${!item.imageUrl ? 'no-image' : ''} ${showContent ? 'visible' : ''}`}>
                {isImageValid ? (
                    <img 
                        src={item.imageUrl || undefined}
                        alt={item.title}
                        className={`tile-image ${isImageLoaded ? 'loaded' : ''}`}
                        onError={() => setIsImageValid(false)}
                        onLoad={() => setIsImageLoaded(true)}
                    />
                ) : (
                    <div className="tile-placeholder">
                        <span className="tile-placeholder-text">
                            {item.title}
                        </span>
                    </div>
                )}
            </div>
            <div className="tile-release-year">
                {item.releases?.[0]?.releaseYear}
            </div>
        </div>
    );
}; 