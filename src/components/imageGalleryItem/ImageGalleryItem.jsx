export const ImageGalleryItem = ({webformatURL, largeImageURL, tags,  onClick}) => {
    return(
        < >
            <img className="image" src={webformatURL} alt={tags} 
            width="360" 
            height ="240" 
            loading="lazy"
            onClick={() => {onClick(largeImageURL)}}/>
            
        </>
    )
};
