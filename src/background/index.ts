import { storage } from "../storage";

let chatgptInstance;


const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJhYmR1bHJhaG1hbmFhejk1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLWF0QzFBSjlKNHBhdEVnTTkyVUZMOURrOSJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTQ1OTA5MDIxMzg1NTI5MjY5MTgiLCJhdWQiOlsiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MSIsImh0dHBzOi8vb3BlbmFpLm9wZW5haS5hdXRoMGFwcC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjkxNzM3MzM0LCJleHAiOjE2OTI5NDY5MzQsImF6cCI6IlRkSkljYmUxNldvVEh0Tjk1bnl5d2g1RTR5T282SXRHIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBtb2RlbC5yZWFkIG1vZGVsLnJlcXVlc3Qgb3JnYW5pemF0aW9uLnJlYWQgb3JnYW5pemF0aW9uLndyaXRlIG9mZmxpbmVfYWNjZXNzIn0.QxtV-CWAZ309Vm2baqC_uZ8TcBMI9qFuupS9BkYvZyyPiTeQEv4sNUZm-CTrWVWaBH8cUu62V8NI2tfJmJMC1LkqJjlDBTCH064lN2OorD4HhOwiFymOKWtNRiUpfQYN53gfjeVbpS6sl54e3nJaa_1bUZ76rckd_9_eXDrnCCdCSnbyABUmOBWedde2oShW1vJf4sgsu2Y8k11Al9MP9t9BGkPL-BB8ndUBjeizJsWJZuSfilQ80rDE2s3xx0Mdkj2Dm_-EA2remWKbAXywbgoOfKQMMd6N95OcQU601Oz5rFjANwkMz6oYibDkriFb0V97763DcrWT0_rkPIaDqA'

const conversationId = 'ff166538-09f5-4827-8d81-0fed24c9f67e'

async function request(token, method, path, data) {
  return fetch(`https://chat.openai.com/backend-api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: data === undefined ? undefined : JSON.stringify(data),
  });
}


async function fetchModels(token) {
  const resp = await request(token, 'GET', '/models').then((r) => r.json());
  return resp.models;
}

async function fetchConversation(token) {
  const resp = await request(token, 'GET', `/conversation/${conversationId}`).then((r) => r.json());
  return resp.mapping;
}


async function fetchConversations(token) {
  const resp = await request(token, 'GET', '/conversations').then((r) => r.json());
  return resp.items;
}

chrome.runtime.onInstalled.addListener(async () => {
  const convs = await fetchConversations(token)
  const conv = await fetchConversation(token)
  console.log(convs)
  console.log(conv)

});
