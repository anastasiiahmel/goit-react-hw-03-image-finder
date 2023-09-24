import { ImageGalleryItem } from "components/imageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ articles, onClick }) => {


  return (
  <div>
    {articles.map(({webformatURL, largeImageURL, id,tags }) => (
                <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                onClick={onClick}
                />
            ))}
      </div>
      );
};