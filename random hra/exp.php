Just showin' the value of file.txt:
<script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
<script>
	var name = new Date();
    
        $.ajax({
        type: 'POST',
        url: "write.php",
        data: {something: name}, // key value pair created, 'something' is the key, 'foo' is the value
        success: function(result) {
        console.log('Data byla odeslána');
            }
        });
    
</script>
<?php  
$line = '';
$file = 'file.txt';
if($f = fopen($file, 'r')){
  $line = fgets($f); // read until first newline
  fclose($f);
}
echo $line;
?>