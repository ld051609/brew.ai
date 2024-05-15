import React from 'react'
import styles from './page.module.css'
const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* <h1>Welcome to Brew.ai</h1> */}
      <h2>Discover Your Perfect Cup of Coffee</h2>
      <p>At Brew AI, we're passionate about helping you find the perfect coffee match tailored to your taste preferences. Whether you're a coffee connoisseur or just starting your coffee journey, our intelligent matching algorithm is here to guide you.</p>
    
      <h2>How It Works:</h2>
      <p><strong>Explore Coffee:</strong> Click on the "Brew" tab in the navigation bar to browse through a curated selection of coffee beans. Each coffee listing includes detailed information about the origin, flavor profile, and brewing recommendations.</p>
      <p><strong>Find Your Match:</strong> Head over to the "CoffeeMatch" tab to discover your ideal coffee match. Our AI-powered matching algorithm analyzes your taste preferences and recommends the perfect coffee beans that suit your palate.</p>
    
      <h2>Why Choose Brew AI:</h2>
      <p><strong>Personalized Recommendations:</strong> Our advanced AI technology learns from your preferences to deliver personalized coffee recommendations that match your taste profile.</p>
      <p><strong>Curated Selection:</strong> We handpick the finest coffee beans from top roasters and growers worldwide, ensuring quality and freshness with every cup..</p>
      <p><strong>Expert Insights:</strong> Learn about different coffee varieties, brewing methods, and flavor profiles with our expert insights and educational resources.</p>

    </div>
  )
}

export default HomePage
