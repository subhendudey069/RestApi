document.addEventListener("DOMContentLoaded", () => {
    const subscriberList = document.getElementById("subscriber-list");
    const fetchButton = document.getElementById("fetch-All");

    // Replace this URL with the actual URL of your API
    const apiUrl = "http://localhost:3000/subscribers";

    // Function to fetch data and populate the list
    function fetchSubscribers() {
        // Clear the existing list items
        subscriberList.innerHTML = "";

        // Fetch data from your API
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Loop through the fetched data and create list items
                data.forEach((subscriber) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `Roll : ${subscriber.roll}, Name : ${subscriber.name}, Stream : ${subscriber.stream}, Year : ${subscriber.year}`;
                    subscriberList.appendChild(listItem);
                });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    // Add an event listener to the fetch button
    fetchButton.addEventListener("click", fetchSubscribers);
});


document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submit-button");
    const idInput = document.getElementById("id-input");
    const subscriberDetails = document.getElementById("subscriber-details");

    // Replace this URL with the actual URL of your API
    const apiUrl = "http://localhost:3000/subscribers";

    // Function to fetch and display subscriber details by Roll
    function fetchSubscriberById(roll) {
        // Fetch data from your API with the specified Roll
        fetch(`${apiUrl}/${roll}`)
            .then((response) => {
                if (response.status === 404) {
                    // Entry not found, display a message
                    subscriberDetails.innerHTML = "Entry not present";
                } else if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }
            })
            .then((subscriber) => {
                if (subscriber) {
                    // Display the subscriber details
                    subscriberDetails.innerHTML = `
                        <h2>Students Details</h2>
                        <p>Roll: ${subscriber.roll}</p>
                        <p>Name: ${subscriber.name}</p>
                        <p>Stream: ${subscriber.stream}</p>
                        <p>Year: ${subscriber.year}</p>
                        <p>Date of Reg: ${subscriber.subscribeDate}</p>
                    `;
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                subscriberDetails.innerHTML = "Error fetching data";
            });
    }

    // Add an event listener to the submit button
    submitButton.addEventListener("click", () => {
        const enteredId = idInput.value;
        if (enteredId) {
            fetchSubscriberById(enteredId);
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const createButton = document.getElementById("create-button");
    const rollInput = document.getElementById("roll-input");
    const nameInput = document.getElementById("name-input");
    const streamInput = document.getElementById("stream-input");
    const yearInput = document.getElementById("year-input");
    const subscriberList = document.getElementById("create-subscriber");

    // Replace this URL with the actual URL of your API
    const apiUrl = "http://localhost:3000/subscribers";

    // Function to create a new subscriber entry
    function createSubscriber() {
        const newSubscriber = {
            roll: rollInput.value,
            name: nameInput.value,
            stream: streamInput.value,
            year: yearInput.value
        };

        // Check if a subscriber with the same roll already exists
        fetch(`${apiUrl}/${newSubscriber.roll}`)
            .then((response) => {
                if (response.status === 200) {
                    // Roll already exists, display a message
                    return Promise.reject("This roll already exists");
                } else if (response.status === 404) {
                    // Roll doesn't exist, proceed to create the new entry
                    return fetch(apiUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newSubscriber)
                    });
                } else {
                    return Promise.reject("Error checking roll existence");
                }
            })
            .then((response) => response.json())
            .then((createdSubscriber) => {
                // Display the created subscriber in the list
                newText = `New Entry Created of ${createdSubscriber.name}`;
                subscriberList.innerHTML = `
                        <p>${newText}</p>   
                    `;
                // Clear the input fields
                rollInput.value = "";
                nameInput.value = "";
                streamInput.value = "";
                yearInput.value = "";
            })
            .catch((error) => {
                console.error("Error creating subscriber:", error);
                if (error === "This roll already exists") {
                    // Display a message if the roll already exists
                    alert("This roll already exists");
                }
            });
    }

    // Add an event listener to the create button
    createButton.addEventListener("click", createSubscriber);
});


document.addEventListener("DOMContentLoaded", () => {
    const updateButton = document.getElementById("update-button");
    const rollInput = document.getElementById("roll-input2");
    const nameInput = document.getElementById("name-input2");
    const streamInput = document.getElementById("stream-input2");
    const yearInput = document.getElementById("year-input2");
    const subscriberList = document.getElementById("subscriber-list");
    const updateDetails = document.getElementById("subscriber-update-details");

    // Replace this URL with the actual URL of your API
    const apiUrl = "http://localhost:3000/subscribers";

    // Function to update a subscriber entry
    function updateSubscriber() {
        const updatedSubscriber = {
            name: nameInput.value,
            stream: streamInput.value,
            year: yearInput.value
        };

        // Make a PATCH request to update the subscriber
        fetch(`${apiUrl}/${rollInput.value}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedSubscriber)
        })
        .then((response) => response.json())
        .then((updatedSubscriber) => {
            // Display the updated subscriber in the list
            updateDetails.innerHTML = `Updated Entry of ${updatedSubscriber.name} `;

            // Clear the input fields
            rollInput.value = "";
            nameInput.value = "";
            streamInput.value = "";
            yearInput.value = "";
        })
        .catch((error) => {
            console.error("Error updating subscriber:", error);
        });
    }

    // Add an event listener to the update button
    updateButton.addEventListener("click", updateSubscriber);
});

document.addEventListener("DOMContentLoaded", () => {
    const deleteButton = document.getElementById("delete-button");
    const rollInput = document.getElementById("roll-input3");
    const subscriberList = document.getElementById("subscriber-list2");

    // Replace this URL with the actual URL of your API
    const apiUrl = "http://localhost:3000/subscribers";

    // Function to delete a subscriber entry by roll
    function deleteSubscriberByRoll(roll) {
        // Check if a subscriber with the specified roll exists
        fetch(`${apiUrl}/${roll}`)
            .then((response) => {
                if (response.status === 200) {
                    // Roll exists, proceed to delete it
                    return fetch(`${apiUrl}/${roll}`, {
                        method: "DELETE"
                    });
                } else if (response.status === 404) {
                    // Roll doesn't exist, display a message
                    return Promise.reject("This roll does not exist");
                } else {
                    return Promise.reject("Error checking roll existence");
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    // Successfully deleted, remove it from the list
                    const subscriberListItem = document.querySelector(`li[data-roll="${roll}"]`);
                    if (subscriberListItem) {
                        subscriberListItem.remove();
                    }
                    text = `Deleted of Roll : ${roll} `;
                    subscriberList.innerHTML = `
                        <p>${text}</p>   
                    `;
                    // Clear the input field
                    rollInput.value = "";
                }
            })
            .catch((error) => {
                console.error("Error deleting subscriber:", error);
                if (error === "This roll does not exist") {
                    // Display a message if the roll doesn't exist
                    alert("This roll does not exist");
                }
            });
    }

    // Add an event listener to the delete button
    deleteButton.addEventListener("click", () => {
        const enteredRoll = rollInput.value;
        if (enteredRoll) {
            deleteSubscriberByRoll(enteredRoll);
        }
    });
});
