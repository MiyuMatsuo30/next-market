"use client"
import { useState } from "react"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = fetch("http://localhost:3000/api/user/register", {
                method: "POST",         // リクエストの種類
                headers: {              // データの種類、補足情報
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })                      // バックエンドに送信するデータ
            })
            const jsonData = await response.json()
            alert(jsonData.message)
        } catch {
            alert("ユーザ登録失敗")
        }
    }
    return (
    <div>
        <h1>ユーザー登録</h1>
        <form action="http://localhost:3000/api/user/register" method="POST" onSubmit={handleSubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="名前" required/>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required/>
            <button>登録</button>
        </form>
    </div>
    )
}

export default Register