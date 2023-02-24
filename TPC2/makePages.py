import json


def make_index(cities):
    # order cities by name
    cities.sort(key=lambda x: x['nome'])

    # auxiliary dict with the cities names by id for the connections
    names = {}

    # group the cities by district
    dict_map = {}
    for city in cities:
        names[city['id']] = city['nome']
        district = city['distrito']
        if district not in dict_map:
            dict_map[district] = []
            dict_map[district].append(city)
        else:
            dict_map[district].append(city)

    page = """
    <!DOCTYPE html> 
    <html> 
        <head>
            <title>Mapa Virtual</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <center>
                <h1>Mapa Virtual</h1>
            </center>
            <table>
    """

    # order by district name
    keys = list(dict_map.keys())
    keys.sort()
    for key in keys:
        page += f"""
                    <tr>
                        <td>
                            <h1>{key}</h1>    
                            <ul>            
        """

        for city in dict_map[key]:
            page += f"""
                                <li>
                                    <a href="localhost:7777/{city['id']}">{city['nome']}</a>
                                </li>         
            
            """

        page += """
                            </ul>
                        </td>
                     </tr>        
        """

    page += """
            </table>
        </body>
    </html>        
    """

    # write in the file
    index_file = open("index.html", "w")
    index_file.write(page)
    index_file.close()

    return names


def make_cities_pages(cities, connections, names):

    for city in cities:
        page = f"""
            <!DOCTYPE html> 
            <html> 
                <head>
                    <title>{city['nome']}</title>
                    <meta charset="utf-8"/>
                </head>
                <body>
                    <center>
                        <h1>{city['nome']}</h1>
                    </center>
                    <table>
                        <tr>
                            <td>
                                <p><b>População: </b> {city['população']}</p>
                                <p><b>Descrição: </b> {city['descrição']}</p>
                                <p><b>Distrito: </b> {city['distrito']}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Ligações</h3>
                                <table>
                                    <tr>
                                        <td>
                                            <h4>Origens</h4>
                                        </td>
                                        <td>
                                            <h4>Destinos</h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <ul>
        """

        for connection in connections:
            if city['id'] == connection['destino']:
                page += f"""
                                                        <li>
                                                            <a href="localhost:7777/{connection['origem']}"> {names[connection['origem']]}</a>- {connection['distância']} km
                                                        </li>
                """

        page += """
                                            </ul>
                                        </td>
                                        <td>
                                             <ul>
            """

        for connection in connections:
            if city['id'] == connection['origem']:
                page += f"""
                                                <li>
                                                    <a href="localhost:7777/{connection['destino']}"> {names[connection['destino']]}</a>- {connection['distância']} km
                                                </li>
                """

        page += """
                                            </ul>   
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>              
        """

        city_file = open(f"{city['id']}.html", "w")
        city_file.write(page)
        city_file.close()


def main():
    # open and load file
    file = open("mapa.json")
    mapa = json.load(file)

    # get cities from the dict
    cities = mapa['cidades']

    # make index page
    names = make_index(cities)

    # get connections from the dict
    connections = mapa['ligações']

    # make cities pages
    make_cities_pages(cities, connections, names)


if __name__ == '__main__':
    main()
