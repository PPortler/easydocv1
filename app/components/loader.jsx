import React from 'react'
import style from './styles/loader.module.css'

function Loader() {

    return (
        <div >
            <div className={`${style.bg_loader}`}></div>
            <div className={`${style.loader}`}></div>
        </div>
    )
}

export default Loader
