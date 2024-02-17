export function renderGallery(images, galleryContainer, gallery) {
  const { hits } = images;
  const markup = hits
    .map(
      ({
        webformatURL,   // link to small image for photo card
        largeImageURL,  // link to full size image
        tags,           // image description string
        likes,          // number of likes
        views,          // number of views
        comments,       // number of comments
        downloads,      // number of downdloads
      }) => {
        return `<div class="photo-card">    
                  <a class="photo-card-link" href="${largeImageURL}">
                    <img class="searched-image" src="${webformatURL}" alt="${tags}" loading="lazy" data-title="${tags}"/>
                    <div class="info">
                      <p class="info-item">
                        <span class="info-title">Likes</span>
                        <span class="info-data">${likes}</span>
                      </p>
                      <p class="info-item">
                        <span class="info-title">Views</span>
                        <span class="info-data">${views}</span>
                      </p>
                      <p class="info-item">
                        <span class="info-title">Comments</span>
                        <span class="info-data">${comments}</span>
                      </p>
                      <p class="info-item">
                        <span class="info-title">Downloads</span>
                        <span class="info-data">${downloads}
                      </p></span>
                    </div>
                  </a>
              </div>`;
      }
    )
    .join('');
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}
