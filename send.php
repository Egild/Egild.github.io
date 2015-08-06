<?php
    $email_to =   'loku56@mail.ru';     
    $subject  =   'Заявка с лендинга для интернет-магазинов';
    $name     =   $_POST['name']; 
    $email    =   $_POST['email']; 
    $phone    =   $_POST['phone'];
  $message  =  "Данные заявки:";
  if ($name==true){$message  .=  "\nИмя: $name";}
  if ($phone==true){$message  .=  "\nТелефон: $phone";}
  $message  .=  "\nemail: $email";
  
 
    $headers  = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
 
    if(mail($email_to, $subject, $message, $headers)){
        echo 'sent';
    }else{
        echo 'failed';
    }
?>