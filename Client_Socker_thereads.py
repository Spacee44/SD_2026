import socket   
import threading

def send_message(SERVER_SOCKET):
  while True:  
    message = input(">")
    SERVER_SOCKET.send(message.encode())

def recive_message(SERVER_SOCKET):
 while True:  
    message = SERVER_SOCKET.recv(1024).decode()
    print(f"> {message}")


if __name__ == "__main__":

    SERVER_SOCKET = socket.socket(
        socket.AF_INET,
        socket.SOCK_STREAM
    )

    SERVER_SOCKET.connect(
        ("148.220.212.130", 5555)
    )

    hilo_recibir = threading.Thread(
           target=recive_message,
           args=(SERVER_SOCKET,)
    )
    hilo_mandar = threading.Thread(
           target=send_message,
           args=(SERVER_SOCKET,)
    )
   
    hilo_mandar.start()   
    hilo_recibir.start()
    

   