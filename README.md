STEPS :

1- RUN KAFKA :
docker-compose -f docker-compose.kafka.yml up

2- RUN MONGODB :
docker-compose -f docker-compose.mongo.yml up

3- RUN MINIO :
docker-compose -f docker-compose.minio.yml up

4- RUN ELK :
docker-compose -f docker-compose.elk.yml up

5- RUN MATRIX GENERATOR :
docker-compose -f docker-compose.mtxGen.yml up

6- RUN FRAUD DETECTION :
docker-compose -f docker-compose.dpl.yml up

7- RUN BACKEND & FRONTEND :
docker-compose -f docker-compose.usrStack.yml up
