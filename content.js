chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Locate the contenteditable div by its id and class
    const chatInput = document.querySelector('#prompt-textarea');

    if (chatInput) {
        // Insert the text into the div as HTML
        chatInput.innerHTML = `<p>${request.text}</p>`;

        // Focus the input area to activate it
        chatInput.focus();

        // Dispatch input events to mimic user input so the app registers the change
        chatInput.dispatchEvent(new Event('input', { bubbles: true }));
        chatInput.dispatchEvent(new Event('blur', { bubbles: true }));

        sendResponse({ success: true });
    } else {
        console.error("Chat input box not found.");
        sendResponse({ success: false });
    }
});


// // Older Version
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     // Assuming request.text contains the content to be inserted into the textarea
//     var textarea = document.getElementById('prompt-textarea');
//     if (textarea) {
//         textarea.value = request.text;

//         // Move the cursor to the end of the textarea
//         textarea.focus();
//         textarea.setSelectionRange(textarea.value.length, textarea.value.length);
//     }
// });
