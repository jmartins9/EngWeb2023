import json


def ord_city(city):
    return city['nome']


file = open("mapa.json", encoding='utf-8')
mapa = json.load(file)

cities = mapa['cidades']
cities.sort(key=ord_city)

connections = mapa['ligações']

pageHtml = """
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
            <tr>
                <!-- Índice-->
                <td valign="top">
                    <a name= "indice"/>
                    <h3>Índice</h3>
                    <ul>
"""

cts = {}
for c in cities:
    cts[c['id']] = c['nome']
    pageHtml += f"""
    <li>
        <a href="#{c['id']}">{c['nome']}</a>
    </li>
    """

pageHtml += """
    </ul>
    </td>
    <!--Conteúdo-->
    <td>
    """

for c in cities:
    pageHtml += f"""
    <a name="{c['id']}"/>
    <h3>{c['nome']}</h3>
    <p><b>População: </b> {c['população']}</p>
    <p><b>Descrição: </b> {c['descrição']}</p>
    <p><b>Distrito: </b> {c['distrito']}</p>
    <p><b>Ligações: </b></br>
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
            <td valign="top">
                <table>
    """
    for l in connections:
        if c['id'] == l['destino']:
            pageHtml += f"""<tr><td>
            <a href=#{l['origem']}> {cts[l['origem']]}</a>- {l['distância']} km </td><tr>"""

    pageHtml += """</table>
    </td>
    <td valign="top">
        <table>
    """

    for l in connections:
        if c['id'] == l['origem']:
            pageHtml += f"""<tr><td>
            <a href=#{l['destino']}> {cts[l['destino']]}</a>- {l['distância']} km </td><tr>"""

    pageHtml += """
    </table>
    </td>
    </tr>
    </table>
    </p> 
    <address> [<a href=#indice>Voltar ao índice</a>]</address><br>
    <center>
        <hr width="85%"/>
    </center>
    """

pageHtml += """ </td>
            </tr>
        </table>
    </body>
</html>
"""

print(pageHtml)
