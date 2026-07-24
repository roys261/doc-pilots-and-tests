---
title: "Authentication and configuration"
chapter: 3
topic: "Types of credentials"
source: "Blueprint AI Assistant with Dell Automation Studio User Guide (July 2026, Rev. A00) and the Blueprint Assist Training repository"
pdf_pages: "12-12"
---

# Types of credentials

Blueprint AI Assistant supports multiple types of credentials.
Client credentials (OAuth2):
"credentials": {
  "type": "client_credentials",
  "client_id": " <your-client-id> ",
  "client_secret": " <your-client-secret> "
}
API key authentication:
"credentials": {
  "type": "api_key",
  "api_key": " <your-api-key> "
}
Basic authentication:
"credentials": {
  "type": "basic",
  "username": " <your-username> ",
  "password": " <your-password> "
}
