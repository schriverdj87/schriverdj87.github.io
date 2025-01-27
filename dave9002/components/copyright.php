<?php
 echo 
 "<div class = 'copyright'> &copy;David Schriver </div>
    <script>
       
        document.getElementsByClassName('copyright')[0].innerHTML += new Date().getFullYear();
  
    </script>";
?>