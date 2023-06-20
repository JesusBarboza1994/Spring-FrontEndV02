export function generatePointForChart(puntosTabla){
    let array1 = JSON.parse(JSON.stringify(puntosTabla))
    let array2 = []

    array1.map((punto, indice) => {
      let dato = {x: parseFloat(punto.Def), y: parseFloat(punto.Fuerza)}
      if (indice>0){
        array2.push(dato)
      }
    });

    return array2
  }

export function calculateLinearRegression(data) {



    let sumX = data.reduce((acc, point) => acc + point.x, 0);
    let sumY = data.reduce((acc, point) => acc + point.y, 0);
    let sumXY = data.reduce((acc, point) => acc + point.x * point.y, 0);
    let sumXSquared = data.reduce((acc, point) => acc + point.x ** 2, 0);
    let sumYSquared = data.reduce((acc, point) => acc + point.y ** 2, 0);
    let n = data.length;

    let slope = (n * sumXY - sumX * sumY) / (n * sumXSquared - sumX ** 2);
    let intercept = (sumY - slope * sumX) / n;

    let regressionLine = data.map(point => ({
      x: point.x,
      y: slope * point.x + intercept,
    }));

    // Cálculo del R-cuadrado
    let yMean = sumY / n;
    let regressionSumSquares = regressionLine.reduce(
      (acc, point) => acc + (point.y - yMean) ** 2,
      0
    );
    let totalSumSquares = sumYSquared - (sumY ** 2) / n;
    let rSquared = 1 - regressionSumSquares / totalSumSquares;

    let linea = {k: parseFloat(slope), b: parseFloat(intercept), r2: parseFloat(1-rSquared)}

    
  
    return linea;
  }