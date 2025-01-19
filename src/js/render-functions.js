export const createGalleryCard = imgInfo => {
    return `<li class="card-gallery">
    <a>
    <img class="img-gallery" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}"/>
    </a>
<div class="container-gallery">
<div class="gallery-items">
<p class="title-gallery">Likes</p>
<p class="gallery-item">${imgInfo.likes}</p>
</div>

<div class="gallery-items">
<p class="title-gallery">Views</p>
<p class="gallery-item">${imgInfo.views}</p>
</div>

<div class="gallery-items">
<p class="title-gallery">Comments</p>
<p class="gallery-item">${imgInfo.comments}</p>
</div>

<div class="gallery-items">
<p class="title-gallery">Downloads</p>
<p class="gallery-item">${imgInfo.downloads}</p>
</div>

</div>
    </li>`
};