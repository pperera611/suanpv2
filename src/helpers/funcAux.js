export const verificarNroCobro = (nroCobro) => {
     
    //convierto el string en una lista de elementos
    const array =  Array.from(nroCobro.toString());
    
    const digito = Number(array[5]);
    array.length=array.length-1;
    let num =0;
    array[0] = Number(array[0])*2; //luego multiplico por dos los elementos con indices pares tal como lo indica la especificacion
    for (let i in array){
       if (i>0 && i%2 === 0)
            array[i] = Number(array[i])*2;
        else
            array[i] = Number(array[i]);
    }
    //console.log("primero:  ",array);
    if (array[0] >= 10)
       array[0] = Math.trunc(array[0]/10) + array[0]%10;
    if (array[2] >= 10)
       array[2] = Math.trunc(array[2]/10) + array[2]%10;
    if (array[4] >= 10)      
       array[4] = Math.trunc(array[4]/10) + array[4]%10;
    
    for (let i in array){
        num = num + array[i];
    }
    //console.log(num);
    let val_aux = num;
    if (num%10!==0)
        val_aux = num - num%10;

    //console.log(val_aux);
    let valor = val_aux;
    if (val_aux < num)
        valor = valor +10;
    
    //console.log(valor);
    
    let digitoResultante = valor - num;
    
    //console.log(digito === digitoResultante);
    return (digito === digitoResultante)
    
    

    }