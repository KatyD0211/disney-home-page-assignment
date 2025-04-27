export interface CollectionsResponse {
    initalCollections: Collection[];
    refIdCollections: Collection[];
}

export interface Collection {
    refId: string | null;
    title: string;
    items: CollectionItem[] | null;
    setId: string | null;
}

export interface CollectionItem {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string;
}

const sanitizeCollectionItem = (items: any[]): CollectionItem[] => {
    if(!items) return [];
    return (items.map((item: any): CollectionItem => {
        const profixTitle = item?.text?.title?.full;
        const title = (
            profixTitle.series?.default?.content 
            || profixTitle.program?.default?.content
            || profixTitle.collection?.default?.content
        )
        const profixImageUrl = item?.image?.tile?.["1.78"];
        const imageUrl = (
            profixImageUrl?.series?.default?.url 
            || profixImageUrl?.program?.default?.url
            || profixImageUrl?.default?.default?.url
        )
        return ({
            id: item?.contentId || item?.collectionId || "",
            title,
            description: null,
            imageUrl,
        })})
    )
}

export const getAllCollections = async () : Promise<CollectionsResponse> => { 
    try {
        const response = await fetch('https://cd-static.bamgrid.com/dp-117731241344/home.json');
        const data = await response.json();
        const containers = data.data?.StandardCollection?.containers || [];
        const initalCollections: Collection[] = [];
        const refIdCollections: Collection[] = [];
        containers.forEach((collection: any) => {
            const set = collection?.set;
            const title = set?.text?.title?.full?.set?.default?.content;
            if(!set?.refId) {
                initalCollections.push({
                    refId: null,
                    title,
                    items: sanitizeCollectionItem(set?.items),
                    setId: set?.setId || null,
                })
            } else {
                refIdCollections.push({
                    refId: set?.refId || null,
                    title,
                    items: null,
                    setId: null,
                })
            }

            })
        return {
            initalCollections,
            refIdCollections,
        }
    } catch (error) {
        console.error('Error fetching collections:', error);
        throw error;
    }
}

export const getCollectionItems = async (refId: string) => {
    try {
        const response = await fetch(`https://cd-static.bamgrid.com/dp-117731241344/sets/${refId}.json`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching collection items:', error);
        throw error;
    }
}