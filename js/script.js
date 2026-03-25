// Generate background floating particles
const bg = document.querySelector('.bg-shapes');
for (let i = 0; i < 15; i++) {
    const shape = document.createElement('div');
    shape.style.left = Math.random() * 100 + 'vw';
    shape.style.animationDelay = Math.random() * 5 + 's';
    shape.style.width = shape.style.height = Math.random() * 50 + 20 + 'px';
    bg.appendChild(shape);
}

// Form Submission with AJAX
const regForm = document.getElementById('regForm');
if(regForm) {
    regForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.innerText = "Processing...";
        btn.disabled = true;

        const formData = new FormData(regForm);
        
        try {
            const response = await fetch('process.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.text();
            
            if(result === "success") {
                alert("Registration Successful!");
                regForm.reset();
            } else {
                alert("Error: " + result);
            }
        } catch (error) {
            console.error(error);
        } finally {
            btn.innerText = "Register Now";
            btn.disabled = false;
        }
    });
}

// Search Filter for Dashboard
function filterTable() {
    const input = document.getElementById("searchInput").value.toUpperCase();
    const rows = document.querySelector("table").rows;
    for (let i = 1; i < rows.length; i++) {
        let text = rows[i].textContent.toUpperCase();
        rows[i].style.display = text.includes(input) ? "" : "none";
    }
}
