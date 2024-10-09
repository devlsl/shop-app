import { useState } from 'react';
import { api } from './api';

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type='text'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => api.signOut().then(console.log)}>
                sign out
            </button>
            <button
                onClick={() =>
                    api
                        .signInByEmailAndPassword({ email, password })
                        .then(console.log)
                }
            >
                sign in
            </button>
            <button
                onClick={() =>
                    api
                        .signUpByEmailAndPassword({ email, password })
                        .then(console.log)
                }
            >
                sign up
            </button>
            <button onClick={() => api.checkAuth().then(console.log)}>
                authme
            </button>
        </>
    );
}

export default App;
