(function() {
    const dropdown = document.getElementById('dropdown');
    const chatInput = document.getElementById('chatInput');
  
    if (!dropdown) {
      const dropdownHtml = `
        <div id="dropdown" style="display:none; position:absolute; background:white; border:1px solid #ccc; z-index:1000;">
          <ul id="dropdown-list">
            <li class="dropdown-item">Item 1</li>
            <li class="dropdown-item">Item 2</li>
            <li class="dropdown-item">Item 3</li>
          </ul>
        </div>
      `;
  
      document.body.insertAdjacentHTML('beforeend', dropdownHtml);
    }
  
    const dropdownMenu = document.getElementById('dropdown');
    const dropdownList = document.getElementById('dropdown-list');
  
    dropdownList.addEventListener('click', (event) => {
      if (event.target && event.target.nodeName === 'LI') {
        chatInput.value += event.target.textContent;
        dropdownMenu.style.display = 'none';
      }
    });
  
    document.getElementById('chatInput').addEventListener('keydown', (event) => {
      if (event.key === '\\') {
        const rect = chatInput.getBoundingClientRect();
        dropdownMenu.style.left = `${rect.left}px`;
        dropdownMenu.style.top = `${rect.bottom}px`;
        dropdownMenu.style.display = 'block';
      }
    });
  
    document.addEventListener('click', (event) => {
      if (!dropdownMenu.contains(event.target) && event.target !== chatInput) {
        dropdownMenu.style.display = 'none';
      }
    });
  })();
  