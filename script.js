// function for navigation highlight
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    if (link.href === window.location.href || window.location.pathname.endsWith(link.getAttribute('href'))) {
      link.style.color = '#3ebd3e';
      link.style.fontWeight = 'bold';
    }
  });
});

// function for Form Validation and redirection to signup
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('.form-section form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent default form submission
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
      // Check password match for signup
      const password = form.querySelector('input[name="password"]');
      const confirm = form.querySelector('input[name="confirm"]');
      if (password && confirm && password.value !== confirm.value) {
        password.style.borderColor = 'red';
        confirm.style.borderColor = 'red';
        alert('Passwords do not match!');
        valid = false;
      }
      if (!valid) {
        alert('Please fill in all required fields.');
        return;
      }
      // Handling  form submission
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton.textContent.includes('Sign Up')) {
        alert('Sign up successful! Redirecting to profile...');
        setTimeout(() => {
          window.location.href = 'profile.html';
        }, 1000);
      } else if (submitButton.textContent.includes('Sign In')) {
        alert('Sign in successful!');
        form.reset();
      }
    });
  });
});

// function for Editing Profile (Name, About, Photo) 
document.addEventListener('DOMContentLoaded', function() {
  const editBtn = document.querySelector('#editProfileBtn');
  const modal = document.querySelector('#editModal');
  const closeModal = document.querySelector('#closeModal');
  const editForm = document.querySelector('#editProfileForm');
  if (editBtn && modal && closeModal && editForm) {
    editBtn.addEventListener('click', function() {
      modal.style.display = 'flex';
      document.querySelector('#newName').value = document.querySelector('#profileName').textContent;
      document.querySelector('#newAbout').value = document.querySelector('#aboutText').textContent;
    });
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    editForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const newName = document.querySelector('#newName').value.trim();
      const newAbout = document.querySelector('#newAbout').value.trim();
      const photoInput = document.querySelector('#newPhoto');
      if (newName) {
        document.querySelector('#profileName').textContent = newName;
      }
      if (newAbout) {
        document.querySelector('#aboutText').textContent = newAbout;
      }
      if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          document.querySelector('#profilePic').src = e.target.result;
        };
        reader.readAsDataURL(photoInput.files[0]);
      }
      modal.style.display = 'none';
      alert('Profile updated successfully!');
    });
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
});

// function for Adding Skill (Known & Needed) 
function addSkill(type) {
  const skillName = prompt("Enter the skill name:");
  if (!skillName || !skillName.trim()) {
    alert("Skill name is required!");
    return;
  }
  const skillImg = prompt("Enter image URL (or leave blank for default):") || "images/default-skill.png";
  const skillDiv = document.createElement('div');
  skillDiv.className = "listing";
  skillDiv.innerHTML = `
    <img src="${skillImg}" alt="${skillName}">
    <p>${skillName}</p>
    <button class="edit-skill-btn" onclick="editSkill(this, '${type}')">Edit</button>
    <button class="delete-skill-btn" onclick="deleteSkill(this)">Delete</button>
  `;
  const target = type === "known" ? document.querySelector('#skillsKnown') : document.querySelector('#skillsNeeded');
  target.insertBefore(skillDiv, target.querySelector('.add-skill-btn'));
}

// function for editing skill
function editSkill(button, type) {
  const skillDiv = button.parentElement;
  const currentName = skillDiv.querySelector('p').textContent;
  const currentImg = skillDiv.querySelector('img').src;
  const newName = prompt("Edit skill name:", currentName);
  if (!newName || !newName.trim()) {
    alert("Skill name is required!");
    return;
  }
  const newImg = prompt("Edit image URL (or leave blank for default):", currentImg) || "images/default-skill.png";
  skillDiv.innerHTML = `
    <img src="${newImg}" alt="${newName}">
    <p>${newName}</p>
    <button class="edit-skill-btn" onclick="editSkill(this, '${type}')">Edit</button>
    <button class="delete-skill-btn" onclick="deleteSkill(this)">Delete</button>
  `;
  alert("Skill updated successfully!");
}

// function for deleting skill
function deleteSkill(button) {
  if (confirm("Are you sure you want to delete this skill?")) {
    button.parentElement.remove();
    alert("Skill deleted successfully!");
  }
}

// function to be implemented in future for users to mark skills
function findMatches() {
  // TODO: Implement skill matching functionality in the future
  // This will match users based on skills known and needed
  alert("Matching functionality is under development and will be available in a future update!");
}

// function for light and dark mode
document.addEventListener('DOMContentLoaded', function() {
  const modeBtn = document.querySelector('#modeToggle');
  if (modeBtn) {
    modeBtn.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('mode', 'dark');
        modeBtn.textContent = "☀️";
      } else {
        localStorage.setItem('mode', 'light');
        modeBtn.textContent = "🌙";
      }
    });
    if (localStorage.getItem('mode') === 'dark') {
      document.body.classList.add('dark-mode');
      modeBtn.textContent = "☀️";
    }
  }
});

// adding functionality for search filter
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.search-section input[type="text"]');
  const listings = document.querySelectorAll('.grid-3x3 .listing, .grid-3x2 .listing, .skills-grid .listing');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = searchInput.value.toLowerCase();
      listings.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }
});