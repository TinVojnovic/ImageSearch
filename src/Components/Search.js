import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import ImageGrid from './Images'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

const Search = () => {
    const [images, setImages] = useState([])

    const [searchText, setSearchText] = useState('')


    const api = {
        apiUrl: 'https://pixabay.com/api',
        apiKey: '26032813-5eca57a90774446a771ac3a81'
    }

    const onTextChange = (e) => {
        if (e.target.value == '') {
            setImages([])
            setSearchText(e.target.value)
        } else {
            setSearchText(e.target.value)
            setImages(() => {
                axios.get(`${api.apiUrl}/?key=${api.apiKey}&q=${searchText}&safeSearch=true`)
                    .then(res => setImages(res.data.hits.map(el => ({ id: el.id, largeImageURL: el.largeImageURL }))))
                    .catch(err => console.log(err))
            })
        }
    }

    return (
        <div>
            <div className='linkButton'>
                <Button component={Link} to="/favorites" variant="contained">Favorites</Button>
            </div>
            <TextField
                name="SearchText"
                value={searchText}
                onChange={onTextChange}
                style={{
                    display: 'block',
                    margin: 'auto',
                    width: '200px',
                    padding: '10px'
                }}
            />

            {images && (<ImageGrid images={images} />)}

            {images && images.length == 0 && <h3 className='response'>Nema rezultata</h3>}

        </div>
    )
}

export default Search