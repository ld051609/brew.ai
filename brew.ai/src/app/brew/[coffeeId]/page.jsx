// 'use client'
import styles from './brewId.module.css'
import Image from 'next/image';

const fetchData = async (id) => {
  try{
      const response = await fetch(`https://fake-coffee-api.vercel.app/api/${id}`);
      if(!response.ok){
          throw new Error('Failed to fetch data')   
      }
      const data = await response.json()
      return data;
  }catch(error){
      console.log(error)
  }
}

const SingleBeanCard = async ({params}) => {
  // const router = useRouter();
  const {coffeeId} = params
  console.log(coffeeId)
  const coffeeArray = await fetchData(coffeeId)
  const coffee = coffeeArray[0]

  const roastLevel = coffee.roast_level;



  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image 
          src={coffee.image_url} 
          className={styles.img} 
          width={1000} 
          height={800}
        />
      </div>

      <div className={styles.textContainer}>
        <div className={styles.productDetail}>
          <h1 className={styles.name}>{coffee.name}</h1>
          <p className={styles.description}>{coffee.description}</p>

          <p className={styles.price}>${coffee.price}/{coffee.weight}g</p>
        </div>

        <div className={styles.regionAndRoast}>
          <div className={styles.region}>
            <h2>Region:</h2>
            <span className={styles.region2}>{coffee.region}</span>

          </div>

          <div className={styles.roast}>
          <h2>Roast Level</h2>
          <div className={styles.roastLevel}>
            {/* <p>{coffee.roast_level} </p> */}
            <div className={styles.circle} style={{backgroundColor: roastLevel >=1 ? "#1c1b1b" : "transparent"}}></div>
            <div className={styles.circle} style={{backgroundColor: roastLevel >=2 ? "#1c1b1b" : "transparent"}}></div>
            <div className={styles.circle} style={{backgroundColor: roastLevel >=3 ? "#1c1b1b" : "transparent"}}></div>
            <div className={styles.circle} style={{backgroundColor: roastLevel >=4 ? "#1c1b1b" : "transparent"}}></div>
            <div className={styles.circle} style={{backgroundColor: roastLevel >=5 ? "#1c1b1b" : "transparent"}}></div>

          </div>

        </div>
        </div>

       

        <hr className={styles.break}/>

        <div className={styles.flavor}>
          <h2>Flavor</h2>
          <ul className={styles.listFlavor}>
          {coffee.flavor_profile.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
          </ul>
        </div>

        <div className={styles.grind}>
          <h2>Grind Options</h2>
            <ul className={styles.grindOption}>
            {coffee.grind_option.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
            </ul>

        </div>


      </div>
    </div>
  );
};

export default SingleBeanCard;
