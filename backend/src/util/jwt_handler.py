from jwt import JWT
from jwt.jwk import OctetJWK
from datetime import datetime, timedelta, timezone

from src.core.config import Configs

jwt_instance = JWT()

class JWTHandler:
    def __init__(self):
        # Configs.SECRET_KEY must be bytes
        self.secret_key = OctetJWK(Configs.SECRET_KEY.encode("utf-8"))
        self.algorithm = "HS256"
        self.access_token_expire_minutes = Configs.ACCESS_TOKEN_EXPIRE_MINUTES

    def create_access_token(self, data: dict, expires_delta: timedelta | None = None) -> str:
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=self.access_token_expire_minutes))
        to_encode.update({"exp": int(expire.timestamp())})
        return jwt_instance.encode(to_encode, self.secret_key, alg=self.algorithm)

    def verify_token(self, token: str) -> dict:
        return jwt_instance.decode(token, self.secret_key, algorithms=[self.algorithm])

jwt_handler = JWTHandler()