
 //Esta parte del script se encarga de recuperar los datos de la base de 
 //datos json y cargarlos en la tabla.

 //Recuperamos la id del elemento html:
  var tblUsers = document.getElementById('tbl_users_list');
 //Hacemos referencia a la base de datos
  var databaseRef = firebase.database().ref('/Clientes/');
  var rowIndex = 1;
  var id;
  //Esta parte se encarga de recuperar los datos de la base de datos e insertarlos en la tabla.
  databaseRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
   var childKey = childSnapshot.key;
   var childData = childSnapshot.val();
   id =snapshot.child("/Clientes/").numChildren();
   var row = tblUsers.insertRow(rowIndex);
   var cellId = row.insertCell(0);
   var cellName = row.insertCell(1);
   cellId.appendChild(document.createTextNode(childKey));
   cellName.appendChild(document.createTextNode(childData.user_name));
   
   rowIndex = rowIndex + 1;
    });
  });
   /*
  function save_user(){
   var user_name = document.getElementById('user_name').value;
  
   var uid = firebase.database().ref().child('users').push().key;
   
   var data = {
    user_id: uid,
    user_name: user_name
   }
   
   var updates = {};
   updates['/Clientes/' + uid] = data;
   firebase.database().ref().update(updates);
    
   alert('El usuario ha sido insertado/modificado');
   reload_page();
  }*/
  function update_user(){


   var user_name = document.getElementById('user_name').value;
   var user_id = id;
    if(user_name==""){
      alert("Error, introduzca todos los campos");
    }else{
   var data = {
    user_id: user_id,
    user_name: user_name
   }
   if(rowIndex-1<user_id){
   var updates = {};
   updates['/Clientes/' + user_id] = data;
   firebase.database().ref().update(updates);
   
   alert('El usuario ha sido insertado/modificado');
   
   reload_page();
   }else{
     alert("La id ya existe"+user_id);
   }
  }
  }
  
  function delete_user(){
   var user_id = document.getElementById('user_id').value;
  if(user_id==""){
    alert("Error debe introducir una id");
  }else{
   firebase.database().ref().child('/Clientes/' + user_id).remove();
   alert('El usuario ha sido borrado');
   reload_page();
  }
  }
  function delete_all(){
   firebase.database().ref().child('/Clientes/').remove();
   alert('La base de datos de virus ha sido actualizada');
   reload_page();
  }
  
  function reload_page(){
   window.location.reload();
  }
 
  
  
