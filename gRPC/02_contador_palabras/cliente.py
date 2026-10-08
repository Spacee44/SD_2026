import grpc

import contador_pb2
import contador_pb2_grpc

TEXTO = [
    "los sistemas distribuidos se comunican por mensajes",
    "gRPC usa HTTP/2 y protocol buffers para los mensajes",
    "los mensajes de gRPC son binarios y compactos",
]


def generar_lineas():
    # Un generador: cada yield es un mensaje enviado al servidor
    for texto in TEXTO:
        yield contador_pb2.Linea(texto=texto)


def generar_mensajes():
    usuario = input("Tu nombre: ")
    while True:
        texto = input("> ")
        if texto == "salir":
            break
        yield contador_pb2.Mensaje(usuario=usuario, texto=texto)


def main():
    with grpc.insecure_channel("localhost:50052") as canal:
        stub = contador_pb2_grpc.ContadorStub(canal)

        # 1) Client streaming: mandamos varias líneas y recibimos un solo resultado
        conteo = stub.EnviarTexto(generar_lineas())
        print(f"Servidor procesó {conteo.total_lineas} líneas "
              f"y {conteo.total_palabras} palabras\n")

        # 2) Server streaming: iteramos sobre las respuestas conforme llegan
        print("Top 5 palabras:")
        for f in stub.TopPalabras(contador_pb2.Peticion(top=5)):
            print(f"  {f.palabra}: {f.veces}")

        # 3) Bidireccional: escribimos mensajes y leemos las respuestas
        print("\nModo eco (escribe 'salir' para terminar)")
        for respuesta in stub.Eco(generar_mensajes()):
            print(f"[{respuesta.usuario}] {respuesta.texto}")


if __name__ == "__main__":
    main()
