import axios from 'axios';

export const fetchPhotos = (searchQuery, currentPage) => {
    const axiosOptions = {
     params: {
        key: '48321272-90fb434237c8601cd660dced0',
        q: searchQuery,
        page: currentPage,
        per_page: 15,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true'
        }
    }

    return axios.get(`https://pixabay.com/api/`, axiosOptions);

}