from concurrent import futures

import grpc

# Código generado a partir de calculadora.proto
import calculadora_pb2
import calculadora_pb2_grpc


# Implementamos el servicio heredando de la clase generada
class CalculadoraServicer(calculadora_pb2_grpc.CalculadoraServicer):

    # Cada método recibe el mensaje de petición y un "context"
    def Suma(self, request, context):
      
        print(f"Suma({request.x}, {request.y})")
        return calculadora_pb2.Resultado(valor=request.x + request.y)

    def Resta(self, request, context):
        print(f"Resta({request.x}, {request.y})")
        return calculadora_pb2.Resultado(valor=request.x - request.y)

    def Multiplicacion(self, request, context):
        print(f"Multiplicacion({request.x}, {request.y})")
        return calculadora_pb2.Resultado(valor=request.x * request.y)

    def Potencia(self, request, context):
        print(f"Potencia({request.x}, {request.y})")
        return calculadora_pb2.Resultado(valor=request.x ** request.y)
        

    def Division(self, request, context):
        print(f"Division({request.x}, {request.y})")
        if request.y == 0:
            # En gRPC los errores se envían con un código de estado
            context.abort(grpc.StatusCode.INVALID_ARGUMENT, "No se puede dividir entre 0")
        return calculadora_pb2.Resultado(valor=request.x / request.y)


def main():
    # El servidor atiende peticiones con un pool de hilos
    servidor = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    # Registrar nuestra implementación en el servidor
    calculadora_pb2_grpc.add_CalculadoraServicer_to_server(
        CalculadoraServicer(), servidor
    )

    # Escuchar en todas las interfaces, puerto 50051
    servidor.add_insecure_port("[::]:50051")
    servidor.start()
    print("Servidor gRPC escuchando en el puerto 50051...")
    servidor.wait_for_termination()


if __name__ == "__main__":
    main()
