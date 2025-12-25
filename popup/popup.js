const btn = document.getElementById("confirm")
btn.addEventListener("click", ()=>{


    browser.tabs.query({ active: true, currentWindow: true })
    .then(
        (tabs)=>{
            if (!tabs.length) return;
            const tab = tabs[0];
            browser.tabs.sendMessage(tab.id, {
                type: "TUNNEL",
                value: document.getElementById("tunnel").value
            });
        }
    );
    
})