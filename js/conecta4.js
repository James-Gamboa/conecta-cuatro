const matriz = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

var turno = 0;
var nuevaFila = 0;
function transpose() {
  for (var i = 0; i < matriz.length; i++) {
    for (var j = 0; j < i; j++) {
      const tmp = matriz[i][j];
      matriz[i][j] = matriz[j][i];
      matriz[j][i] = tmp;
    }
  }
}

// @ts-ignore
transpose(matriz);
//darle click a la fila
// @ts-ignore
document.getElementById("1").addEventListener("click", () => {
  main(0);
});

// @ts-ignore
document.getElementById("2").addEventListener("click", () => {
  main(1);
});

// @ts-ignore
document.getElementById("3").addEventListener("click", () => {
  main(2);
});

// @ts-ignore
document.getElementById("4").addEventListener("click", () => {
  main(3);
});

// @ts-ignore
document.getElementById("5").addEventListener("click", () => {
  main(4);
});

// @ts-ignore
document.getElementById("6").addEventListener("click", () => {
  main(5);
});

// @ts-ignore
document.getElementById("7").addEventListener("click", () => {
  main(6);
});

// @ts-ignore
document.getElementById("8").addEventListener("click", () => {
  main(7);
});

/*
function ganador(tablero, jugador, fila, columna) {
  Aqui deben incluir el codigo para seleccionar cuando un usuario gana todas las posibles combinaciones.
  fila par, columna impar y se alterna (diagonales)
  misma fila, iniciando en pares e impares (horizontales)
  diferente fila, misma columna (verticales)
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz.length; j++) {
      if (matriz[7][j] % 2 == 0) {
      }
    }
  }
  return false;
}
*/
function ganador() {
  for (var i = 0; i < matriz.length - 3; i++) {
    for (var j = 0; j < matriz[i].length; j++) {
      if (
        matriz[i + 3][j] === 1 &&
        matriz[i + 2][j] === 1 &&
        matriz[i + 1][j] === 1 &&
        matriz[i][j] === 1
      ) {
        return {
          pos_i: [i + 3, i + 2, i + 1, i],
          pos_j: [j, j, j, j],
        };
      }
      if (
        matriz[i + 3][j] === 2 &&
        matriz[i + 2][j] === 2 &&
        matriz[i + 1][j] === 2 &&
        matriz[i][j] === 2
      ) {
        return {
          pos_i: [i + 3, i + 2, i + 1, i],
          pos_j: [j, j, j, j],
        };
      }
    }
  }
  for (var i = 0; i < matriz.length; i++) {
    for (var j = 0; j < matriz[i].length - 3; j++) {
      if (
        matriz[i][j + 3] === 1 &&
        matriz[i][j + 2] === 1 &&
        matriz[i][j + 1] === 1 &&
        matriz[i][j] === 1
      ) {
        return {
          pos_i: [i, i, i, i],
          pos_j: [j + 3, j + 2, j + 1, j],
        };
      }
      if (
        matriz[i][j + 3] === 2 &&
        matriz[i][j + 2] === 2 &&
        matriz[i][j + 1] === 2 &&
        matriz[i][j] === 2
      ) {
        return {
          pos_i: [i, i, i, i],
          pos_j: [j + 3, j + 2, j + 1, j],
        };
      }
    }
  }
  for (var i = 0; i < matriz.length - 3; i++) {
    for (var j = 0; j < matriz[i].length - 3; j++) {
      if (
        matriz[i + 3][j + 3] === 1 &&
        matriz[i + 2][j + 2] === 1 &&
        matriz[i + 1][j + 1] === 1 &&
        matriz[i][j] === 1
      ) {
        return {
          pos_i: [i + 3, i + 2, i + 1, i],
          pos_j: [j + 3, j + 2, j + 1, j],
        };
      }
      if (
        matriz[i + 3][j + 3] === 2 &&
        matriz[i + 2][j + 2] === 2 &&
        matriz[i + 1][j + 1] === 2 &&
        matriz[i][j] === 2
      ) {
        return {
          pos_i: [i + 3, i + 2, i + 1, i],
          pos_j: [j + 3, j + 2, j + 1, j],
        };
      }
      if (
        matriz[i][j + 3] === 1 &&
        matriz[i + 1][j + 2] === 1 &&
        matriz[i + 2][j + 1] === 1 &&
        matriz[i + 3][j] === 1
      ) {
        return {
          pos_i: [i, i + 1, i + 2, i + 3],
          pos_j: [j + 3, j + 2, j + 1, j],
        };
      }
      if (
        matriz[i][j + 3] === 2 &&
        matriz[i + 1][j + 2] === 2 &&
        matriz[i + 2][j + 1] === 2 &&
        matriz[i + 3][j] === 2
      ) {
        return {
          pos_i: [i, i + 1, i + 2, i + 3],
          pos_j: [j + 3, j + 2, j + 1, j],
        };
      }
    }
  }
  return false;
}

if (matriz.length == 0) empate();
function empate() {
  console.log("Empate");
  alert("Empate");
  //TODO
  // @ts-ignore
  pResultado.style.visibility = "visible";
}

function main(fila) {
  function recursivoPila(vector, indexultimo) {
    if (indexultimo == 0) {
      return -1;
    }
    if (vector[indexultimo] == 0) {
      return indexultimo;
    }

    return recursivoPila(vector, indexultimo - 1);
  }

  // @ts-ignore
  ceromascercano = recursivoPila(matriz[fila], matriz.length);

  // @ts-ignore
  valores1 = document.querySelectorAll("[id='1']");
  // @ts-ignore
  valores2 = document.querySelectorAll("[id='2']");
  // @ts-ignore
  valores3 = document.querySelectorAll("[id='3']");
  // @ts-ignore
  valores4 = document.querySelectorAll("[id='4']");
  // @ts-ignore
  valores5 = document.querySelectorAll("[id='5']");
  // @ts-ignore
  valores6 = document.querySelectorAll("[id='6']");
  // @ts-ignore
  valores7 = document.querySelectorAll("[id='7']");
  // @ts-ignore
  valores8 = document.querySelectorAll("[id='8']");

  if (turno % 2 == 0) {
    switch (fila) {
      case 0:
        // @ts-ignore
        valores1[ceromascercano].style.background = "yellow";
        break;
      case 1:
        // @ts-ignore
        valores2[ceromascercano].style.background = "yellow";
        break;
      case 2:
        // @ts-ignore
        valores3[ceromascercano].style.background = "yellow";
        break;
      case 3:
        // @ts-ignore
        valores4[ceromascercano].style.background = "yellow";
        break;
      case 4:
        // @ts-ignore
        valores5[ceromascercano].style.background = "yellow";
        break;
      case 5:
        // @ts-ignore
        valores6[ceromascercano].style.background = "yellow";
        break;
      case 6:
        // @ts-ignore
        valores7[ceromascercano].style.background = "yellow";
        break;
      case 7:
        // @ts-ignore
        valores8[ceromascercano].style.background = "yellow";
        break;
    }
    // @ts-ignore
    matriz[fila][ceromascercano] = 1;
  } else {
    switch (fila) {
      case 0:
        // @ts-ignore
        valores1[ceromascercano].style.background = "blue";
        break;
      case 1:
        // @ts-ignore
        valores2[ceromascercano].style.background = "blue";
        break;
      case 2:
        // @ts-ignore
        valores3[ceromascercano].style.background = "blue";
        break;
      case 3:
        // @ts-ignore
        valores4[ceromascercano].style.background = "blue";
        break;
      case 4:
        // @ts-ignore
        valores5[ceromascercano].style.background = "blue";
        break;
      case 5:
        // @ts-ignore
        valores6[ceromascercano].style.background = "blue";
        break;
      case 6:
        // @ts-ignore
        valores7[ceromascercano].style.background = "blue";
        break;
      case 7:
        // @ts-ignore
        valores8[ceromascercano].style.background = "blue";
        break;
    }
    // @ts-ignore
    matriz[fila][ceromascercano] = 2;
  }

  // @ts-ignore
  validacion(matriz, (turno % 2) + 1, fila, ceromascercano);
  turno++;
}
function validacion(matriz, turno, fila, columna) {
  // @ts-ignore
  let hayganador = ganador(matriz, turno, fila, columna);
  if (hayganador) {
    alert("El jugador " + turno + " gana!");
  }
}