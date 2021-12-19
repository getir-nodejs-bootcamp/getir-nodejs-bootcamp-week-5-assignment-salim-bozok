# getir-nodejs-bootcamp-gelsin-app-salim-bozok

Simple e-commerce application backend with Node.js, MongoDB and Docker

### Features

1. JWT authentication/authorization
2. Create, read, update and delete product
3. Upload image for products
4. Password reset feature
5. Sending e-mail with password reset token

### Installation

Download the source codes to your computer.

```
git clone https://github.com/getir-nodejs-bootcamp/getir-nodejs-bootcamp-week-5-assignment-salim-bozok.git
```

### Configurations

1. Go to project directory

```
cd week-3-assignment-salim-bozok
```

2. Create .env file in the main directory

```
touch .env
```

3. Open .env file with your IDE and edit it as following example

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/test
JWT_SECRET=superdupersecretkey

SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_username
SMTP_PASSWORD=your_password

SMTP_FROM_NAME=Gelsin App
SMTP_FROM_EMAIL=noreply@gelsin.app

FRONTEND_URL=http://localhost:4000
```

4. Install npm packages

```
npm i
```

### Running the app

1. With docker-compose

```
docker compose up -d
```

or shortly

```
make start
```

2. Without docker-compose

```
make mongo
make dev
```

or

```
docker run --name some-mongo -p0.0.0.0:27017:27017 -d mongo:5
npm run dev
```

### Examples

#### Create User

**Method**: POST

```
localhost:4000/api/v1/users
```

**Body:**

```
{
    "name": "John Doe",
    "email": "deneme@deneme.com",
    "password": "password"
}
```

#### Login User

**Method**: POST

```
localhost:4000/api/v1/users/login
```

**Body:**

```
{
    "email": "deneme@deneme.com",
    "password": "password"
}
```

#### Get Authenticated User

**Method**: GET

```
localhost:4000/api/v1/users/password-reset
```

**Header:**

```
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWJkY2Y0OGM5MzVkNzEyYWI1ZTBhMWUiLCJpYXQiOjE2Mzk4NDkwOTgsImV4cCI6MTY0MDQ1Mzg5OH0.wLXQN6UjV2Qu1raLxP9t2dtYaA87064S-b385LXl5WI"
```

#### Reset Password Token

**Method**: POST

```
localhost:4000/api/v1/users/me
```

**Body:**

```
{
    "email": "deneme@deneme.com"
}
```

![An example of the reset password email](./reset-password-email.png)

![Reset password user interface](./reset-password-ui.png)

#### Create Product

**Method**: POST

```
localhost:4000/api/v1/products
```

**Header:**

```
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWJkY2Y0OGM5MzVkNzEyYWI1ZTBhMWUiLCJpYXQiOjE2Mzk4NDkwOTgsImV4cCI6MTY0MDQ1Mzg5OH0.wLXQN6UjV2Qu1raLxP9t2dtYaA87064S-b385LXl5WI"
```

**Body:**

```
{
    "name": "Mekbuk",
    "description": "lorem ipsum dolor sit amet",
    "price": 18000
}
```

#### Upload Product Image

**Method**: POST

```
localhost:4000/api/v1/products/[:id]/image
```

![Postman example for upload product image](./upload-product-image.png)

<br />

**Contact**: Salim Bozok ([GitHub](https://github.com/nebisin) - [Linkedin](https://www.linkedin.com/in/salimbozok/) - <salimbozok@outlook.com>)
