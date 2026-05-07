package com.example.diagnostico2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.diagnostico2.model.Empleado;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
}
