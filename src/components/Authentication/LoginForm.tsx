import React, { useState } from 'react'
import Button from '../../shared/Button'
import Form from '../../shared/Form'
import Input from '../../shared/Input'

const LoginForm = () => {
    const [form, setForm] = useState({
        user:'',
        pass: ''
    })

    const handleLogin = () => {
        console.table(form)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
    
        setForm({
            ...form,
            [name]: value
        })
    }

    return <Form title="Login - AlgaStock" onSubmit={handleLogin}>
        <Input 
            label="User"
            name="user"
            value={form.user}
            onChange={handleInputChange}
            placeholder="Enter you user login here..."
        />
        <Input 
            type="password"
            label="Password"
            value={form.pass}
            onChange={handleInputChange}
            name="pass"
        />
        <Button>
            Login
        </Button>
    </Form>
}

export default LoginForm
