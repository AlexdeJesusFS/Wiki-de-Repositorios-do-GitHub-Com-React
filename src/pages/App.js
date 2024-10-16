
import { useState } from 'react';
import gitLogo from '../assets/github.png'
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import { Container } from './styles';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);


  const handleSearchRepo = async () => {
    try {
      const {data} = await api.get(`repos/${currentRepo}`)

      if (data.id) {

        const isExist = repos.find(repo => repo.id === data.id);

        if(!isExist){
          setRepos(prev => [...prev, data]);
          setCurrentRepo('')
          return
        }
      }
      alert('Repositório já listado abaixo!');
    } catch (error) {
      //verifica se foi encontrado ou houve erro na requisição:
      console.log('Erro ao buscar respositorio', error);
      error.response.status === 404 ? alert('Repositorio não existe! Verifique o nome ou procure outro repositório') : alert('Ocorreu um erro!');
    };
  };

  const handleRemoveRepo = (id) => {
    // utilizar filter.
    const newRepo = repos.filter(repo => repo.id !== id);
    setRepos(newRepo);
  };


  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo"/>
      {repos.length < 1 ? (
          <>
            <br/>
            <h3>Pesquise pelo repositório que deseja abaixo da seguinte forma:</h3>
            <h3>"nome-usario/repositorio"</h3>
          </>
        ) : null}
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;
