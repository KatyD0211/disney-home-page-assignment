import React from "react";
import { Collection } from "../../api/CollectionsApi";
import { Tile } from "../tile/tile";
import "./collections.css";

export const Collections = ({ title, items }: Collection) => {
    if (!items) return null;
    return (
        <div className="collection">
            <h2 className="collection-title">{title}</h2>
            <div className="collection-items">
                {items.map((item) => (
                    <Tile key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
};