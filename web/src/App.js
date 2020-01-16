import React, { useEffect, useState } from 'react';
import api from './services/api'

import './global.css'
import './App.css'
import './sidebar.css'
import './Main.css'

import DevItem from './components/DevItem/index'
import DevForm from './components/DevForm/index'

// Componente: Bloco isolado de HTML, CSS e JS. No qual, não interfere no restante da aplicação
// Propriedade: Informações que um componente PAI passa para o componente FILHO
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)

function App() {
  // Estados
  const [devs, setDevs] = useState([])

   useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      setDevs(response.data)
    }
    loadDevs()
  })

  // Cadastro
  async function handleAddDev(data) {
    const response = await api.post('/devs', data)
    // Incluir no final de array de devs para exibir na página
    setDevs([...devs], response.data) // Adição, copiando e adicionando o novo dev no final
  }

  return (
    <div id="app">
      <aside>
        <strong className="">Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}></DevForm>
 
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}></DevItem>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;