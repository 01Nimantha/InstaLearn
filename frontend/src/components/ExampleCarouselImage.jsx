import React from 'react';
import PropTypes from 'prop-types';
import test from '../assets/images/test.jpg'

function ExampleCarouselImage({ text }) {
  return (
    <div
      style={{
        position: 'relative',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <img
        src={test}
        alt={text}
        style={{
          width: '50%',
          height: '50%',
          borderRadius: '8px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '10px 20px',
          borderRadius: '8px',
        }}
      >
        <h2>{text}</h2>
      </div>
    </div>
  );
}

ExampleCarouselImage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ExampleCarouselImage;
