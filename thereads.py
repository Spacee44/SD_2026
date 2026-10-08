import threading
import time
def loop(n,t,s):
    time.sleep(s)
    for i in range(n):
        print(f"Hilo {t}:{i}")
        time.sleep(1)

n= 10
t= 1    
hilo1 = threading.Thread(
 target=loop,
 args=(n,t,0.000001)
 )

t=2
hilo2 = threading.Thread(
 target=loop,
 args=(n,t,0.01)
)   

hilo1.start()
hilo2.start()
#hilo1.join()
#hilo2.join()