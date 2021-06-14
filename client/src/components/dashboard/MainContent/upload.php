if(!empty($_POST['data'])){
    $data = $_POST['data'];
    $fname = "test.pdf"; 
    $file = fopen("/mnt/c/Users/Ernesto.Razzano.TBP/Desktop/Reports/" .$fname, 'w'); // open the file path
    fwrite($file, $data);
    fclose($file);
} else {
    echo "No Data Sent";
}