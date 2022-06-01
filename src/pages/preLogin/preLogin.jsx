import React from "react";

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import './preLogin.css'

export default function PreLogin() {


    return (
        <div className="backgroundPreLogin">
            <div className='linksPreLogin'>
                <div className='divEsqPreLogin' />
                <div className="LogoPreLogin" />
                <div className='divDirPreLogin'>
                <Link style={{textDecoration: 'none', color: 'inherit'}} to="/login"><button className='btnPreLogin'>Entrar</button></Link>
                </div>
            </div>

            <h1 className="h1PreLogin">Com a temática de gestão e administração de frotas, a SAF pode ofercer à você:</h1>

            <main>
                <div className="cardsPreLogin">
                    <div className="cardPreLogin">
                        <div className="img1" />
                        <p className="pImg">Utilização de Checklists para melhor controle da sua frota quanto ao estado dos veículos que entram e saem para trajetos.</p>
                    </div>
                    <div className="cardPreLogin">
                        <div className="img2"/>
                        <p className="pImg">Comparação de imagens para verificação do estado dos veículos, utilizando uma análise de correspondência entre as imagens.</p>
                    </div>
                    <div className="cardPreLogin">
                        <div className="pImg" className="img3" />
                        <p className="pImg">Para uma rápida conferência de um veículo de uma Checklist pode-se utilizar o serviço cognitivo OCR para leitura da placas.</p>
                    </div>
                </div>
            </main>

            <footer className="footerPreLogin">
                <FontAwesomeIcon icon={faGithub} color="#FFFFFF" size='2x' />
                <span style={{ color: '#FFF' }}>|</span>
                <a href="https://github.com/SAF-SENAI-3T/SAF-3T" target="blank" className="pLinkEsquerdoFooter"><strong>Acesse nosso portifólio no GitHub</strong></a>
            </footer>
        </div>
    )
}