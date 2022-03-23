import { useState, useEffect } from 'react'
import ImageGrid from './Images'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

const Favorites = () => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("images")))

  return (
    <div>
      <div className='linkButton'>
        <Button component={Link} to="/" variant="contained">Home</Button>
      </div>


      {favorites && (<ImageGrid images={favorites} />)}

      {favorites && favorites.length == 0 && <h3 className='response'>Nema favorita</h3>}
    </div>
  )
}

export default Favorites