import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import { createGalleryCard } from './js/render-functions';
import { fetchPhotos } from './js/pixabay-api';

const form = document.querySelector('.form-gallery');
const list = document.querySelector('.gallery');
const loader = document.querySelector('.loader-container');
const loadMoreBtn = document.querySelector('.load-more');
let card = document.querySelector('.card-gallery');


let page = 1;
let searchQuery = '';
let modal;

const searchSubmit = async event => {
    loader.style.display = 'block'
    try {
     event.preventDefault();
    searchQuery = event.currentTarget.elements.user_query.value.trim();

    if (searchQuery === '') {
        loader.style.display = 'none';
        iziToast.error({
            message: 'Please enter your request',
            position: 'topRight'
        });
        return;
        }
        page = 1;
        loadMoreBtn.classList.add('is-hidden');
    
        const { data }= await fetchPhotos(searchQuery, page);
        if (data.total === 0) {
                iziToast.error({
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: 'topRight'
                });
                
                list.innerHTML = '';
                return;
        }
        
        if (data.totalHits > 1) {
            loadMoreBtn.classList.remove('is-hidden');
            loadMoreBtn.addEventListener('click', loadMoreBtnClick);
        };

        const galleryTemplate = data.hits.map(el => createGalleryCard(el)).join('');

        list.innerHTML = galleryTemplate;

            modal = new SimpleLightbox('.gallery a', {
                captionDelay: 300,
                captionsData: 'alt',
            });
            modal.refresh();
    } catch (err) {
        console.log(err);
    }
    loader.style.display = 'none';
    form.reset()
};
form.addEventListener('submit', searchSubmit);

const loadMoreBtnClick = async event => {
    try {
        page++;

        const { data } = await fetchPhotos(searchQuery, page);

        const galleryTemplate = data.hits.map(el => createGalleryCard(el)).join('');
        modal = new SimpleLightbox('.gallery a', {
                captionDelay: 300,
                captionsData: 'alt',
            });
        list.insertAdjacentHTML('beforeend', galleryTemplate);

        modal.refresh()
        
        if (page === data.totalHits) {
            loadMoreBtn.classList.add('is-hidden');
            loadMoreBtn.removeEventListener('click', loadMoreBtnClick);
            iziToast.error({
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight'
        });
        }
        scrollDown();
    } catch (err) {
        console.log(err)
    }
}

function scrollDown() {
  let heightCard = document
    .querySelector('.card-gallery')
    .getBoundingClientRect().height;
  window.scrollBy({
    top: document.body.scrollTop + Math.floor(heightCard * 2),
    behavior: 'smooth',
  });
}
