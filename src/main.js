import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import { createGalleryCard } from './js/render-functions';
import { fetchPhotos } from './js/pixabay-api';

const form = document.querySelector('.form-gallery');
const list = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');


let page = 1;
let searchQuery = '';
let modal = new SimpleLightbox('.gallery a', {
                captionDelay: 300,
                captionsData: 'alt',
            });;

const searchSubmit = async event => {
    try {
     event.preventDefault();
    searchQuery = event.currentTarget.elements.user_query.value.trim();

    if (searchQuery === '') {
        iziToast.error({
            message: 'Please enter your request',
            position: 'topRight'
        });
        return;
        }
        page = 1;
        loadMoreBtn.classList.add('is-hidden');
    
        const { data } = await fetchPhotos(searchQuery, page);
        
        if (data.total === 0) {
            form.reset();
                iziToast.error({
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: 'topRight'
                });
                
            list.innerHTML = '';
            form.reset();
                return;
        }
        
        if (data.totalHits > 1) {
            loadMoreBtn.classList.remove('is-hidden');
            loadMoreBtn.addEventListener('click', loadMoreBtnClick);
        };

        const galleryTemplate = data.hits.map(el => createGalleryCard(el)).join('');

        list.innerHTML = galleryTemplate;

            modal.refresh();
    } catch (err) {
        console.log(err);
    }
    form.reset()
};
form.addEventListener('submit', searchSubmit);

const loadMoreBtnClick = async event => {
    try {
        page++;

        loader.style.display = 'block';

        const { data } = await fetchPhotos(searchQuery, page);

        const galleryTemplate = data.hits.map(el => createGalleryCard(el)).join('');
    
        list.insertAdjacentHTML('beforeend', galleryTemplate);
        loader.style.display = 'none';

        modal.refresh()
        
        if (page * 15 >= data.totalHits) {
            loadMoreBtn.classList.add('is-hidden');
            loadMoreBtn.removeEventListener('click', loadMoreBtnClick);
            iziToast.error({
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight'
        });
        }
        scrollDown();
    } catch (err) {
        loader.style.display = 'none';
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
