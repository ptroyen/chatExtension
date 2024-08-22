// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "editPrompts") {
        // Open a new HTML page for editing prompts
        chrome.tabs.create({ url: "edit_prompts.html" });
    }
});
