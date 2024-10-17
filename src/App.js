// src/App.js
import React from 'react';
import MyBook from './Flipbook'; // Adjust the path if necessary

const App = () => {
  return (
    <div className="container mt-5">
      <h1>Interactive Flipbook</h1>
      <MyBook/>
    </div>
  );
};

export default App;
