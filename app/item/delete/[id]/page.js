"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const DeleteItem = (context) => {
    const [selectedItem, setSelectedItem] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
        email: ""
    })
    const router = useRouter()
    useEffect(() => {
        const getSingleItem = async(id) => {
            const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`, {cache: "no-store"})
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
            const response = await fetch(`http://localhost:3000/api/item/delete/${context.params.id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "apprication/json",
                    "Context-Type": "apprication/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    ...selectedItem,
                    email: "ダミーデータ"
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
}

export default DeleteItem