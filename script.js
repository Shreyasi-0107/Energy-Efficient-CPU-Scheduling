let taskQueue = [];
let cpuModeCounts = { high: 0, balanced: 0, powerSaving: 0 };

function addTask() {
    let id = document.getElementById('taskId').value;
    let priority = document.getElementById('priority').value;
    let executionTime = document.getElementById('executionTime').value;
    let powerConsumption = document.getElementById('powerConsumption').value;

    if (id && priority && executionTime && powerConsumption) {
        taskQueue.push({
            id: parseInt(id),
            priority: parseInt(priority),
            executionTime: parseInt(executionTime),
            powerConsumption: parseInt(powerConsumption)
        });
        alert("Task Added Successfully!");
        clearForm();
    } else {
        alert("Please fill all fields!");
    }
}

function clearForm() {
    document.getElementById('taskId').value = '';
    document.getElementById('priority').value = '1';
    document.getElementById('executionTime').value = '';
    document.getElementById('powerConsumption').value = '';
}

function displayTasks() {
    let output = "<h2>Current Task Queue:</h2><ul>";
    taskQueue.forEach(task => {
        output += `<li>Task ID: ${task.id}, Priority: ${task.priority}, Execution: ${task.executionTime}ms, Power: ${task.powerConsumption}mW</li>`;
    });
    output += "</ul>";
    document.getElementById('output').innerHTML = output;
}

function startScheduling() {
    if (taskQueue.length === 0) {
        alert("No tasks to schedule!");
        return;
    }

    taskQueue.sort((a, b) => a.priority - b.priority);

    let output = "<h2>Scheduling Tasks...</h2>";

    // Reset CPU Mode Counts
    cpuModeCounts = { high: 0, balanced: 0, powerSaving: 0 };

    taskQueue.forEach(task => {
        output += `<p>Executing Task ID: ${task.id} | Priority: ${task.priority} | Power: ${task.powerConsumption}mW<br>`;

        if (task.priority == 1) {
            output += "[CPU Mode] High Performance Mode Activated<br>";
            cpuModeCounts.high++;
        } else if (task.priority == 2) {
            output += "[CPU Mode] Balanced Mode Activated<br>";
            cpuModeCounts.balanced++;
        } else {
            output += "[CPU Mode] Power Saving Mode Activated<br>";
            cpuModeCounts.powerSaving++;
        }

        output += `Task ID ${task.id} Completed (Simulated execution: ${task.executionTime}ms)</p>`;
    });

    output += "<h3>All Tasks Executed with Optimal Power Efficiency!</h3>";
    document.getElementById('output').innerHTML = output;

    // Draw the chart
    drawChart();
}

function drawChart() {
    const ctx = document.getElementById('cpuModeChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar', // Changed to bar chart for interactivity
        data: {
            labels: ['High Performance Mode', 'Balanced Mode', 'Power Saving Mode'],
            datasets: [{
                label: 'Mode Usage',
                data: [cpuModeCounts.high, cpuModeCounts.balanced, cpuModeCounts.powerSaving],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'CPU Mode Usage During Scheduling'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.raw + ' tasks';
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'CPU Modes'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Tasks'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}
