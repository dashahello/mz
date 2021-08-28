# mz

## Description

mz is a Node.js server which is able to perform CRUD operations

## Usage

1. Clone repository `git clone https://github.com/dashahello/mz`
2. Go to cloned directory in terminal `cd mz`
3. Install the app with `npm install`
4. Create `.env` file in the app directory with a following variable:

- PORT (port, on which the server will run)

5. Create `data.json` file in the app directory with an empty array in there
6. Run `npm start`

### Request (example)

`POST /animals`

```
{
    "species": "Dog",
    "name": "Rex",
    "age": 2,
    "health": "No issues"
}

```

### Response (example)

```
[
    {
        "id": "c2c31403-2892-45f0-9eed-6cbe0d8b58b7",
        "species": "Dog",
        "name": "Rex",
        "age": 2,
        "health": "No issues"
    }
]
```
