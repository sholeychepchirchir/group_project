// ========== 1. Navigation Highlight ==========
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    if (
      link.href === window.location.href ||
      window.location.pathname.endsWith(link.getAttribute('href'))
    ) {
      link.style.color = '#3ebd3e';
      link.style.fontWeight = 'bold';
    }
  });
});

// ========== 2. Form Validation ==========
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('.form-section form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      let valid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = 'red';
          valid = false;
        } else {
          input.style.borderColor = '#ccc';
        }
      });
      // For sign up, check password match
      const password = form.querySelector('input[type="password"][name="password"]');
      const confirm = form.querySelector('input[type="password"][name="confirm"]');
      if (password && confirm && password.value !== confirm.value) {
        password.style.borderColor = 'red';
        confirm.style.borderColor = 'red';
        alert('Passwords do not match!');
        valid = false;
      }
      if (!valid) {
        e.preventDefault();
        alert('Please fill in all required fields.');
      }
    });
  });
});

// ========== 3. Edit Profile (Name, About, Photo) ==========
document.addEventListener('DOMContentLoaded', function() {
  const editBtn = document.getElementById('editProfileBtn');
  const modal = document.getElementById('editModal');
  const closeModal = document.getElementById('closeModal');
  const editForm = document.getElementById('editProfileForm');
  if (editBtn && modal && closeModal && editForm) {
    // Prefill fields when opening modal
    editBtn.onclick = function() {
      modal.style.display = 'flex';
      document.getElementById('newName').value = document.getElementById('profileName').textContent;
      document.getElementById('newAbout').value = document.getElementById('aboutText').textContent;
    };
    // Close modal
    closeModal.onclick = function() {
      modal.style.display = 'none';
    };
    // Save changes
    editForm.onsubmit = function(e) {
      e.preventDefault();
      // Update name
      const newName = document.getElementById('newName').value;
      if (newName) document.getElementById('profileName').textContent = newName;
      // Update about
      const newAbout = document.getElementById('newAbout').value;
      if (newAbout) document.getElementById('aboutText').textContent = newAbout;
      // Update photo (preview only)
      const photoInput = document.getElementById('newPhoto');
      if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById('profilePic').src = e.target.result;
        };
        reader.readAsDataURL(photoInput.files[0]);
      }
      modal.style.display = 'none';
    };
    // Close modal on outside click
    window.onclick = function(event) {
      if (event.target === modal) modal.style.display = 'none';
    };
  }
});


// ========== 4. Add Skill (Known & Needed) ==========
function addSkill(type) {
  let skillName = prompt("Enter the skill name:");
  if (!skillName) return;
  let skillImg = prompt("Enter image URL (or leave blank for default):");
  if (!skillImg) skillImg = "images/default-skill.png"; // Use your default icon
  let skillDiv = document.createElement('div');
  skillDiv.className = "listing";
  skillDiv.innerHTML = `<img src="${skillImg}" alt="${skillName}"><p>${skillName}</p>`;
  if (type === "known") {
    document.getElementById('skillsKnown').appendChild(skillDiv);
  } else {
    document.getElementById('skillsNeeded').appendChild(skillDiv);
  }
}

// ========== 5. Match With Others (Demo) ==========
function findMatches() {
  alert("Matching functionality coming soon!\n(In a real app, this would show users who have the skills you need.)");
}

// ========== 6. Dark and Light Mode ==========
document.addEventListener('DOMContentLoaded', function() {
  const modeBtn = document.getElementById('modeToggle');
  if (modeBtn) {
    modeBtn.onclick = function() {
      document.body.classList.toggle('dark-mode');
      // Save preference
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('mode', 'dark');
        modeBtn.textContent = "Light Mode";
      } else {
        localStorage.setItem('mode', 'light');
        modeBtn.textContent = "Dark Mode";
      }
    };
    // Load preference
    if (localStorage.getItem('mode') === 'dark') {
      document.body.classList.add('dark-mode');
      modeBtn.textContent = "Light Mode";
    }
  }
});

// ========== 7. Search Filter ==========
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.search-section input[type="text"]');
  const listings = document.querySelectorAll('.grid-3x3 .listing, .grid-3x2 .listing, .skills-grid .listing');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = searchInput.value.toLowerCase();
      listings.forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }
});

// ========== 8. Show/Hide Password ==========
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.form-section input[type="password"]').forEach(input => {
    // Avoid adding multiple toggles
    if (input.nextElementSibling && input.nextElementSibling.classList && input.nextElementSibling.classList.contains('toggle-password')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Show';
    btn.className = 'toggle-password';
    btn.style.marginLeft = '8px';
    btn.style.fontSize = '0.9em';
    btn.onclick = function(e) {
      e.preventDefault();
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? 'Show' : 'Hide';
    };
    input.parentNode.insertBefore(btn, input.nextSibling);
  });
});

// ========== 9. Profile Edit Button Alert (if modal not present) ==========
document.addEventListener('DOMContentLoaded', function() {
  const editBtn = document.getElementById('editProfileBtn');
  if (editBtn && !document.getElementById('editModal')) {
    editBtn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Edit Profile functionality coming soon!');
    });
  }
});
