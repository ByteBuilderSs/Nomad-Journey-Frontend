import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ letter, imageUrl, alt, size }) => {
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,78,137,1)',
    color: '#fff',
    fontSize: size / 2.5,
    overflow: 'hidden',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <div style={avatarStyle}>
      {imageUrl ? (
        <img src={imageUrl} alt={alt} style={imageStyle} />
      ) : (
        <span>{letter}</span>
      )}
    </div>
  );
};

Avatar.propTypes = {
  letter: PropTypes.string,
  imageUrl: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.number.isRequired,
};

Avatar.defaultProps = {
  letter: '',
  imageUrl: '',
  alt: 'Avatar',
};

export default Avatar;
