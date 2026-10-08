import grpc

import calculadora_pb2
import calculadora_pb2_grpc


def main():
    # Abrir un canal hacia el servidor (IP:puerto)
    with grpc.insecure_channel("localhost:50051") as canal:
        # El "stub" es el objeto que representa al servidor remoto
        stub = calculadora_pb2_grpc.CalculadoraStub(canal)

        x_val = float(input("Ingrese el primer valor (X): "))
        y_val = float(input("Ingrese el segundo valor (Y): "))

        # Llamar a las funciones remotas como si fueran locales
        ops = calculadora_pb2.Operandos(x=x_val, y=y_val)
        print("Resultado de la suma:", stub.Suma(ops).valor)
        print("Resultado de la resta:", stub.Resta(ops).valor)
        print("Resultado de la multiplicación:", stub.Multiplicacion(ops).valor)
        print("Resultado de la división:", stub.Division(ops).valor)
        print("Resultado de la potencia de X Elevado a Y: ",stub.Potencia(ops).valor)

        # Manejo de errores: dividir entre cero
        try:
            stub.Division(calculadora_pb2.Operandos(x=1, y=0))
        except grpc.RpcError as e:
            print(f"Error del servidor: {e.code().name} - {e.details()}")


if __name__ == "__main__":
    main()
