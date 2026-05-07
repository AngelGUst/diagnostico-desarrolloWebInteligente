const API_URL = 'http://localhost:8080/api/empleados';

let idAEliminar = null;

document.addEventListener('DOMContentLoaded', () => {
  cargarEmpleados();
  document.getElementById('empleado-form').addEventListener('submit', manejarEnvio);
});

async function cargarEmpleados() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al cargar empleados');
    const empleados = await res.json();
    renderTabla(empleados);
  } catch (err) {
    mostrarAlerta(err.message, 'error');
  }
}

function renderTabla(empleados) {
  const tbody = document.getElementById('tbody');
  if (empleados.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No hay empleados registrados</td></tr>';
    return;
  }
  tbody.innerHTML = empleados.map(e => `
    <tr>
      <td>${e.id}</td>
      <td>${e.nombre}</td>
      <td>${e.apellido}</td>
      <td>${e.email}</td>
      <td><span class="badge">${e.cargo}</span></td>
      <td>$${Number(e.salario).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
      <td class="actions-cell">
        <button class="btn btn-edit" onclick="cargarParaEditar(${e.id})">Editar</button>
        <button class="btn btn-danger" onclick="confirmarEliminar(${e.id})">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

async function manejarEnvio(e) {
  e.preventDefault();
  const id = document.getElementById('empleado-id').value;
  const empleado = obtenerDatosFormulario();

  try {
    let res;
    if (id) {
      res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(empleado),
      });
    } else {
      res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(empleado),
      });
    }

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || 'Error al guardar empleado');
    }

    mostrarAlerta(id ? 'Empleado actualizado correctamente' : 'Empleado creado correctamente', 'success');
    resetFormulario();
    cargarEmpleados();
  } catch (err) {
    mostrarAlerta(err.message, 'error');
  }
}

async function cargarParaEditar(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error('No se encontró el empleado');
    const e = await res.json();

    document.getElementById('empleado-id').value = e.id;
    document.getElementById('nombre').value = e.nombre;
    document.getElementById('apellido').value = e.apellido;
    document.getElementById('email').value = e.email;
    document.getElementById('cargo').value = e.cargo;
    document.getElementById('salario').value = e.salario;

    document.getElementById('form-title').textContent = 'Editar Empleado';
    document.getElementById('btn-guardar').textContent = 'Actualizar';
    document.getElementById('btn-cancelar').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    mostrarAlerta(err.message, 'error');
  }
}

function confirmarEliminar(id) {
  idAEliminar = id;
  document.getElementById('modal-overlay').classList.remove('hidden');
  document.getElementById('btn-confirm-delete').onclick = async () => {
    await eliminarEmpleado(idAEliminar);
    cerrarModal();
  };
}

async function eliminarEmpleado(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar empleado');
    mostrarAlerta('Empleado eliminado correctamente', 'success');
    cargarEmpleados();
  } catch (err) {
    mostrarAlerta(err.message, 'error');
  }
}

function cerrarModal() {
  idAEliminar = null;
  document.getElementById('modal-overlay').classList.add('hidden');
}

function obtenerDatosFormulario() {
  return {
    nombre: document.getElementById('nombre').value.trim(),
    apellido: document.getElementById('apellido').value.trim(),
    email: document.getElementById('email').value.trim(),
    cargo: document.getElementById('cargo').value.trim(),
    salario: parseFloat(document.getElementById('salario').value),
  };
}

function resetFormulario() {
  document.getElementById('empleado-form').reset();
  document.getElementById('empleado-id').value = '';
  document.getElementById('form-title').textContent = 'Nuevo Empleado';
  document.getElementById('btn-guardar').textContent = 'Guardar';
  document.getElementById('btn-cancelar').classList.add('hidden');
}

function cancelarEdicion() {
  resetFormulario();
}

function mostrarAlerta(mensaje, tipo) {
  const alert = document.getElementById('alert');
  alert.textContent = mensaje;
  alert.className = `alert ${tipo}`;
  setTimeout(() => { alert.className = 'alert hidden'; }, 3500);
}
