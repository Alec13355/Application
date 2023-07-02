
resource staticSite 'Microsoft.Web/staticSites@2022-03-01' = {
  name: 'testSite'
#disable-next-line no-hardcoded-location
  location: 'westus2'
  properties: {}
  sku: {
    tier: 'Free'
    name: 'Free'
  }
}

#disable-next-line outputs-should-not-contain-secrets
output deployment_token string = staticSite.listSecrets().properties.apiKey
