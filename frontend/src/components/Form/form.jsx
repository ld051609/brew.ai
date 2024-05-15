'use client'
import React, { useState } from 'react';
import styles from './form.module.css'; // Import CSS module
import {useRouter} from 'next/navigation'

const Form = () => {
    const grindOptions = ['Whole Bean', 'Cafetiere', 'Filter', 'Espresso', 'French press', 'Pour Over'];
    const flavorOptions = ['Dark Chocolate', 'Black Cherry', 'Citrus', 'Cocoa', 'Hazelnut', 'Molasses', 'Nutty', 'Smooth', 'Citrusy', 'Spicy', 'Earthy', 'Cinnamon', 'Clove', 'Blueberry', 'Chocolate', 'Caramel', 'Almond', 'Toffee', 'Blackcurrant', 'Coconut', 'Cardamom', 'Espresso', 'Vanilla', 'Floral', 'Honey', 'Milk Chocolate', 'Tropical Fruit', 'Fruit'];
    const roastLevel = [1, 2, 3, 4, 5];
    const router = useRouter();

    
    const [selectedFlavor, setSelectedFlavor] = useState([])
    const [selectedGrind, setSelectedGrind] = useState([])

    const handleOnChangeFlavor = (e) => {
        const checkedBoxValue = e.target.value;
        // if user checked the box, add to the list if less than max allowed
        if (e.target.checked) {
            if (selectedFlavor.length < 3) {
                setSelectedFlavor(prev => ([...prev, checkedBoxValue])); // Correct usage of spread operator
            } else {
                // Uncheck the checkbox if the limit is exceeded
                e.target.checked = false;
                window.alert(`You can only select up to 3 checkboxes.`);

            }
        // if user unchecked the box, remove that from the list
        }else{
            setSelectedFlavor(selectedFlavor.filter(value => value !== checkedBoxValue))
        }
    };

    const handleOnChangeGrind = (e) => {
        const checkedBoxValue = e.target.value;
        // if user checked the box, add to the list if less than max allowed
        if (e.target.checked) {
            if (selectedGrind.length < 2) {
                setSelectedGrind(prev => ([...prev, checkedBoxValue])); // Correct usage of spread operator
            } else {
                // Uncheck the checkbox if the limit is exceeded
                e.target.checked = false;
                window.alert(`You can only select up to 2 checkboxes.`);

            }
        // if user unchecked the box, remove that from the list
        }else{
            setSelectedGrind(selectedGrind.filter(value => value !== checkedBoxValue))
        }
    };

    // Send the POST request to server
    async function handSubmitForm(e){
        localStorage.removeItem('coffeeTypes');

        e.preventDefault();


        const formData = new FormData();


        selectedFlavor.forEach(flavor => {
            formData.append('flavor', flavor)
        })

        selectedGrind.forEach(grind => {
            formData.append('grind', grind)
        })
        // roastLevel.forEach(roast => {
        //         formData.append('roastLevel', int(roast.value))
            
        // })
        const roastLevel = document.querySelector('input[name="roastLevel"]:checked');
        if (roastLevel) {
            formData.append('roastLevel', roastLevel.value);
        }
        try{
            const response = await fetch('http://localhost:5000/coffeeList',{
                method: 'POST',
                body: formData
            });
    
            if(!response.ok){
                throw new Error('Response is not OK')
            }
            const data = await response.json()
            console.log(data)
            const coffeeTypes = data.coffeeTypes; 
            localStorage.setItem('coffeeTypes', coffeeTypes)
            router.push("/coffeeList")

        }catch(error){
            console.log(error)
            alert('Error in catch block')
        }
    }

    
    return (
        <div  className={styles.container}>
            <form className={styles.container2} onSubmit={handSubmitForm}>
                <div className={styles.subContainer}>
                    <label className={styles.formLabel}>Flavor (Select Up To 3)</label>
                    <div className={styles.flavorSelection}>
                        {flavorOptions.map((opt, index) => (
                            <div key={index} className={styles.checkboxContainer}>
                                <input type="checkbox" name="flavor" value={opt === "Whole bean" ? "Whole Bean" : opt} className={styles.flavor} onChange={handleOnChangeFlavor} />
                                <label>{opt === "Whole bean" ? "Whole Bean" : opt}</label>
                            </div>
                        ))}
                    </div>

                </div>

                <div className={styles.subContainer}>
                    <label className={styles.formLabel}>Grind (Select Up To 2)</label>
                    <div className={styles.grindSelection}>
                        {grindOptions.map((opt, index) => (
                            <div key={index} className={styles.checkboxContainer}>
                                <input type="checkbox" name="grind" value={opt} className={styles.grind}  onChange={handleOnChangeGrind}/>
                                <label>{opt}</label>
                            </div>
                        ))}
                    </div>

                </div>

                <div className={styles.subContainer}>
                    <label className={styles.formLabel}>Roast Level (Select 1)</label>
                    <div className={styles.roastSelection}>
                        {roastLevel.map((opt, index) => (
                            <div key={index} className={styles.checkboxContainer}>
                                <input type="radio" name="roastLevel" value={opt} className={styles.roast} required/>
                                <label>{opt}</label>
                            </div>
                        ))}
                    </div>

                </div>

                <button type='submit' className={styles.submitBtn} >SUBMIT</button>
            </form>
        </div>
    );
}

export default Form;
