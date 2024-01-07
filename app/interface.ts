interface Series {
    id: number | string;
    name: string;
    genres?: string[];
    rating?: {
        average: number
    };
    image: {
        medium: string;
        original: string;
    }
    summary: string;
}

interface SearchSeriesResult {
    score?: number;
    show: Series;
}