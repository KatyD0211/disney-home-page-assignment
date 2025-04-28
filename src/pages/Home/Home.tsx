import React, { useEffect, useState } from 'react';
import './Home.css';
import { CollectionsResponse, getAllCollections } from '../../api/CollectionsApi';
import { Collections } from '../../components/collections/collections'; 


export const Home = () => {
    const [collections, setCollections] = useState<CollectionsResponse>({initalCollections: [], refIdCollections: []});
    useEffect(() => {
       const fetchData = async () => {
       const data = await getAllCollections();
            setCollections(data);
       }
       fetchData();
    }, []);

    return (
        <div className="home">
            <nav className="navbar">
                <div className="nav-logo">
                    <img 
                        src="https://static-assets.bamgrid.com/product/disneyplus/images/logo.1a56f51c764022ee769c91d894d44326.svg"
                        alt="Disney+"
                    />
                </div>
            </nav>
            <div className="collections-container"> 
                {collections.initalCollections.map((collection) => (
                    <Collections key={collection.setId} {...collection} />
                ))}
            </div>
        </div>
    )

}