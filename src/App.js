import { useEffect, useState } from 'react';
import './App.css';
import { VismaIdentityRequest } from './classes/VismaIdentityRequest';

function App() {
  const [uri, setUri] = useState('')
  const [error, setError] = useState('')
  const [deconstUri, setDeconstUri] = useState(null)

  useEffect(() => {
    setTimeout(() => setError(''), 5000)
  }, [error])

  const handleSubmit = async uri => {
    try {
      const handledUri = new VismaIdentityRequest(uri)
      setDeconstUri(handledUri)
    } catch(err) {
      setDeconstUri(null)
      setError(err.message)
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Deconstruct Visma Identity URI</h1>
        <div className="input-wrapper">
            <input value={uri} 
                   onChange={(event => setUri(event.target.value))} 
                   type="text" name="uri" 
                   id="uri" 
                   placeholder="URI"
            />
            {error && <p className="error">{error}</p>}
            <button onClick={() => handleSubmit(uri)}>Ok</button>
        </div>

    </div>
    {deconstUri 
    && <div className="container">
          <h1>Deconstructed URI</h1>
          {Object.keys(deconstUri).map(key => {
            return (
              <p className="uri-param">{key}: {deconstUri[key]}</p>
            )
          })}
          
      </div>
    }
    </div>
  );
}

export default App;
