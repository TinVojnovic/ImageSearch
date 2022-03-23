import {useState, useEffect} from 'react'
import { PropTypes } from "prop-types"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

const Images = (props) => {
    const [dialogOpen, setDialog] = useState(false)

    const [imgPreview, setImgPreview] = useState({})
    
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("images")))

    const {images} = props


    const openDialog = (img) => {
        setDialog(true)
        setImgPreview(img)
    }

    const closeDialog = () => {
        setDialog(false)
    }

    const ifExists = (img) => {
        if(favorites == null)
            return false
        
        return favorites.map(el => el.id).includes(img.id)
    }

    const addToFavorites = (img) => {
        if(localStorage.getItem("images") == null)
            return localStorage.setItem("images", JSON.stringify([img]))

        let ifExists = false
        let filtered = JSON.parse(localStorage.getItem("images")).filter(el => { 
            if(el.id == img.id) {
                ifExists = true; 
                return false;
            } else return true;
        });

        if(!ifExists) filtered.push(img)
        setFavorites(filtered)
        localStorage.setItem("images", JSON.stringify(filtered))
    }

    return (
        <div style={{padding: 40}} >
            <ImageList cols={5} variant="masonry" >
                {images && images.map(img => (
                    <ImageListItem key={img.id} style={{padding: 5}} onClick={() => {openDialog(img)}}>
                    <img
                        src={img.largeImageURL}
                        loading="lazy"
                    />
                    </ImageListItem>
                ))}
            </ImageList>

            <Dialog
                open={dialogOpen}
            >
                <Button variant="text" onClick={closeDialog} style={{width:'20%', position: 'absolute', fontWeight: 'bold', color:'red', top:"10px"}}>
                    <span className="material-icons">
                        close
                    </span>
                </Button>
                
                <Button variant="text" onClick={() => {addToFavorites(imgPreview)}} style={{width:'20%', position: 'absolute', fontWeight: 'bold', color:'red', left:'100px', top:"10px"}}>
                    {
                        ifExists(imgPreview) ? <>Dislike</> : <>Like</>
                    }
                </Button>
                <img src={imgPreview.largeImageURL}></img>
            </Dialog>
        </div>
    )
}

Images.propTypes = {
    images: PropTypes.array
}

export default Images