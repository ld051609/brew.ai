'use client'
import React, { useState } from 'react';
import styles from './form.module.css'; // Import CSS module

const Form = () => {
    const grindOptions = ['Whole Bean', 'Cafetiere', 'Filter', 'Espresso', 'French press', 'Pour Over'];
    const flavorOptions = ['Dark Chocolate', 'Black Cherry', 'Citrus', 'Cocoa', 'Hazelnut', 'Molasses', 'Nutty', 'Smooth', 'Citrusy', 'Spicy', 'Earthy', 'Cinnamon', 'Clove', 'Blueberry', 'Chocolate', 'Caramel', 'Almond', 'Toffee', 'Blackcurrant', 'Coconut', 'Cardamom', 'Espresso', 'Vanilla', 'Floral', 'Honey', 'Milk Chocolate', 'Tropical Fruit', 'Fruit'];
    const roastLevel = [1, 2, 3, 4, 5];

    
    const [selectedBoxes, setSelectedBoxes] = useState([])

    const handleOnChangeFlavor = (e) => {
        const checkedBoxValue = e.target.value;
        // if user checked the box, add to the list if less than max allowed
        if (e.target.checked) {
            if (selectedBoxes.length < 3) {
                setSelectedBoxes(prev => ([...prev, checkedBoxValue])); // Correct usage of spread operator
            } else {
                // Uncheck the checkbox if the limit is exceeded
                e.target.checked = false;
                window.alert(`You can only select up to 3 checkboxes.`);

            }
        // if user unchecked the box, remove that from the list
        }else{
            setSelectedBoxes(selectedBoxes.filter(value => value !== checkedBoxValue))
        }
    };

    const handleOnChangeGrind = (e) => {
        const checkedBoxValue = e.target.value;
        // if user checked the box, add to the list if less than max allowed
        if (e.target.checked) {
            if (selectedBoxes.length < 2) {
                setSelectedBoxes(prev => ([...prev, checkedBoxValue])); // Correct usage of spread operator
            } else {
                // Uncheck the checkbox if the limit is exceeded
                e.target.checked = false;
                window.alert(`You can only select up to 2 checkboxes.`);

            }
        // if user unchecked the box, remove that from the list
        }else{
            setSelectedBoxes(selectedBoxes.filter(value => value !== checkedBoxValue))
        }
    };
    
    return (
        <div  className={styles.container}>
            <form action="" className={styles.container2}>
                <div className={styles.subContainer}>
                    <label className={styles.formLabel}>Flavor (Select Up To 3)</label>
                    <div className={styles.flavorSelection}>
                        {flavorOptions.map((opt, index) => (
                            <div key={index} className={styles.checkboxContainer}>
                                <input type="checkbox" name="flavor_profile" value={opt === "Whole bean" ? "Whole Bean" : opt} className={styles.flavor} onChange={handleOnChangeFlavor} />
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
                                <input type="checkbox" name="grind_option" value={opt} className={styles.grind}  onChange={handleOnChangeGrind}/>
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
                                <input type="radio" name="roast_level" value={opt} className={styles.roast} />
                                <label>{opt}</label>
                            </div>
                        ))}
                    </div>

                </div>

                <button type='submit' className={styles.submitBtn}>SUBMIT</button>
            </form>
        </div>
    );
}

export default Form;
