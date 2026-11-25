using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using TaskManager.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TaskManagerDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new
{
    status = "Healthy"
}));
app.MapGet("/tasks", async (TaskManagerDbContext db) =>
{
    var tasks = await db.Tasks.ToListAsync();

    return Results.Ok(tasks);
});

app.MapPost("/tasks", async (
    TaskItem task,
    TaskManagerDbContext db) =>
{
    db.Tasks.Add(task);

    await db.SaveChangesAsync();

    return Results.Created($"/tasks/{task.Id}", task);
});

app.MapGet("/tasks/{id:int}", async (
    int id,
    TaskManagerDbContext db) =>
{
    var task = await db.Tasks.FindAsync(id);

    return task is null
        ? Results.NotFound()
        : Results.Ok(task);
});

app.MapPut("/tasks/{id:int}", async (
    int id,
    TaskItem updatedTask,
    TaskManagerDbContext db) =>
{
    var task = await db.Tasks.FindAsync(id);

    if (task is null)
        return Results.NotFound();

    task.Title = updatedTask.Title;
    task.IsCompleted = updatedTask.IsCompleted;

    await db.SaveChangesAsync();

    return Results.Ok(task);
});

app.MapDelete("/tasks/{id:int}", async (
    int id,
    TaskManagerDbContext db) =>
{
    var task = await db.Tasks.FindAsync(id);

    if (task is null)
        return Results.NotFound();

    db.Tasks.Remove(task);

    await db.SaveChangesAsync();

    return Results.NoContent();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
