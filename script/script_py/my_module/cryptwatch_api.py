import requests
import urllib.parse

#https://api.cryptowat.ch/markets/bitflyer/btcjpy/ohlc?periods=86400&after=1564585200&before=1564671600

def func():
    for i in range(5):
        if i == 3:
            print(i)
            return "return"
    else:
        print("elseblock")




func()