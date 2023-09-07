import http.client

conn = http.client.HTTPSConnection("platform.flatfile.com")

headers = {
    'Accept': "application/json, multipart/form-data",
    'Authorization': "Bearer FF00OVAFY28ANMQOES0PKIPX37EJD48NNPCSHZAT+ACLMfpseeoBYOdbZUUeeAXHM29uZ96vOEiR1pp7Z"
}

conn.request("GET", "/api/v1/files/5b46c55f-7da6-4da5-87d2-118e1f90356a/download", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))