#El servidor importa todos los archivos requeridos, este implementa el stremaing devolviendo los datos mediante 
#La instruccion Yield(Se define como un generador en lugar de una funcion return)

import time
import clasificacion_pb2
import clasificacion_pb2_grpc
import grpc
import concurrent.futures

class LogServiceServicer(clasificacion_pb2_grpc.LogServiceServicer):
    def StreamLogs(self, request, context):
        print(f"Petición recibida para monitorear: {request.service_name}")

        # Genera y emite N respuestas en tiempo real
        for i in range(1, request.limit + 1):
            time.sleep(1)  # Simula la llegada paulatina de eventos
            
            yield clasificacion_pb2.LogResponse(
                log_line=f"[{request.service_name}] Evento #{i} procesado con éxito",
                timestamp=time.strftime("%H:%M:%S")
            )

def serve():
    server = grpc.server(concurrent.futures.ThreadPoolExecutor(max_workers=10))
    clasificacion_pb2_grpc.add_LogServiceServicer_to_server(LogServiceServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Servidor gRPC (Server Streaming) activo en el puerto 50051...")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()