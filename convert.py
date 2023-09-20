import csv
import json

# Specify the input CSV file name and the output JSON file name
csv_file = 'stations.txt'
json_file = 'output.json'

# Initialize an empty list to store the JSON objects
data = []

# Read the CSV file and convert it to a list of dictionaries with whitespace-stripped keys and values
with open(csv_file, mode='r') as file:
    csv_reader = csv.DictReader(file, delimiter=';')
    for row in csv_reader:
        stripped_row = {key.strip(): (value.strip() if value is not None else '') for key, value in row.items()}
        data.append(stripped_row)

# Write the data as JSON to the output file
with open(json_file, mode='w',) as file:
    json.dump(data, file, indent=4)

print(f'CSV file "{csv_file}" has been successfully converted to JSON file "{json_file}".')


