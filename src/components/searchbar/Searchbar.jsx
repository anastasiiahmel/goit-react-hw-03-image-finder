import { Component } from "react";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  SearchbarHeader
} from './Search.styled.js'

export class Searchbar extends Component {

  state = {
  searchQuery: '',
  }

handleSubmit = (e)=> {
  e.preventDefault();
        if (this.state.searchQuery.trim() === '') {
      Notify.warning('Please fill in the input field');
            return;
          }
        this.props.onSubmit(this.state.searchQuery);
        this.onFormReset();
  }

onFormChange = event => {
        this.setState({searchQuery: event.currentTarget.value});
    };
  
  onFormReset = () => {
        this.setState({searchQuery: ''})
  };
  
  
  render()
  {
    return (
      <SearchbarHeader>
        <header className="searchbar">
          <form className="form" onSubmit={this.handleSubmit}>
        <button type="submit" className="button">
                    <span className="button-label">Search</span>
              </button>
    <input
      className="input"
      type="text"
      autoComplete="off"
      autoFocus
            placeholder="Search images and photos"
            onChange={this.onFormChange}
            value={this.state.searchQuery}
              />
            </form>
        </header>
        </SearchbarHeader>
  )
}

}