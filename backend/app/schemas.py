from pydantic import BaseModel, Field
from datetime import date
from enum import Enum

class RateSource(str, Enum):
    BOJ = "BOJ"
    MIZUHO_TTM = "Mizuho TTM"
    MANUAL = "Manual"

class ConversionCreate(BaseModel):

    usd_amount: float
    rate: float
    rate_source: RateSource
    conversion_date: date


class ConversionResponse(BaseModel):

    id: int
    usd_amount: float
    rate: float
    jpy_amount: float
    rate_source: str
    conversion_date: date

    class Config:
        orm_mode = True