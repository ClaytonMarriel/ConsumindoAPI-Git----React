import React, {Component} from 'react'

import {FaGithubAlt, FaPlus, FaSpinner} from 'react-icons/fa'

import api from '../../services/api'

import {Container, Form, SubmitButton, List} from './styles'

export default class Main extends Component{
  //Armazenar dados do input do usuário
  state={
    newRepo:'',
    repositories:[],
    loading: false,
  }

  //Através dessa função
  //Está armazenando o valor do input
  //Dentro da váriavel newRepo
  handleInputChange = e =>{
    this.setState({newRepo: e.target.value})
  }

//Função que recebe os dados do formulário
//Chamada a API
  handleSubmit = async e =>{
    e.preventDefault();
    this.setState({loading:true})

    //Repo digitado pelo usuário
    const {newRepo, repositories} = this.state
    //Buscando a informação na API
    const response = await api.get(`/repos/${newRepo}`)

    //armazenando as informações no state
    //Exibindo na tela
    const data = {
      name: response.data.full_name
    }
    //Adicionando um novo repositório e mantendo o atual
    //Copiando todas as informações que já tem nele
    //Adicionando no final
       this.setState({
         repositories: [...repositories, data],
         newRepo: '',
         loading:false
       })
  }

  render(){
  const {newRepo,repositories, loading} = this.state

  return(
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>

      <Form onSubmit={this.handleSubmit}>
       <input
        type="text"
        placeholder="Adicionar repositório"
        value={newRepo}
        onChange={this.handleInputChange}
        />

        <SubmitButton loading={loading}>
          {loading ? (
          <FaSpinner color='#FFF' size={14}/>
          ) : (
         <FaPlus color="#FFF" size={14} />
         )}
         </SubmitButton>
      </Form>

      <List>
      {repositories.map(repository =>(
        <li key={repository.name}>
          <span>{repository.name}</span>
          <a href="">Detalhes</a>
        </li>
      ))}
      </List>
    </Container>


  )
}
}


