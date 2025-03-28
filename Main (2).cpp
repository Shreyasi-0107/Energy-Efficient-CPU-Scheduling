#include<iostream>
#include<vector>
#include<algorithm>
#include<thread>
#include<chrono>
using namespace std;

// Task structure to store task details
struct Task {
    int id;
    int priority; // 1 = High, 2 = Medium, 3 = Low
    int executionTime; // in milliseconds
    int powerConsumption; // Simulated power usage

    // Sorting tasks based on priority (ascending order)
    bool operator<(const Task &other) const {
        return priority < other.priority;
    }
};
// Function to dynamically adjust CPU frequency (simulated)
void adjustCPUFrequency(int priority) {
    if (priority == 1) {
        cout << "[CPU Mode] High Performance Mode Activated (Max Frequency)\n";
    } else if (priority == 2) {
        cout << "[CPU Mode] Balanced Mode Activated (Medium Frequency)\n";
    } else {
        cout << "[CPU Mode] Power Saving Mode Activated (Low Frequency)\n";
    }
}

// Function to execute a task
void executeTask(const Task &t) {
    cout << "Executing Task ID: " << t.id << " | Priority: " << t.priority 
         << " | Power Consumption: " << t.powerConsumption << "mW\n";
    
    adjustCPUFrequency(t.priority); // Adjust frequency before execution
    
    this_thread::sleep_for(chrono::milliseconds(t.executionTime)); // Simulate task execution
    cout << "Task ID " << t.id << " Completed \n";
}
// Energy-Efficient CPU Scheduling Algorithm
void energyEfficientScheduling(vector<Task> &taskQueue) {
    sort(taskQueue.begin(), taskQueue.end()); // Sort tasks by priority

    cout << "\n[Scheduling Tasks Based on Priority...]\n";
    
    for (const Task &t : taskQueue) {
        executeTask(t);
    }
    cout << "\n[All Tasks Executed with Optimal Power Efficiency ]\n";
}
int main() {
    // Sample list of tasks (Task ID, Priority, Execution Time, Power Consumption)
    vector<Task> taskQueue = {
        {1, 3, 1000, 50},  // Low priority, longer execution, low power
        {2, 1, 500, 150},  // High priority, short execution, high power
        {3, 2, 800, 100},  // Medium priority, moderate execution, medium power
        {4, 1, 400, 130},  // High priority, very short execution, high power
        {5, 2, 700, 90}    // Medium priority, medium execution, medium power
    };
    cout << "Energy-Efficient CPU Scheduling \n";
    energyEfficientScheduling(taskQueue);
    return 0;
}