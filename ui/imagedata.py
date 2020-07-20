import base64

def getDataFromUrl(wwwLocationOfImage):
  data = requests.get(wwwLocationOfImage).content
  return base64.b64encode(data).decode()