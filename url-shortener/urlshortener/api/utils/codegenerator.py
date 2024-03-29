from django.conf import settings
from random import choice
from string import ascii_letters, digits

SIZE = getattr(settings, "MAXIMUM_URL_CHARS", 7)
AVAIABLE_CHARS = ascii_letters + digits

def generate_random_code(chars=AVAIABLE_CHARS):
	return "".join(
	    [choice(chars) for _ in range(SIZE)]
	)