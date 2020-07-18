def classifyText(key, text):
  checkApiKey(key)

  url = ("https://machinelearningforkids.co.uk/api/scratch/" + 
         key + 
         "/classify")

  response = requests.post(url, json={ "data" : text })

  if response.ok:
    responseData = response.json()
    topMatch = responseData[0]
    return topMatch
  else:
    errorData = response.json()
    print (errorData)
    response.raise_for_status()

def storeText(key, text, label):
  checkApiKey(key)
  
  url = ("https://machinelearningforkids.co.uk/api/scratch/" + 
         key + 
         "/train")

  response = requests.post(url, 
                           json={ "data" : text, "label" : label })

  if response.ok == False:
    print (response.json())
