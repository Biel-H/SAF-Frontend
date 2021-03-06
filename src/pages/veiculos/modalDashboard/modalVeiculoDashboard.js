import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import './modalVeiculoDashboard.css';

import MaskedInputPlaca from '../MaskedInputPlaca';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Modal = ({ onClose = () => { } }) => {

    const notyf = new Notyf();

    //Cadastrar
    const [Placa, setPlaca] = useState('');
    const [Marca, setMarca] = useState('');
    const [Data, setData] = useState('');
    const [IdCarroceria, setIdCarroceria] = useState('');
    const [Status, setStatus] = useState('');
    const [TipoVeiculo, setTipoVeiculo] = useState('');

    //Listar
    const [Marcas, setMarcas] = useState([]);
    const [TipoStatus, setTipoStatus] = useState([]);
    const [TipoVeiculos, setTipoVeiculos] = useState([]);
    const [Carrocerias, setCarrocerias] = useState([]);

    function BuscarForms() {

        axios.get("https://backend-saf-api.azurewebsites.net/api/Status")
            .then((response) => {
                if (response.status === 200) {
                    setTipoStatus(response.data)
                }
            })

        axios.get("https://backend-saf-api.azurewebsites.net/api/TipoVeiculos")
            .then((response) => {
                if (response.status === 200) {
                    setTipoVeiculos(response.data)
                }
            })

        axios.get("https://backend-saf-api.azurewebsites.net/api/Carroceria")
            .then((response) => {
                if (response.status === 200) {
                    setCarrocerias(response.data)
                }
            })

        axios.get("https://backend-saf-api.azurewebsites.net/api/Marca")
            .then((response) => {
                if (response.status === 200) {
                    setMarcas(response.data)
                }
            })
    }

    const AdicionarVeiculo = (event) => {

        event.preventDefault();

        var formData = new FormData();
        const element = document.getElementById('arquivo')
        const file = element.files[0]
        formData.append('arquivo', file, file.name)
        formData.append('idUsuario', 33);
        formData.append('idMarca', Marca);
        formData.append('idTipoVeiculo', TipoVeiculo);
        formData.append('idStatus', Status);
        formData.append('placa', Placa);
        formData.append('dataAquisicao', Data);
        formData.append('idCarroceria', IdCarroceria);

        try {
            axios({
                method: "post",
                url: "https://backend-saf-api.azurewebsites.net/api/Veiculos",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((resposta) => {
                    if (resposta.status === 200) {
                        onClose()
                        notyf.success(
                            {
                                message: 'Ve??culo cadastrado com ??xito',
                                duration: 3000,
                                position: {
                                    x: 'right',
                                    y: 'top',
                                }
                            }
                        );
                    }
                    if (resposta.status === 204) {
                        notyf.error(
                            {
                                message: 'Placa j?? cadastrada',
                                duration: 3000,
                                position: {
                                    x: 'right',
                                    y: 'top',
                                }
                            }
                        );
                    }
                });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { BuscarForms() }, []);

    return (
        <div className="modalVeiculoDashboard">
            <div className="wrapperModalVeiculoDashboard">
                <div className="headerModalVeiculoDashboard">
                    <p className="pHeaderModalVeiculoDashboard">ADICIONAR VE??CULO</p>
                    <FontAwesomeIcon className="iconClose" icon={faClose} onClick={onClose} style={{ cursor: 'pointer' }} color="red" size="3x" />
                </div>
                <form form encType="multipart/form-data" className="conteudos">
                    <div className="conteudo">
                        <div className='formularioCadastroVeiculoDashboard'>
                            <div className='juntaInputs'>
                                <div className='inputs-esq'>
                                    <MaskedInputPlaca className='inputVeiculoDashboard' mask="aaa-9999" placeholder='Placa' name='placa' onChange={(e) => setPlaca(e.target.value.toUpperCase())} />
                                    <select className='inputVeiculoDashboard' type='text' name='marca' placeholder='Marca' onChange={(e) => setMarca(e.target.value)}>
                                        <option value='0' disabled selected >Marca</option>
                                        {Marcas.map((marca) => {
                                            return (
                                                <option key={marca.idMarca} value={marca.idMarca}>
                                                    {marca.nomeMarca}
                                                </option>
                                            )
                                        })}</select>
                                    <input className='inputVeiculoDashboard' type='date' name='data' placeholder='Data de aquisi????o' onChange={(e) => setData(e.target.value)} />
                                </div>
                                <div className='inputs-dir'>
                                    <select className='inputVeiculoDashboard selectsVeiculoDashboard' type='text' name='status' placeholder='Status'>
                                        <option value='0' disabled selected>Status</option>
                                        {TipoStatus.map((status) => {
                                            return (
                                                <option key={status.idStatus} value={status.idStatus}>
                                                    {status.nomeStatus}
                                                </option>
                                            )
                                        })}
                                    </select>
                                    <select className='inputVeiculoDashboard selectsVeiculoDashboard' type='text' name='tipoVeiculo' onChange={(e) => setTipoVeiculo(e.target.value)}>
                                        <option value='0' disabled selected>Tipo de ve??culo</option>
                                        {TipoVeiculos.map((tipoVeiculo) => {
                                            return (
                                                <option key={tipoVeiculo.idTipoVeiculo} value={tipoVeiculo.idTipoVeiculo}>
                                                    {tipoVeiculo.nomeTipoVeiculo}
                                                </option>
                                            )
                                        })}
                                    </select>
                                    <select className='inputVeiculoDashboard selectsVeiculoDashboard' type='text' name='carroceria' onChange={(e) => setIdCarroceria(e.target.value)}>
                                        <option value='0' disabled selected>Carroceria</option>
                                        {Carrocerias.map((carroceria) => {
                                            return (
                                                <option key={carroceria.idCarroceria} value={carroceria.idCarroceria}>
                                                    {carroceria.idCarroceria}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <input type="file" id="arquivo" className="imgCadastrarVeiculoDashboard" style={{ cursor: 'pointer' }} accept="image/png; image/jpeg" />
                        </div>
                    </div >
                    <button onClick={(e) => AdicionarVeiculo(e)} className='btn_cadastro_Dashboard' type='submit'><p className='pCadastro'>Cadastrar</p></button>
                </form >
            </div >
        </div >
    );
};

export default Modal;