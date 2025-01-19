import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import { createGalleryCard } from './js/render-functions'
import { fetchPhotos } from './js/pixabay-api';

const form = document.querySelector('.form-gallery');
const input = document.querySelector('.input-gallery');
const btn = document.querySelector('.btn');
const list = document.querySelector('.gallery');
const loader = document.querySelector('.loader')



const searchSubmit = event => {
    event.preventDefault();
    const searchQuery = event.currentTarget.elements.user_query.value.trim();

    if (searchQuery === '') {
        iziToast.error({
            message: 'Please enter your request',
            position: 'topRight'
        });
        return;
    }
    
    loader.classList.remove('is-hidden');
    fetchPhotos(searchQuery)
        .then(data => {
            if (data.total === 0) {
                iziToast.error({
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: 'topRight'
                });
                
                list.innerHTML = '';
                form.reset();
                return;
            }
            const galleryTemplate = data.hits.map(el => createGalleryCard(el)).join('');

            list.innerHTML = galleryTemplate;
            loader.classList.add('is-hidden');
            const gallery = new SimpleLightbox('.gallery a', {
                captionDelay: 300,
                captionsData: 'alt',
            });
            gallery.refresh();
        })
        .catch(err => {
            console.log(err)
        });
};
form.addEventListener('submit', searchSubmit);

