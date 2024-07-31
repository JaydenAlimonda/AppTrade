import { useState } from 'react'



export default function AuthForm(props) {
    const { submit, btnText, errMsg } = props
    const [input, setInput] = useState({
        username: "",
        password: ""
    })

    function handleChange(e) {
        const { name, value } = e.target
        setInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        })

    }
    function handleSubmit(e) {
        e.preventDefault()
        console.log(input)
        submit(input)

    }


    return (
        <div className='auth--form--container'>
            <form onSubmit={handleSubmit} >
                <input type="text"
                    name='username'
                    value={input.username}
                    onChange={handleChange}
                    placeholder='User'
                    className='auth--input'
                />
                <input type="password"
                    name='password'
                    value={input.password}
                    onChange={handleChange}
                    placeholder='Pass'
                    className='auth--input'
                />
                <p style={{color: 'red'}}>{errMsg}</p>
                <button className='auth--input'>{btnText}</button>
            </form>
        </div>

    )


}