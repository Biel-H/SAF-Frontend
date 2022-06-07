import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import '../compararImgs/compararImgs.css';
import Modal from '../compararImgs/modalCompararImgs/compararImgs';
import Header from '../../components/headers/header';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';

export default function Comparacao() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [Checklist, setChecklist] = useState([]);
    const [ImagemFrontal, setImagemFrontal] = useState('');
    const [ImagemTraseira, setImagemTraseira] = useState('');
    const [ImagemEsquerda, setImagemEsquerda] = useState('');
    const [ImagemDireita, setImagemDireita] = useState('');
    const [ImagemFrontalP, setImagemFrontalP] = useState('');
    const [ImagemTraseiraP, setImagemTraseiraP] = useState('');
    const [ImagemEsquerdaP, setImagemEsquerdaP] = useState('');
    const [ImagemDireitaP, setImagemDireitaP] = useState('');

    const [CoFrontal, setCoFrontal] = useState('');
    const [CoTraseira, setCoTraseira] = useState('');
    const [CoEsquerda, setCoEsquerda] = useState('');
    const [CoDireita, setCoDireita] = useState('');

    const [Media, setMedia] = useState('');

    function BuscarChecklist() {
        axios('http://backend-saf-api.azurewebsites.net/api/CheckList/' + 17)
            .then(response => {
                if (response.status == 200) {
                    console.log(response.data)
                    setChecklist(response.data)
                    setImagemFrontal(response.data.imagemFrontal)
                    setImagemTraseira(response.data.imagemTraseira)
                    setImagemEsquerda(response.data.imagemLateralEsquerda)
                    setImagemDireita(response.data.imagemLateralDireita)

                    setImagemFrontalP(response.data.idVeiculoNavigation.imagemFrontalPadrao)
                    setImagemTraseiraP(response.data.idVeiculoNavigation.imagemTraseiraPadrao)
                    setImagemEsquerdaP(response.data.idVeiculoNavigation.imagemLateralEsquerdaPadrao)
                    setImagemDireitaP(response.data.idVeiculoNavigation.imagemLateralDireitaPadrao)

                    setCoFrontal(response.data.porcentagemFrontal)
                    setCoTraseira(response.data.porcentagemTraseira)
                    setCoEsquerda(response.data.porcentagemLateralEsquerda)
                    setCoDireita(response.data.porcentagemLateralDireita)
                }
            })
    }

    function CalcularMedia() {
        setMedia(CoFrontal + CoTraseira + CoDireita + CoEsquerda);
    }

    useEffect(BuscarChecklist, [])
    useEffect(CalcularMedia, [CoDireita])

    return (
        <div>
            <Header />
            <main>
                <div className="wrapperQuadrados">
                    <Link to="/checklists"><FontAwesomeIcon className="setaComparacao" icon={faArrowAltCircleLeft} style={{ cursor: 'pointer', color: '#0E758C' }}></FontAwesomeIcon></Link>
                    <div className="quadrados">
                        <div className="quadrado">
                            <div className="imgQuadrado">
                                <img className='cam' src={'https://backend-saf-api.azurewebsites.net/Img/' + ImagemFrontalP} />
                            </div>
                            <div className="imgQuadrado">
                                <img className='cam' src={'https://backend-saf-api.azurewebsites.net/Img/' + ImagemTraseiraP} />
                            </div>
                            <div className="imgQuadrado">
                                <img className='cam' src={'https://backend-saf-api.azurewebsites.net/Img/' + ImagemDireitaP} />
                            </div>
                            <div className="imgQuadrado">
                                <img className='cam' src={'https://backend-saf-api.azurewebsites.net/Img/' + ImagemEsquerdaP} />
                            </div>
                        </div>

                        <div className="quadrado">
                            <div className="imgQuadrado">
                                <img className='cam' src={'https://backend-saf-api.azurewebsites.net/Img/' + ImagemFrontal} />
                            </div>
                            <div className="imgQuadrado">
                                <img className='cam' src={'https://backend-saf-api.azurewebsites.net/Img/' + ImagemTraseira} />
                            </div>
                            <div className="imgQuadrado">
                                <img className='cam' src={'https://backend-saf-api.azurewebsites.net/Img/' + ImagemDireita} />
                            </div>
                            <div className="imgQuadrado">
                                <img className='cam' src={'https://backend-saf-api.azurewebsites.net/Img/' + ImagemEsquerda} />
                            </div>
                        </div>
                        <div className='quadrado basePorcentagens'>
                            <p className='porcentagem'>Correspondência: {CoFrontal}%</p>
                            <p className='porcentagem'>Correspondência: {CoTraseira}%</p>
                            <p className='porcentagem'>Correspondência: {CoEsquerda}%</p>
                            <p className='porcentagem'>Correspondência: {CoDireita}%</p>
                        </div>
                        <div className="btns">
                            <p className='percentual'>Taxa de correspondência média: {Media / 4}%</p>
                            <button className="btn_revisar" onClick={() => setIsModalVisible(true)}>Revisar</button>{isModalVisible ? (<Modal onClose={() => setIsModalVisible(false)}></Modal>) : null}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}