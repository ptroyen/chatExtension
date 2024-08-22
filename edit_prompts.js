<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edit Prompts</title>
</head>
<body>
  <h1>Edit Prompts</h1>
  
  <!-- Display existing prompts with delete option -->
  <h2>Existing Prompts</h2>
  <ul id="existing-prompts"></ul>
  
  <!-- Form to add a new prompt -->
  <form id="add-prompt-form">
    <label for="prompt-title">Title:</label>
    <input type="text" id="prompt-title" required><br>
    <label for="prompt-content">Content:</label>
    <textarea id="prompt-content" required></textarea><br>
    <label for="prompt-description">Description:</label>
    <input type="text" id="prompt-description" required><br>
    <button type="submit">Add Prompt</button>
  </form>
  
  <script>
    // Function to delete a prompt by its title
    function deletePrompt(promptTitle) {
        // Fetch the prompts.json file
        fetch('prompts.json')
          .then(response => response.json())
          .then(data => {
            // Find the prompt with the specified title
            const index = data.findIndex(prompt => prompt.title === promptTitle);
            if (index !== -1) {
              // Remove the prompt from the data array
              data.splice(index, 1);
              // Save the updated data back to the prompts.json file
              savePrompts(data);
            } else {
              console.error('Prompt not found:', promptTitle);
            }
          })
          .catch(error => console.error('Error deleting prompt:', error));
    }
    
    // Function to save updated prompts data back to prompts.json
    function savePrompts(data) {
      // Convert data to JSON string
      const jsonData = JSON.stringify(data);
      // Save JSON data back to prompts.json
      // You might use localStorage or another method to save data permanently
      // For example:
      localStorage.setItem('prompts', jsonData);
    }
    
    // Load existing prompts from localStorage
    const existingPrompts = JSON.parse(localStorage.getItem('prompts')) || [];
    
    const existingPromptsList = document.getElementById('existing-prompts');
    // Iterate over each prompt and create list items with delete option
    existingPrompts.forEach(prompt => {
      const listItem = document.createElement('li');
      listItem.textContent = prompt.title;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
        // Delete prompt when delete button is clicked
        deletePrompt(prompt.title);
        // Remove list item from DOM
        listItem.remove();
      });
      listItem.appendChild(deleteButton);
      existingPromptsList.appendChild(listItem);
    });
    
    // Function to handle adding a new prompt
    function addPrompt(event) {
      event.preventDefault(); // Prevent form submission
      
      // Get values from form fields
      const title = document.getElementById('prompt-title').value;
      const content = document.getElementById('prompt-content').value;
      const description = document.getElementById('prompt-description').value;
      
      // Validate input
      if (!title || !content || !description) {
        alert('Please fill out all fields');
        return;
      }
      
      // Create new prompt object
      const newPrompt = {
        autoSwitch: false,
        categoryId: "",
        content: content,
        description: description,
        id: generateId(), // You can generate a unique ID here
        params: [],
        title: title
      };
      
      // Save the new prompt to localStorage or another storage method
      saveNewPrompt(newPrompt);
      
      // Clear form fields
      document.getElementById('prompt-title').value = '';
      document.getElementById('prompt-content').value = '';
      document.getElementById('prompt-description').value = '';
      
      // Display success message or update UI
      alert('Prompt added successfully');
    }
    
    // Function to save the new prompt
    function saveNewPrompt(prompt) {
      // Load existing prompts from localStorage
      const existingPrompts = JSON.parse(localStorage.getItem('prompts')) || [];
      // Add the new prompt to the existing prompts array
      existingPrompts.push(prompt);
      // Save the updated prompts array back to localStorage
      localStorage.setItem('prompts', JSON.stringify(existingPrompts));
      // Refresh the page to display the new prompt in the list of existing prompts
      location.reload();
    }
    
    // Function to generate a unique ID (you can customize this according to your requirements)
    function generateId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Add event listener for the form submission
    document.getElementById('add-prompt-form').addEventListener('submit', addPrompt);
  </script>
</body>
</html>
