from fastapi import APIRouter
from models import users
from db import conn
from schemas import User

user = APIRouter()


@user.get('/user/')
async def fetch_users():
    return conn.execute(users.select()).fetchall()


@user.get('/user/{id}')
async def fetch_user(id: int):
    return conn.execute(users.select().where(users.c.id == id)).first()


@user.post('/user/')
async def create_user(user: User):
    conn.execute(users.insert().values(
        name=user.name,
        email=user.email,
        password=user.password
    ))

    return conn.execute(users.select()).fetchall()


@user.put('/user/{id}')
async def update_user(id: int, user: User):
    conn.execute(users.update().values(
        name=user.name,
        email=user.email,
        password=user.password
    ).where(users.c.id == id))

    return conn.execute(users.select()).fetchall()


@user.delete('/user/{id}')
async def delete_user(id: int):
    conn.execute(users.delete().where(users.c.id == id))
    return conn.execute(users.select()).fetchall()
