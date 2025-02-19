import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

import { API_KEY } from 'Apis/Urls';

import Movies from 'components/Movies';
import Moviedetail from 'components/Moviedetail';
import Errorpage from 'components/Errorpage';

export const App = () => {
  const [apiData, setApiData] = useState('');
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
    .then(res => res.json())
    .then(data => {
      setApiData(data.results);
    })
  }, [])

  const Grid = styled.main`
    background-color: black;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100vw;
    
    @media (min-width: 415px) and (max-width: 820px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 821px) {
      grid-template-columns: repeat(4, 1fr);
    }
`;
  
  return (
    <Grid>
      <Router>
        <Routes>
          <Route path="/" element={<Movies apiData={apiData}/>} />
          <Route path="/movie/:movieId" element={<Moviedetail apiData={apiData} />} />

          <Route path="*" element={<Errorpage />} />          
        </Routes>
      </Router>
    </Grid>
  )
}
