document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    // Event listener for form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Extracting values from the form
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const gender = document.getElementById('gender').value;
      const mobile = document.getElementById('mobile').value.trim();
      const dob = document.getElementById('dob').value;
      const email = document.getElementById('email').value.trim();
      const language = document.getElementById('language').value;
      const message = document.getElementById('message').value.trim();

      // Validate First Name
      if (firstName.length < 2 || firstName.length > 50) {
          alert('First name must be between 2 and 50 characters.');
          return;
      }

      // Validate Last Name
      if (lastName.length < 2 || lastName.length > 50) {
          alert('Last name must be between 2 and 50 characters.');
          return;
      }

      // Validate Gender
      if (!gender) {
          alert('Please select your gender.');
          return;
      }

      // Validate Mobile Number
      const mobileRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
      if (!mobileRegex.test(mobile)) {
          alert('Mobile number must be in the format 123-456-7890.');
          return;
      }

      // Validate Date of Birth
      if (!dob) {
          alert('Please select your date of birth.');
          return;
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          alert('Please enter a valid email address.');
          return;
      }

      // Validate Language
      if (!language) {
          alert('Please select a language of communication.');
          return;
      }

      // Validate Message
      if (message.length === 0 || message.length > 500) {
          alert('Message must be between 1 and 500 characters.');
          return;
      }

        // Collect form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            // Send the form data to the backend via fetch
            const response = await fetch('http://localhost:3000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('We have received your message, thank you for sharing your experience!.');
                form.reset(); // Reset the form after successful submission
            } else {
                alert('Failed to send the message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});
