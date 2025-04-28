import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import { Collection, CollectionsResponse, getAllCollections, getCollectionItems, sanitizeCollectionItem } from '../../api/CollectionsApi';
import { Collections } from '../../components/collections/collections'; 

export const Home = () => {
    const [collections, setCollections] = useState<CollectionsResponse>({initalCollections: [], refIdCollections: []});
    const [loadedRefIdCollections, setLoadedRefIdCollections] = useState<Collection[]>([]);
    // Load the initial collections
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllCollections();
            setCollections(data);
        }
        fetchData();
    }, []);
    // Load the first refId collection
    useEffect(() => {
        if(collections.refIdCollections.length > 0 && collections.refIdCollections[0]?.refId) {
            const fetchRefIdCollections = async () => {
                const refId = collections.refIdCollections[0].refId;
                const data = await getCollectionItems(refId!);
                const items = await sanitizeCollectionItem(data?.data?.CuratedSet?.items || []);
                
                const newCollection: Collection = {
                    refId: refId,
                    title: collections.refIdCollections[0].title,
                    items: items,
                    setId: collections.refIdCollections[0].setId
                };

                setLoadedRefIdCollections(prevCollections => [...prevCollections, newCollection]);
            };
            fetchRefIdCollections();
        }
    }, [collections.refIdCollections]);
    // Handle keyboard navigation
    const [selectedCollectionIndex, setSelectedCollectionIndex] = useState(0);
    const [selectedTileIndex, setSelectedTileIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const handleKeyBoardNavigation = (event: KeyboardEvent) => {
        console.log(event.key);
        switch (event.key) {
            case 'ArrowRight':
                setSelectedTileIndex(selectedTileIndex + 1);
                break;
            case 'ArrowLeft':
                setSelectedTileIndex(selectedTileIndex - 1);
                break;
            case 'ArrowUp':
                setSelectedCollectionIndex(selectedCollectionIndex - 1);
                break;
            case 'ArrowDown':
                setSelectedCollectionIndex(selectedCollectionIndex + 1);
                break;
            case 'Enter':
                console.log('Enter');
                break;
            default:
                break;
        }
    }
    useEffect(()=>{
        const handleKeyDown = (e: KeyboardEvent) => {
            handleKeyBoardNavigation(e);
        }
        window.addEventListener('keydown', handleKeyDown);
        console.log(selectedTileIndex);
        console.log(selectedCollectionIndex);
        console.log(containerRef);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyBoardNavigation]);


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
                {collections.initalCollections.map((collection, index) => (
                    <Collections
                      key={collection.setId}
                      {...collection}
                      isSelectedCollection={index === selectedCollectionIndex} 
                      selectedTileIndex={selectedTileIndex}
                    />
                ))}
                {loadedRefIdCollections.map((collection, index) => (
                    <Collections key={collection.refId} {...collection} isSelectedCollection={index+collections.initalCollections.length === selectedCollectionIndex} />
                ))}
            </div>
        </div>
    )
}