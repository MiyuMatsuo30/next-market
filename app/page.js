// Next.jsの場合、基本的にサーバコンポーネントであり、"use client"と先頭に記述するとクライアントコンポーネントになる
import Link from "next/link"
import Image from "next/image"

const getAllItems = async() => {
  const response = await fetch("http://localhost:3000/api/item/readall", {cache: "no-store"})  //GETがデフォルトなのでmethodの詳細は不要
  const jsonData = await response.json()
  const allItems = jsonData.allitems
  return allItems
}

const ReadAllItems = async() => {
  const allItems = await getAllItems()
  return (
    <div>
      <h1 className="h1-style">こんにちは</h1>
      {allItems.map(item => 
        <Link href={`/item/readsingle/${item._id}`} key={item._id}>
          <Image src={item.image} width={750} height={500} alt="item-image" priority />
          <h2>{item.price}</h2>
          <h3>{item.title}</h3>
          <p>{item.description.substring(0,80)}...</p>
        </Link>
      )}
    </div>
  )
}

export default ReadAllItems