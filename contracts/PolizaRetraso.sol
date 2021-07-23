// SPDX-License-Identifier: MIT
pragma solidity >=0.4.11 <0.9.0;

contract PolizaRetraso {
  /*
  constructor() public {
    uint id;
    address contratante;
    address asegurador;
    uint factor;
    uint256 prima;
    uint256 maxpago;
    uint result;
    uint tretraso;
  }
  */

  struct Pol {
  uint id;
  address contratante;
  address asegurador;
  uint factor;
  uint256 prima;
  uint256 maxpago;
  uint result;
  uint tretraso;
  }


  mapping(uint => Pol) public pols;
  mapping(address => uint256) public retirosPendientes;
  uint ContadorPol;
  uint contador;

  event solicitarPolEvent (
    uint indexed _id
  );

  event EmitirPolEvent (
    uint indexed _id
  );

  event SimularRetrasoEvent (
    uint indexed _id
  );


  function solicitarPol(uint _fact) payable public {
    // Nueva Poliza
    ContadorPol++;
    uint256 _factor = _fact;

    // Almacenar esta póliza
    pols[ContadorPol] = Pol(
         ContadorPol, //id
         msg.sender, //contratante
         address(0), //asegurador
         _factor, //factor
         msg.value, //prima
         0, //maxpago
         5, //result
         90 //tretraso
    );

    // Detonar Evento
    emit solicitarPolEvent(ContadorPol);
  }



//*******************************************************************************************/
// 
  function getPolizasTodas() public view returns(uint[] memory) {
    if(ContadorPol == 0) {
      return new uint[](0);
    }

    // se crea un array para almacenar
    uint[] memory polIds = new uint[](ContadorPol);

    uint numPolizasTodas = 0;
    for (uint i = 1; i <= ContadorPol; i++) {
      //if (pols[i].asegurador == address(0)) { //solicitada y no emitida
        polIds[numPolizasTodas] = pols[i].id;
        numPolizasTodas++;
      //}
    }

    // se copia a un array
    uint[] memory PolizasTodas = new uint[](numPolizasTodas);
    for (uint j = 0; j < numPolizasTodas; j++) {
      PolizasTodas[j] = polIds[j];
    }
    return (PolizasTodas);
  }


/****************************************************************************************** */


  function getPolizasSolicitadas() public view returns(uint[] memory) {
    if(ContadorPol == 0) {
      return new uint[](0);
    }

    // se crea un array para almacenar
    uint[] memory polIds = new uint[](ContadorPol);

    uint numPolizasSolicitadas = 0;
    for (uint i = 1; i <= ContadorPol; i++) {
      if (pols[i].asegurador == address(0)) { //solicitada y no emitida
        polIds[numPolizasSolicitadas] = pols[i].id;
        numPolizasSolicitadas++;
      }
    }

    // se copia a un array
    uint[] memory PolizasSolicitadas = new uint[](numPolizasSolicitadas);
    for (uint j = 0; j < numPolizasSolicitadas; j++) {
      PolizasSolicitadas[j] = polIds[j];
    }
    return (PolizasSolicitadas);
  }

/*********************************************************************************/


  function EmitirPoliza(uint _id) payable public {
    require(_id > 0 && _id <= ContadorPol);
    
    Pol storage pol = pols[_id];
    uint256 _maxPago = msg.value;

    require(pol.asegurador == address(0)); //que no tenga previamente un asegurador
    require(pol.contratante != msg.sender); //que el contratante y el asegurador no sea el mismo
    require(pol.prima*6*pol.factor/10000 == _maxPago); //6 es el maximo multiplicador del evento aleatorio
    require(pol.result == 5); //5 significa que no ha sucedido el evento aleatorio

    pol.asegurador = msg.sender;
    pol.maxpago = _maxPago;

    emit EmitirPolEvent(_id);
  }

/***************************************************************************************/

  function retirar() public payable{
    uint256 _amount = retirosPendientes[msg.sender];

    require(_amount > 0);

    retirosPendientes[msg.sender] = 0;
    payable(msg.sender).transfer(_amount);
  }

/**************************************************************************************/

//Con esta funcion simulamos el evento aleatorio y elegimos el multiplicador correspondiente al Tretraso
  function Set_tretraso(uint _tretrasoelegido) public {
    contador++;
    require(contador <= ContadorPol);


    Pol storage pol = pols[contador];
    pol.tretraso = _tretrasoelegido;

    
    if(pol.tretraso == 0){
      //No hubo retraso
      pol.result = 0;
    } else if(pol.tretraso != 5){
      //Retraso
      pol.result = 1;
    }


    
    //se considera el caso en el que se devuelve la prima al contratante
    if (pol.result != 5 && pol.asegurador == address(0)) { //Se solicitó póliza, sucedió el evento y no se emitió
      retirosPendientes[pol.contratante] += pol.prima;
    }else{
      if (pol.result == 1){
        retirosPendientes[pol.contratante] += pol.prima*pol.tretraso/10*pol.factor/10000;
        retirosPendientes[pol.asegurador] += pol.maxpago + pol.prima - pol.prima*pol.tretraso/10*pol.factor/10000;
      }else{
        retirosPendientes[pol.asegurador] += pol.prima + pol.maxpago;
       }
    }



    emit SimularRetrasoEvent(contador);

    
  }

}
