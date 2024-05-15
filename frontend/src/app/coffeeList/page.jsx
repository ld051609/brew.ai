'use client'
import CoffeeCard from '@/components/CoffeeCard/coffeeCard';
import { useState, useEffect } from 'react';
import styles from './coffeeList.module.css'

const fetchData = async (id) => {
    try{
        const response = await fetch(`https://fake-coffee-api.vercel.app/api/${id}`);
        if(!response.ok){
            throw new Error('Failed to fetch data')   
        }
        const data = await response.json()
        console.log(data)
        return data[0];
    }catch(error){
        console.log(error)
    }
}
const Page = () => {
    const [coffeeTypes, setCoffeeTypes] = useState([]);
    const [coffeeLink, setCoffeeLinks] = useState([]);

    useEffect(() => {
        const fetchDataForCoffeeTypes = async () => {
            const coffeeTypesString = localStorage.getItem('coffeeTypes');
            if (coffeeTypesString) {
                const arr = coffeeTypesString.split(',');
                const filterArr = arr.filter(e => e !== '3' && e !== '17');

                const fetchedData = await Promise.all(filterArr.map(async (coffeeId) => {
                    const jsonRes = await fetchData(coffeeId);
                    return jsonRes;
                }));

                setCoffeeLinks(fetchedData);
                setCoffeeTypes(filterArr);
            }
        };

        fetchDataForCoffeeTypes();
    }, []); // Empty dependency array to ensure useEffect runs only once

    return (
        <div>
            <ul className={styles.container}>
                {coffeeLink.map( (coffeeLinkReturn, index) => {
                    return <CoffeeCard coffee={coffeeLinkReturn} key={index} className={styles.box}/>
                })}
            </ul>
        </div>
    );
};

export default Page;
