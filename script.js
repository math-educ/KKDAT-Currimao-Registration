import { db, auth } from './firebase-config.js';
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// --- REGISTRATION LOGIC ---
const regForm = document.getElementById('registrationForm');
if (regForm) {
    regForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.disabled = true;

        const data = {
            fullName: document.getElementById('fullName').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            address: document.getElementById('address').value,
            contact: document.getElementById('contact').value,
            email: document.getElementById('email').value,
            dept: document.getElementById('dept').value,
            createdAt: serverTimestamp()
        };

        try {
            await addDoc(collection(db, "registrations"), data);
            document.getElementById('successModal').classList.remove('hidden');
            regForm.reset();
        } catch (err) {
            alert("Error: " + err.message);
        } finally {
            btn.disabled = false;
        }
    });
}

// --- AUTH & DASHBOARD LOGIC ---
const loginForm = document.getElementById('loginForm');
onAuthStateChanged(auth, (user) => {
    const dashboard = document.getElementById('dashboardContent');
    const loginModal = document.getElementById('loginModal');
    
    if (user) {
        if (loginModal) loginModal.classList.add('hidden');
        if (dashboard) {
            dashboard.classList.remove('hidden');
            loadTableData();
        }
    } else {
        if (dashboard) dashboard.classList.add('hidden');
        if (loginModal) loginModal.classList.remove('hidden');
    }
});

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('adminEmail').value;
        const pass = document.getElementById('adminPassword').value;
        try {
            await signInWithEmailAndPassword(auth, email, pass);
        } catch (err) {
            alert("Login Failed: " + err.message);
        }
    });
}

function loadTableData() {
    const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
        const tableBody = document.getElementById('tableBody');
        if (!tableBody) return;
        tableBody.innerHTML = "";
        snapshot.forEach((docSnap) => {
            const item = docSnap.data();
            const date = item.createdAt?.toDate().toLocaleDateString() || "Pending...";
            tableBody.innerHTML += `
                <tr>
                    <td>${item.fullName}</td>
                    <td>${item.email}</td>
                    <td>${item.dept}</td>
                    <td>${date}</td>
                    <td><button onclick="deleteEntry('${docSnap.id}')" class="danger-btn">Delete</button></td>
                </tr>
            `;
        });
    });
}

// Attach logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) logoutBtn.onclick = () => signOut(auth);
