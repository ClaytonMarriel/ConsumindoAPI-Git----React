import styled, {keyframes, css} from 'styled-components'

export const Form = styled.form `
margin-top: 30px;
display:flex;
flex-direction:row;

input {
  flex:1;
  border:1px solid #eee;
  padding:10px 15px;
  border-radius:4px;
  font-size:16px;
}
`
//Criar animações
const rotate = keyframes `
from{
 transform: rotate(0deg);
}
to{
  transform:rotate(360deg)
}
`
//Acessando propriedades do componente
//Usar atributos do submitButton

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
})) `
background:#715ac1;
border:0;
padding:0 15px;
margin-left: 10px;
border-radius:4px;

display:flex;
justify-content:center;
align-items:center;

//estilizando botão quando ele estiver disabled
&[disabled] {
  cursor: not-allowed;
  opacity:0.6;
}
//Se loading is true executa animação
//Adicionar conjunto de css  a um elemento
//Baseado alguma informação que vem de fora
${props => props.loading && css `
svg{
  animation: ${rotate} 2s linear infinite
}
`}

`
export const List = styled.ul`
   list-style:none;
   margin-top: 30px;

   li {
     padding:15px 0;
     display:flex;
     flex-direction: row;
     justify-content: space-between;
     align-items:center;

     & + li {
      border-top: 1px solid #eee;
     }
   }

   a {
     color:#715ac1;
     text-decoration:none;
   }
`

