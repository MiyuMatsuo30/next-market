"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import useAuth from "../../utils/useAuth"

const DeleteItem = (context) => {
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
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${context.params.id}`, {
                method: "DELETE",
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
            alert("アイテム削除失敗")
        }
    }
    if (loginUserEmail === selectedItem.email) {
        return (
            <div>
                <h1 className="page-title">アイテム削除</h1>
                <form onSubmit={handleSubmit}>
                    <h2>{selectedItem.title}</h2>
                    <Image src={selectedItem.image} width={750} height={500} alt="item-image" priority />
                    <h3>¥{selectedItem.price}</h3>
                    <p>{selectedItem.description}</p>
                    <button>削除</button>
                </form>
            </div>
        )
    } else {
        <h1>権限がありません</h1>
    }
}

export default DeleteItem