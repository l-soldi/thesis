import pytest
from app import app
import logging
import uuid

# Set up logging
logger = logging.getLogger(__name__)

@pytest.fixture
def client():
    app.testing = True
    with app.test_client() as client:
        yield client

def test_get_experiences(client):
    response = client.get("api/experiences")
    logger.info(response.data)
    assert response.status_code == 200
    json = response.get_json()
    assert len(json) == 4
    assert json[0]["id"] == 1
    assert json[1]["id"] == 2
    assert json[2]["id"] == 3
    assert json[3]["id"] == 4
    

def test_get_reservations(client):
    headers={ 'Content-type':'application/json', 'Accept':'application/json'}
    data = {"userId": "2"}
    response = client.post("api/reservations?page=1&perPage=50", json = data, headers = headers)
    assert response.status_code == 200

def test_create_update_delete_reservations(client):
    # Test creazione prenotazione
    data= {"date":"2024-12-18","peopleNum":"1","name":"Mario","lastname":"Rossi","email":"email@email.com","phone":"333333333","expId":1,"userId":"2"}
    headers={ 'Content-type':'application/json', 'Accept':'application/json'}
    response = client.put("api/reservations", json =data, headers = headers)
    logger.info(response.get_json())
    assert response.status_code == 201
    res_id = response.get_json()["id"]

    # Test update prenotazione appena creata
    data= {"date":"2024-12-18","peopleNum":"2","name":"Giuseppe","lastname":"Verdi","email":"g.verdi@email.com","phone":"333333334"}
    response = client.patch("api/reservations/"+str(res_id),json=data)
    assert response.status_code == 200
    logger.info(response.get_json())
    
    # Test cancellazione prenotazione appena creata
    response = client.delete("api/reservations/"+str(res_id))
    assert response.status_code == 200

def test_reservations_update_not_found(client):
    data= {"date":"2024-12-18","peopleNum":"2","name":"Giuseppe","lastname":"Verdi","email":"g.verdi@email.com","phone":"333333334"}
    # Non esiste prenotazione con id 99999999
    response = client.patch("api/reservations/99999999",json=data)
    assert response.status_code == 404
    logger.info(response.get_json())

def test_reservations_delete_not_found(client):
    # Non esiste prenotazione con id 99999999
    response = client.delete("api/reservations/99999999")
    assert response.status_code == 404
    logger.info(response.get_json())

def test_login_success(client):
    headers={ 'Content-type':'application/json', 'Accept':'application/json'}
    response = client.post("api/login", json = {
        "email": "email@email.com",
        "password": "password"
    }, headers = headers)
    assert response.status_code == 200

def test_login_error(client):
    headers={ 'Content-type':'application/json', 'Accept':'application/json'}
    data = {"email": "error@email.com","password": "wrongpassword"}
    response = client.post("api/login", json = data, headers = headers)
    assert response.status_code == 401

def test_register_success(client):
    headers={ 'Content-type':'application/json', 'Accept':'application/json'}
    # Crea un nuova email per ogni test effettuato con formato g.verdi + uuid hex str
    data = {"name": "Giuseppe","lastname": "Verdi","email": "g.verdi"+uuid.uuid4().hex+"@email.com","password": "securepwd"}
    response = client.post("api/register", json=data, headers = headers)
    assert response.status_code == 201

def test_register_error(client):
    headers={ 'Content-type':'application/json', 'Accept':'application/json'}
    data = {"name": "Mario","lastname": "Rossi","email": "email@email.com","password": "password"}
    response = client.post("api/register", json = data, headers = headers)
    assert response.status_code == 400