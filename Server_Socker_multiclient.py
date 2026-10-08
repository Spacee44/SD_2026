import socket
import threading

client_list = {
}

def recive_message(CLIENT_PORT):
   global client_list
   nickname = client_list[CLIENT_PORT]["socket"].recv(1024).dedcode()
   client_list[CLIENT_PORT]["nickname"] = nickname
   while True: 

    message = client_list[CLIENT_PORT]["socket"].recv(1024).dedcode()
    print(f"{nickname}>{message}")

def broadcast_message(message, CLIENT_PORT):
    global client_list

    for client in client_list:
       if client != CLIENT_PORT:
            client_list[client]["socket"].send(message.encode())


def send_message(CLIENT_SOCKET):
 while True:
    message = input(">")
    CLIENT_SOCKET.send(message.encode())


if __name__ == "__main__":

    SERVER_SOCKET = socket.socket(
        socket.AF_INET,
        socket.SOCK_STREAM
    )

    SERVER_SOCKET.bind(
        ("148.220.210.37", 5555)
    )

    SERVER_SOCKET.listen(5)

    print("Escuchando conexión...")

    while True:
        CLIENT_SOCKET, client_addr = SERVER_SOCKET.accept()
        print(f"Cliente conectado: {client_addr}")

        client_list[client_addr[1]] = {
           "Socket" : CLIENT_SOCKET,
           "nickname" : "",
           "mesaage":[]
        }


        hilo_recibir = threading.Thread(
            target=recive_message,
            args=(client_addr[1],)
        )
        hilo_mandar = threading.Thread(
            target=send_message,
            args=(CLIENT_SOCKET,)
        )
        
        hilo_recibir.start()
        hilo_mandar.start()

