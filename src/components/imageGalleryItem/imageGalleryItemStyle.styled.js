import styled from 'styled-components';

export const ImageGalleryItemStyle = styled.li`
  display: flex;
  box-shadow: 0 20px 38px rgba(0, 0, 0, 0.1), 0 10px 20px;
  list-style: none;

  .image {
    width: 300px;
    height: 260px;
    background-repeat: no-repeat;
    overflow: hidden;
  }
`;
