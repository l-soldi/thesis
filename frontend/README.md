# Thesis

Repository contenente il progetto full-stack per la tesi di laurea

## Tecnologie

- Mockup: [Figma](https://www.figma.com/design/E2oxlgq3FVQRVGZg5toH1E/Tesi)

FE:
<<<<<<< HEAD
 - ```yarn vite```
=======

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

4. Utenze utilizzabili per testare
email@email.com - password

5. Testing
BE: `pytest tests.py`
FE: `yarn test` esegue i test unitari e di integrazione
FE: `yarn cy:r` esegue i test E2E in modalità headless, ma è necessario eseguire `yarn vite` parallelamente
FE: `yarn cy:o` apre la schermata di cypress, ma è necessario eseguire `yarn vite` parallelamente
