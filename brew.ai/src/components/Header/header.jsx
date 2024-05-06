import Image from 'next/image'
import styles from './header.module.css'
import Navbar from '../Navbar/navbar'
import Button from '../Button/button'
const Header = () => {
  return (
    <div className={styles.container}>
        {/* <div className={styles.imgContainer}>
            <Image 
            className={styles.img}
            src='/lavender.png'
            height={170}
            width={3000}
            />
        </div> */}
        <div className={styles.navContainer}>
            {/* <Image 
            className={styles.heroImage}
            src='/cute.gif'
            height={100}
            width={100}
            /> */}
            <h1 className={styles.brandName}>BrewAi</h1>
            <Navbar className={styles.navbar}/>
            <Button/>
        </div>


    </div>
  )
}

export default Header
