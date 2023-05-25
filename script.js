$(document).ready(function() {
    // Select the video element
    var video = $('#home-automation-video')[0];
  
    // Pause the video on load
    video.pause();
  
    // Detect when the user scrolls
    $(window).scroll(function() {
      // Get the distance between the top of the video and the top of the viewport
      var videoTop = $('#home-automation-video').offset().top - $(window).scrollTop();
  
      // Pause the video if it's not visible
      if (videoTop < 0 || videoTop > $(window).height()) {
        video.pause();
      } else {
        // Play the video if it's visible
        video.play();
      }
    });
  });
  


  const images = document.querySelectorAll('.col-lg-3 img');
for (let i = 0; i < images.length; i++) {
  images[i].addEventListener('click', function() {
    this.style.filter = 'brightness(0%)';
  });
}


    const img = document.querySelector('.fade-in');
    img.classList.add('show');


   
    // Check if the form was submitted
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      
      // Get the form data
      $email = $_POST['email'];
      $contact = $_POST['contact'];
      $system = $_POST['system'];
    
      // Compose the email message
      $to = 'helpdesk@cardinalt.com';
      $subject = 'IT Support Request';
      $message = "Email: $email\nContact: $contact\nPreferred System: $system";
      
      // Send the email
      mail($to, $subject, $message);
      
      // Redirect to a success page
      header('Location: success.html');
      exit();
    }
    
    
    