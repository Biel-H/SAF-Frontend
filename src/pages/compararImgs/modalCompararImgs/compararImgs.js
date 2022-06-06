import { useState } from 'react';

import axios from 'axios';

import './modalCompararImgs.css';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ onClose = () => { } }) => {

    const [AlterarEstado, setAlterarEstado] = useState('');

    const notyf = new Notyf();

    async function AlterarStatusVeiculo() {

        axios.patch('https://backend-saf-api.azurewebsites.net/AtualizarStatus/3',
        )
            .then(response => {
                setAlterarEstado(response.data)
                onClose()
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
                    <h2 className='h2Modal'>O veículo será enviado para manutenção. Continuar?</h2>
                </div>

                <div className="btns_confirmacao">
                    <button className='btn_confirmacao1' onClick={AlterarEstado} type='submit'><p className='pBtnConfirmacao'>Sim</p></button>
                    <button className='btn_confirmacao2' onClick={onClose} type='submit'><p className='pBtnConfirmacao'>Não</p></button>
                </div>
            </div>
        </div >
    );
};

export default Modal;