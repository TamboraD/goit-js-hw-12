import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import { createGalleryCard } from './js/render-functions';
import { fetchPhotos } from './js/pixabay-api';

const form = document.querySelector('.form-gallery');
const list = document.querySelector('.gallery');
const loader = document.querySelector('.loader-container')



const searchSubmit = event => {
    loader.style.display = 'block'
    event.preventDefault();
    const searchQuery = event.currentTarget.elements.user_query.value.trim();

    if (searchQuery === '') {
        loader.style.display = 'none';
        iziToast.error({
            message: 'Please enter your request',
            position: 'topRight'
        });
        return;
    }
    
    fetchPhotos(searchQuery)
        .then(data => {
            if (data.total === 0) {
                iziToast.error({
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: 'topRight'
                });
                
                list.innerHTML = '';
                return;
            }
            const galleryTemplate = data.hits.map(el => createGalleryCard(el)).join('');

            list.innerHTML = galleryTemplate;
            const gallery = new SimpleLightbox('.gallery a', {
                captionDelay: 300,
                captionsData: 'alt',
            });
            gallery.refresh();
        })
        .catch(err => {
            console.log(err)
        })
    .finally(() => {
        loader.style.display = 'none';
        form.reset()
    });
};
form.addEventListener('submit', searchSubmit);

