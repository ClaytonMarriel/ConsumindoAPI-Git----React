import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../../services/api'

import Container from '../../components/Container'
import {Loading, Owner} from './styles'

export default class Repository extends Component {
static propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string
    })
  }).isRequired,
}

  state = {
    repository: {},
    issues: [],
    loading: true
  }

   async componentDidMount(){
     //Armazenando dado dos repositórios
      const {match} = this.props

//Aqui o repoName recebe o nome do repositório
//Dado que vem através da URL
const repoName = decodeURIComponent(match.params.repository)

//De forma assincrona, ele carrega as duas URLs juntas
//Porém de forma independente, com o array
const [repository, issues] = await Promise.all([
  api.get(`/repos/${repoName}`),
  api.get(`/repos/${repoName}/issues`, {
    params:{
      state: 'open',
      per_page:5,
    }
  })
])
    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading:false,
    })

   }


render(){
  const {repository, issues, loading} = this.state

  if(loading) {
    return <Loading>Carregando</Loading>
  }

  return (
    <Container>
      <Owner>
        <Link to="/">Voltar aos repositórios</Link>
        <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner>
      </Container>
    )
  }
}



