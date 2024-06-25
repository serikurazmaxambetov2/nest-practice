from aiohttp import ClientResponse, ClientSession, ClientTimeout

from services.proxy import ProxyService


class RequestService:
    HEADERS = {
        'authority': 'www.test-uz.ru',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'ru,en;q=0.9',
        'cache-control': 'max-age=0',
        'referer': 'https://www.test-uz.ru/sbornik.php',
        'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "YaBrowser";v="24.4", "Yowser";v="2.5"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 YaBrowser/24.4.0.0 Safari/537.36',
    }

    @staticmethod
    async def get_with_proxy(session: ClientSession, url: str, **kwargs) -> ClientResponse:
        try:
            response = await session.get(
                url, 
                headers=RequestService.HEADERS,
                proxy=ProxyService.get_random_proxy(),
                timeout=ClientTimeout(10),
                **kwargs
            )

            return response
        except Exception as e:
            # Пробуем снова с новым прокси
            return await RequestService.get_with_proxy(session, url, **kwargs)