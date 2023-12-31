document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  const submitButton = document.querySelector('button[type="submit"]'); // Select the submit button

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Disable the button and change the text to "Loading"
    submitButton.disabled = true;
    submitButton.textContent = 'Loading...';

    if (grecaptcha.getResponse().length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please solve the reCAPTCHA before proceeding!',
        confirmButtonText: 'OK',
      });

      // Re-enable the button and change the text back to "Join waitlist"
      submitButton.disabled = false;
      submitButton.textContent = 'Join waitlist';
      } else {

        try {
          const response = await fetch('/joinWaitlist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(new FormData(form)),
          });
    
          if (response.ok) {
            // Form submitted successfully
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Congratulations! You are now on the waitlist!',
              confirmButtonText: 'OK',
            });
    
            // Reset the form after a successful submission
            form.reset();
    
          } else {
            // Error submitting form
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'We encountered an issue while adding you to the waitlist',
              confirmButtonText: 'OK',
            });
          }
        } catch (error) {
          console.error('An error occurred:', error);
          // Display SweetAlert error message
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            confirmButtonText: 'OK',
          });
        } finally {
          // Re-enable the button and change the text back to "Join waitlist"
          submitButton.disabled = false;
          submitButton.textContent = 'Join waitlist';
        }
        
      }
  });
});