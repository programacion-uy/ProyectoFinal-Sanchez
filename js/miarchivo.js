let simulacion = new SimulacionLuz();
        console.log(tarifa1);
        inicio();

        function inicio() {
            let elemento1 = new Tarifa(tarifa1);
            let elemento2 = new Tarifa(tarifa2);

            simulacion.agregar(elemento1);
            simulacion.agregar(elemento2);

            let select = document.getElementById("tarifa");
            for (let tarifa of simulacion.tarifas) {
                select.innerHTML += "<option value=" + tarifa.nombre + ">" + tarifa.nombre + "</option>";
            }

            document.getElementById("horaInicio").addEventListener("input", mostrarValor);
            document.getElementById("horaFinal").addEventListener("input", mostrarValor);
            document.getElementById("btnCalcular").addEventListener("click", iniciarSimulacion);
            document.getElementById("btnUltimo").addEventListener("click", mostrarAnterior);
        }

        // Función para iniciar la simulación
        function iniciarSimulacion() {
            let horaInicio = Number(document.getElementById('horaInicio').value);
            let horaFinal = Number(document.getElementById('horaFinal').value);

            const potencia = parseFloat(document.getElementById("potencia").value);
            const tipoTarifa = document.getElementById("tarifa").value;

            const consumo = simulacion.calcularConsumo(horaFinal - horaInicio, potencia);
            const costo = simulacion.calcularCostoPorIntervalo(tipoTarifa, potencia, horaInicio, horaFinal);

            // Mostrar los resultados en el HTML
            const resultado = document.getElementById('resultadoSimulacion');
            resultado.innerHTML = `
                <p>Consumo: ${consumo.toFixed(2)} kWh</p>
                <p>Franja Horaria: ${tipoTarifa}</p>
                <p>Costo: $${costo.toFixed(2)}</p>
            `;

            // Guardar en localStorage como el consumo anterior
            const consumoAnterior = localStorage.getItem('ultimoConsumo');
            if (consumoAnterior) {
                localStorage.setItem('consumoAnterior', consumoAnterior);
            }

            // Guardar el nuevo consumo como el último consumo
            let guardar = { "consumo": consumo.toFixed(2), "franja": tipoTarifa, "costo": costo.toFixed(2) };
            localStorage.setItem('ultimoConsumo', JSON.stringify(guardar));
        }

        // Función para mostrar el valor seleccionado en el input range
        function mostrarValor() {
            let horaIncio = Number(document.getElementById('horaInicio').value);
            let valorHoraInicio = document.getElementById('valorHoraInicio');
            valorHoraInicio.textContent = `${horaIncio}:00`;

            let horaFinal = Number(document.getElementById('horaFinal').value);
            let valorHoraFinal = document.getElementById('valorHoraFinal');
            valorHoraFinal.textContent = `${horaFinal}:00`;

            let luzNaturalDisponible = simulacion.promedioLuzNatural(horaIncio, horaFinal);

            const luzNaturalLabel = document.getElementById('luzNatural');
            luzNaturalLabel.textContent = `Luz natural promedio disponible: ${Math.max(0, luzNaturalDisponible.toFixed(2))}%`;
        }

        // Función para mostrar el consumo anterior almacenado
        function mostrarAnterior() {
            const consumoAnterior = localStorage.getItem('consumoAnterior');
            if (consumoAnterior) {
                const datos = JSON.parse(consumoAnterior);
                const resultado = document.getElementById('resultadoSimulacion');
                resultado.innerHTML = `
                    <p>Consumo Anterior Registrado:</p>
                    <p>Consumo: ${datos.consumo} kWh</p>
                    <p>Franja Horaria: ${datos.franja}</p>
                    <p>Costo: $${datos.costo}</p>
                `;
            } else {
                alert('No hay registros anteriores disponibles');
            }
        }