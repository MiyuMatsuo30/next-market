"use client"
import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {
                method: "POST",
                headers: {
                    "Accept": "apprication/json",
                    "Contect-type": "apprication/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const jsonData = await response.json()
            localStorage.setItem("token", jsonData.token)
            alert(jsonData.message)
        } catch {
            alert("ログイン失敗")
        }
    }
    return (
        <div>
            <h1 className="page-title">ログイン</h1>
            <form action="http://localhost:3000/api/user/login" method="POST" onSubmit={handleSubmit}>
                <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="text" name="email" placeholder="メールアドレス" required />
                <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="text" name="password" placeholder="パスワード" required />
                <button>ログイン</button>
            </form>
        </div>
    )
}

export default Login