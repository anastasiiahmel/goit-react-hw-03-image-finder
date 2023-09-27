
import React, { Component } from "react";
import { dataQuery } from "api/api";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Searchbar } from "./searchbar/Searchbar";
import { ImageGallery } from "./imageGallery/ImageGallery";
import { Loader } from "./loader/Loader";
import { Button } from "./button/Button";
import { Modal } from "./modal/Modal";

export class App extends Component {
  state = {
    page: 1,
    perPage: 12,
    searchQuery: '',
    images: [],
    largeImageURL: '',
    totalHits: null,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;

    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      this.fetchImages(searchQuery, page);
    }
  }


  fetchImages = async () => {
    this.setState({ isLoading: true });
    const { searchQuery, page, perPage } = this.state;

    try {
      const articles = await dataQuery(searchQuery, page, perPage);
// console.log('articles :>> ', articles);
     this.setState(prevState => ({
  images: page === 1 ? articles.hits : [...prevState.images, ...articles.hits],
  totalHits: articles.totalHits,
}));

      if (articles.hits.length > 0 && page === 1) {
        Notify.warning('We found your images!');
      } else if (articles.hits.length === 0) {
        throw new Error();
      }
    } catch (error) {
      Notify.warning('Sorry, there are no images matching your search query. Please try again.');
      this.setState({ error: error.message, totalHits: 0 });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onFormSubmitData = searchQuery => {
    if ((this.state.searchQuery.toLowerCase()).trim() === (searchQuery.toLowerCase()).trim()) {
      return Notify.warning(`You are already viewing ${searchQuery}`);
    }
    this.setState({
      searchQuery: (searchQuery.toLowerCase()).trim(),
      page: 1,
      images: [],
    });
  };

  onLoadMoreData = () => {
    const { page, perPage, totalHits } = this.state;

    if (page * perPage < totalHits) {
      this.setState(prevState => ({ page: prevState.page + 1 }));
    }
  };

  handleImageClick = (largeImageURL) => {
    this.setState({ largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ largeImageURL: '' });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onFormSubmitData} />
        <ImageGallery articles={this.state.images} onClick={this.handleImageClick} />
        {this.state.isLoading && <Loader />}

        {this.state.totalHits > this.state.page * this.state.perPage && (
          <Button onClick={this.onLoadMoreData} />
        )}
        {this.state.largeImageURL && <Modal src={this.state.largeImageURL} alt="Large" onClose={this.handleCloseModal} />}
      </>
    );
  }
}
