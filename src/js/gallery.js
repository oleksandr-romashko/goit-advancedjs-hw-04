import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './api';
import { renderGallery } from './markupMaker';

const CARD_ITEMS_PER_PAGE = 40;
const DISPLAY_MAX_PAGE_NUMBER = 10;  // limit for the number of pages to load

let page;
let userInput;

iziToast.settings({
  position: 'topRight',
  timeout: 3000,
  maxWidth: 400,
  progressBar: false,
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut',
});

const gallery = new SimpleLightbox('.gallery a', {
  captionType: 'data',
  captionDelay: 250,
});

const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.js-gallery');
const loadMoreBtn = document.querySelector('.js-load-more-btn');
const endOfGalleryMsg = document.querySelector('.js-end-of-img-list');

form.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreContent);

/**
 * * Handles search form search input and populates gallery with card items.
 * @param {Event} event Ocured event.
 * Shows warning message, if query search is empty.
 * Shows error message, if no search results found.
 * Shows success message with number of found items when sound items.
 * Displays button for loading more content when more content is available.  
 * Displays message for end of content when there no more content and eached the end.
 */
async function onSearchFormSubmit(event) {
  event.preventDefault();

  page = 1; // reset page number to one on each new search
  userInput = event.target.searchQuery.value.trim();
  if (!userInput) {
    iziToast.warning({
      title: 'Please specify search criteria!',
      message: 'The search query cannot be empty.',
    });
    return;
  }

  galleryContainer.innerHTML = ''; // clear previously populated gallery content
  loadMoreBtn.style.display = 'none'; // hide button for loading more content
  endOfGalleryMsg.style.display = 'none'; // hide message info message about reaching end of the content
  
  try {
    const content = await fetchImages(userInput, page); // fetch images based on user query
    
    if (!content.hits.length) {
      iziToast.error({
        title: 'Sorry, there are no images matching your search query.',
        message: `Please try again.`,
      });
      event.target.searchQuery.value = '';
      return;
    }

    event.target.searchQuery.value = ''; // clear input field
    renderGallery(content, galleryContainer, gallery); // render gallery content, refresh Simplelightbox
    
    iziToast.success({
      title: 'Hooray!',
      message: `We found ${content.totalHits} images.`,
    });
    
    if (content.hits.length < CARD_ITEMS_PER_PAGE) {
      endOfGalleryMsg.style.display = 'block';
      return;
    }
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    iziToast.error({
      title: 'Oops. An error has occurred',
      message: `${error.message}.`,
    });
    console.log(error.message);
  }
}

/**
 * * Handles more content load and adding it to the end of the gallery.
 * Displays button for loading more content when more content is available.  
 * Displays message for end of content when there no more content and eached the end.
 */
async function onLoadMoreContent() {
  page++; // increase page number by 1 with each request
  loadMoreBtn.visibility = 'hidden'; // visually hide button for loading more content
  
  try {
    const content = await fetchImages(userInput, page);
    renderGallery(content, galleryContainer, gallery); // render gallery content with new images, refresh Simplelightbox
    galleryLoaded(); // apply smooth scrolling
    
    if (page === DISPLAY_MAX_PAGE_NUMBER) {
      loadMoreBtn.style.display = 'none';
      endOfGalleryMsg.style.display = 'block';
      return;
    }
    
    if (content.hits.length < CARD_ITEMS_PER_PAGE || !content.hits.length) {
      loadMoreBtn.style.display = 'none';
      endOfGalleryMsg.style.display = 'block';
      return;
    }
    loadMoreBtn.visibility = 'visible'; // show button for loading more content
  } catch (error) {
    iziToast.error({
      title: 'Oops. An error has occurred',
      message: `${error.message}`,
    });
    console.log(error.message);
  }
}

/**
 * * Applies smooth scrolling
 */
function galleryLoaded() {
  const { height: cardHeight } = document.querySelector('.photo-card').getBoundingClientRect();
  const height = window.innerHeight;
  window.scrollBy({
    top: height - cardHeight,
    behavior: 'smooth',
  });
}