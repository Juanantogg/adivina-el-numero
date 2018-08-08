const aleatorio = document.getElementById('aleatorio')
const play = document.getElementById('play')
const popup = document.getElementById('popup')
const numeroUsuario = document.getElementById('usuario')
const signoMas = document.getElementById('signo_+')
const signoMenos = document.getElementById('signo_-')
const contenedor = document.getElementById('contenedor')
const modal = document.getElementById('modal')
const ganaste = document.getElementById('ganaste')
const perdiste = document.getElementById('perdiste')
const repetir = document.getElementById('repetir')
const menu = document.getElementById('menu')
const cerrar = document.getElementById('cerrar')
const modalInfo = document.getElementById('modal-info')
const jugados = document.getElementById('jugados')
const jugadosPorcentaje = document.getElementById('jugadosPorcentaje')
const ganados = document.getElementById('ganados')
const ganadosPorcentaje = document.getElementById('ganadosPorcentaje')
const perdidos = document.getElementById('perdidos')
const perdidosPorcentaje = document.getElementById('perdidosPorcentaje')
const borrar = document.getElementById('borrar')

const intentos = document.querySelectorAll('.intento')

let numeroAleatorio = Math.floor(Math.random() * 100)
let contadorIntentos = 0

const mostrarPopup = () => {
  popup.classList.remove('visible')
  popup.classList.add('oculto')
  numeroUsuario.style.border = '2px solid white'
  numeroUsuario.style.background = '#35495e'
}

const parpadeoMas = () => {
  signoMas.classList.remove('mas')
}

const parpadeoMenos = () => {
  signoMenos.classList.remove('mas')
}

const showPopup = () => {
  numeroUsuario.value = ''
  popup.classList.remove('oculto')
  popup.classList.add('visible')
  numeroUsuario.style.border = '2px solid red'
  numeroUsuario.style.background = 'red'
  setTimeout(mostrarPopup, 3000)
}

const guardarJugados = () => {
  if (window.localStorage.getItem('jugados')) {
    let local = window.localStorage.getItem('jugados')
    window.localStorage.setItem('jugados', ++local)
  } else {
    window.localStorage.setItem('jugados', 1)
  }
}

const guardarGanados = () => {
  if (window.localStorage.getItem('ganados')) {
    let local = window.localStorage.getItem('ganados')
    window.localStorage.setItem('ganados', ++local)
  } else {
    window.localStorage.setItem('ganados', 1)
  }
  guardarJugados()
}

const guardarPerdidos = () => {
  if (window.localStorage.getItem('perdidos')) {
    let local = window.localStorage.getItem('perdidos')
    window.localStorage.setItem('perdidos', ++local)
  } else {
    window.localStorage.setItem('perdidos', 1)
  }
  guardarJugados()
}

const marcarIntentos = () => {
  intentos.forEach((intento, index) => {
    if (index === contadorIntentos) {
      intento.classList.add('intento-fallido')
      if (index >= 9) {
        if (numeroAleatorio.toString() === numeroUsuario.value) {
          guardarGanados()
        } else {
          ganaste.classList.add('ganaste-oculto')
          modal.classList.remove('modal-oculto')
          perdiste.classList.remove('perdiste-oculto')
          guardarPerdidos()
        }
      }
    }
  })
  contadorIntentos++
}

const leerNumero = (e) => {
  let valor = numeroUsuario.value
  let longitud = valor.length
  if (valor === '') {
    showPopup()
  } else {
    if (longitud > 2) {
      showPopup()
    }
    if (e.keyCode === 13 || e.which === 1) {
      if (numeroAleatorio.toString() === valor) {
        aleatorio.innerHTML = numeroAleatorio
        modal.classList.remove('modal-oculto')
        ganaste.classList.remove('ganaste-oculto')
        guardarGanados()
      } else {
        numeroUsuario.value = ''
        if (numeroAleatorio > valor) {
          signoMas.classList.add('mas')
          setTimeout(parpadeoMas, 1000)
        } else if (numeroAleatorio < valor) {
          signoMenos.classList.add('mas')
          setTimeout(parpadeoMenos, 1000)
        }
      }
      marcarIntentos()
    }
  }
  numeroUsuario.focus()
}

const repetirJuego = () => {
  contadorIntentos = 0
  numeroUsuario.value = ''
  aleatorio.innerHTML = '?'
  numeroAleatorio = Math.floor(Math.random() * 100)
  console.log(numeroAleatorio)
  modal.classList.add('modal-oculto')
  modal.classList.add('modal-oculto')
  perdiste.classList.add('perdiste-oculto')
  intentos.forEach(intento => {
    intento.classList.remove('intento-fallido')
  })
}

const mostarInfo = () => {
  if (window.localStorage.getItem('jugados') > 0) {
    let jugadosLocal = window.localStorage.getItem('jugados')

    jugados.innerText = jugadosLocal
    jugadosPorcentaje.innerText = 100
  }
  if (window.localStorage.getItem('ganados') > 0) {
    let ganadosLocal = window.localStorage.getItem('ganados')

    ganados.innerText = ganadosLocal
    ganadosPorcentaje.innerText = ((ganadosLocal * 100) / window.localStorage.getItem('jugados')).toFixed(1)
  }
  if (window.localStorage.getItem('perdidos') > 0) {
    let perdidosLocal = window.localStorage.getItem('perdidos')

    perdidos.innerText = perdidosLocal
    perdidosPorcentaje.innerText = ((perdidosLocal * 100) / window.localStorage.getItem('jugados')).toFixed(1)
  }
  modalInfo.classList.remove('modal-oculto')
}

const cerrarInfo = () => {
  modalInfo.classList.add('modal-oculto')
}

const borrarDatos = () => {
  window.localStorage.removeItem('jugados')
  window.localStorage.removeItem('ganados')
  window.localStorage.removeItem('perdidos')
  jugados.innerText = 0
  jugadosPorcentaje.innerText = 0
  ganados.innerText = 0
  ganadosPorcentaje.innerText = 0
  perdidos.innerText = 0
  perdidosPorcentaje.innerText = 0
}

numeroUsuario.addEventListener('keyup', leerNumero)
play.addEventListener('click', leerNumero)
contenedor.addEventListener('click', () => numeroUsuario.focus())
repetir.addEventListener('click', repetirJuego)
// repetir.addEventListener('keyup', repetirJuego)
menu.addEventListener('click', mostarInfo)
cerrar.addEventListener('click', cerrarInfo)
borrar.addEventListener('click', borrarDatos)
