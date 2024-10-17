// src/MyBook.js
import React, { useRef, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './MyBook.css'; // Optional: for styling

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <img src={props.image} alt={`Page ${props.number}`} style={{ width: '100%', height: '100%' }} />
    </div>
  );
});

function MyBook() {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8; // Total number of pages
  const intervalRef = useRef(null);

  // Paths to images in the public/img folder
  const images = [
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg'
  ];

  useEffect(() => {
    if (bookRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : 1)); // Loop back to first page
        bookRef.current.pageFlip().flip(currentPage);
      }, 3000); // Change pages every 3 seconds
    }

    return () => clearInterval(intervalRef.current); // Clean up interval on unmount
  }, [currentPage]);

  return (
    <HTMLFlipBook width={300} height={500} ref={bookRef}>
      {images.map((image, index) => (
        <Page key={index} number={index + 1} image={image} />
      ))}
    </HTMLFlipBook>
  );
}

export default MyBook;
