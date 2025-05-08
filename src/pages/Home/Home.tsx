import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import { Collection, CollectionsResponse, getAllCollections, getCollectionItems, sanitizeCollectionItem } from '../../api/CollectionsApi';
import { Collections } from '../../components/collections/collections'; 
import { fetchWithRetry } from '../../utils/exponentialBackoff';

export const Home = () => {
    const [collections, setCollections] = useState<CollectionsResponse>({initalCollections: [], refIdCollections: []});
    const [loadedRefIdCollections, setLoadedRefIdCollections] = useState<Collection[]>([]);
    const [selectedCollectionIndex, setSelectedCollectionIndex] = useState(0);
    const [selectedTileIndex, setSelectedTileIndex] = useState(0);
    
    // Create ref to access DOM element
    const selectedCollectionRef = useRef<HTMLDivElement>(null);

    const [loadMoreCollection, setLoadMoreCollection] = useState(false);
    const [refIdCollectionsIndex, setRefIdCollectionsIndex] = useState(0);
    
    const [isMagicActive, setIsMagicActive] = useState(false);

    // Load the initial collections
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllCollections();
            setCollections(data);
        }
        fetchData();
    }, []);
    
    // Load the refId collection based on the refIdCollectionsIndex and loadMoreCollection
    useEffect(() => {
        if(loadMoreCollection && refIdCollectionsIndex < collections.refIdCollections.length) {
            let isMounted = true;
            const fetchRefIdCollections = async () => {
                const refId = collections.refIdCollections[refIdCollectionsIndex].refId;
                const refType = collections.refIdCollections[refIdCollectionsIndex].refType;
                try {
                    const data = await fetchWithRetry(()=>getCollectionItems(refId!));
                    const items = await sanitizeCollectionItem(data?.data?.[refType as keyof typeof data.data]?.items || data?.data?.CuratedSet?.items);
                    if(!isMounted) return
                    const newCollection: Collection = {
                        refId: refId,
                        refType: collections.refIdCollections[refIdCollectionsIndex].refType,
                        title: collections.refIdCollections[refIdCollectionsIndex].title,
                        items: items,
                        setId: collections.refIdCollections[refIdCollectionsIndex].setId
                    };
                    setLoadedRefIdCollections(prevCollections => [...prevCollections, newCollection]);
                    setRefIdCollectionsIndex(prevIndex => prevIndex + 1);
                    setLoadMoreCollection(false);

                }catch(error) {
                    console.error('Error fetching ref collections:', error);
                    // add some UI for the error                    
                }
                
            };
            fetchRefIdCollections();
            return () => { isMounted = false; };
        }
        return; 
    }, [collections.refIdCollections, loadMoreCollection]);

    // Scroll to selected collection
    useEffect(() => {
        if (selectedCollectionRef.current ) {
            selectedCollectionRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: "nearest"
            });
            const totalCollections = collections.initalCollections.length + loadedRefIdCollections.length;

            if(selectedCollectionIndex === totalCollections - 1) {
                setLoadMoreCollection(true);
            }
        }
    }, [selectedCollectionIndex]);

    // Handle keyboard navigation
    const handleKeyBoardNavigation = (event: KeyboardEvent) => {
        const totalCollections = collections.initalCollections.length + loadedRefIdCollections.length;
        const currentCollection = selectedCollectionIndex < collections.initalCollections.length 
            ? collections.initalCollections[selectedCollectionIndex]
            : loadedRefIdCollections[selectedCollectionIndex - collections.initalCollections.length];
        const maxTiles = currentCollection?.items?.length || 0;

        switch (event.key) {
            case 'ArrowRight':
                if (selectedTileIndex < maxTiles - 1) {
                    setSelectedTileIndex(prev => prev + 1);
                }
                break;
            case 'ArrowLeft':
                if (selectedTileIndex > 0) {
                    setSelectedTileIndex(prev => prev - 1);
                }
                break;
            case 'ArrowUp':
                if (selectedCollectionIndex > 0) {                    
                    setTimeout(() => {
                        setSelectedCollectionIndex(prev => prev - 1);
                        setSelectedTileIndex(0);
                    }, 100);
                }
                break;
            case 'ArrowDown':
                if (selectedCollectionIndex < totalCollections - 1) {
                    setTimeout(() => {
                        setSelectedCollectionIndex(prev => prev + 1);
                        setSelectedTileIndex(0);
                    }, 100);
                }
                break;
            case 'Enter':
                console.log('Enter');
                setIsMagicActive(true);
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


        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyBoardNavigation]);


    return (
        <div className="home">
            <nav className="navbar">
                <div className={`nav-logo ${isMagicActive ? 'active' : ''}`}>
                    <img 
                        src="https://static-assets.bamgrid.com/product/disneyplus/images/logo.1a56f51c764022ee769c91d894d44326.svg"
                        alt="Disney+ Logo"
                    />
                </div>
            </nav>
            {/* some hardcoded magic; when enter is pressed, the magic container is shown. This can fetch dynamically from the api */}
            {isMagicActive && (
                <div className="magic-container">
                    <video width="100%" autoPlay muted loop>
                        <source src="https://vod-bgc-na-east-1.media.dssott.com/bgui/ps01/disney/bgui/2020/09/15/1600129307-182860.mp4" type="video/mp4" />
                    </video>
                </div>
            )}
            <div className={`collections-container ${isMagicActive ? 'active' : ''}`}>
                {/* Render the initial collections */}
                {collections.initalCollections.map((collection, index) => (
                    <div 
                        key={collection.setId}
                        ref={index === selectedCollectionIndex ? selectedCollectionRef : null}
                    >
                        <Collections
                            {...collection}
                            isSelectedCollection={index === selectedCollectionIndex} 
                            selectedTileIndex={selectedTileIndex}
                        />
                    </div>
                ))}
                {/* Render the refId collections */}
                {loadedRefIdCollections.map((collection, index) => (
                    <div 
                        key={collection.refId}
                        ref={index + collections.initalCollections.length === selectedCollectionIndex ? selectedCollectionRef : null}
                    >
                        <Collections 
                            {...collection} 
                            isSelectedCollection={index + collections.initalCollections.length === selectedCollectionIndex} 
                            selectedTileIndex={selectedTileIndex}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}