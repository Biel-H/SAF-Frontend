import { useState } from 'react';
import { useHistory } from "react-router-dom";

import axios from 'axios';

import './modalCompararImgs.css';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';


const Modal = ({ onClose = () => { } }) => {

    const [IdVeiculo, setIdVeiculo] = useState('7');
    const [IdChecklist, setIdChecklist] = useState('12');

    const notyf = new Notyf();

    const history = useHistory();

    async function AlterarStatusVeiculo() {

        axios.patch('https://backend-saf-api.azurewebsites.net/AtualizarStatus/' + IdVeiculo,
            {
                "idStatus": 3
            })
            .then(response => {
                history.push("/checklists");
                if (response.status == 200) {
                    onClose();
                    notyf.success(
                        {
                            message: 'Veículo enviado para manutenção',
                            duration: 3000,
                            position: {
                                x: 'right',
                                y: 'top',
                            }
                        }
                        );
                    }
                })
            }
            
            function AprovarChecklist() {
                axios.patch('https://backend-saf-api.azurewebsites.net/api/CheckList/AprovaChecklist/' + IdChecklist)
                .then(response => {
                    history.push("/checklists");
                    if (response.status == 200) {
                        onClose()
                        notyf.success(
                            {
                                message: 'CheckList aprovada.',
                                duration: 3000,
                                position: {
                                    x: 'right',
                                y: 'top',
                            }
                        }
                    );
                    this.history.push('/checklists')
                }
            })
    }

    return (
        <div className="modalComparacao">
            <div className="wrapperModalComparacao">
                <div className="headerModalComparacao">
                    <p className="pHeaderModalComparacao">REVISAR VEÍCULO</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <div className='h2Modal'>
                    <h2 className='h2Modal'>As imagens anteriores conferem?</h2>
                </div>

                <div className="btns_confirmacao">
                    <button className='btn_confirmacao1' onClick={AprovarChecklist} type='submit'><p className='pBtnConfirmacao'>Sim</p></button>
                    <button className='btn_confirmacao2' onClick={AlterarStatusVeiculo} type='submit'><p className='pBtnConfirmacao'>Não</p></button>
                </div>
            </div>
        </div >
    );
};

export default Modal;