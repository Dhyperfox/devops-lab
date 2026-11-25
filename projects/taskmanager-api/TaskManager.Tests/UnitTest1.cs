using TaskManager.Api.Models;

namespace TaskManager.Tests;

public class TaskItemTests
{
    [Fact]
    public void NewTask_ShouldHaveDefaultValues()
    {
        // Arrange
        var task = new TaskItem();

        // Assert
        Assert.Equal(0, task.Id);
        Assert.Equal(string.Empty, task.Title);
        Assert.False(task.IsCompleted);
    }

    [Fact]
    public void Task_ShouldStoreProvidedValues()
    {
        // Arrange
        var task = new TaskItem
        {
            Id = 1,
            Title = "Learn DevOps",
            IsCompleted = true
        };

        // Assert
        Assert.Equal(1, task.Id);
        Assert.Equal("Learn DevOps", task.Title);
        Assert.True(task.IsCompleted);
    }
}
