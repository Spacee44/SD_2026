from xmlrpc.server import SimpleXMLRPCServer

server = SimpleXMLRPCServer(
    (
        "127.0.0.1",
        5555

    )
)

def saludo(nombre):
    return f"Hola {nombre}"

def sumas(uno, dos):
    return uno + dos

server.register_function(saludo, 'saludo')
server.register_function(sumas, 'sumas')

print("Iniciamos el Server")
server.serve_forever()


