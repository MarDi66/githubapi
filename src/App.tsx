import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { Error } from './classes/Error';
import { GitHubUser } from './classes/GitHubUser';
import NoUserFound from './components/NoUserFound';
import UserCard from './components/UserCard';

function App() {

  // State local
  const [ nameInput, setNameInput ] = useState<string>('')
  const [ usersList, setUsersList ] = useState<Array<GitHubUser>>()
  const [ error, setError ] = useState<Error>(new Error())


  useEffect(() => {

    // Timeout pour la recherche automatique, permet de ne pas trigger à chaque input
    const delaySearchFn = setTimeout(() => {
      
      fetch(`https://api.github.com/search/users?q=${ nameInput }`)
      .then(res => res.json())
      .then(res => setUsersList(res.items))
      .catch(() => setError({ error: true, message: 'OOPS ! Seems like there\'s something wrong...' }))

    }, 500)

    return () => clearTimeout(delaySearchFn)

  }, [nameInput])

  
  // --- HANDLERS --- //
  // Changement de value de l'input de recherche
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => setNameInput(e.target.value)


  // Constantes
  const usersDisplay = usersList?.length === 0 ? <NoUserFound userName={ nameInput } /> : usersList?.map(user => <UserCard key={ user.id } user={ user } />)


  return (
    <div className="App">

      <h1>Github Users Search Engine</h1>

      { 
        !error.error &&
          <>
            <input autoFocus type='text' value={ nameInput } onChange={ handleChangeInput } />

            <div className='users_list_container'>
              { usersDisplay }
            </div>
          </>
      }

      { 
        error.error &&
          <div>{ error.message }</div>
      }
      
    </div>
  );
}

export default App;
