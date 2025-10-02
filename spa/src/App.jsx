import React from 'react'
import { useState } from 'react'
import './styles/variables.css';
import './styles/global.css'
import Button from './components/UI/Button'
import Input from './components/UI/Input'


function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
            <div>
                <form>

                    <Input
                        label="E-mail"
                        type="email"
                        name="userEmail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Digite seu e-mail"
                        required
                    />
                    <Input
                        label="Senha"
                        type="password"
                        name="userPass"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        required
                    />
                </form>
                <Button onClick={() => alert('clickou')} >Clique aqui</Button>
            </div>
        </>
    )
}

export default App
