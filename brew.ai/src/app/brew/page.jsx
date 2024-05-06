import styles from './brew.module.css'
import BeanCard from '@/components/BeanCard/beanCard';
//Fetch data with an real api -> get all the coffee
const fetchData = async () => {
    try{
        const response = await fetch('https://fake-coffee-api.vercel.app/api/');
        if(!response.ok){
            throw new Error('Failed to fetch data')   
        }
        const data = await response.json()
        return data;
    }catch(error){
        console.log(error)
    }
}

const BrewPage = async () => {
    const coffees = await fetchData();
  
    return (
      <div className={styles.container}>
        {coffees.map( (coffee) => ( (coffee.id !== 3 && coffee.id !== 17 &&
            <div>
                <BeanCard coffee = {coffee}/>
            </div>)
        )) }
      </div>
    )
}
export default BrewPage