'use client'

import styles from './beanCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const BeanCard = ({coffee}) => {
  const router = useRouter();
  const handleClick = (id) => {
    router.push(`/brew/${id}`);
  };

  return (
    <div className={styles.container}>
        <div className={styles.imgContainer}>
            <Image 
            src={coffee.image_url} 
            className={styles.img} 
            width={700} 
            height={500}
            alt=''/>
        </div>

        <div className={styles.textContainer}>
            <h1 className={styles.coffeeName}>{coffee.name}</h1>

            <h2 className={styles.coffeePrice}>$ {coffee.price}</h2>
            {/* <h2 className={styles.roast}>ROAST LEVEL: {coffee.roast_level}</h2> */}

            <button onClick={() => handleClick(coffee.id)} className={styles.readmoreBtn}>
              READMORE
            </button>


        </div>

      
    </div>
  )
}

export default BeanCard
