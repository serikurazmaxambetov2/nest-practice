import random
from typing import List


class ProxyService:
    # Формат прокси: user:password@host:port и только http.
    proxies: List[str] = open('./proxies.txt').read().split('\n')

    @staticmethod
    def get_random_proxy():
        if ProxyService.proxies:
            return 'http://' + random.choice(ProxyService.proxies)
        else:
            print('Использовать без прокси рискованно!')
            return None