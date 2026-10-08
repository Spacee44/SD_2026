import socket
import threading

def recive_message(CLIENT_SOCKET):
   while True: 
    message = CLIENT_SOCKET.recv(1024).decode()
    print(f"> {message}")

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
        ("127.0.0.1", 5512)
    )

    SERVER_SOCKET.listen(5)

    print("Escuchando conexión...")

    CLIENT_SOCKET, client_addr = SERVER_SOCKET.accept()
    print(f"Cliente conectado: {client_addr}")


    hilo_recibir = threading.Thread(
        target=recive_message,
        args=(CLIENT_SOCKET,)
    )
    hilo_mandar = threading.Thread(
        target=send_message,
        args=(CLIENT_SOCKET,)
    )
    
    hilo_recibir.start()
    hilo_mandar.start()

