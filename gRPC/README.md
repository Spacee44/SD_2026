# Ejemplos de gRPC en Python

## Instalación
### Activar su ambiente de anaconda con conda activate <nombre-de-su-ambiente>

    pip install grpcio grpcio-tools

## 1. Calculadora (llamadas unarias)
Equivalente gRPC del ejemplo de XML-RPC: 1 petición -> 1 respuesta.

    cd 01_calculadora
    python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. calculadora.proto
    python servidor.py      # terminal 1
    python cliente.py       # terminal 2

## 2. Contador de palabras (streaming)
Muestra los tres tipos de streaming:
- `EnviarTexto`: client streaming (muchas líneas -> un conteo)
- `TopPalabras`: server streaming (una petición -> muchas respuestas)
- `Eco`: bidireccional (ambos envían y reciben)

    cd 02_contador_palabras
    python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. contador.proto
    python servidor.py      # terminal 1
    python cliente.py       # terminal 2

> El comando `protoc` genera los archivos `*_pb2.py` y `*_pb2_grpc.py`.
> Hay que volver a ejecutarlo cada vez que se modifica el `.proto`.

## ¿Qué hace el comando `protoc`?

    python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. calculadora.proto

| Parte | Qué hace |
|---|---|
| `python -m` | Ejecuta un módulo de Python como programa, igual que `python -m pip`. |
| `grpc_tools.protoc` | Es el compilador de Protocol Buffers (`protoc`) que viene en el paquete `grpcio-tools`. Por eso no hace falta instalar `protoc` aparte. |
| `-I.` | Es el *include path*: la carpeta donde `protoc` busca los `.proto`. El `.` es la carpeta actual. Sirve cuando un `.proto` importa otro (`import "otro.proto";`). También se escribe `--proto_path=.`. |
| `--python_out=.` | Genera **`calculadora_pb2.py`** en la carpeta actual. Este archivo tiene las clases de los **mensajes** (`Operandos`, `Resultado`) y el código para convertirlos a binario y de vuelta. |
| `--grpc_python_out=.` | Genera **`calculadora_pb2_grpc.py`** en la carpeta actual. Este archivo tiene el código del **servicio**:<br>• `CalculadoraServicer`: la clase base que el servidor hereda para implementar los métodos.<br>• `add_CalculadoraServicer_to_server`: registra esa implementación en el servidor.<br>• `CalculadoraStub`: el objeto que usa el cliente para llamar a las funciones remotas. |
| `calculadora.proto` | El archivo de entrada, que es el contrato del servicio. |
