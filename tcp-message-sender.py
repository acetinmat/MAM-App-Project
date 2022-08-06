import socket
import json
from time import sleep

HOST, PORT = "localhost", 3001

#m ='{"id": 2, "name": "abc"}'
count = 0
m = {
    "time": "test",
    "temp": " 31.66 ",
    "hum": " 42.91 ",
    "pres": " 988.00 ",
    "vol": " 0.13 "
}  # a real dict.


seperatedData = json.dumps(m).partition("h")

# Create a socket (SOCK_STREAM means a TCP socket)
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    # Connect to server and send data
    sock.connect((HOST, PORT))

    while count < 3:
        sock.sendall(bytes(seperatedData[count], encoding="utf-8"))
        print("Sended data: ", seperatedData[count])
        count += 1
        sleep(3)

    # Receive data from the server and shut down
    # received = sock.recv(1024)
    # received = received.decode("utf-8")
    sock.sendall(bytes(";", encoding="utf-8"))

finally:
    sock.close()
print('Connection closed.')
# print("Sent:     {}".format(data))
# print("Received: {}".format(received))
