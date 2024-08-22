// Fetch the JSON file containing options and content
fetch('prompts.json')
  .then(response => response.json())
  .then(data => {
    // Generate options in extension popup
    const optionsContainer = document.getElementById('options-container');
    data.forEach(item => {
      const optionButton = document.createElement('button');
      optionButton.textContent = item.title;
      optionButton.addEventListener('click', function() {
        // Insert corresponding content into the text box
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { text: item.content });
        });
      });
      optionsContainer.appendChild(optionButton);
    });
  })
  .catch(error => console.error('Error fetching JSON:', error));

// Function to handle editing prompts
function editPrompts() {
    // Open a new HTML page for editing prompts : edit_prompts.html
    chrome.tabs.create({ url: "edit_prompts.html" });

    // Listen for messages from the popup script
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === "editPrompts") {
            // Open a new HTML page for editing prompts
            chrome.tabs.create({ url: "edit_prompts.html" });
        }
    });

    
}

// Add click event listener to the "Edit Prompts" :  <button id="edit-prompts">Edit Prompts</button>
document.getElementById('edit-prompts').addEventListener('click', editPrompts);

