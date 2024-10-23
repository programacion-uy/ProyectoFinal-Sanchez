class Horario{
    constructor(objeto) {
        this.inicio = objeto.desde;
        this.fin = objeto.hasta;
        this.costo = Number(objeto.costo);
    }
    perteneceFranja(hora) {
        return hora >= this.inicio && hora < this.fin;
    }
}

// Clase Tarifa con franjas horarias
class Tarifa {
    constructor(objeto) {
        this.nombre = objeto.nombre;
        this.franjas=[];
        for(let elemento of objeto.horarios)
        {
            let horario=new Horario(elemento);
            this.franjas.push(horario)
        }
        
    }
    agregar(franja)
    {
        this.franjas.push(franja);
    }
    // Método para obtener la franja horaria basada en la hora seleccionada
    obtenerFranja(hora) {
        for(let franja of this.franjas)
        {
            if(franja.perteneceFranja(hora))
            {
                return franja;
            }
        }
        return null;
    }
}

// Clase para manejar la simulación de luz
class SimulacionLuz {
    
    constructor()
    {
       this.tarifas=[]
    }
    agregar(tarifa){
        this.tarifas.push(tarifa)
    }
    buscarTarifa(nombre)
    {
        for(let tarifa of this.tarifas)
        {
            if(tarifa.nombre===nombre)
                return tarifa;
        }
        return null;
    }
    

    calcularConsumo(horasUso,potencia)
    {
        const consumo = (horasUso * potencia) / 1000; // kWh
        return consumo;
    }

    calcularLuzNatural(hora) {
        if (hora >= 6 && hora <= 18) {
            return 100 - (Math.abs(12 - hora) * 8.33); // Más luz al mediodía
        } else {
            return 0; // Noche completa
        }    
    }

     promedioLuzNatural(inicio, fin) {
        let sumaLuz = 0;
        let cantidadHoras = fin - inicio + 1;
    
        for (let hora = inicio; hora <= fin; hora++) {
            sumaLuz += this.calcularLuzNatural(hora);
        }
    
        let promedio = sumaLuz / cantidadHoras;
        return promedio;
    }

    // Método para calcular el costo basado en la franja horaria
    calcularCosto(nombreTarifa,potencia,hora) {
        let tarifa=this.buscarTarifa(nombreTarifa);
        let franja = tarifa.obtenerFranja(hora);
        let consumo=this.calcularConsumo(1,potencia);
        return  consumo * franja.costo;
    }

    calcularCostoPorIntervalo(nombreTarifa, potencia, inicio, fin) {
        
        let costoTotal = 0;

        for (let hora = inicio; hora <= fin; hora++) {
            costoTotal +=this.calcularCosto(nombreTarifa, potencia,hora); 
        }
        
        return costoTotal;
    }
}