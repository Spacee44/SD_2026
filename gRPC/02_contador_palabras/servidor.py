import threading
import time
from collections import Counter
from concurrent import futures

import grpc

import contador_pb2
import contador_pb2_grpc


class ContadorServicer(contador_pb2_grpc.ContadorServicer):

    def __init__(self):
        # Estado compartido entre todos los clientes -> se protege con un lock
        self.frecuencias = Counter()
        self.lock = threading.Lock()

    # Client streaming: request_iterator entrega las líneas conforme llegan
    def EnviarTexto(self, request_iterator, context):
        lineas = 0
        palabras = 0
        for linea in request_iterator:
            tokens = linea.texto.lower().split()
            lineas += 1
            palabras += len(tokens)
            with self.lock:
                self.frecuencias.update(tokens)
            print(f"Línea recibida: {linea.texto!r}")
        return contador_pb2.Conteo(total_lineas=lineas, total_palabras=palabras)

    # Server streaming: usamos yield para enviar cada respuesta
    def TopPalabras(self, request, context):
        with self.lock:
            top = self.frecuencias.most_common(request.top)
        for palabra, veces in top:
            time.sleep(0.5)  # Simula trabajo para ver llegar los mensajes uno a uno
            yield contador_pb2.Frecuencia(palabra=palabra, veces=veces)

    # Bidireccional: por cada mensaje recibido respondemos otro
    def Eco(self, request_iterator, context):
        for msg in request_iterator:
            print(f"[{msg.usuario}] {msg.texto}")
            yield contador_pb2.Mensaje(
                usuario="servidor",
                texto=f"Recibí '{msg.texto}' ({len(msg.texto.split())} palabras)",
            )


def main():
    servidor = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    contador_pb2_grpc.add_ContadorServicer_to_server(ContadorServicer(), servidor)
    servidor.add_insecure_port("[::]:50052")
    servidor.start()
    print("Servidor gRPC (contador) escuchando en el puerto 50052...")
    servidor.wait_for_termination()


if __name__ == "__main__":
    main()
