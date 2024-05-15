from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler, Normalizer
import csv
import pandas as pd
from sklearn.pipeline import Pipeline
import numpy as np
def predict_coffee(roastLevel, userFlavors, userGrinds):
    # Sample coffee data read from csv file
    df = pd.read_csv('coffee_data.csv') 
    df = df.fillna(0) # fill NaN with 0
    # # Extract x and y based on columns
    y = df.iloc[:,1:]
    X = df.iloc[:, 1]

    # Dataset
    grindArr = ['Whole Bean', 'Cafetiere', 'Filter', 'Espresso', 'French press', 'Pour Over']
    flavorArr = ['Dark Chocolate', 'Black Cherry', 'Citrus', 'Cocoa', 'Hazelnut', 'Molasses', 'Nutty', 'Smooth', 'Citrusy', 'Spicy', 'Earthy', 'Cinnamon', 'Clove', 'Blueberry', 'Chocolate', 'Caramel', 'Almond', 'Toffee', 'Blackcurrant', 'Coconut', 'Cardamom', 'Espresso', 'Vanilla', 'Floral', 'Honey', 'Milk Chocolate', 'Tropical Fruit', 'Fruit']  
    flavorArr = [x.lower() for x in flavorArr]
    grindArr = [x.lower() for x in grindArr]
    # Sample user preferences
    roast_level = roastLevel
    flavor_arr = []
    grind_arr = []

    print(f'Check user input values: {roastLevel}, {userFlavors}, {userGrinds}')

    # Iterate through a list of flavorArr and check if it exist within the userFlavor, if yes append 1, otherwise append 0
    for flavor in flavorArr:
        if flavor in [x.lower() for x in userFlavors]:
            flavor_arr.append(1)
        else:
            flavor_arr.append(0)

    for grind in grindArr:
        if grind in [x.lower() for x in userGrinds]:
            grind_arr.append(1)
        else:
            grind_arr.append(0)
    print(f'Check user input values: {roastLevel}, {userFlavors}, {userGrinds}')
    print(f'Grind arr in 0 and 1 {grind_arr}')
    print(f'Flavor arr in 0 and 1 {flavor_arr}')


    # Rescale the roast level from 1-5 to 0-1
    normalized_roast_level = roast_level / 5
    roast_level_arr = []
    for i in df['roast_level']:
        normalized_roast_level = i /5
        roast_level_arr.append(normalized_roast_level)
    
    
    # Concatenate encoded vectors for flavor and grind categories for user
    concatenated_user = np.concatenate([[roast_level], flavor_arr, grind_arr])
    # print(concatenated_user)
    # Concatenate encoded vectors for flavor and grind categories for data
    flavor_arr_data = df.iloc[:,2:-6]
    grind_arr_data = df.iloc[:,-6:]
    flavor_arr = []
    grind_arr = []
    for index, row in flavor_arr_data.iterrows():
        flavor_arr.append(row.values.tolist())

    for index, row in grind_arr_data.iterrows():
        grind_arr.append(row.values.tolist())


    concatenated_df = []
    for i in range(18):
        array1 = np.array([roast_level_arr[i]])
        array2 = np.array(flavor_arr[i])
        array3 = np.array(grind_arr[i])
        arr_contenate = np.concatenate((array1, array2, array3))
        # print(arr_contenate)
        arr_contenate = arr_contenate.tolist()
        concatenated_df.append(arr_contenate)

    # Reshape user_feature_vector to a 2D array
    concatenated_user = [concatenated_user]

    # Calculate cosine similarity
    similarity_matrix = cosine_similarity(concatenated_user, concatenated_df)

    top_indices = np.argsort(similarity_matrix[0])[-3:][::-1]

    # Print the top 3 similar coffee blends
    coffeeTypes = []
    for idx in top_indices:
        print("Similarity:", similarity_matrix[0][idx])
        print("Coffee Type:", idx)  
        idx = idx.tolist()
        coffeeTypes.append(idx)
    return coffeeTypes
flavor =  ['Smooth', 'Clove', 'Toffee']
grind = ['Filter', 'Cafetiere']
roastLevel = 2
predict_coffee(roastLevel, flavor, grind)