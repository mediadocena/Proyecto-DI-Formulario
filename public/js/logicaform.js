 //FORMULARIO
    //LISTADO CLIENTES:
   //Recuperamos la id del elemento html:
   var tblUsers = document.getElementById('user_id');
   //Hacemos referencia a la base de datos
    var databaseRef = firebase.database().ref('/Clientes/');
    var rowIndex = 1;
    //Esta parte se encarga de recuperar los datos de la base de datos e insertarlos en la tabla.
    databaseRef.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
     var childKey = childSnapshot.key;
     var childData = childSnapshot.val();
     
     var row = tblUsers.insertAdjacentHTML('beforeend',"<option>"
     + childData.user_id
     +"</option>")
      });
    });
//FIN LISTA CLIENTES
//LISTA PRODUCTOS
var tblProduct = document.getElementById('product_id');
//Hacemos referencia a la base de datos
 var databaseRefProd = firebase.database().ref('/Productos/');

 //Esta parte se encarga de recuperar los datos de la base de datos e insertarlos en la tabla.
 databaseRefProd.once('value', function(snapshot) {
   snapshot.forEach(function(childSnapshot) {
  var childKey = childSnapshot.key;
  var childData = childSnapshot.val();
  
  var row = tblProduct.insertAdjacentHTML('beforeend',"<option onclick='prueba()'>"
  + childData.product_name
  +"</option>")
   });
 });
 //FIN LISTA PRODUCTOS

 

  function anadir_producto(){
    var product_id = document.getElementById('product_id').value;
    var product_value = document.getElementById('precio').value;
    var product_cant = document.getElementById('cant').value
    var tblProduct = document.getElementById('tbl_product_list');
    if(product_id==""||product_cant==""){
      alert("Error, introduzca todos los campos");
    }else{
      var row = tblProduct.insertRow(rowIndex);
      var cellId = row.insertCell(0);
      var cellValue = row.insertCell(1);
      var cellCant = row.insertCell(2);
      cellId.appendChild(document.createTextNode(product_id));
      cellCant.appendChild(document.createTextNode(product_cant));
      cellValue.appendChild(document.createTextNode(product_value));
      rowIndex = rowIndex + 1;
  } 
}
function obtenerNombrecliente(cliente){
  var nombre;
  var databaseRef = firebase.database().ref('/Clientes/');
  databaseRef.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childK = childSnapshot.key; 
   var childData = childSnapshot.val();
  if(cliente == childK){
    nombre = childData.user_name;
return nombre;
  }
    });
  });
}
function IDrepetidaFactura(id_){
  var user = id_;
  var databaseRefFactura = firebase.database().ref('/Factura/');
  databaseRefFactura.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
   var childData = childSnapshot.key();
  if(user === childData){
return true;
  }
    });
  });
return false;
}
function crear_factura(){
  var factura_id= document.getElementById('factura_id').value;
  var cliente_id = document.getElementById('user_id').value;
  var cliente= obtenerNombrecliente(cliente_id);
  var iva = document.getElementById('iva').value;
  if(factura_id==""||cliente==""||iva==""){
    alert("Error, introduzca todos los campos");
  }else{
 var data = {
  id :  factura_id ,
  iva : iva,

    cliente : {
      nombre : cliente,
      id : cliente_id
    }

 }
 console.log(factura_id,iva,cliente,cliente_id);
 var updates = {};
 var repe = IDrepetidaFactura(factura_id);
 if(repe==false){
 updates['/Factura/'+factura_id] = data;
 firebase.database().ref().update(updates);
 

 alert('la factura sido insertado/modificado');
 
 reload_page();
 }else{
   alert("La id ya existe:"+factura_id);
 }
}

}
function prueba(){
  var producto = document.getElementById('product_id').value;
  console.log(producto);
  var tblPrecio = document.getElementById('precio');
  databaseRefProd.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
   var childData = childSnapshot.val();
  if(producto === childData.product_name){
    console.log("entra",childData.product_value);
    document.getElementById('precio').value =  childData.product_value;

  }
    });
  });
}
