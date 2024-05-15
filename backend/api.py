import requests
import csv
import pandas as pd
import re
URL = "https://fake-coffee-api.vercel.app/api"
response = requests.get(URL).json()
# name, flavor_profile, grind_option, roast_level
coffee_flavor_arr = []
coffee_grind_arr = []
arr_dict = []
for coffee in response:
    dict = {}
    if coffee['id'] != 3 and coffee['id'] != 17:
        coffee_name = coffee['name']
        coffee_flavor = coffee['flavor_profile']
        coffee_grind = coffee['grind_option']
        coffee_roast_level = coffee['roast_level']
        
        # Push unique value to the arrays to render on front end
        for coffee_flavor_item in coffee_flavor:
            if coffee_flavor_item not in coffee_flavor_arr:
                coffee_flavor_arr.append(coffee_flavor_item)
        for coffee_grind_item in coffee_grind:
            if coffee_grind_item not in coffee_grind_arr:
                coffee_grind_arr.append(coffee_grind_item)



# Print out the array info
print(f"Grind Arr: {coffee_grind_arr}") 
print(f"Flavor Arr: {coffee_flavor_arr}")

# write header
header = ['name', 'roast_level'] # field name
for i in coffee_flavor_arr:
    i = i.lower() # lowercase all word
    replace = re.sub(" ", "_", i)     # replace white place character with underline
    name = f'flavor_{replace}'
    if name not in header:
        header.append(name)
for i in coffee_grind_arr:
    i = i.lower() # lowercase all word
    replace = re.sub(" ", "_", i)     # replace white place character with underline
    name = f'grind_{replace}'
    if name not in header:
        header.append(name)

# print(header)

for coffee in response:
    dict = {}
    if coffee['id'] != 3 and coffee['id'] != 17:
        coffee_name = coffee['name']
        coffee_flavor = coffee['flavor_profile']
        coffee_grind = coffee['grind_option']
        coffee_roast_level = coffee['roast_level']
        

        # Create dictionary
        dict['name'] = coffee_name
        dict['roast_level'] = coffee_roast_level
        for coffee_flavor_item in coffee_flavor:
            coffee_flavor_item = coffee_flavor_item.lower()
            replace = re.sub(" ", "_", coffee_flavor_item)     # replace white place character with underline
            name = f'flavor_{replace}'
            if name in header:
                dict[name] = 1
            else:
                dict[name] = 0

        for coffee_grind_item in coffee_grind:
            coffee_grind_item = coffee_grind_item.lower()
            replace = re.sub(" ", "_", coffee_grind_item)     # replace white place character with underline
            name = f'grind_{replace}'
            if name in header:
                dict[name] = 1
            else:
                dict[name] = 0



        
        #Add dictionary into an array
        arr_dict.append(dict)

print(arr_dict)



# write csv
filename = 'coffee_data.csv'
with open(filename, 'w') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=header)
    
    # writing headers (field names)
    writer.writeheader()
    # writing data rows
    writer.writerows(arr_dict)

