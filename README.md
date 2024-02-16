# salve-full-stack-assignment
 A simple full stack assignment

## How to run the application

The simplist way to run the application is with `docker` using `docker-compose up` which should gracefully load up two containers called backend and frontend. 

If the above doesn't work or your using windows without WSL then you can load up the applications manually using the following steps:

1) `cd backend` 
2) `npm i`
3) `npm run build`
4) `npm run start`

Following this you should see:

`App listening at http://localhost:3000` Which lets you know the backend is functioning, to test further navigate to `http://localhost:3000/clinics` which should show the following data:

```json
{"message":"Here's a list of all the current clinics","code":200,"status":"OK","data":[{"id":1,"name":"Salve Fertility"},{"id":2,"name":"London IVF"}]}
```

5) `cd ..`
6) `cd frontend`
7) `npm i`
8) `npm run preview`

Following these steps you should see the following:

```txt
  ➜  Local:   http://localhost:4173/
  ➜  Network: http://192.168.0.107:4173/
  ➜  Network: http://172.24.240.1:4173/
```
