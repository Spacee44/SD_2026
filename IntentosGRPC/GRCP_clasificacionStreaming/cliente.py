import grpc
import clasificacion_pb2
import clasificacion_pb2_grpc

def run():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = clasificacion_pb2_grpc.LogServiceStub(channel)

        # 1 sola request pidiendo 5 líneas de log
        request = clasificacion_pb2.LogRequest(service_name="payment-service", limit=5)

        print("Enviando request. Esperando flujo de respuestas del servidor...")
        
        # El servidor retorna un iterador (stream de N respuestas)
        response_stream = stub.Streamlog(request)

        for response in response_stream:
            print(f"[{response.timestamp}] {response.log_line}")

if __name__ == '__main__':
    run()