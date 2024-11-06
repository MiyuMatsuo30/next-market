"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import useAuth from "../../../utils/useAuth"

const UpdateItem = (context) => {
    const [selectedItem, setSelectedItem] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
        email: ""
    })
    const router = useRouter()
    const loginUserEmail = useAuth()
    useEffect(() => {
        const getSingleItem = async(id) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache: "no-store"})
            const jsonData = await response.json()
            const singleItem = jsonData.singleItem
            setSelectedItem({
                title: singleItem.title,
                price: singleItem.price,
                image: singleItem.image,
                description: singleItem.description,
                email: singleItem.email,
            })
        }
        getSingleItem(context.params.id)
    }, [context])
    const handleChange = (e) => {
        setSelectedItem({
            ...selectedItem,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${context.params.id}`, {
                method: "PUT",
                headers: {
                    "Accept": "apprication/json",
                    "Context-Type": "apprication/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    ...selectedItem,
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
    if (loginUserEmail === selectedItem.email) {
        return (
            <div>
                <h1 className="page-title">アイテム編集</h1>
                <form onSubmit={handleSubmit}>
                    <input value={selectedItem.title} onChange={handleChange} type="text" name="title" placeholder="アイテム名" required />
                    <input value={selectedItem.price} onChange={handleChange} type="text" name="price" placeholder="価格" required />
                    <input value={selectedItem.image} onChange={handleChange} type="text" name="image" placeholder="画像" required />
                    <textarea value={selectedItem.description} onChange={handleChange} type="text" name="description" rows={15} placeholder="商品説明" required></textarea>
                    <button>編集</button>
                </form>
            </div>
        )
    } else {
        return <h1>権限がありません</h1>
    }
}

export default UpdateItem