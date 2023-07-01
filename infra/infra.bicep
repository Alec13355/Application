param location string = resourceGroup().location // Location for all resources
param sku string = 'F1' // The SKU of App Service Plan
var appServicePlanName = 'appserviceplan-pli47gh5nfjwu'
var webSiteName = 'wapp-pli47gh5nfjwu'

resource appServicePlan 'Microsoft.Web/serverfarms@2020-06-01' = {
  name: appServicePlanName
  location: location
  properties: {
    reserved: true
  }
  sku: {
    name: sku
  }
  kind: 'linux'
}

resource appService 'Microsoft.Web/sites@2020-06-01' = {
  name: webSiteName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
    }
  }
}

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
output deployment_token string = listSecrets(staticSite.id, staticSite.apiVersion).properties.apiKey
