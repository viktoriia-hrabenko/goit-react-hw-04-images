import { useState, useEffect } from "react";

import { fetchImages } from "../services/api";

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";

import css from "./App.module.css";

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const getImages = async (searchQuery, page) => {
    if (!searchQuery) {
      return;
    }
    setIsLoading(true);
    setError(null);
    setNoResults(false);

    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);
      if (hits.length === 0) {
        setNoResults(true);
      }
      console.log(hits, totalHits);
      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / 12));
    } catch (error) {
      setError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const formSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };

  const onloadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const openModal = largeImageURL => {
    console.log(largeImageURL);
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={formSubmit} />
      
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {noResults && <p className={css.Alert}> No images found. Please try another query :) </p>
        }

      {error && <p className={css.Alert}>Oops, something went wrong :(</p>}

      {loadMore && <Button onloadMore={onloadMore} page={page} />}

      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </div>
  );
  // }
};


