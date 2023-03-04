import json

def main():
    input_file = open("dataset-extra1.json","r", encoding="utf-8")
    output_file = open("dataset.json", "w", encoding="utf-8")
    dataset = json.load(input_file)
    
    pessoas = dataset["pessoas"]
    id = 1
     
    for pessoa in pessoas:
        pessoa["id"] = "p" + str(id)
        id += 1

    json.dump(dataset, output_file, indent=2, ensure_ascii = False)
    
if __name__ == '__main__':
    main()