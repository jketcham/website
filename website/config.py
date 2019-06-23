from os import environ
import importlib

from dotenv import load_dotenv

load_dotenv('.env')

env = environ.get('ENV', 'default')
config = importlib.import_module('config.' + env)
