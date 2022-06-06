import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import Header from '../../components/headers/header';
import Sidebar5 from '../../components/sidebars/sidebar5';
import Footer from '../../components/footer';

import axios from 'axios';

import './checklist.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { useUpdateEffect } from 'rsuite/esm/utils';


export default function Checklists() {

    const notyf = new Notyf();

    const [ListaCheckList, setListaChecklist] = useState([]);

    const [Pesquisa, setPesquisa] = useState('');
    const [ListaPlacas] = useState([]);
    const [ListaVeiculos, setListaVeiculos] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [Percentual, setPercentual] = useState(false);

    function PesquisaPlaca() {

        if (isSearch === false) {
            //Para criar a lista de placas
            for (let i = 0; i < ListaVeiculos.length; i++) {

                //Para puxar cada veiculo da lista
                const objetoVeiculo = ListaVeiculos[i]

                //Para transformar a lista de atributos em string
                let veiculoString = JSON.stringify(objetoVeiculo);

                //Para verificarmos a quantidade de campos da string
                let tamanhoArray = veiculoString.split(',').length

                //Verificar se a quantidade é igual a 30(Sem imagem)
                if (tamanhoArray === 30) {
                    //Pega a placa da string e coloca ela na lista de placas
                    ListaPlacas.push(veiculoString.split(',')[6].split(':')[1].replace('"', "").split('"')[0])
                }

                //Com imagem
                else {
                    //Pega a placa da string e coloca ela na lista de placas
                    ListaPlacas.push(veiculoString.split(',')[7].split(':')[1].replace('"', "").split('"')[0])
                }
            }
            setIsSearch(true);
        }

        //Verifica se as letras digitadas correspondem a alguma placa da lista de placas
        for (let i = 0; i < ListaPlacas.length; i++) {
            //Se Corresponde
            if (ListaPlacas[i].match(Pesquisa)) {
                //Torna o item visivel
                var elemst = document.getElementsByClassName(ListaPlacas[i]);
                for (var b = 0; b < elemst.length; b += 1) {
                    elemst[b].style.display = 'initial';
                }
            }
            //Se não corresponde, torna o item oculto
            else {
                var elems = document.getElementsByClassName(ListaPlacas[i]);
                for (var a = 0; a < elems.length; a += 1) {
                    elems[a].style.display = 'none';
                }
            }
        }
    }

    function buscarChecklists() {
        axios('https://backend-saf-api.azurewebsites.net/ListarMenoresCorrespondentes/70',)
            .then(response => {
                if (response.status === 200) {
                    setListaChecklist(response.data);
                }
            })
            .catch(erro => console.log(erro));

        axios.get('https://backend-saf-api.azurewebsites.net/api/Veiculos')
            .then(response => {
                if (response.status === 200) {
                    setListaVeiculos(response.data)
                }
            })
    };

    function deletar(idChecklist) {
        axios.delete('https://backend-saf-api.azurewebsites.net/api/CheckList/' + idChecklist)
            .then(resposta => {
                if (resposta.status === 204) {
                    notyf.success(
                        {
                            message: 'Checklist excluído com êxito',
                            duration: 3000,
                            position: {
                                x: 'right',
                                y: 'top',
                            }
                        }
                    );
                }
            }
            )
    }

    useEffect(buscarChecklists, [ListaCheckList]);
    useUpdateEffect(PesquisaPlaca, [Pesquisa]);

    return (
        <div>
            <Sidebar5 />
            <Header />

            <main>
                <div className="wrapperChecklist">
                    <p className="pChecklist">Checklists</p>

                    <div className="input-e-btn">
                        <div className="input-e-btn-2">
                            <input onSubmit={PesquisaPlaca} onChange={(e) => setPesquisa(e.target.value.toUpperCase())} className='inputBusca' type="text" placeholder="Pesquisar" />
                            <button onClick={PesquisaPlaca} className='btnBuscar' type='submit'><p>Buscar</p></button>
                        </div>
                    </div>

                    <div className="cardCabecalhoChecklists">
                        <div className="conteudoCabecalhoChecklist">
                            <div className="alinharEtiquetasCabecalhoChecklists">
                                <div className="etiquetasCabecalhoChecklists">
                                    <div className="etiquetaCabecalhoChecklist">
                                        <div className="nomeCabecalhoEtiquetaChecklist">Checklist</div>
                                    </div>
                                    <div className="etiquetaCabecalhoChecklist">
                                        <p className="nomeCabecalhoEtiquetaChecklist">Usuário</p>
                                    </div>
                                    <div className="etiquetaCabecalhoChecklist">
                                        <div className="nomeCabecalhoEtiquetaChecklist">Placa</div>
                                    </div>

                                    <div className="etiquetaCabecalhoChecklist">
                                        <p className="nomeCabecalhoEtiquetaChecklist">Data</p>
                                    </div>
                                    <div className="etiquetaCabecalhoChecklist">
                                        <p className="nomeCabecalhoEtiquetaChecklist">Percentual</p>
                                    </div>
                                    <div className="etiquetaCabecalhoChecklist">
                                        <p className="nomeCabecalhoEtiquetaChecklist"></p>
                                    </div>
                                </div>
                                <div className="iconesEtiquetaChecklist" />
                            </div>
                        </div>
                    </div>

                    {
                        ListaCheckList.map((checklist) => {
                            return (
                                <div className={checklist.idVeiculo}>
                                    <div className="cardChecklist">
                                        <div className="conteudoChecklist">
                                            <div className="alinharEtiquetasChecklist">
                                                <div className="etiquetasChecklists">
                                                    <div className="etiquetaChecklist">
                                                        <div className="nomeEtiquetaChecklist">{checklist.idTipoCheckListNavigation.nomeTipoCheckList}</div>
                                                    </div>
                                                    <div className="etiquetaChecklist">
                                                        <div className="nomeEtiquetaChecklist">{checklist.idUsuarioNavigation.nome}</div>
                                                    </div>
                                                    <div className="etiquetaChecklist">
                                                        <div className="nomeEtiquetaChecklist">{checklist.idVeiculoNavigation.placa}</div>
                                                    </div>
                                                    <div className="etiquetaChecklist">
                                                        <p className="nomeEtiquetaChecklist">{Intl.DateTimeFormat("pt-BR", {
                                                            year: 'numeric', month: 'numeric', day: 'numeric'
                                                        }).format(new Date(checklist.dataCheckList))}</p>
                                                    </div>
                                                    <div className="etiquetaChecklist" style={{ backgroundColor: 'red' }}>

                                                        {checklist.porcentagemFrontal < checklist.porcentagemTraseira && checklist.porcentagemFrontal < checklist.porcentagemLateralDireita && checklist.porcentagemFrontal < checklist.porcentagemLateralEsquerda ?
                                                            <p className="nomeEtiquetaChecklist">{checklist.porcentagemFrontal}%</p>
                                                            :
                                                            checklist.porcentagemTraseira < checklist.porcentagemFrontal && checklist.porcentagemTraseira < checklist.porcentagemLateralDireita && checklist.porcentagemTraseira < checklist.porcentagemLateralEsquerda ?
                                                                <p className="nomeEtiquetaChecklist">{checklist.porcentagemTraseira}%</p>
                                                                :
                                                                checklist.porcentagemLateralDireita < checklist.porcentagemTraseira && checklist.porcentagemLateralDireita < checklist.porcentagemLateralEsquerda && checklist.porcentagemLateralDireita < checklist.porcentagemFrontal ?
                                                                    <p className="nomeEtiquetaChecklist">{checklist.porcentagemLateralDireita}%</p>
                                                                    :
                                                                    <p className="nomeEtiquetaChecklist">{checklist.porcentagemLateralEsquerda}%</p>
                                                        }

                                                    </div>
                                                </div>
                                                <div className='iconeSeta'>
                                                    <div className="nomeEtiquetaChecklist">
                                                        <Link to="/compararImgs"><FontAwesomeIcon className="iconeSeta" icon={faArrowAltCircleRight} style={{ cursor: 'pointer', color: '#0E758C' }}></FontAwesomeIcon></Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="iconesEtiquetaChecklist">
                                                <FontAwesomeIcon className="iconTrashCan" icon={faTrashCan} style={{ cursor: 'pointer' }} size="2x" onClick={() => deletar(checklist.idCheckList)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </main>
            <Footer />
        </div >
    );
};