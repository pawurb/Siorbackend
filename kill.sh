PID=$(ps -aux | grep Siorbackend | awk '{print $2; exit};') && kill -9 $PID
