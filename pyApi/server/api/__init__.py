from fastapi import APIRouter, Depends

from server.api.endpoints.hello import hello_router


router = APIRouter()
router.include_router(hello_router,
                      prefix="/hello"
                      )
