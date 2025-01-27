export const fetchNameUrl = async (speciesUrl: string) => {
    try {
        const response = await fetch(speciesUrl);
        const data = await response.json();
        return data.name;
    } catch (error) {
        console.error('Error fetching nameUrl:', error);
        return 'Unknown';
    }
};

export const fetchTitleNameUrl = async (speciesUrl: string) => {
    try {
        const response = await fetch(speciesUrl);
        const data = await response.json();
        return data.title;
    } catch (error) {
        console.error('Error fetching titleUrl:', error);
        return 'Unknown';
    }
};

export default { fetchNameUrl, fetchTitleNameUrl };