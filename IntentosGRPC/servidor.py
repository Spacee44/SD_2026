from concurrent import futures

import grpc

# Código generado a partir de calculadora.proto
import saludos_pb2_grpc
import saludos_pb2

class SaludosServicer(saludos_pb2_grpc.SaludosServicer):

         
     def Saludo(self, request, context):
            if request.peticion == 1: 
                  texto_respuesta = "Saludos ¿Como estas?"
            elif request.peticion == 0:
                  texto_respuesta = "Hasta luego mi amigo"

            return saludos_pb2.saludo (respuesta=texto_respuesta)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    saludos_pb2_grpc.add_SaludosServicer_to_server(SaludosServicer(), server)
    server.add_insecure_port('[::]:50051')
    print("Servidor gRPC iniciado en puerto 50051...")
    server.start()
    server.wait_for_termination()
    

if __name__ == '__main__':
    serve()