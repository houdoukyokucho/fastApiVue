from sqlalchemy import create_engine, MetaData

engine = create_engine(
    'mysql+pymysql://user_name:user_password@db:3306/database_name')
meta = MetaData()
conn = engine.connect()
