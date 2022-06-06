import React from 'react';
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import '../compararImgs/compararImgs.css';
import Modal from '../compararImgs/modalCompararImgs/compararImgs';
import Header from '../../components/headers/header';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';

export default function Comparacao() {

    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <div>
            <Header />

            <main>
                <div className="wrapperQuadrados">
                    <Link to="/checklists"><FontAwesomeIcon className="iconeSeta" icon={faArrowAltCircleLeft} style={{ cursor: 'pointer', color: '#0E758C' }}></FontAwesomeIcon></Link>
                    <div className="quadrados">
                        <div className="quadrado">
                            <div className="imgQuadrado" />
                            <div className="imgQuadrado" />
                            <div className="imgQuadrado" />
                            <div className="imgQuadrado" />
                        </div>
                        <div className="btns">
                            <p className='percentual'>Taxa de correspondência: XX%</p>
                            <button className="btn_revisar" onClick={() => setIsModalVisible(true)}>Revisar</button>{isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}></Modal>) : null}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}