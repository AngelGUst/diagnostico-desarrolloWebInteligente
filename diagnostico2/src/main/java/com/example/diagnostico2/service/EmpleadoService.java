package com.example.diagnostico2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.diagnostico2.model.Empleado;
import com.example.diagnostico2.repository.EmpleadoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmpleadoService {

    private final EmpleadoRepository empleadoRepository;

    public List<Empleado> listarTodos() {
        return empleadoRepository.findAll();
    }

    public Optional<Empleado> buscarPorId(Long id) {
        return empleadoRepository.findById(id);
    }

    public Empleado guardar(Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    public Optional<Empleado> actualizar(Long id, Empleado datos){
        return empleadoRepository.findById(id).map(
            empleado -> {
                empleado.setNombre(datos.getNombre());
                empleado.setApellido(datos.getApellido());
                empleado.setEmail(datos.getEmail());
                empleado.setCargo(datos.getCargo());
                empleado.setSalario(datos.getSalario());
                return empleadoRepository.save(empleado);
            }
        );
    }

    public boolean eliminar(Long id) {
        if (empleadoRepository.existsById(id)) {
            empleadoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
