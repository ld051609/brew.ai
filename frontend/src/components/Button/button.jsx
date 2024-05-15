import styles from './button.module.css'

const Button = () => {
  return (
    <div className={styles.container}>
        <button className={styles.btn_login}>Login</button>
        <button className={styles.btn_signup}>Sign up</button>
      
    </div>
  )
}

export default Button
