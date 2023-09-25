import { LoadMoreBtn } from './Button.styled.js';

export const Button = ({ onClick }) => {
  return (
    <div>
      <LoadMoreBtn type="button" onClick={onClick}>
        Load more
      </LoadMoreBtn>
    </div>
  );
};



