import { Component } from "react"
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Searchbar } from "./searchbar/Searchbar";
import { ImageGallery } from "./imageGallery/ImageGallery";

import { dataQuery } from "api/api";

export class App extends Component {

  state =  {
  page: 1,
    perPage: 12,
    searchQuery: '',
 images: [],
    webformatURL: [],
    largeImageURL: '',

    isLoading: false,
    showModal: false,
  }

  componentDidUpdate(prevProps, prevState) {
    const {page, searchQuery} = this.state;

    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      this.fetchImages(searchQuery, page);
    }
  };

  fetchImages = async () => {
    const { searchQuery, page, perPage } = this.state;
    
    try {
      this.setState({ isLoading: true });

      const articles = await dataQuery(searchQuery, page, perPage);

      if (page === 1) {
        this.setState({ images: articles.hits });
      } 
      else {
        this.setState(prevState => ({
          images: [...prevState.images, ...articles.hits],
        }));
      }

      if (articles.hits.length > 0 && page === 1) {
        Notify.warning('We found your images!');
      } 
      else if (articles.hits.length === 0) {
        throw new Error();
      }

    } 
    catch (error) {
        Notify.warning('Sorry, there are no images matching your search query. Please try again.');
      this.setState({ error: error.message });
    } 
  
  };

  onFormSubmitData = searchQuery => {
    if ((this.state.searchQuery.toLowerCase()).trim() === 
      (searchQuery.toLowerCase()).trim()) {
      return Notify.warning('You are already viewing ${searchQuery}')
      // toast.warn(`You are already viewing ${searchQuery}`); 
    }
    this.setState({ 
      searchQuery: (searchQuery.toLowerCase()).trim(), 
      page: 1,
      images: [],
    });
  };

  render()
  { 
    return (
    <>
      <Searchbar  onSubmit={this.onFormSubmitData}/>
       <ImageGallery
              articles={this.state.images}
              onClick={this.handleImageClick}       
            />
  </>
    );
  }
};
