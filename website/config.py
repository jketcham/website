from os import environ
from os.path import join, dirname
import importlib

from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

env = environ.get('ENV', 'default')
config = importlib.import_module('config.' + env)
