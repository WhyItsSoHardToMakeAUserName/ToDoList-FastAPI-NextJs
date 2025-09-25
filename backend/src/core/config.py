import os
from datetime import datetime, timedelta

from dotenv import load_dotenv

load_dotenv()

class Configs():
    SECRET_KEY:str =  os.getenv("SECRET_KEY")
    ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

configs = Configs()