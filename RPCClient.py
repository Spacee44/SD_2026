import xmlrpc.client

server = xmlrpc.client.ServerProxy(
    "http://127.0.0.1:5555"
)

print(server.saludo("Alancito"))
print(server.sumas(10,10))