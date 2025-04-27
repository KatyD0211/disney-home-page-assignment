import React, { useEffect, useState } from 'react';
import './Home.css';
import { Collection, CollectionsResponse, getAllCollections } from '../../api/Collections';


export const Home = () => {
    // const [collections, setCollections] = useState<CollectionsResponse>({initalCollections: [], refIdCollections: []});
    const [intialLoadedCollections, setIntialLoadedCollections] = useState<Collection[]>([]);
    const [refIdLoadedCollections, setRefIdLoadedCollections] = useState<Collection[]>([]);
    useEffect(() => {
       const fetchData = async () => {
       const data = await getAllCollections();
            setIntialLoadedCollections(data.initalCollections);
            setRefIdLoadedCollections(data.refIdCollections);
            console.log(data.initalCollections);
            console.log(data.refIdCollections);
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

        </div>
    )
}