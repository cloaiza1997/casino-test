import React from "react";
import { useGlobal, useEffect, useState } from "reactn";
import axios from "axios";

export default function Users(){
  const [ globalState ] = useGlobal();
  const [ users, setUsers ] = useState([]);
  const [ user, setUser ] = useState();
  const [ name, setName ] = useState("");
  const [ money, setMoney ] = useState(0);
  const [ create, setCreate ] = useState(true);

  const getUsers = () =>{
    axios.get(globalState.url + "user")
    .then(res => {
      setUsers(res.data.users);
    });
  }

  const store = () => {

    if(!name.trim()){
      alert("Ingrese el nombre");
    } else {
      let accept = confirm("Confirma la creación");
      if(accept) {
        axios({
          method: "POST",
          data: { nombre: name },
          url: globalState.url + "user"
        }).then(res => {
          if(res.data.success) {
            getUsers();
            alert("Usuario creado");
          } else {
            alert("Error");
          }
        }).catch(error => {
          alert("Error");
        });
      }
    }
  }

  const edit = (user) => {
    setName(user.nombre);
    setMoney(user.dinero);
    setUser(user);
    setCreate(false);
  }

  const update = () => {

    if (!name.trim() || !(money + "").trim() || typeof money != "number" || money < 0) {
      alert("Diligencie correctamente los datos");
    } else {
      let accept = confirm("Confirma la edición");
      if(accept) {
        axios({
            method: "PUT",
            data: {
                nombre: name,
                dinero: money
            },
            url: globalState.url + "user/" + user.id
        }).then(res => {
            if (res.data.success) {
                getUsers();
                setCreate(true);
                setName("");
                alert("Usuario editado");
            } else {
                alert("Error");
            }
        }).catch(error => {
            alert("Error");
        });
      }
    }
  };

  const remove = (id) => {
    let accept = confirm("Confirma la eliminación");
    if(accept) {
      axios({
          method: "DELETE",
          url: globalState.url + "user/" + id
      }).then(res => {
          if (res.data.success) {
              getUsers();
              alert("Usuario eliminado");
          } else {
              alert("Error");
          }
      }).catch(error => {
          alert("Error");
      });
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return(
    <div>
      <button onClick={ () => globalState.func.changeView("roulette") }>Regresar</button>
      <h2>Usuarios</h2>
      <div>
        <form hidden={ !create }>
          <h3>Crear Usuario</h3>
          <label>Nombre</label>
          <input type="text" value={name} onChange={ e => setName(e.target.value)}/>
          <button type="button" onClick={store}>Crear</button>
        </form>
        <form hidden={ create }>
          <h3>Editar Usuario</h3>
          <label>Nombre</label>
          <input type="text" value={name} onChange={ e => setName(e.target.value)}/>
          <br/>
          <label>Dinero</label>
          <input type="number" value={money} onChange={ e => setMoney(parseInt(e.target.value))}/>
          <br/>
          <button type="button" onClick={ () => {
              setCreate(true);
              setName("");
            }}>Cancelar</button>
          <button type="button" onClick={update}>Editar</button>
        </form>
      </div>
      <div>
        <h3>Listado de Usuarios</h3>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Dinero</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map( (user, index) => (
                <tr key={ index }>
                  <td>{ user.id }</td>
                  <td>{ user.nombre }</td>
                  <td>{ user.dinero }</td>
                  <td>
                    <button onClick={() => edit(user)}>Editar</button>
                  </td>
                  <td>
                    <button onClick={() => remove(user.id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}