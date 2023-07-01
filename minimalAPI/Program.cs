using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});
builder.Services.AddHttpClient();

var app = builder.Build();
app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
app.Urls.Add("http://localhost:5000");
app.Urls.Add("https://localhost:5001");
app.UseSwagger();
  app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });


app.MapGet("/", () => "Hello World!");

app.MapGet("/GetAll", async (HttpClient httpClient) => {
    var response = await httpClient.GetAsync("https://jsonplaceholder.typicode.com/photos");
    response.EnsureSuccessStatusCode();
    var json = await response.Content.ReadAsStringAsync();
    return JsonConvert.DeserializeObject<Photo[]>(json);
});

app.MapGet("/GetSpecific", async (HttpClient httpClient, int photoId) => {
    var response = await httpClient.GetAsync($"https://jsonplaceholder.typicode.com/photos?albumId={photoId}");
    response.EnsureSuccessStatusCode();
    var json = await response.Content.ReadAsStringAsync();
    return JsonConvert.DeserializeObject<Photo[]>(json);
});

app.Run();
