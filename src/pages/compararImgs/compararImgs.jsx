import React from 'react';
import { useState, useEffect } from 'react';

import '../compararImgs/compararImgs.css';
import Modal from '../compararImgs/modalCompararImgs/compararImgs';
import Header from '../../components/headers/header';

export default function Comparacao() {

    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <div>
            <Header />

            <main>
                <div className="wrapperQuadrados">
                    <div className="quadrados">
                        <div className="quadrado">
                            <div className="imgQuadrado" />
                            <div className="imgQuadrado" />
                            <div className="imgQuadrado" />
                            <div className="imgQuadrado" />
                        </div>
                        <div className="btns">
                            <p className='percentual'>Taxa de correspondência: 75%</p>
                            <button className="btn_revisar" onClick={() => setIsModalVisible(true)}>Revisar</button>{isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}></Modal>) : null}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}