import API_URL from "../../config";

const fetchPlanetsDataByPage = async (page: number) => {
    try {
        const response = await fetch(`${API_URL}planets/?page=${page}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default fetchPlanetsDataByPage;