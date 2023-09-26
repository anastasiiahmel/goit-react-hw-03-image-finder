import { ImageGalleryItem } from "components/imageGalleryItem/ImageGalleryItem";
import { ImageGalleryStyle } from "./imageGalleryStyle.styled";

export const ImageGallery = ({ articles, onClick }) => {
      return (
                  <ImageGalleryStyle>
            <div className="container-gallery">
                  {articles.map(({ webformatURL, largeImageURL, id, tags }) => (
                              <ImageGalleryItem
                                    key={id}
                                    webformatURL={webformatURL}
                                    largeImageURL={largeImageURL}
                                    tags={tags}
                                    onClick={onClick}
                                    />
                                    ))}
            </div>
                                    </ImageGalleryStyle>
      );
};