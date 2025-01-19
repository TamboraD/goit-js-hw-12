export const fetchPhotos = searchQuery => {
    const searchParams = new URLSearchParams({
        key: '48321272-90fb434237c8601cd660dced0',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true'
    });
   return fetch(`https://pixabay.com/api/?${searchParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json()
        });
}