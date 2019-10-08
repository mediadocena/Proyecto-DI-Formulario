 //PRODUCTOS
   //Recuperamos la id del elemento html:
   var tblUsers = document.getElementById('tbl_product_list');
   //Hacemos referencia a la base de datos
    var databaseRef = firebase.database().ref('/Productos/');
    var rowIndex = 1;
    //Esta parte se encarga de recuperar los datos de la base de datos e insertarlos en la tabla.
    databaseRef.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
     var childKey = childSnapshot.key;
     var childData = childSnapshot.val();
     
     var row = tblUsers.insertRow(rowIndex);
     var cellId = row.insertCell(0);
     var cellName = row.insertCell(1);
     var cellValue = row.insertCell(2);
     cellId.appendChild(document.createTextNode(childKey));
     cellName.appendChild(document.createTextNode(childData.product_name));
     cellValue.appendChild(document.createTextNode(childData.product_value));
     
     rowIndex = rowIndex + 1;
      });
    });

  function update_product(){
    var product_name = document.getElementById('product_name').value;
    var product_id = document.getElementById('product_id').value;
    var product_value = document.getElementById('product_value').value;
    if(product_name==""||product_id==""){
      alert("Error, introduzca todos los campos");
    }else{
   var data = {
    product_id: product_id,
    product_name: product_name,
    product_value: product_value
   }
   
   var updates = {};
   updates['/Productos/' + product_id] = data;
   firebase.database().ref().update(updates);
   
   alert('El Producto ha sido insertado/modificado');
   
   reload_page();
  }
 
}
function delete_product(){
    var product_id = document.getElementById('product_id').value;
   if(product_id==""){
     alert("Error debe introducir una id");
   }else{
    firebase.database().ref().child('/Productos/' + product_id).remove();
    alert('El productos ha sido borrado');
    reload_page();
   }
   }