def classifyImage(key, imagedata):
  checkApiKey(key)

  url = ("https://machinelearningforkids.co.uk/api/scratch/" + 
         key + 
         "/classify")

  response = requests.post(url, json={ "data" : imagedata })

  if response.ok:
    responseData = response.json()
    topMatch = responseData[0]
    return topMatch
  else:
    errorData = response.json()
    print (errorData)
    response.raise_for_status()

def storeImage(key, imagedata, label):
  checkApiKey(key)
  
  url = ("https://machinelearningforkids.co.uk/api/scratch/" + 
         key + 
         "/train")

  response = requests.post(url, 
                           json={ 
                             "data" : imagedata, 
                             "label" : label 
                           })

  if response.ok == False:
    print (response.json())