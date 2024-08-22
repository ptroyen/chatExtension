chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Assuming request.text contains the content to be inserted into the textarea
    var textarea = document.getElementById('prompt-textarea');
    if (textarea) {
        textarea.value = request.text;

        // Move the cursor to the end of the textarea
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
});
