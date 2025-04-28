import React, { useState } from 'react';
import { CollectionItem } from '../../api/CollectionsApi';
import './tile.css';


export const Tile = (item: CollectionItem) => {
    const [isImageValid, setIsImageValid] = useState(true);

    return (
        <div className="tile">
            <div className={`tile-image-container ${!item.imageUrl ? 'no-image' : ''}`}>
                {isImageValid ? (
                    <img 
                        src={item.imageUrl || undefined}
                        alt={item.title}
                        className="tile-image"
                        onError={() => setIsImageValid(false)}
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