import React, { useState, useEffect } from 'react';
import { CollectionItem } from '../../api/CollectionsApi';
import './tile.css';

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
        <div className="tile" style={{border: item.isSelectedTile && item.isSelectedCollection ? '2px solid #fff' : 'none'}}>
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
        </div>
    );
}; 