import { Component } from "react";
import { fetchImages } from "../services/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import css from "./App.module.css";

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    per_page: 12,
    isLoading: false,
    loadMore: false,
    error: null,
    noResults: false,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.getImages(searchQuery, page);
    }
  }

  getImages = async (query, page) => {
    this.setState({ isLoading: true, error: null, noResults: false });
    if (!query) {
      return;
    }
    try {
      const { hits, totalHits } = await fetchImages(query, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
      }));
      if (totalHits === 0) {
        this.setState({ noResults: true });
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  formSubmit = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
      loadMore: false,
    });
  };

  onloadMore = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.getImages(this.state.query);
    });
  };

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  
  render() {
    const { images, isLoading, error, noResults, loadMore, page, showModal, largeImageURL } =
      this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.formSubmit} />
        
        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery images={images} openModal={this.openModal} />
        )}

        {noResults && (
            <p className={css.Alert}>
              No images found. Please try another query :)
            </p>
        )}
        
        {error && (
          <p className={css.Alert}>
              Oops, something went wrong :(
            </p>
          )}

        {loadMore && <Button onloadMore={this.onloadMore} page={page} />}

        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

