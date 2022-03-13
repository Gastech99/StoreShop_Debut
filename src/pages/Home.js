import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import fireDB from '../Firebase'
import { products } from '../ProductsData';
import { useNavigate } from 'react-router-dom';


function Home() {
    useEffect(() => {
        getData()
    }, [])
    const [products, setProducts] = useState([])
    const navigate = useNavigate();
    async function addData (){
        try {
            await addDoc(collection(fireDB, "usres"), {name: "Djimo", age: 22})
        } catch (error) {
            console.log(error)
        }
    }
    
    async function getData (){
        try {
            const users = await getDocs(collection(fireDB, "produits"))
            const productsArray = []
            users.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                const obj={
                    id:doc.id,
                    ...doc.data(),
                };
                productsArray.push(obj)
            });
            setProducts(productsArray)
        } catch (error) {
            console.log(error)
        }
    }

    function addProductsData (){
        products.map(async (product) => {
            try {
                await addDoc(collection(fireDB, "produits"), product)
            } catch (error) {
                console.log(error)
            }
        })
    }

  return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    {products.map((product, index) => {
                        return <div className='col-md-4'>
                            <div className='m-2 p-1 product position-relative'>
                                <div className='product-content' key={index}>
                                    <p>{product.name}</p>
                                    <div className='text-center'>
                                        <img src={product.imageUrl} alt="image" className='product-image' />
                                    </div>
                                </div>
                                <div className='product-actions'>
                                    <h2>{product.price} fcfa</h2>
                                    <div className='d-flex'>
                                        <button className='mx-2'>Acheter</button>
                                        <button onClick={() => {
                                            navigate(`/productsinfos/${product.id}`)
                                        }}>Voir</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    } )}
                </div>
            </div>
        </Layout>
  )
}

export default Home