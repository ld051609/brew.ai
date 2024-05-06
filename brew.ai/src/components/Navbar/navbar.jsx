import styles from './navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'
const Navbar = () => {
  return (
    <div>
      <nav className={styles.rightContainer}>
        <ul className={styles.navContainer}>
            <Link className={styles.link} href='/'>Homepage</Link>
            <Link className={styles.link}  href='/brew'>Beans</Link>
            <Link className={styles.link}  href='/rec'>CoffeeMatch</Link>

        </ul>
    </nav>

    <div className={styles.leftContainer}>

    </div>
    </div>


    


    

  )
}

export default Navbar
