import React, { useRef, useEffect } from "react";
import { Collection } from "../../api/CollectionsApi";
import { Tile } from "../tile/tile";
import "./collections.css";

export const Collections = ({ 
    title,
    items,
    isSelectedCollection,
    selectedTileIndex,
}: Collection & { isSelectedCollection?: boolean, selectedTileIndex?: number }) => {
    const selectedTileRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if ( isSelectedCollection && selectedTileRef.current ) {
            selectedTileRef.current.scrollIntoView({
                 behavior: 'smooth',
                 block: 'nearest',
                 inline: 'center'
                });
        }
    }, [ isSelectedCollection, selectedTileIndex]);
    if (!items) return null;

    return (
        <div className="collection">
            <h2 className="collection-title">{title}</h2>
            <div className={`collection-items`}>
                {items.map((item, index) => (
                    <div 
                        key={item.id} 
                        className="tile-container"
                        ref={index === selectedTileIndex ? selectedTileRef : null}
                    >
                        <Tile
                            {...item} 
                            isSelectedTile={index === selectedTileIndex}
                            isSelectedCollection={isSelectedCollection}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};