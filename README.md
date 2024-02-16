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

Now the application should function as intended.

## Notes

Here are some notes that I made to justify some of the decisions I made for the application I built:

1) Typescript, while it's not in the spec I think it made the final result simpler to reason with and in true end to end projects falling back on the types in either direction of development (frontend -> backend or vice versa) is awfully nice. Also typesense and being able to autocomplete a lot of things in the frontend having the types already is really nice.

2) OpenAPI, This is something i've been using a lot and feels really nice when intergrating between the backend and the frontend. Firstly it makes a lot of sense to document yout endpoints anyways and when using this format you end up with a comperhensive document of what your endpoint does while also making a great intergration document in the case you don't finish the frontend intergraion yourself. Secondly it's great to be able to run codegen commands and generate all of the intergration hooks in the frontend fully knowing if something changes in the backend most of the time I can just regenerate the component and get all the changes done for me.

3) Docker, really nice to use in development and also reduces the likelyhood of windows vs linux vs macos problems. Also is a nice statring point for deployment already having the containers.

4) Vite + SWC, Really fast development tooling and in this case using something like next or remix felt useless as we won't be needing server side rendering.

5) Caching, Although it wasn't mentioned, I felt it was nice to have as we are accessing the same resource.

Given more time overall I think the whole soloution could of been made even more simplified, but doing so would of taken much more time than just producing a good production ready soloution and potentially borders on "gold plating" a little.