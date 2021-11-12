"""
Project Settings file
"""
import os
from starlette.datastructures import CommaSeparatedStrings, Secret

default_route_str = "/api"

ALLOWED_HOSTS = CommaSeparatedStrings(os.getenv("ALLOWED_HOSTS", "*"))

mongo_db = "fastapi"
