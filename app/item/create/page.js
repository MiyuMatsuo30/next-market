"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import useAuth from "../../utils/useAuth"

const CreateItem = () => {
    const [newItem, setNewItem] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
    })
    const router = useRouter()
    const loginUserEmail = useAuth()
    console.log(loginUserEmail)
    const handleChange = (e) => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/api/item/create", {
                method: "POST",
                headers: {
                    "Accept": "apprication/json",
                    "Context-Type": "apprication/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    ...newItem,
                    email: loginUserEmail
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)
            router.push ("/")
            router.refresh()
        } catch {
            alert("アイテム作成失敗")
        }
    }
    if (loginUserEmail) {
        return (
            <div>
                <h1 className="page-title">アイテム作成</h1>
                <form onSubmit={handleSubmit}>
                    <input value={newItem.title} onChange={handleChange} type="text" name="title" placeholder="アイテム名" required />
                    <input value={newItem.price} onChange={handleChange} type="text" name="price" placeholder="価格" required />
                    <input value={newItem.image} onChange={handleChange} type="text" name="image" placeholder="画像" required />
                    <textarea value={newItem.description} onChange={handleChange} type="text" name="description" rows={15} placeholder="商品説明" required></textarea>
                    <button>作成</button>
                </form>
            </div>
        )
    }
}

export default CreateItem