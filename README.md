# Servicio de Banco

Microservicio de Banco utilizado para el proyecto Cambio de Dolar.

## Rutas del servicio

Link del servicio: `https://0i2exyy104.execute-api.us-east-2.amazonaws.com/`
Link del swagger: `https://0i2exyy104.execute-api.us-east-2.amazonaws.com/swagger`

## Rutas del servicio en el proxy

Link del servicio: `https://r5swknv9uh.execute-api.sa-east-1.amazonaws.com/v1/bank`
Link del swagger: `https://r5swknv9uh.execute-api.sa-east-1.amazonaws.com/v1/bank/swagger`

### Metodos

#### POST

Permite crear una nueva tarjeta:

`https://0i2exyy104.execute-api.us-east-2.amazonaws.com/card`

Ejemplo:

`{
    "accountNumber": "555555555",
    "availableMoney": "300",
    "typeCard": "soles"
}`

Parametros:

- accountNumber: Recibe solo 9 numeros, enviar como string
- availableMoney: Recibe solo numeros, enviar como string
- typeCard: Recibe dos parametros "soles" y "dolares"

#### PUT

Permite actualizar el dinero disponible en las tarjetas

`https://0i2exyy104.execute-api.us-east-2.amazonaws.com/card/{accountNumber}`

Recibe en el pathParams el numero de cuenta para hacer el update.

`{
"availableMoney": "500"
}`

En el body enviar el availableMoney, el valor debe ser entero y string.

#### GET by Account Number

Permite obtener los datos de una tarjeta

`https://0i2exyy104.execute-api.us-east-2.amazonaws.com/card/{accountNumber}`

Se debe ingresar el numero de cuenta la url.

#### GET

Permite obtener los datos de las tarjetas, solo a metodo de ejemplo

`https://0i2exyy104.execute-api.us-east-2.amazonaws.com/card`
