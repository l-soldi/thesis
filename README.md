# Thesis

Repository contenente il progetto full-stack per la tesi di laurea

## Tecnologie

- Mockup: [Figma](https://www.figma.com/design/E2oxlgq3FVQRVGZg5toH1E/Tesi)

FE:

- React with Vite

BE:

- Python

- SQLLite

- SQLAlchemy

## Get started

Requisiti:

- python3
- npm
- node
- yarn 

Dopo aver clonato la repo:

1. Avvio del backend:

- macOS
  ```python
  cd backend
  python3 -m venv venv
  source ./venv/bin/activate
  pip3 install -r requirements.txt
  flask run
  ```
- windows
  ```python
  cd backend
  python -m venv venv
   venv\Scripts\activate su cmd.exe
   .\venv\Scripts\Activate su powershell
  pip install -r requirements.txt
  flask run
  ```

2. Avvio del frontend:

- macOS & windows
  ```npm
  cd frontend
  yarn install
  yarn vite
  ```

3. Applicativo: `localhost:5173/`
